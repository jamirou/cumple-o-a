import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import voiceSound from '../../assets/vozmichi1.mp3';
import bgMusic from '../../assets/cherry_tree.mp3';
import bgImage from '../../assets/ciudadmichi1.png';
import startSound from '../../assets/pickup3.wav';

// Import all Michi assets
import michiBio from '../../assets/michibiologo.png';
import michiHabla from '../../assets/michibiologohabla.png';
import michiTimido from '../../assets/michibiologotimido.png';
import michiSaluda1 from '../../assets/michibiologosaluda.png';
import michiSaluda2 from '../../assets/michibiologosaluda2.png';
import michiFeliz1 from '../../assets/michibiologofeliz.png';
import michiFeliz2 from '../../assets/michibiologofeliz2.png';
import michiLame from '../../assets/michibiologolamesupatita.png';

const storySequence = [
    {
        text: "Psst... ¡Mew! ¿Hola?",
        frames: [michiTimido, michiSaluda1, michiSaluda2],
        frameRate: 300,
        animType: "sequence",
        idleFrame: michiBio // Return to normal
    },
    {
        text: "¡Ah, ahí estás! Tú debes ser la famosa Ñoña Suprema.",
        frames: [michiBio, michiHabla],
        frameRate: 150,
        animType: "loop",
        idleFrame: michiBio
    },
    {
        text: "Jamir me ha programado con una misión muy importante hoy...",
        frames: [michiBio, michiHabla], // Talking frames as requested
        frameRate: 150,
        animType: "loop",
        idleFrame: michiLame // End with licking paw
    },
    {
        text: "Me han chismeado meow... que hoy celebras 20 vueltas al sol.",
        frames: [michiBio, michiHabla],
        frameRate: 150,
        animType: "loop",
        idleFrame: michiBio
    },
    {
        text: "¡Eso es mucho tiempo en años gato!",
        frames: [michiFeliz1, michiFeliz2],
        frameRate: 200,
        animType: "loop",
        idleFrame: michiLame
    },
    {
        text: "Solo quería decirte que, aunque soy un montón de píxeles, fui hecho con mucho amor.",
        frames: [michiFeliz1, michiFeliz2],
        frameRate: 200,
        animType: "loop",
        idleFrame: michiBio
    },
    {
        text: "Porque dicen que tú eres la que le da sentido a todo este código.",
        frames: [michiBio, michiHabla],
        frameRate: 150,
        animType: "loop",
        idleFrame: michiBio
    },
    {
        text: "Pero bueno, no estoy aquí solo para ponerme sentimental... meow.",
        frames: [michiBio, michiHabla],
        frameRate: 150,
        animType: "loop",
        idleFrame: michiBio
    },
    {
        text: "Tengo un mundo entero que mostrarte. Un lugar que existe gracias a ti.",
        frames: [michiBio, michiHabla],
        frameRate: 150,
        animType: "loop",
        idleFrame: michiBio
    },
    {
        text: "¡Agárrate los bigotes!",
        frames: [michiFeliz1, michiFeliz2],
        frameRate: 150,
        animType: "loop",
        idleFrame: michiFeliz1 // Stay happy
    }
];

const StoryMode = ({ onComplete }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    const bgAudioRef = useRef(null);
    const voiceAudioRef = useRef(null);
    const startAudioRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const frameIntervalRef = useRef(null);

    const currentStep = storySequence[stepIndex];

    // Initialize Audio
    useEffect(() => {
        bgAudioRef.current = new Audio(bgMusic);
        bgAudioRef.current.loop = true;
        bgAudioRef.current.volume = 0.2;
        bgAudioRef.current.play().catch(e => console.error("BG Music failed:", e));

        voiceAudioRef.current = new Audio(voiceSound);
        voiceAudioRef.current.volume = 0.5;

        startAudioRef.current = new Audio(startSound);
        startAudioRef.current.volume = 1.0; // Max volume

        return () => {
            if (bgAudioRef.current) {
                bgAudioRef.current.pause();
                bgAudioRef.current.currentTime = 0;
            }
            if (voiceAudioRef.current) {
                voiceAudioRef.current.pause();
                voiceAudioRef.current.currentTime = 0;
            }
            // We intentionally do NOT pause startAudioRef here so it finishes playing

            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
        };
    }, []);

    // Frame Animation Logic
    useEffect(() => {
        if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
        setCurrentFrame(0);

        if (isTyping && currentStep.frames.length > 1) {
            if (currentStep.animType === "sequence" && stepIndex === 0) {
                let frameIdx = 0;
                frameIntervalRef.current = setInterval(() => {
                    frameIdx++;
                    if (frameIdx >= currentStep.frames.length) {
                        frameIdx = 1;
                    }
                    setCurrentFrame(frameIdx);
                }, currentStep.frameRate);
            } else {
                frameIntervalRef.current = setInterval(() => {
                    setCurrentFrame(prev => (prev + 1) % currentStep.frames.length);
                }, currentStep.frameRate);
            }
        } else if (!isTyping) {
            // Stop animation when not typing
            setCurrentFrame(0);
        }
    }, [stepIndex, currentStep, isTyping]);

    // Typewriter Effect
    useEffect(() => {
        const fullText = currentStep.text;
        setDisplayedText("");
        setIsTyping(true);
        let charIndex = 0;

        const typeChar = () => {
            if (charIndex < fullText.length) {
                setDisplayedText(fullText.slice(0, charIndex + 1));
                charIndex++;

                if (voiceAudioRef.current && voiceAudioRef.current.paused) {
                    voiceAudioRef.current.play().catch(() => { });
                }

                const delay = 50 + Math.random() * 30;
                typingTimeoutRef.current = setTimeout(typeChar, delay);
            } else {
                setIsTyping(false);
                if (voiceAudioRef.current) {
                    voiceAudioRef.current.pause();
                    voiceAudioRef.current.currentTime = 0;
                }
            }
        };

        typeChar();

        return () => {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            if (voiceAudioRef.current) {
                voiceAudioRef.current.pause();
                voiceAudioRef.current.currentTime = 0;
            }
        };
    }, [stepIndex]);

    const handleNext = () => {
        if (isTyping) {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            setDisplayedText(currentStep.text);
            setIsTyping(false);
            if (voiceAudioRef.current) {
                voiceAudioRef.current.pause();
                voiceAudioRef.current.currentTime = 0;
            }
        } else {
            if (stepIndex < storySequence.length - 1) {
                setStepIndex(prev => prev + 1);
            } else {
                onComplete();
            }
        }
    };

    const handleStartGame = (e) => {
        e.stopPropagation();

        // Try playing from ref first
        if (startAudioRef.current) {
            startAudioRef.current.currentTime = 0;
            const playPromise = startAudioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Ref playback failed, trying new Audio:", error);
                    // Fallback: Create new audio instance
                    const audio = new Audio(startSound);
                    audio.volume = 1.0;
                    audio.play().catch(e => console.error("Fallback playback failed:", e));
                });
            }
        } else {
            // Fallback if ref is null
            const audio = new Audio(startSound);
            audio.volume = 1.0;
            audio.play().catch(e => console.error("Direct playback failed:", e));
        }

        // Delay to let the sound start and animation play
        setTimeout(() => {
            onComplete();
        }, 800); // Increased delay slightly to ensure sound is heard
    };

    // Determine image to show
    const getDisplayImage = () => {
        if (isTyping) {
            return currentStep.frames[currentFrame] || currentStep.frames[0];
        } else {
            return currentStep.idleFrame || michiBio;
        }
    };

    return (
        <div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center font-mono cursor-pointer bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
            onClick={handleNext}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-pink-900/40 backdrop-blur-[2px]" />

            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
                {/* Character Image */}
                <motion.div
                    key={stepIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: currentStep.effect === 'bounce' ? [0, -20, 0] : 0
                    }}
                    transition={{
                        duration: 0.3,
                        y: {
                            repeat: currentStep.effect === 'bounce' ? Infinity : 0,
                            duration: 0.5
                        }
                    }}
                    className="mb-6 relative"
                >
                    <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-pink-300 bg-pink-200/20 p-2 shadow-[0_0_30px_rgba(236,72,153,0.4)] rounded-2xl backdrop-blur-sm transform rotate-1">
                        <img
                            src={getDisplayImage()}
                            alt="Michi Biólogo"
                            className="w-full h-full object-cover pixelated rounded-xl"
                            style={{ imageRendering: 'pixelated' }}
                        />
                    </div>
                </motion.div>

                {/* Dialogue Box */}
                <div className="w-full px-4 md:px-8">
                    <div className="bg-white/90 border-4 border-pink-400 p-6 md:p-8 min-h-[160px] relative shadow-2xl rounded-3xl mx-auto max-w-2xl">
                        {/* Name Tag */}
                        <div className="absolute -top-5 left-8 bg-pink-500 text-white px-6 py-2 border-2 border-white font-bold tracking-wider text-sm md:text-base shadow-lg rounded-full transform -rotate-2">
                            MICHI BIÓLOGO 🧬
                        </div>

                        {/* Text */}
                        <p className="text-pink-900 text-xl md:text-2xl leading-relaxed font-bold tracking-wide drop-shadow-sm font-pixel" style={{ fontFamily: '"VT323", monospace' }}>
                            {displayedText}
                        </p>

                        {/* Controls */}
                        {!isTyping && (
                            <div className="absolute bottom-4 right-4">
                                {stepIndex === storySequence.length - 1 ? (
                                    <button
                                        onClick={handleStartGame}
                                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all animate-bounce flex items-center gap-2"
                                    >
                                        <PawPrint size={20} />
                                        Iniciar la meowhistoria
                                    </button>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-pink-500"
                                    >
                                        <motion.div
                                            animate={{
                                                y: [0, -5, 0],
                                                rotate: [0, 10, 0]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1.5
                                            }}
                                        >
                                            <PawPrint size={32} fill="currentColor" />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryMode;
