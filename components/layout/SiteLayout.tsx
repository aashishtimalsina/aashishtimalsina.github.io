import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/layout/Footer";

type Props = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: Props) {
  return (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
  );
}
