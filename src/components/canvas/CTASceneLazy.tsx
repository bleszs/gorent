"use client";

import dynamic from "next/dynamic";

// ssr:false HANYA valid di Client Component → wrapper ini mengisolasinya.
// Canvas WebGL CTA tak ikut SSR & chunk-nya dimuat client-side saja.
const CTAScene = dynamic(() => import("./CTAScene"), { ssr: false });

export default function CTASceneLazy() {
  return <CTAScene />;
}
