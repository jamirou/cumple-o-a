import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Sparkles, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { systemInstruction, quickQuestions } from '../data/chatBotData';

// Avatar Assets
import jamirIdle from '../assets/jamir1.png';
import jamirTalk from '../assets/jamir2.png';
import jamirTalk3 from '../assets/jamir3.png';
import jamirTalk4 from '../assets/jamir4.png';
import jamirTalk5 from '../assets/jamir5.png';
import jamirTalk6 from '../assets/jamir6.png';
import jamirTalk7 from '../assets/jamir7.png';
import jamirOpinion from '../assets/jamiropina.png';
import jamirThink from '../assets/jamirpiensa.png';
import jamirThink2 from '../assets/jamirpiensa2.png';
import jamirAngry from '../assets/jamirenojado.png';
import jamirShow from '../assets/jamirmostrando.png';
import jamirLirios from '../assets/jamirlirios1.png';
import jamirTulipanes from '../assets/jamirtulipanes.png';
import jamirInkaCola from '../assets/jamirinkacola.png';
import jamirDulceAcido from '../assets/jamirdulceacido.png';
import jamirTriste from '../assets/jamirtriste.png';
import jamirProgramando from '../assets/jamirprogramando.png';
import jamirPrograma2 from '../assets/jamirprograma2.png';
import jamirSaludando from '../assets/jamirsaludando.png';
import jamirSaludando2 from '../assets/jamirsaludando2.png';
import jamirDurmiendo from '../assets/jamirdurmiendo.png';
import jamirEjercicio from '../assets/jamirejercicio1.png';
import jamirSentadilla from '../assets/jamirsentadilla.png';
import jamirPesoMuerto from '../assets/jamirpesomuerto.png';
import jamirBailando1 from '../assets/jamirbailando1.png';
import jamirBailando2 from '../assets/jamirbailando2.png';
import jamirBailando3 from '../assets/jamirbailando3.png';
import jamirDolor from '../assets/jamirdolor.png';
import jamirGalletas from '../assets/jamirgalletas.png';
import jamirPeonias from '../assets/jamirpeonias.png';
import jamirGato from '../assets/jamirgato.png';
import jamirYFlo from '../assets/jamiryflo.png';

const ChatBot = () => {
    const MAX_HISTORY = 30;

    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('jamir_chat_history');
        if (saved) {
            return JSON.parse(saved);
        }
        return [{
            role: 'model',
            text: "¡Hola Ñoña! 👋🏻 Soy Jamir AI 🤖. Estoy aquí para ti. ¿Cómo estás hoy?"
        }];
    });

    useEffect(() => {
        // Save only the last MAX_HISTORY messages to preserve token usage/storage
        const historyToSave = messages.slice(-MAX_HISTORY);
        localStorage.setItem('jamir_chat_history', JSON.stringify(historyToSave));
    }, [messages]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [avatarState, setAvatarState] = useState('showing');
    // idle, talking, thinking, opinion, angry, showing, lirios, tulipanes, inkacola, dulceacido, triste, programando, saludando, sleeping, exercising, dancing, flo
    const [currentFrame, setCurrentFrame] = useState(jamirIdle);

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Jamir Animation Loop
    useEffect(() => {
        let interval;

        if (avatarState === 'talking') {
            const talkFrames = [jamirIdle, jamirTalk, jamirTalk3, jamirTalk4, jamirTalk5, jamirTalk6, jamirTalk7];
            let frameIndex = 0;
            interval = setInterval(() => {
                frameIndex = (frameIndex + 1) % talkFrames.length;
                setCurrentFrame(talkFrames[frameIndex]);
            }, 100);
        } else if (avatarState === 'thinking') {
            interval = setInterval(() => {
                setCurrentFrame(prev => prev === jamirThink ? jamirThink2 : jamirThink);
            }, 800);
        } else if (avatarState === 'saludando') {
            interval = setInterval(() => {
                setCurrentFrame(prev => prev === jamirSaludando ? jamirSaludando2 : jamirSaludando);
            }, 400);
        } else if (avatarState === 'dancing') {
            const danceFrames = [jamirBailando1, jamirBailando2, jamirBailando3];
            let frameIndex = 0;
            interval = setInterval(() => {
                frameIndex = (frameIndex + 1) % danceFrames.length;
                setCurrentFrame(danceFrames[frameIndex]);
            }, 200);
        } else if (avatarState === 'crush') {
            // Sequence: Peonias -> Think -> Think2 -> Talk Loop
            // We'll use a custom sequence logic here
            const crushFrames = [
                jamirPeonias, jamirPeonias, // Hold blush
                jamirThink, jamirThink2, // Think
                jamirTalk, jamirTalk3, jamirTalk4, jamirTalk5, jamirTalk6, jamirTalk7 // Talk
            ];
            let frameIndex = 0;
            interval = setInterval(() => {
                setCurrentFrame(crushFrames[frameIndex]);
                // If we reach the end of the talk sequence, loop the talk part only
                if (frameIndex >= crushFrames.length - 1) {
                    frameIndex = 4; // Loop back to start of talk sequence
                } else {
                    frameIndex++;
                }
            }, 150);
        } else {
            // Static states
            const frameMap = {
                'idle': jamirIdle,
                'opinion': jamirOpinion,
                'angry': jamirAngry,
                'showing': jamirShow,
                'lirios': jamirLirios,
                'tulipanes': jamirTulipanes,
                'inkacola': jamirInkaCola,
                'dulceacido': jamirDulceAcido,
                'triste': jamirTriste,
                'programando': jamirProgramando,
                'programa2': jamirPrograma2,
                'saludando': jamirSaludando,
                'sleeping': jamirDurmiendo,
                'dolor': jamirDolor,
                'galletas': jamirGalletas,
                'peonias': jamirPeonias,
                'gato': jamirGato,
                'flo': jamirYFlo,
                'ejercicio1': jamirEjercicio,
                'sentadilla': jamirSentadilla,
                'pesoMuerto': jamirPesoMuerto
            };
            setCurrentFrame(frameMap[avatarState] || jamirIdle);
        }

        return () => clearInterval(interval);
    }, [avatarState]);

    // Random Idle Behavior (Jamir)
    useEffect(() => {
        if (avatarState !== 'idle') return;

        const randomBehavior = () => {
            const behaviors = ['sleeping', 'dancing'];
            const randomAction = behaviors[Math.floor(Math.random() * behaviors.length)];

            // 30% chance to trigger a behavior every check
            if (Math.random() > 0.7) {
                setAvatarState(randomAction);
                // Return to idle after 5 seconds
                setTimeout(() => {
                    setAvatarState(prev => prev === randomAction ? 'idle' : prev);
                }, 5000);
            }
        };

        // Check for random behavior every 10 seconds
        const idleTimer = setInterval(randomBehavior, 10000);
        return () => clearInterval(idleTimer);
    }, [avatarState]);

    // Reset to idle after showing welcome or special states
    useEffect(() => {
        if (['showing', 'lirios', 'tulipanes', 'inkacola', 'dulceacido', 'triste', 'programando', 'programa2', 'saludando', 'dolor', 'galletas', 'peonias', 'gato', 'dancing', 'ejercicio1', 'sentadilla', 'pesoMuerto', 'flo', 'angry'].includes(avatarState)) {
            const timer = setTimeout(() => setAvatarState('idle'), 4000);
            return () => clearTimeout(timer);
        }
    }, [avatarState]);

    const handleFlo = () => {
        const floStates = ['flo', 'gato'];
        const randomState = floStates[Math.floor(Math.random() * floStates.length)];
        setAvatarState(randomState);
    };

    const handleRegalo = () => {
        const giftStates = ['tulipanes', 'dulceacido', 'inkacola', 'lirios', 'galletas', 'peonias'];
        const randomState = giftStates[Math.floor(Math.random() * giftStates.length)];
        setAvatarState(randomState);
    };

    const handleRandom = () => {
        // jamirpesomuerto.png, jamirprograma2.png, jamirprogramando.png, jamirsentadilla.png, jamirdurmiendo.png, jamirmostrando.png, jamirenojado.png
        const randomOptions = ['pesoMuerto', 'programa2', 'programando', 'sentadilla', 'sleeping', 'showing', 'angry'];
        const randomState = randomOptions[Math.floor(Math.random() * randomOptions.length)];
        setAvatarState(randomState);
    };

    const handleAvatarClick = () => {
        if (avatarState !== 'idle') return;

        const options = [
            'dolor', 'galletas', 'peonias', 'gato', 'tulipanes', 'dulceacido',
            'angry', 'angry', 'angry', 'angry' // Weighted 4x
        ];

        const randomState = options[Math.floor(Math.random() * options.length)];
        setAvatarState(randomState);
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const typeWriterResponse = async (text, overrideState = null) => {
        setIsTyping(true);

        if (overrideState) {
            setAvatarState(overrideState);
        } else {
            setAvatarState('talking');
        }

        // Keyword detection for special avatar states (only if not overridden)
        if (!overrideState) {
            const lowerText = text.toLowerCase();
            if (lowerText.includes('lirio')) setAvatarState('lirios');
            else if (lowerText.includes('tulipan')) setAvatarState('tulipanes');
            else if (lowerText.includes('inca kola') || lowerText.includes('inca kola')) setAvatarState('inkacola');
            else if (lowerText.includes('dulce') || lowerText.includes('ácido') || lowerText.includes('gusanito')) setAvatarState('dulceacido');
            else if (lowerText.includes('triste') || lowerText.includes('pucha')) setAvatarState('triste');
            else if (lowerText.includes('código') || lowerText.includes('programar') || lowerText.includes('python')) setAvatarState('programando');
            else if (lowerText.includes('hola') || lowerText.includes('saludos')) setAvatarState('saludando');
        }

        let currentText = '';
        const newMessage = { role: 'model', text: '', isTyping: true };

        setMessages(prev => [...prev, newMessage]);

        for (let i = 0; i < text.length; i++) {
            currentText += text[i];
            setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1] = { ...newMessage, text: currentText, isTyping: false };
                return newMsgs;
            });
            // Random delay for realistic typing
            await new Promise(r => setTimeout(r, 20 + Math.random() * 30));
        }

        setIsTyping(false);
        // Only reset to idle if not in a special state
        if (!['lirios', 'tulipanes', 'inkacola', 'dulceacido', 'triste', 'programando', 'programa2', 'saludando', 'crush'].includes(avatarState)) {
            setAvatarState('idle');
        }
    };

    const handleSend = async (e, manualMessage = null) => {
        if (e) e.preventDefault();
        const textToSend = manualMessage || input;

        if (!textToSend.trim() || isLoading || isTyping) return;

        const userMessage = textToSend.trim();

        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);
        setAvatarState('thinking');

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (!apiKey) {
                throw new Error("Falta la API Key");
            }

            const ai = new GoogleGenAI({ apiKey });

            // Filter out the initial welcome message and error messages
            const history = messages.filter((m, i) => !m.isError && i > 0).map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const chat = ai.chats.create({
                model: "gemini-2.0-flash",
                config: {
                    systemInstruction: {
                        parts: [{
                            text: systemInstruction
                        }]
                    }
                },
                history: history
            });

            const result = await chat.sendMessage({
                message: userMessage
            });

            const text = result.text;

            setIsLoading(false);

            // Check for specific question to trigger crush animation
            const lowerUserMessage = userMessage.toLowerCase();
            if (lowerUserMessage.includes('quién le gusta') || lowerUserMessage.includes('quien le gusta')) {
                await typeWriterResponse(text, 'crush');
            } else {
                await typeWriterResponse(text);
            }

        } catch (err) {
            console.error("Error AI Full Details:", err);
            console.log("API Key used (last 4 chars):", import.meta.env.VITE_GEMINI_API_KEY?.slice(-4));

            setIsLoading(false);
            setAvatarState('angry');

            let errorMessage = "Lo siento, mis circuitos están un poco mareados. Intenta de nuevo.";

            if (err.message.includes("API Key")) {
                errorMessage = "¡Ups! tengo problemas en mi cerebro 😅";
            } else if (err.message.includes("404")) {
                errorMessage = "No encuentro mi cerebro (Modelo no encontrado).";
            } else if (err.message.includes("403")) {
                errorMessage = "Mi llave de acceso no funciona (Error 403).";
            }

            setMessages(prev => [...prev, { role: 'model', text: errorMessage, isError: true }]);

            setTimeout(() => setAvatarState('idle'), 3000);
        }
    };

    const clearChat = () => {
        setMessages([{
            role: 'model',
            text: "¡Hola Ñoña! 👋🏻 Soy Jamir AI 🤖. Estoy aquí para ti. ¿Cómo estás hoy?"
        }]);
        setAvatarState('idle');
    };

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-end md:items-stretch h-[750px]">
            {/* Avatar Section (Combined) */}
            <motion.div
                className="w-full md:w-1/3 h-[300px] md:h-auto relative flex items-center justify-center gap-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
            >
                {/* Jamir */}
                <div className="relative w-48 h-48 md:w-full md:h-full max-w-[280px] flex items-end justify-center">
                    <img
                        src={currentFrame}
                        alt="Jamir AI Avatar"
                        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] rendering-pixelated transition-transform"
                        style={{ imageRendering: 'pixelated' }}
                    />
                    {/* Status Indicator */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${avatarState === 'angry' ? 'bg-red-500 animate-ping' :
                            avatarState === 'thinking' ? 'bg-yellow-400 animate-pulse' :
                                avatarState === 'talking' ? 'bg-green-400 animate-bounce' :
                                    'bg-blue-400'
                            } `} />
                        <span className="text-xs text-white font-mono uppercase">{avatarState}</span>
                    </div>
                </div>

                {/* Right Buttons: Flo, Regalo, Random */}
                <div className="flex flex-col gap-2 z-20">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleFlo}
                        className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 transition-colors text-[10px] font-bold text-white/90 uppercase tracking-wider"
                    >
                        Flo
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRegalo}
                        className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 transition-colors text-[10px] font-bold text-white/90 uppercase tracking-wider"
                    >
                        Regalo
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRandom}
                        className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 transition-colors text-[10px] font-bold text-white/90 uppercase tracking-wider"
                    >
                        Random
                    </motion.button>
                </div>

            </motion.div>

            {/* Chat Interface (Center) */}
            <div className="w-full md:w-2/3 bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col h-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 flex items-center gap-3">
                    <div>
                        <h3 className="text-white font-bold text-base flex items-center gap-2">
                            Jamir AI <Sparkles size={14} className="text-yellow-300" />
                        </h3>
                        <p className="text-indigo-100 text-xs">Asistente de la Ñoña</p>
                    </div>
                    <button
                        onClick={clearChat}
                        className="ml-auto p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        title="Limpiar chat"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                {/* Chat Area */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} `}
                        >
                            <div className={`max-w-[85%] rounded-2xl p-3 ${msg.role === 'user'
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : msg.isError
                                    ? 'bg-red-500/80 text-white rounded-bl-none'
                                    : 'bg-white/90 text-gray-800 rounded-bl-none shadow-lg'
                                } `}>
                                <div className="text-sm leading-relaxed font-medium">
                                    <ReactMarkdown
                                        components={{
                                            strong: ({ node, ...props }) => <span className="font-bold text-indigo-300" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 my-1" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1 my-1" {...props} />,
                                            li: ({ node, ...props }) => <li className="marker:text-indigo-400" {...props} />,
                                            p: ({ node, ...props }) => <p className="mb-1 last:mb-0" {...props} />
                                        }}
                                    >
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white/90 text-gray-800 rounded-2xl rounded-bl-none p-3 shadow-lg flex gap-2 items-center">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Quick Questions */}
                <div className="p-2 bg-black/10 flex gap-2 overflow-x-auto scrollbar-hide">
                    {quickQuestions.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => handleSend(null, q)}
                            disabled={isLoading || isTyping}
                            className="whitespace-nowrap px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-xs text-white transition-colors"
                        >
                            {q}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-3 bg-white/5 border-t border-white/10 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Pregúntame lo que quieras"
                        className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                        disabled={isLoading || isTyping}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || isTyping || !input.trim()}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors flex items-center justify-center"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;
