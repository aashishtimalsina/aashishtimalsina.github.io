"use client";

import { SiteBrand } from "@/components/brand/SiteBrand";
import { useSite } from "@/components/providers/SiteProvider";

type Props = {
  className?: string;
  showRole?: boolean;
};

export function SiteLogo({ className, showRole = false }: Props) {
  const site = useSite();

  return (
    <SiteBrand
      name={site.name}
      role={site.role}
      className={className}
      showRole={showRole}
    />
  );
}
