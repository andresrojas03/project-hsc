"use client";
import React, { useState, useMemo } from 'react';
import JeffersonDisk from '@/components/JeffersonDisk';

// Helper to shuffle (or just paste your hardcoded strings here)
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
    const [currentWord, setCurrentWord] = useState<string[]>(Array(10).fill(''));
    // Create the rotors once
    const MY_ROTORS = useMemo(() => {
        return Array.from({ length: 10 }, () => shuffle(ALPHABET));
    }, []);

    const handleWordChange = (currentWord: string) => {
        if (currentWord === TARGET_WORD) {
            setIsSolved(true);
        }
    };

    return (
        <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center">
        
        {/* --- CORRECTED ORIENTATION LOCK --- */}
        {/* 'hidden' by default, 'flex' only when in landscape mode */}
        <div className="fixed inset-0 z-[1000] hidden landscape:flex flex-col items-center justify-center bg-black text-orange-700 p-10 text-center">
            <div className="mb-4 animate-bounce">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M12 18h.01" />
                </svg>
            </div>
            <h1 className="font-mono text-xl uppercase tracking-widest">
                Portrait Mode Required
            </h1>
            <p className="mt-2 font-mono text-sm opacity-70">
                Please rotate your device to align the mechanical cylinders.
            </p>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h2 className="mb-4 font-mono text-orange-900">
                {isSolved ? "MEMORY DECRYPTED" : "MEMORY LOCKED"}
            </h2>
            <JeffersonDisk 
                rotors={MY_ROTORS} 
                onWordChange={handleWordChange} 
            />

            {isSolved && (
                <div className="mt-8 p-4 border border-green-500 text-green-500 animate-pulse">
                    ACCESS GRANTED: [Your Secret Message Here]
                </div>
            )}
        </div>
        </main>
    );
}