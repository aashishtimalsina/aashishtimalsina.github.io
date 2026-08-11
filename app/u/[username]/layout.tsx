import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  return {
    title: "Profile",
    robots: { index: false, follow: true },
    alternates: { canonical: `/u/${username}` },
  };
}

export default function PublicProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
