'use client';

import React, { useState } from 'react';
import JeffersonDisk from '@/components/JeffersonDisk';

export default function UnknownPage() {
  const [btnText, setBtnText] = useState("FORCE MOTOR TEST");

  const handleTest = () => {
    setBtnText("CLICK REGISTERED...");
    
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(200);
      setTimeout(() => setBtnText("MOTOR SHOULD BE BUZZING"), 500);
    } else {
      setTimeout(() => setBtnText("VIBRATION API BLOCKED"), 500);
    }
  };

  return (
    <>
      <div className="landscape:hidden portrait:flex fixed inset-0 z-[9999] flex-col items-center justify-center bg-slate-950 text-slate-200 px-6 text-center">
        <h2 className="mb-2 text-xl font-bold tracking-widest uppercase">Orientation Override</h2>
        <p className="font-mono text-sm text-slate-400">Please rotate your device sideways.</p>
      </div>

      <main className="portrait:hidden landscape:flex min-h-screen w-full flex-col items-center justify-center bg-slate-950">
        <h1 className="mb-4 font-mono text-sm tracking-widest text-slate-500 uppercase">
          System Override // Awaiting Cipher
        </h1>
        <JeffersonDisk/>
      </main>
    </>
  );
}