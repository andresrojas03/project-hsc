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
    );
}