"use client";
import React, { useEffect, useRef } from 'react';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const TILE_HEIGHT = 48;


interface JeffersonDiskProps {
    rotors: string[][];
    onWordChange: (word: string) => void;
}

export default function JeffersonDisk({ rotors, onWordChange }: JeffersonDiskProps) {
    //hooks
    const [currentWord, setCurrentWord] = React.useState<string[]>(Array(rotors.length).fill(''));
    const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    // Report changes to parent
    useEffect(() => {
        onWordChange(currentWord.join(''));
    }, [currentWord, onWordChange]);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el) stripRefs.current[index] = el;
    };

    // Initialize each strip’s scroll position (center the first copy)
    useEffect(() => {
        stripRefs.current.forEach(strip => {
            if (strip) {
                strip.scrollTop = 26 * TILE_HEIGHT; // start at a letter in the middle copy
            }
        });
    }, [rotors]); // re-run when rotors change

    const audioRef = useRef<HTMLAudioElement | null>(null);
    //audio effect for each click
    useEffect(() => {
        audioRef.current = new Audio('/wood-block-scratching.wav');
        audioRef.current.volume = 1;
    }, []);

    // Scroll listeners to detect centered letter
    useEffect(() => {
        if (!stripRefs.current.length) return;

        const handleCenteredLetter = (colIndex: number) => {
            const strip = stripRefs.current[colIndex];
            if (!strip) return;

            const scrollTop = strip.scrollTop;
            const clientHeight = strip.clientHeight;
            const centerY = scrollTop + clientHeight / 2;

            // Which tile index is closest to the center?
            const tileIndex = Math.floor(centerY / TILE_HEIGHT);
            const totalTiles = strip.children.length; // should be 78 (3 × 26)
            const safeIndex = Math.min(Math.max(0, tileIndex), totalTiles - 1);

            const tile = strip.children[safeIndex] as HTMLDivElement;
            const letter = tile.getAttribute('data-letter');

            if (letter) {
                console.log("I'm seeing this letter", letter);
                setCurrentWord(prev => {
                    const newWord = [...prev];
                    if (newWord[colIndex] !== letter) {
                        newWord[colIndex] = letter;
                        
                        //audio logic
                        if(audioRef.current){
                            audioRef.current.currentTime = 0;   //Reset to start for rapid clicks
                            audioRef.current.play().catch(() => {}); //to prevent errors in case browser blocks autoplay
                        }



                        // Haptic feedback
                        if (typeof window !== 'undefined' && window.navigator?.vibrate) {
                            window.navigator.vibrate(15);
                        }

                        return newWord;
                    }
                    return prev;
                });
            }
        };

        // Throttle scroll events with requestAnimationFrame
        let animationFrameId: number | null = null;
        const onScroll = (colIndex: number) => () => {
            if (animationFrameId !== null) return;
            animationFrameId = requestAnimationFrame(() => {
                handleCenteredLetter(colIndex);
                animationFrameId = null;
            });
        };

        // Attach scroll listeners to all strips
        const handlers: (() => void)[] = [];
        stripRefs.current.forEach((strip, idx) => {
            if (strip) {
                const handler = onScroll(idx);
                strip.addEventListener('scroll', handler);
                handlers[idx] = handler;
                // Initial detection
                handleCenteredLetter(idx);
            }
        });

        // Cleanup
        return () => {
            stripRefs.current.forEach((strip, idx) => {
                if (strip && handlers[idx]) {
                    strip.removeEventListener('scroll', handlers[idx]);
                }
            });
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [rotors]); // re-run when rotors change

    return (
        <div className="disk-assembly-container">
            <img src="/frame.png" className="apparatus-frame" alt="Disk Frame" />

            <div className="cylinder-tracks-container">
                {rotors.map((shuffledAlphabet, colIndex) => {
                    const columnTiles = [...shuffledAlphabet, ...shuffledAlphabet, ...shuffledAlphabet];

                    return (
                        <div
                            key={`col-${colIndex}`}
                            className="scrollable-strip"
                            ref={(el) => addToRefs(el, colIndex)}
                            onTouchStart={() => { if (navigator.vibrate) navigator.vibrate(1); }}
                        >
                            {columnTiles.map((letter, i) => {
                                const letterIndex = ALPHABET.indexOf(letter);
                                const yOffset = -(letterIndex * TILE_HEIGHT);

                                return (
                                    <div


                                        key={`tile-${colIndex}-${i}`}
                                        className="letter-tile"
                                        data-letter={letter}
                                        data-col={colIndex}
                                        style={{
                                            backgroundImage: `url('/letters.png') url('/Stripe.png')`,
                                            backgroundPosition: `center ${yOffset}px`,
                                            backgroundSize: '100% auto',
                                            backgroundRepeat: 'no-repeat',
                                            imageRendering: 'pixelated'
                                        }}
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