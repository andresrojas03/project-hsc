"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';

import JeffersonDisk from '@/components/JeffersonDisk';


const shuffle = (array: string[]) => {
    const s = [...array];
    for (let i = s.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const TARGET_WORD = "MARIAVALES";

export default function UnknownPage() {
    
    const [isSolved, setIsSolved] = useState(false);
    const [currentWord, setCurrentWord] = useState<string>('');
    
    // NEW: State protocol to manage the full-screen blackout sequence
    const [showModal, setShowModal] = useState(false);



    const [rotors, setRotors] = useState<string[][]>([]);
    //using effect to only generate rotors on this part
    useEffect(() => {
        try {
            console.log("Client-side mount detected. Starting rotor generation...");
            
            // Use a timeout to push the heavy math to the next tick of the event loop
            const timer = setTimeout(() => {
                const newRotors = Array.from({ length: 10 }, () => shuffle(ALPHABET));
                setRotors(newRotors);
                console.log("Rotors successfully set.");
            }, 100);

            return () => clearTimeout(timer);
        } catch (error) {
            console.error("Rotor generation failed:", error);
        }
    }, []);
    //const MY_ROTORS = useMemo(() => {
    //    return Array.from({ length: 10 }, () => shuffle(ALPHABET));
    //}, []);

    const handleWordChange = useCallback((word: string) => {
        const upperWord = word.toUpperCase();
        setCurrentWord(upperWord);

        if (upperWord === TARGET_WORD) {
            setIsSolved(true);
            // Initiate the blackout sequence immediately upon decryption
            setShowModal(true); 
        } else {
            setIsSolved(false);
            // Ensure the modal resets if the cylinders are scrambled again
            setShowModal(false); 
        }
    }, []);

    // Synthetic event handler for the screen tap
    const handleScreenTap = () => {
        // You can either hide the modal to show the disk again, 
        // or trigger a router.push('/next-level') here to transition pages.
        setShowModal(false);
    };

    return (
        <>
        {/* --- 1. THE ORIENTATION GUARD --- */}
        <div className="landscape:hidden portrait:flex fixed inset-0 z-[9999] flex-col items-center justify-center bg-slate-950 text-slate-200 px-6 text-center">
            <h2 className="mb-2 text-xl font-bold tracking-widest uppercase">
            Orientation Override
            </h2>
            <p className="font-mono text-sm text-slate-400">
            The cryptographic apparatus requires a vertical viewport. 
            <br /><br />
            Please rotate your device to Portrait Mode to continue.
            </p>
        </div>

        {/* --- 2. THE BLACKOUT PAYLOAD MODAL --- */}
        {showModal && (
            <div 
                className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black px-6 cursor-pointer"
                onClick={handleScreenTap}
            >
                <div className="text-center font-mono">
                    <h1 className="text-3xl text-green-500 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse">
                        ACCESS GRANTED
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed mb-16 px-4">
                        Look for the next Jefferson disk.
                    </p>
                    <p className="text-green-900 text-xs tracking-widest uppercase animate-bounce opacity-80">
                        [ Tap screen to continue ]
                    </p>
                </div>
            </div>
        )}

        {/* --- 3. THE VIEWPORT CANVAS & ENCAPSULATION BLOCK --- */}
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#2b1055] via-[#7597de] to-[#f6a56c] p-4">
            
            <div className="relative flex flex-col items-center justify-center bg-black/70 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
                
                <h2 className="mb-6 font-mono text-orange-400 tracking-widest drop-shadow-lg">
                    {isSolved ? "SYSTEM DECRYPTED" : "MEMORY LOCKED"}
                </h2>
                { rotors.length > 0 ?(
                <JeffersonDisk 
                    rotors={rotors} 
                    onWordChange={handleWordChange} 
                />) : <div className="Loading rotors">Initializing cypher...</div>
                }
            </div>
        </div>
        </>
    );
}