import React from 'react';

import { LetterCard } from '@/components/LetterCard';
import { NavLink } from '@/components/NavLink'
import { Sparkles, BrainCircuit, MicVocal } from 'lucide-react';



export default function Home() {
  const letterData = {
    title: "Hola corazoncito.",
    body: `Esto es algo que construimos juntos por coincidencia, esto no es solo mio o tuyo, es nuestro.
    La mayoría de nuestros momentos y recuerdos especiales que pude capturar se encuentran aquí, sabes que no soy mucho de tomar fotos
    o guardar recuerdos como lo puedes hacer tú ya que muchas veces disfruto tanto de estar contigo que se me olvida sacar el celular
    y capturar nuestros bellos momentos.
    Quiero que tomes este pequeño espacio como una pieza de mi corazón incluso cuando ya lo tienes por completo.
    Espero que disfrutes de esto así como yo lo hice al recordar nuestros momentos e incluso llorar un poco con las cosas que escribí para tí.`
  };
  
  return (
    <main className="min-h-screen w-full py-10 flex flex-col items-center">
      <div className="w-full max-w-md px-4">
        <LetterCard title={letterData.title} body={letterData.body}/>
          {/*Navigation Grid - Spacing adjustment */}
          <div>
            <NavLink
              title="Ecos Visuales"
              description="Momentos especiales a tu lado"
              icon={<Sparkles size={26}/>}
              href="/collage"
            />
            <NavLink
              title="Nuestra vibra"
              description="Resonancia Mutua"
              icon={<MicVocal size={26}/>}
              href="/spotify"
            />

            {/*
            <NavLink
              title="Unknown"
              description="Are you ready?"
              icon={<BrainCircuit size={26}/>}
              href="/unknown"
            />
            */}

          </div>
          <footer className="mt-28 text-center text-slate-600 text-xs font-mono uppercase tracking-widest opacity-60">
            Network Status: [Optimal] // Authentication: [Maria Sarai] // 2026
          </footer>
      </div>
    </main>
  );
}