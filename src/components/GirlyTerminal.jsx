import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

const GirlyTerminal = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("Iniciando...");

    const messages = [
        "🌸 Cargando datos bonitos...",
        "🧬 Leyendo secuencia de ADN...",
        "✨ Añadiendo brillitos...",
        "🎀 Configurando estilo ñoña...",
        "🧪 Mezclando reactivos...",
        "💖 Despertando a los michis...",
        "🧠 Optimizando neuronas...",
        "😻 Todo listo..."
    ];

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 5;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(onComplete, 800);
            }
            setProgress(currentProgress);

            // Update message based on progress
            const messageIndex = Math.floor((currentProgress / 100) * (messages.length - 1));
            setMessage(messages[messageIndex]);

        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-pink-50 flex flex-col items-center justify-center font-pixel z-50">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 text-pink-200 animate-bounce delay-700">
                    <Heart size={40} fill="currentColor" />
                </div>
                <div className="absolute bottom-20 right-20 text-purple-200 animate-pulse">
                    <Sparkles size={60} />
                </div>
                <div className="absolute top-1/3 right-10 text-yellow-200 animate-spin-slow">
                    <Sparkles size={30} />
                </div>
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center z-10 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border-4 border-pink-200 shadow-xl max-w-md w-full mx-4"
            >
                <h1 className="text-4xl md:text-5xl text-pink-500 mb-8 tracking-wider drop-shadow-sm">
                    Inicio Ñoña
                </h1>

                {/* Terminal Window */}
                <div className="bg-slate-900 rounded-lg p-6 mb-8 text-left shadow-inner border-2 border-pink-300 min-h-[150px] flex flex-col justify-end">
                    <p className="text-pink-300 text-xl md:text-2xl mb-2">
                        <span className="text-green-400 mr-2">➜</span>
                        <span className="animate-pulse">_</span>
                    </p>
                    <p className="text-white text-xl md:text-2xl font-pixel tracking-wide">
                        {message}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-6 bg-pink-100 rounded-full overflow-hidden border-2 border-pink-300">
                    <motion.div
                        className="h-full bg-gradient-to-r from-pink-400 to-purple-400 striped-bar"
                        style={{ width: `${progress}%` }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-pink-400 mt-2 text-lg font-bold">{Math.round(progress)}%</p>

            </motion.div>

            <style jsx>{`
                .striped-bar {
                    background-image: linear-gradient(
                        45deg,
                        rgba(255, 255, 255, 0.15) 25%,
                        transparent 25%,
                        transparent 50%,
                        rgba(255, 255, 255, 0.15) 50%,
                        rgba(255, 255, 255, 0.15) 75%,
                        transparent 75%,
                        transparent
                    );
                    background-size: 1rem 1rem;
                }
            `}</style>
        </div>
    );
};

export default GirlyTerminal;
