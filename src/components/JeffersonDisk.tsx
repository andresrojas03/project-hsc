'use client';

import React, { useRef, useEffect } from 'react';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
// We triple the alphabet to allow infinite-feeling scrolling
const TILES = [...ALPHABET, ...ALPHABET, ...ALPHABET,...ALPHABET, ...ALPHABET, ...ALPHABET];
const COLUMN_COUNT = 10; // We're now building 10 wooden disks
const TILE_HEIGHT = 48;   // The width of ONE letter in your letters.jpg


const shuffle = (array: string[]) =>{
    const shuffled = [...array];
    for(let i = shuffled.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i +1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
    }
    return shuffled;
} 



export default function JeffersonDisk() {

    const columnAlphabets = React.useMemo(() => {
        return Array.from({ length: COLUMN_COUNT}, () => shuffle(ALPHABET));
    }, []);

    // We use an array of refs for the 10 columns
    const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el && !stripRefs.current.includes(el)) {
            stripRefs.current[index] = el;
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (typeof navigator !== 'undefined' && navigator.vibrate) {
                            navigator.vibrate(15);
                        }
                    }
                });
            },
            {
                root: null,
                // Shrinking the 'trigger' area to a thin line in the middle
                rootMargin: '-49% 0px -49% 0px', 
                threshold: 0
            }
        );

        stripRefs.current.forEach(strip => {
            if (strip) {
                const tiles = strip.querySelectorAll('.letter-tile');
                tiles.forEach(tile => observer.observe(tile));
                // Start the scroll in the middle section of our tripled list
                strip.scrollTop = (strip.scrollHeight / 3)+36;
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
    <div className="disk-assembly-container">
        {/* Your frame stays on top */}
        <img src="/frame.png" className="apparatus-frame" alt="Disk Frame" />
        
        <div className="cylinder-tracks-container">
            {/* --- ADD THE SCRAMBLED MAPPING HERE --- */}
            {columnAlphabets.map((shuffledAlphabet, colIndex) => {
                // Triple the specific scrambled alphabet for infinite scroll
                const columnTiles = [...shuffledAlphabet, ...shuffledAlphabet, ...shuffledAlphabet];

                return (
                    <div 
                        key={`col-${colIndex}`} 
                        className="scrollable-strip" 
                        ref={(el) => addToRefs(el, colIndex)}
                    >
                        {columnTiles.map((letter, i) => {
                            // Find where this letter lives in your vertical Stripe.png
                            const letterIndex = ALPHABET.indexOf(letter);
                            
                            // Your pixel-perfect math
                            const TILE_HEIGHT = 48;
                            const topCapHeight = 0;
                            const yOffset = -(letterIndex * TILE_HEIGHT) - topCapHeight;

                            return (
                                <div key={`tile-${colIndex}-${i}`} className="letter-tile" style={{backgroundImage: `url('/letters.png'), url('/Stripe.png')`, backgroundPosition: `center ${yOffset}px`, backgroundSize: '100% auto', backgroundRepeat: 'no-repeat', imageRendering: 'pixelated'}}
                                
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    </div>
);
}