import Script from "next/script";
import { Suspense } from "react";
import { GoogleAnalyticsPageView } from "./GoogleAnalyticsPageView";

type Props = {
  measurementId?: string | null;
};

export function GoogleAnalytics({ measurementId }: Props) {
  const GA_ID = measurementId ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView measurementId={GA_ID} />
      </Suspense>
    </>
  );
}
