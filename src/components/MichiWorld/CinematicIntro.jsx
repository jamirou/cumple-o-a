import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bgMusic from '../../assets/clair_de_lune.mp3';

// Import Assets
import escena1 from '../../assets/escena1.png';
import escena1_2 from '../../assets/escena1.2.png';
import escena1_3 from '../../assets/escena1.3.png';
import escena1_4 from '../../assets/escena1.4.png';
import escena1_5 from '../../assets/escena1.5.png';

import solcito1 from '../../assets/escenasolcito1.png';
import solcito1_2 from '../../assets/escenasolcito1.2.png';
import solcito1_3 from '../../assets/escenasolcito1.3.png';

import gatitos1 from '../../assets/escena1gatitos.png';
import gatitos1_2 from '../../assets/escena1.2gatitos.png';
import gatitos1_3 from '../../assets/escena1.3gatitos.png';

import papaAmasando from '../../assets/papaamasando1.png';

const sequences = [
    {
        id: 'meadow',
        frames: [escena1, escena1_2, escena1_3, escena1_4, escena1_5],
        frameRate: 200,
        text: "En una dimensión paralela hecha de azúcar y siestas, existía...",
        duration: 5000 // Duration to show this scene
    },
    {
        id: 'sun',
        frames: [solcito1, solcito1_2, solcito1_3],
        frameRate: 200,
        text: "Michi World",
        duration: 4000,
        isTitle: true
    },
    {
        id: 'family',
        frames: [gatitos1, gatitos1_2, gatitos1_3],
        frameRate: 300,
        text: "",
        duration: 4000
    },
    {
        id: 'kneading',
        frames: [papaAmasando],
        frameRate: 0,
        text: "",
        duration: 3000
    }
];

const CinematicIntro = ({ onComplete }) => {
    const [currentSeqIndex, setCurrentSeqIndex] = useState(0);
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [showText, setShowText] = useState(false);

    const audioRef = useRef(null);
    const frameIntervalRef = useRef(null);
    const sequenceTimeoutRef = useRef(null);

    const currentSequence = sequences[currentSeqIndex];

    // Audio Initialization
    useEffect(() => {
        audioRef.current = new Audio(bgMusic);
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    // Sequence Management
    useEffect(() => {
        if (currentSeqIndex >= sequences.length) {
            onComplete();
            return;
        }

        const seq = sequences[currentSeqIndex];
        setCurrentFrameIndex(0);
        setShowText(true);

        // Frame Animation
        if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);

        if (seq.frames.length > 1) {
            frameIntervalRef.current = setInterval(() => {
                setCurrentFrameIndex(prev => (prev + 1) % seq.frames.length);
            }, seq.frameRate);
        }

        // Advance to next sequence
        sequenceTimeoutRef.current = setTimeout(() => {
            setShowText(false);
            setTimeout(() => {
                setCurrentSeqIndex(prev => prev + 1);
            }, 500); // Small fade out time
        }, seq.duration);

        return () => {
            if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
            if (sequenceTimeoutRef.current) clearTimeout(sequenceTimeoutRef.current);
        };
    }, [currentSeqIndex, onComplete]);

    if (currentSeqIndex >= sequences.length) return null;

    return (
        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
            {/* Background Frames */}
            <div className="absolute inset-0">
                <img
                    src={currentSequence.frames[currentFrameIndex]}
                    alt="Cinematic Frame"
                    className="w-full h-full object-cover pixelated"
                    style={{ imageRendering: 'pixelated' }}
                />
                <div className="absolute inset-0 bg-black/20" /> {/* Slight overlay */}
            </div>

            {/* Text Overlay */}
            <AnimatePresence mode="wait">
                {showText && currentSequence.text && (
                    <motion.div
                        key={currentSequence.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none"
                    >
                        <h2 className={`text-white font-bold text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] font-pixel ${currentSequence.isTitle ? 'text-5xl md:text-7xl text-pink-300' : 'text-2xl md:text-4xl'
                            }`} style={{ fontFamily: '"VT323", monospace' }}>
                            {currentSequence.text}
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Skip Button (Optional, hidden for now or small) */}
            <button
                onClick={onComplete}
                className="absolute bottom-4 right-4 text-white/30 hover:text-white/80 text-xs font-mono z-50 transition-colors"
            >
                SKIP &gt;&gt;
            </button>
        </div>
    );
};

export default CinematicIntro;
