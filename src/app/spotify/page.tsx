'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


export default function SpotifyPage(){
    const pathname = usePathname(); //grabs the current URL path

    return(
        <main className="min-h-screen p-8 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full">
            {/* Back Button */}
            <Link href="/" className="inline-flex items-center text-slate-400 hover:text-firefly-lime mb-8 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Return to Hub
            </Link>

            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-slate-100 mb-2">The Frequency</h1>
                <p className="text-violet-300 italic text-lg">All the special moments come with some music.</p>
            </header>

            {/* Spotify playlist*/}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-violet-500/20">
            <iframe
                key={pathname}
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/playlist/2pXlEGvnKe4sAdqE5KhaVe??utm_source=generator&theme=0" 
                width="100%" 
                height="638" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
          ></iframe>
            </div>
        </div>
    </main> 
    )
}