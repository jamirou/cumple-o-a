import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { terminalStrings } from '../data/terminalData';
import RainEffect from './Terminal/RainEffect';
import Scanlines from './Terminal/Scanlines';
import QuantumQuiz from './Terminal/QuantumQuiz';

const Terminal = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [text, setText] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [pinkMode, setPinkMode] = useState(false);
    const [userPrefersPink, setUserPrefersPink] = useState(false);
    const [hasVisited, setHasVisited] = useState(false);
    const [rainDrops, setRainDrops] = useState([]);
    const inputRef = useRef(null);
    const timerRefs = useRef([]);

    const clearAllTimers = () => {
        timerRefs.current.forEach(timer => {
            if (timer.type === 'timeout') clearTimeout(timer.id);
            if (timer.type === 'interval') clearInterval(timer.id);
        });
        timerRefs.current = [];
    };

    const safeSetTimeout = (callback, delay) => {
        const id = setTimeout(() => {
            timerRefs.current = timerRefs.current.filter(t => t.id !== id);
            callback();
        }, delay);
        timerRefs.current.push({ id, type: 'timeout' });
        return id;
    };

    const safeSetInterval = (callback, delay) => {
        const id = setInterval(callback, delay);
        timerRefs.current.push({ id, type: 'interval' });
        return id;
    };

    useEffect(() => {
        const visited = localStorage.getItem('hasVisitedBioWorld');
        if (visited) {
            setHasVisited(true);
        }

        const colorPref = localStorage.getItem('terminalColor');
        if (colorPref === 'pink') {
            setUserPrefersPink(true);
        }
    }, []);

    // Typewriter effect helper
    const typeWriter = (fullText, speed = 40, callback) => {
        setText('');
        let i = 0;
        const interval = safeSetInterval(() => {
            setText((prev) => prev + fullText.charAt(i));
            i++;
            if (i >= fullText.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, speed);
        return interval;
    };

    useEffect(() => {
        clearAllTimers(); // Clear previous step's timers
        let interval;
        if (step === 0) {
            interval = typeWriter(terminalStrings.intro);
        } else if (step === 1) {
            // Prank Step
            setText('');
            let i = 0;
            const lines = terminalStrings.prankLines;

            const runPrank = () => {
                let currentLine = 0;
                const interval1 = safeSetInterval(() => {
                    if (currentLine < lines.length) {
                        setText((prev) => prev + (currentLine > 0 ? '\n' : '') + lines[currentLine]);
                        currentLine++;
                    } else {
                        clearInterval(interval1);
                        safeSetTimeout(() => {
                            setStep(2);
                        }, 2000);
                    }
                }, 800);
                return interval1;
            };
            interval = runPrank();
        } else if (step === 2) {
            interval = typeWriter(terminalStrings.prankReveal);
        } else if (step === 3) {
            interval = typeWriter(terminalStrings.riddle);
        } else if (step === 4) {
            setText('');
            let i = 0;
            const part1 = terminalStrings.messagePart1;
            const part2 = terminalStrings.messagePart2;
            const part3 = terminalStrings.messagePart3;

            const runStep4 = () => {
                const interval1 = safeSetInterval(() => {
                    setText((prev) => prev + part1.charAt(i));
                    i++;
                    if (i >= part1.length) {
                        clearInterval(interval1);
                        safeSetTimeout(() => {
                            let j = 0;
                            const interval2 = safeSetInterval(() => {
                                setText((prev) => prev + part2.charAt(j));
                                j++;
                                if (j >= part2.length) {
                                    clearInterval(interval2);
                                    safeSetTimeout(() => {
                                        let k = 0;
                                        const interval3 = safeSetInterval(() => {
                                            setText((prev) => prev + part3.charAt(k));
                                            k++;
                                            if (k >= part3.length) {
                                                clearInterval(interval3);
                                            }
                                        }, 60);
                                    }, 1000);
                                }
                            }, 50);
                        }, 800);
                    }
                }, 40);
                return interval1;
            };
            interval = runStep4();
        } else if (step === 5) {
            setPinkMode(true);
            interval = typeWriter(terminalStrings.humorIntro);
        } else if (step === 6) {
            interval = typeWriter(terminalStrings.humorReason);
        } else if (step === 7) {
            setText('');
            let i = 0;
            const part1 = terminalStrings.jokePart1;
            const part2 = terminalStrings.jokePart2;

            const runPart1 = () => {
                const interval1 = safeSetInterval(() => {
                    setText((prev) => prev + part1.charAt(i));
                    i++;
                    if (i >= part1.length) {
                        clearInterval(interval1);
                        safeSetTimeout(() => {
                            let j = 0;
                            const interval2 = safeSetInterval(() => {
                                setText((prev) => prev + part2.charAt(j));
                                j++;
                                if (j >= part2.length) {
                                    clearInterval(interval2);
                                }
                            }, 40);
                        }, 1500); // 1.5 second delay for punchline
                    }
                }, 40);
                return interval1;
            };
            interval = runPart1();
        } else if (step === 8) {
            interval = typeWriter(terminalStrings.quizIntro);
        } else if (step === 99) {
            // Password step
            interval = typeWriter(terminalStrings.passwordPrompt);
        }
        return () => clearAllTimers();
    }, [step]);

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handleSkip = () => {
        const reqPass = localStorage.getItem('reqPass');
        const isPasswordRequired = reqPass === null ? true : reqPass === 'true';

        if (isPasswordRequired) {
            setStep(99);
            setInputValue('');
            setError('');
        } else {
            handleFinalComplete();
        }
    };

    const handleFinalComplete = () => {
        localStorage.setItem('hasVisitedBioWorld', 'true');
        onComplete();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const answer = inputValue.trim().toLowerCase();

        if (step === 99) {
            // Password check
            const savedPassword = localStorage.getItem('savedPassword') || 'flo';

            if (answer === savedPassword) {
                setError('');
                typeWriter(terminalStrings.successMsg);
                safeSetTimeout(() => {
                    handleFinalComplete();
                }, 3500);
            } else {
                const errors = terminalStrings.passwordErrors;
                const randomError = errors[Math.floor(Math.random() * errors.length)];
                setError(randomError);
                setInputValue('');
            }
            return;
        }

        // Step 3 Quiz check (formerly Step 1)
        const validAnswers = ['flo', 'la flo', 'la floo', 'floo', 'la gata floo'];

        if (validAnswers.includes(answer)) {
            setError('');
            setText("Acceso Concedido: Identificada como \"La Gata Floo\".");
            safeSetTimeout(() => {
                setStep(4); // Jump to message (formerly Step 2)
            }, 2500);
        } else {
            setError("Error: Sujeto no reconocido... Pista: Hace miau, abre la ventana y sale después de comer.");
            setInputValue('');
        }
    };

    const [shake, setShake] = useState(false);

    const handleQuantumAnswer = (isCorrect) => {
        if (isCorrect) {
            setPinkMode(false); // Back to green
            setError('');
            setText(terminalStrings.quantumSuccess);
            safeSetTimeout(() => {
                handleFinalComplete();
            }, 4000);
        } else {
            setShake(true);
            safeSetTimeout(() => setShake(false), 500);

            const errors = terminalStrings.quizErrors;
            const randomError = errors[Math.floor(Math.random() * errors.length)];
            setError(randomError);
        }
    };

    // Determine final color mode: User preference OR Joke mode
    const isPink = userPrefersPink || pinkMode;

    const textColorClass = isPink ? 'text-pink-400' : 'text-green-500';
    const borderColorClass = isPink ? 'border-pink-400' : 'border-green-500';
    const hoverBgClass = isPink ? 'hover:bg-pink-400/20' : 'hover:bg-green-500/20';

    return (
        <motion.div
            className={`w-full h-full bg-black ${textColorClass} font-mono p-4 md:p-8 flex flex-col items-center justify-center overflow-y-auto relative transition-colors duration-1000`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
        >
            <div className="z-10 max-w-2xl w-full flex flex-col items-center text-center">
                <div className="mb-8 text-base md:text-2xl min-h-[80px] w-full whitespace-pre-wrap">
                    <span className="leading-relaxed">{text}</span>
                    <span className="animate-pulse inline-block ml-1">_</span>
                </div>

                {/* Step 0: Intro */}
                {step === 0 && text.length > 10 && (
                    <div className="flex flex-col gap-4">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 border ${borderColorClass} px-6 py-3 ${hoverBgClass} transition-colors animate-pulse text-sm md:text-base`}
                            onClick={handleNext}
                        >
                            [PRESS TO CONTINUE]
                        </motion.button>

                        {hasVisited && (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className={`text-xs md:text-sm opacity-70 hover:opacity-100 underline decoration-dotted underline-offset-4`}
                                onClick={handleSkip}
                            >
                                [Saltar todo]
                            </motion.button>
                        )}
                    </div>
                )}

                {/* Step 3: Quiz or Step 99: Password */}
                {(step === 3 || step === 99) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 w-full max-w-md"
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className={`flex items-center gap-2 border-b ${borderColorClass} pb-2`}>
                                <span className="text-xl">{'>'}</span>
                                <input
                                    ref={inputRef}
                                    type={step === 99 ? "password" : "text"}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className={`bg-transparent focus:outline-none ${textColorClass} w-full font-mono text-lg md:text-xl`}
                                    autoFocus
                                    placeholder="Respuesta..."
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm animate-bounce">{error}</p>}
                        </form>
                    </motion.div>
                )}


                {/* Intermediate Steps Button (2, 4, 5, 6, 7) */}
                {[2, 4, 5, 6, 7].includes(step) && text.length > 5 && (
                    <div className="flex flex-col items-center gap-4 mt-4">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`border ${borderColorClass} px-6 py-3 ${hoverBgClass} transition-colors animate-pulse text-sm md:text-base`}
                            onClick={handleNext}
                        >
                            [PRESS TO CONTINUE]
                        </motion.button>

                        {/* Joke Rating UI - Only for Step 7 */}
                        {step === 7 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="w-full max-w-xs flex flex-col items-center gap-2 p-4 border border-dashed border-white/20 rounded-lg bg-black/50 backdrop-blur-sm"
                            >
                                <p className="text-xs md:text-sm opacity-90 font-bold text-center">
                                    Califica el chiste siendo 100% honesta pls laksjalksdja
                                </p>
                                <div className="flex items-center gap-4 w-full">
                                    <span className="text-xs">1</span>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        step="1"
                                        defaultValue="5"
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            const emojis = val <= 5 ? ["👎", "😴", "😐"] : ["🤣", "🧐", "😅", "😆"];

                                            // Spawn drops
                                            const newDrops = Array.from({ length: 5 }).map(() => ({
                                                id: Math.random(),
                                                x: Math.random() * 100,
                                                y: -10 - Math.random() * 20,
                                                speed: 0.5 + Math.random() * 1.5,
                                                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                                                size: 12 + Math.random() * 12
                                            }));

                                            setRainDrops(prev => [...prev, ...newDrops].slice(-50));
                                        }}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                    />
                                    <span className="text-xs">10</span>
                                </div>
                                <div className="flex justify-between w-full text-[10px] opacity-60">
                                    <span>(Fome)</span>
                                    <span>(Jajaja)</span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Step 8: Quantum Quiz */}
                {
                    step === 8 && text.length > 10 && (
                        <QuantumQuiz
                            shake={shake}
                            handleQuantumAnswer={handleQuantumAnswer}
                            error={error}
                            borderColorClass={borderColorClass}
                            hoverBgClass={hoverBgClass}
                        />
                    )
                }
            </div >

            <RainEffect rainDrops={rainDrops} setRainDrops={setRainDrops} />
            <Scanlines />
        </motion.div >
    );
};

export default Terminal;
