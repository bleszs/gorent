"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// dynamic + ssr:false → chunk GlobalCanvas (three.js) baru DIUNDUH saat komponen
// pertama kali dirender, yaitu setelah main-thread idle (pasca LCP).
const GlobalCanvas = dynamic(() => import("./GlobalCanvas"), { ssr: false });

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function DeferredCanvas() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as IdleWindow;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const mount = () => setReady(true);

    // Tunggu thread utama "bernapas" setelah teks Hero (LCP) tampil.
    if (w.requestIdleCallback) {
      idleId = w.requestIdleCallback(mount, { timeout: 1500 });
    } else {
      timeoutId = setTimeout(mount, 700);
    }

    return () => {
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={`h-full w-full transition-opacity duration-1000 ease-out ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {ready && <GlobalCanvas />}
    </div>
  );
}
