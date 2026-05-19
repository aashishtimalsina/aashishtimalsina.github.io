"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContact } from "@/lib/api/contact";
import { cn } from "@/utils/cn";

const submitClass =
  "inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

const schema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  email: z.string().email("Valid email required"),
  subject: z.string().max(200).optional(),
  message: z.string().min(20, "Message must be at least 20 characters").max(5000),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-xl border border-border bg-bg/30 px-4 py-3 text-sm text-fg outline-none transition focus:border-[hsl(var(--accent-1))] focus:ring-1 focus:ring-[hsl(var(--accent-1))]";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    setFeedback(null);
    try {
      const { message } = await submitContact(values);
      setStatus("success");
      setFeedback(message);
      reset();
    } catch (e) {
      setStatus("error");
      setFeedback(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-fg">
            Name
          </label>
          <input id="name" className={cn(inputClass, "mt-2")} autoComplete="name" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-fg">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={cn(inputClass, "mt-2")}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-medium text-fg">
          Subject <span className="text-fg-muted">(optional)</span>
        </label>
        <input id="subject" className={cn(inputClass, "mt-2")} {...register("subject")} />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-fg">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          className={cn(inputClass, "mt-2 resize-y")}
          placeholder="Tell me about your Laravel / Next.js project, timeline, and budget range…"
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      {feedback && (
        <p
          className={cn(
            "rounded-xl border px-4 py-3 text-sm",
            status === "success"
              ? "border-green-500/30 bg-green-500/10 text-green-200"
              : "border-red-500/30 bg-red-500/10 text-red-200",
          )}
          role="alert"
        >
          {feedback}
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className={submitClass}>
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
