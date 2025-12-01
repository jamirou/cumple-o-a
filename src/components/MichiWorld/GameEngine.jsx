import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STAGES, HEROES } from '../../data/michiData';
import Stage1_Baking from './Stages/Stage1_Baking';
import Stage2_Science from './Stages/Stage2_Science';
import Stage3_Boss from './Stages/Stage3_Boss';
import VictoryScreen from './VictoryScreen';

import CinematicIntro from './CinematicIntro';

import StoryMode from './StoryMode';
import LoadingSequence from './LoadingSequence';



// Import Backgrounds
import bgBaking from '../../assets/valleglaseado.png';
import bgScience from '../../assets/laboratoriodelcaos.png';
import bgBoss from '../../assets/fortalezafinal.png';
import menuBgMobile from '../../assets/Michiloading.png';
import menuBgDesktop from '../../assets/MichiloadingHorizontal.png';
import menuMusic from '../../assets/cherry_tree.mp3';
import startSound from '../../assets/pickup3.wav';

const GameEngine = ({ onClose }) => {
    const [showLoading, setShowLoading] = useState(true);
    const [currentStageId, setCurrentStageId] = useState(0); // 0: Intro, 0.5: Story, 1: Baking, 2: Science, 3: Boss, 4: Victory
    const [gameState, setGameState] = useState({
        hp: 100,
        maxHp: 100,
        medals: [],
        inventory: []
    });
    const audioRef = useRef(null);
    const startAudioRef = useRef(null);

    useEffect(() => {
        // Play menu music only in Intro (0)
        if (!showLoading && currentStageId === 0) {
            try {
                audioRef.current = new Audio(menuMusic);
                audioRef.current.loop = true;
                audioRef.current.volume = 0.4;
                audioRef.current.play().catch(e => console.error("Music play failed:", e));
            } catch (e) {
                console.error("Failed to initialize menu music:", e);
            }

            try {
                // Pre-load start sound
                startAudioRef.current = new Audio(startSound);
                startAudioRef.current.volume = 1.0;
            } catch (e) {
                console.error("Failed to initialize start sound:", e);
            }
        } else {
            // Stop menu music in other stages (StoryMode handles its own music)
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            // Do not pause startAudioRef here
        };
    }, [showLoading, currentStageId]);

    const backgrounds = {
        1: bgBaking,
        2: bgScience,
        3: bgBoss
    };

    const handleStageComplete = (medalsEarned) => {
        setGameState(prev => ({
            ...prev,
            medals: [...prev.medals, ...medalsEarned]
        }));
        setCurrentStageId(prev => prev + 1);
    };

    const handleGameOver = () => {
        // Reset or show game over screen
        alert("¡Oh no! Los michis necesitan descansar. Inténtalo de nuevo.");
        setCurrentStageId(1); // Restart from stage 1 for now
    };

    const handleStartGame = () => {
        if (startAudioRef.current) {
            startAudioRef.current.currentTime = 0;
            startAudioRef.current.play().catch(e => console.error("Sound play failed:", e));
        } else {
            const audio = new Audio(startSound);
            audio.volume = 1.0;
            audio.play().catch(e => console.error("Direct playback failed:", e));
        }

        setTimeout(() => {
            setCurrentStageId(0.5);
        }, 500);
    };

    return (
        <div className="relative w-full h-full">
            {/* Background Layer */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{
                    backgroundImage: `url(${currentStageId === 0
                        ? (window.innerWidth > 768 ? menuBgDesktop : menuBgMobile)
                        : (backgrounds[currentStageId] || backgrounds[1])
                        })`,
                    filter: currentStageId === 0 ? 'none' : 'brightness(0.6)'
                }}
            />

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full flex flex-col">
                <AnimatePresence mode="wait">
                    {showLoading && (
                        <motion.div
                            key="loading-sequence"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50"
                        >
                            <LoadingSequence onComplete={() => setShowLoading(false)} />
                        </motion.div>
                    )}

                    {!showLoading && currentStageId === 0 && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-full text-center p-4"
                        >
                            <div className="bg-black/60 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl max-w-sm w-full">
                                <h1 className="text-3xl md:text-4xl text-pink-200 font-bold mb-1 drop-shadow-md font-handwriting">Michi World</h1>
                                <p className="text-base text-white/80 mb-6 italic">
                                    "Una aventura suavecita"
                                </p>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleStartGame}
                                        className="w-full py-2 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl font-bold text-base shadow-lg transform transition-all hover:scale-105 active:scale-95"
                                    >
                                        Iniciar la meowaventura
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold text-base border border-white/30 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                                    >
                                        Volver a BioWorld
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Story Mode */}
                    {!showLoading && currentStageId === 0.5 && (
                        <motion.div
                            key="story"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-40"
                        >
                            <StoryMode onComplete={() => setCurrentStageId(0.8)} />
                        </motion.div>
                    )}

                    {/* Cinematic Intro */}
                    {!showLoading && currentStageId === 0.8 && (
                        <motion.div
                            key="cinematic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-40"
                        >
                            <CinematicIntro onComplete={() => setCurrentStageId(1)} />
                        </motion.div>
                    )}

                    {currentStageId === 1 && (
                        <Stage1_Baking
                            key="stage1"
                            onComplete={() => handleStageComplete(['medallamichis'])}
                            onGameOver={handleGameOver}
                        />
                    )}

                    {currentStageId === 2 && (
                        <Stage2_Science
                            key="stage2"
                            onComplete={() => handleStageComplete(['medallabiotecnologa'])}
                            onGameOver={handleGameOver}
                        />
                    )}

                    {currentStageId === 3 && (
                        <Stage3_Boss
                            key="stage3"
                            onComplete={() => handleStageComplete(['medallacumpleaños20'])}
                            onGameOver={handleGameOver}
                        />
                    )}

                    {currentStageId === 4 && (
                        <VictoryScreen
                            key="victory"
                            onClose={onClose}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GameEngine;
