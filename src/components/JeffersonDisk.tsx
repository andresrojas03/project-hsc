'use client';

import React, { useRef, useEffect } from 'react';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const TILES = [...ALPHABET, ...ALPHABET, ...ALPHABET];

export default function JeffersonDisk(){
    const stripRef1 = useRef<HTMLDivElement>(null);
    const stripRef2 = useRef<HTMLDivElement>(null);
    const stripRef3 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        //Trigger the haptick click when a new letter snaps into the center
                        if (typeof navigator !== 'undefined' && navigator.vibrate){
                            navigator.vibrate(15); // 15ms vibration for mechanical feel
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0
            }
        );

        const strips = [stripRef1.current, stripRef2.current, stripRef3.current];
        strips.forEach(strip => {
            if(strip){
                const tiles = strip.querySelectorAll('.letter-tile');
                tiles.forEach(tile => observer.observe(tile));

                strip.scrollTop = strip.scrollHeight/3;
            }
        });

        return () => observer.disconnect();

    }, []);

    return (
        <div className="disk-assembly-container">
            <img src="frame.png" className="apparatus-frame" alt="Disk Frame"/>
            <div className="pointer-events-none absolute left-0 top-1/2 z-50 h-[2px] w-full -translate-y-1/2 bg-red-500 opacity-50" />
            <div className="cylinder-tracks-container">
                <div className="scrollable-strip" ref={stripRef1}>
                    {TILES.map((letter,i) => (
                        <div key={`col1-${i}`} className="letter-tile">{letter}</div>
                    ))}
                </div>

                <div className="scrollable-strip" ref={stripRef2}>
                    {TILES.map((letter, i) =>
                        <div key={`col2-${i}`} className="letter-tile">{letter}</div>
                    )}
                </div>
                    
                <div className="scrollable-strip" ref={stripRef3}>
                    {TILES.map((letter, i) => (
                        <div key={`col3-${i}`} className="letter-tile">{letter}</div>
                    ))}
                </div>
            </div>
        </div>
    )








}