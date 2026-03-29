"use client";
import React, { useEffect, useRef } from 'react';

// Standard mapping for your Stripe.png
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

interface JeffersonDiskProps {
    rotors: string[][]; // The 10 arrays of letters
    onWordChange: (word: string) => void;
}

export default function JeffersonDisk({ rotors, onWordChange }: JeffersonDiskProps) {
    // The "Brain" state
    const [currentWord, setCurrentWord] = React.useState<string[]>(Array(rotors.length).fill(''));

    // Report back to the Page whenever the word changes
    useEffect(() => {
        onWordChange(currentWord.join(''));
    }, [currentWord, onWordChange]);

    const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el) stripRefs.current[index] = el;
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {

                    const letter = entry.target.getAttribute('data-letter');
                    console.log("Detecting Letter:", letter);
                    // Haptic Feedback
                    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                        window.navigator.vibrate(15);
                    }

                    // Extract data from the tile that just hit the center
                    const activeLetter = entry.target.getAttribute('data-letter');
                    const colIndexStr = entry.target.getAttribute('data-col');

                    if (activeLetter && colIndexStr !== null) {
                        const colIndex = parseInt(colIndexStr, 10);
                        setCurrentWord(prevWord => {
                            const newWord = [...prevWord];
                            if (newWord[colIndex] !== activeLetter) {
                                newWord[colIndex] = activeLetter;
                                return newWord;
                            }
                            return prevWord;
                        });
                    }
                }
            });
        }, {
            rootMargin: '-50% 0px -50% 0px', 
            threshold: 0
        });

        stripRefs.current.forEach(strip => {
            if (strip) {
                const tiles = strip.querySelectorAll('.letter-tile');
                tiles.forEach(tile => observer.observe(tile));
                // Initial offset so it looks "eaten" and starts in the middle set
                const startPos = 26 * 48;
                strip.scrollTop = startPos;
            }
        });

        return () => observer.disconnect();
    }, [rotors]); // Re-run if rotors change

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
                        >
                            {columnTiles.map((letter, i) => {
                                const letterIndex = ALPHABET.indexOf(letter);
                                const TILE_HEIGHT = 48;
                                const yOffset = -(letterIndex * TILE_HEIGHT);

                                return (
                                    <div 
                                        key={`tile-${colIndex}-${i}`} 
                                        className="letter-tile" 
                                        data-letter={letter} 
                                        data-col={colIndex} 
                                        style={{
                                            backgroundImage: `url('/letters.png'), url('/Stripe.png')`, 
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