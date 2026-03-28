import React from 'react';

import { LetterCard } from '@/components/LetterCard';
import { NavLink } from '@/components/NavLink'
import { Sparkles, BrainCircuit, MicVocal } from 'lucide-react';



export default function Home() {
  const letterData = {
    title: "Hello Sweetheart.",
    body: `This is something that we've built together by coincidence, this aint me or you, its ours.

    All of our moments and important things are stored in here, take this as a piece of my heart even if you have it entirely. 

    I hope you enjoy this as I did while coding this project and recalling for all of our precious moments.`
  };
  
  return (
    <main className="min-h-screen w-full py-10 flex flex-col items-center">
      <div className="w-full max-w-md px-4">
        <LetterCard title={letterData.title} body={letterData.body}/>
          {/*Navigation Grid - Spacing adjustment */}
          <div>
            <NavLink
              title="Visual Echoes"
              description="Moments"
              icon={<Sparkles size={26}/>}
              href="/collage"
            />
            <NavLink
              title="Our vibe"
              description="Mutual Resonance"
              icon={<MicVocal size={26}/>}
              href="/spotify"
            />
            <NavLink
              title="Unknown"
              description="Are you ready?"
              icon={<BrainCircuit size={26}/>}
              href="/unknown"
            />
          </div>
          <footer className="mt-28 text-center text-slate-600 text-xs font-mono uppercase tracking-widest opacity-60">
            Network Status: [Optimal] // Authentication: [Maria Sarai] // 2026
          </footer>
      </div>
    </main>
  );
}