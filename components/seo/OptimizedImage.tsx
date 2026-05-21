import Image from "next/image";
import { cn } from "@/utils/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
};

/** next/image only for same-origin paths; remote API/storage URLs use <img> (avoids remotePatterns issues in Turbopack dev). */
function isLocalSrc(src: string): boolean {
  return src.startsWith("/") && !src.startsWith("//");
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: Props) {
  if (!isLocalSrc(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={cn(fill && "absolute inset-0 h-full w-full object-cover", className)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 630}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
