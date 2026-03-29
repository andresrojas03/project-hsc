"use client";
import React, { useState, useMemo, useCallback } from 'react';
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
    
    // Changed this to a simple string to prevent memory reference loops
    const [currentWord, setCurrentWord] = useState<string>('');

    const MY_ROTORS = useMemo(() => {
        return Array.from({ length: 10 }, () => shuffle(ALPHABET));
    }, []);

    // 👇 ADDED useCallback HERE 👇
    const handleWordChange = useCallback((word: string) => {
        const upperWord = word.toUpperCase();

        setCurrentWord(upperWord); // Just saving the string now

        if (upperWord === TARGET_WORD) {
            setIsSolved(true);
        } else {
            setIsSolved(false);
        }
    }, []); // Empty brackets mean this function never gets recreated

    return (
        <>
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

        {/* Added 'relative' here to contain the absolute message below */}
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a]">
            <h2 className="mb-4 font-mono text-orange-900">
                {isSolved ? "MESSAGE DECRYPTED" : "MEMORY LOCKED"}
            </h2>

            <JeffersonDisk 
                rotors={MY_ROTORS} 
                onWordChange={handleWordChange} 
            />

            {/* 
                THE FIX: 
                1. Absolute positioning means it won't push the disk around.
                2. We use opacity instead of unmounting it to prevent any DOM recalculation.
            */}
            <div 
                className={`absolute bottom-16 p-4 border border-green-500 text-green-500 font-mono text-center transition-opacity duration-300 ${isSolved ? 'opacity-100 animate-pulse' : 'opacity-0 pointer-events-none'}`}
            >
                ACCESS GRANTED: Look for the next Jefferson disk.
            </div>
        </div>
        </>
    );
}