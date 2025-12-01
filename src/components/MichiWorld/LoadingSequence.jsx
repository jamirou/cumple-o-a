import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bootSound from '../../assets/boot_sequence.mp3';

const LoadingSequence = ({ onComplete }) => {
    const [currentLine, setCurrentLine] = useState(0);
    const audioRef = useRef(null);

    const lines = [
        "Inyectando dosis de ternura...",
        "Calibrando bigotes...",
        "Precalentando hornos a 180°C...",
        "Descargando paquetes de ternura...",
        "SISTEMA LISTO.",
        "BIENVENIDA ñoña",
    ];

    useEffect(() => {
        // Play sound
        try {
            audioRef.current = new Audio(bootSound);
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        } catch (e) {
            console.error("Failed to initialize boot sound:", e);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        if (currentLine < lines.length) {
            const timeout = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 2000); // 2 seconds per line
            return () => clearTimeout(timeout);
        } else {
            // Wait a bit after the last line before completing
            const timeout = setTimeout(() => {
                onComplete();
            }, 2500);
            return () => clearTimeout(timeout);
        }
    }, [currentLine]);

    return (
        <div className="absolute inset-0 bg-black z-50 flex flex-col items-start justify-end p-8 md:p-16 font-mono">
            <div className="space-y-4 w-full max-w-3xl">
                {lines.slice(0, currentLine + 1).map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-green-500 text-xl md:text-2xl tracking-wider"
                        style={{
                            textShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
                            fontFamily: '"VT323", monospace' // Ensure pixel font is used if available
                        }}
                    >
                        <span className="mr-4">{`> `}</span>
                        {line}
                        {index === currentLine && index < lines.length && (
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-3 h-5 bg-green-500 ml-2 align-middle"
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Scanline effect overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] opacity-20"></div>
        </div>
    );
};

export default LoadingSequence;
