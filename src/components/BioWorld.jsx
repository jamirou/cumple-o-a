import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html, Stars, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Lock, Eye, EyeOff } from 'lucide-react';
import * as THREE from 'three';
import ChatBot from './ChatBot';
import coverPC from '../assets/portadajuegopc.png';
import coverMobile from '../assets/michicel.png';
import medalBirthday from '../assets/medallacumpleaños20.png';
import medalMichis from '../assets/medallamichis.png';
import medalBio from '../assets/medallabiotecnologa.jpeg';
import medalGatuna from '../assets/medallaADNGAtuna.png';

// Imported Components
import DNAHelix from './BioWorld/DNAHelix';
import TraitLabel from './BioWorld/TraitLabel';
import SecretEnvelope from './BioWorld/SecretEnvelope';
import LetterModal from './BioWorld/LetterModal';
import PasswordModal from './BioWorld/PasswordModal';
import CameraRig from './BioWorld/CameraRig';

const BioWorld = ({ onStartGame }) => {
    const [zoomLevel, setZoomLevel] = React.useState(0); // 0: Normal, 1: Zoom, 2: Macro
    const [showSettings, setShowSettings] = React.useState(false);
    const [showLetter, setShowLetter] = React.useState(false);
    const [skipTerminal, setSkipTerminal] = React.useState(() => {
        return localStorage.getItem('skipTerminal') === 'true';
    });
    const [terminalColor, setTerminalColor] = React.useState(() => {
        return localStorage.getItem('terminalColor') || 'green';
    });
    const [passwordEnabled, setPasswordEnabled] = React.useState(() => {
        const stored = localStorage.getItem('reqPass');
        return stored === null ? true : stored === 'true';
    });
    const [showPasswordModal, setShowPasswordModal] = React.useState(false);
    const [terminalType, setTerminalType] = React.useState(() => {
        return localStorage.getItem('terminalType') || 'classic';
    });
    const [michiCompleted, setMichiCompleted] = React.useState(() => {
        return localStorage.getItem('michiWorldCompleted') === 'true';
    });

    const toggleTerminalType = () => {
        const newType = terminalType === 'classic' ? 'girly' : 'classic';
        setTerminalType(newType);
        localStorage.setItem('terminalType', newType);
    };

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleSkipTerminal = () => {
        const newValue = !skipTerminal;
        setSkipTerminal(newValue);
        localStorage.setItem('skipTerminal', newValue);
    };

    const setTerminalColorPreference = (color) => {
        setTerminalColor(color);
        localStorage.setItem('terminalColor', color);
    };

    const togglePasswordEnabled = () => {
        const newValue = !passwordEnabled;
        setPasswordEnabled(newValue);
        localStorage.setItem('reqPass', newValue);
    };

    const resetMichiMemory = () => {
        localStorage.removeItem('michiWorldCompleted');
        setMichiCompleted(false);
        alert("Memoria de Michi World reiniciada. Las medallas han desaparecido.");
    };

    return (
        <motion.div
            className="w-full min-h-screen relative bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        >
            {/* Hero Section with 3D Canvas */}
            <div className="h-[90vh] w-full relative">
                {/* UI Overlay */}
                <div className="absolute top-0 left-0 w-full p-8 z-10 flex justify-center">
                    <div
                        className="relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 px-6 py-3 rounded-full shadow-lg cursor-pointer hover:bg-white/20 transition-colors group"
                        onClick={() => setZoomLevel((prev) => (prev + 1) % 3)}
                    >
                        {/* Shine Effect */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 z-0"
                            initial={{ x: '-150%' }}
                            animate={{ x: '150%' }}
                            transition={{
                                repeat: Infinity,
                                repeatDelay: 6,
                                duration: 1.5,
                                ease: "easeInOut"
                            }}
                        />

                        <h1 className="relative z-10 text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300 text-center select-none group-hover:scale-105 transition-transform">
                            {zoomLevel === 0 && "🧬 Análisis de ADN para ñoña"}
                            {zoomLevel === 1 && "🔍 Más cerca..."}
                            {zoomLevel === 2 && "🔬 Modo Macro"}
                        </h1>
                    </div>
                </div>

                <Canvas camera={{ position: [0, 0, 18], fov: 73 }}>
                    <CameraRig zoomLevel={zoomLevel} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <spotLight position={[-10, -10, -10]} intensity={0.5} />

                    {/* Enhanced Stars */}
                    <Stars radius={100} depth={50} count={7000} factor={6} saturation={0} fade speed={1.5} />

                    {/* Shooting Stars Effect */}
                    <Sparkles count={15} scale={30} size={15} speed={4} opacity={0.8} color="#ffffff" noise={0.2} />

                    <DNAHelix position={[0, 0, 0]} zoomLevel={zoomLevel} />

                    {/* Traits - Distributed around the helix */}
                    {!showSettings && !showLetter && (
                        <group>
                            <TraitLabel position={[-3, 5, 0]} percentage="80%" text="Ñoña" emoji="🤓" color="bg-purple-500/30" />
                            <TraitLabel position={[3, 4, 2]} percentage="20%" text="Dulces Ácidos" emoji="🍬" color="bg-pink-500/30" />

                            <TraitLabel position={[-4, 2, -2]} percentage="30%" text="Detective" emoji="🕵️‍♀️" />
                            <TraitLabel position={[4, 1, 1]} percentage="10%" text="Navidad" emoji="🎄" color="bg-green-500/30" />

                            <TraitLabel position={[-3, -1, 2]} percentage="10%" text="Inca Kola" emoji="🥤" color="bg-yellow-500/30" />
                            <TraitLabel position={[3, -2, -1]} percentage="100%" text="Bonita" emoji="🥺" />

                            <TraitLabel position={[-4, -4, 0]} percentage="10%" text="Pasas al Ron" emoji="🍨" />

                            {/* Dislikes (Red/Warning colors) */}
                            <TraitLabel position={[4, -5, 2]} percentage="0%" text="Lasaña" emoji="🍝" color="bg-red-500/30" />
                            <TraitLabel position={[-2, -6, -2]} percentage="0%" text="Zapallo Italiano" emoji="🥒" color="bg-red-500/30" />

                            {/* Secret Envelope - Only accessible in Macro Mode */}
                            <SecretEnvelope
                                position={[0, 1, -5]}
                                isMacro={zoomLevel === 2}
                                onClick={() => setShowLetter(true)}
                            />
                        </group>
                    )}

                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>

                {/* Scroll Indicator - Centered */}
                <div className="absolute bottom-8 left-0 w-full flex justify-center animate-bounce pointer-events-none z-20">
                    <div className="text-white/50 flex flex-col items-center gap-2">
                        <span className="text-sm uppercase tracking-widest">Descubre más</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
                    </div>
                </div>

                {/* Settings Button - Bottom Right */}
                <div className="absolute bottom-8 right-8 z-30">
                    <button
                        onClick={() => setShowSettings(true)}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-all hover:rotate-90 duration-500 backdrop-blur-sm border border-white/10"
                        title="Configuración"
                    >
                        <Settings size={20} />
                    </button>
                </div>

                {/* Settings Modal */}
                <AnimatePresence>
                    {showSettings && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                            onClick={() => setShowSettings(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-gray-900/90 border border-white/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Settings size={20} className="text-indigo-400" />
                                        Configuración
                                    </h3>
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className="text-white/50 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium">Saltar Terminal</span>
                                            <span className="text-white/50 text-xs">Ir directo a BioWorld al iniciar</span>
                                        </div>
                                        <button
                                            onClick={toggleSkipTerminal}
                                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${skipTerminal ? 'bg-indigo-500' : 'bg-gray-600'}`}
                                        >
                                            <motion.div
                                                className="w-4 h-4 bg-white rounded-full shadow-md"
                                                animate={{ x: skipTerminal ? 24 : 0 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        </button>
                                    </div>

                                    {/* Terminal Color Setting */}
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium">Color Terminal</span>
                                            <span className="text-white/50 text-xs">Elige tu favorito</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setTerminalColorPreference('green')}
                                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${terminalColor === 'green' ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                                style={{ backgroundColor: '#22c55e' }}
                                                title="Clásico Hacker"
                                            >
                                                {terminalColor === 'green' && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </button>
                                            <button
                                                onClick={() => setTerminalColorPreference('pink')}
                                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${terminalColor === 'pink' ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                                style={{ backgroundColor: '#f472b6' }}
                                                title="Modo Ñoña"
                                            >
                                                {terminalColor === 'pink' && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Terminal Type Setting (New) */}
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium">Inicio Ñoña</span>
                                            <span className="text-white/50 text-xs">Terminal única para ti</span>
                                        </div>
                                        <button
                                            onClick={toggleTerminalType}
                                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${terminalType === 'girly' ? 'bg-pink-500' : 'bg-gray-600'}`}
                                        >
                                            <motion.div
                                                className="w-4 h-4 bg-white rounded-full shadow-md"
                                                animate={{ x: terminalType === 'girly' ? 24 : 0 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        </button>
                                    </div>

                                    {/* Security Section */}
                                    <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium flex items-center gap-2">
                                                    <Lock size={14} className="text-indigo-400" />
                                                    Seguridad
                                                </span>
                                                <span className="text-white/50 text-xs">Pedir contraseña al inicio</span>
                                            </div>
                                            <button
                                                onClick={togglePasswordEnabled}
                                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${passwordEnabled ? 'bg-indigo-500' : 'bg-gray-600'}`}
                                            >
                                                <motion.div
                                                    className="w-4 h-4 bg-white rounded-full shadow-md"
                                                    animate={{ x: passwordEnabled ? 24 : 0 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setShowPasswordModal(true)}
                                            className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white/80 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Cambiar Contraseña
                                        </button>
                                    </div>

                                    {/* Reset Michi Memory */}
                                    <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium flex items-center gap-2">
                                                    <Settings size={14} className="text-pink-400" />
                                                    Michi World
                                                </span>
                                                <span className="text-white/50 text-xs">Reiniciar progreso</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={resetMichiMemory}
                                            className="w-full py-2 px-4 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-lg text-sm text-red-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Borrar Memoria
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-white/30 text-xs">Regalo de Cumpleaños v1.0 • Hecho con ❤️ por Jamir</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Letter Modal */}
                <AnimatePresence>
                    {showLetter && <LetterModal onClose={() => setShowLetter(false)} />}
                    {showPasswordModal && <PasswordModal onClose={() => setShowPasswordModal(false)} />}
                </AnimatePresence>
            </div>

            {/* AI Chatbot Section */}
            <div className="min-h-screen w-full bg-black/20 backdrop-blur-sm relative z-20 p-4 md:p-8 flex flex-col items-center justify-center">

                {/* Medals Section (Trophy Wall) */}
                <div className="relative w-full max-w-2xl mx-auto mb-12 p-8 bg-gradient-to-b from-white/5 to-white/10 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">

                    {/* Spotlights */}
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px] pointer-events-none" />
                    <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none" />

                    {/* Title */}
                    <div className="text-center mb-8 relative z-10">
                        <h3 className="text-white/50 text-xs md:text-sm uppercase tracking-[0.3em] font-bold">
                            🏆 Salón de la Fama
                        </h3>
                    </div>

                    {/* Medals Row */}
                    <div className="flex items-end justify-center gap-8 md:gap-16 relative z-10 pb-4">
                        {/* Michi Medal (Left) */}
                        <div className="relative group flex flex-col items-center gap-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                <img
                                    src={medalMichis}
                                    alt="Medalla Michis"
                                    className={`w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 ${michiCompleted ? '' : 'filter brightness-0 opacity-30'}`}
                                />
                            </div>
                        </div>

                        {/* Birthday Medal (Center - Larger) */}
                        <div className="relative group flex flex-col items-center gap-2 -mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-yellow-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                <img
                                    src={medalBirthday}
                                    alt="Medalla Cumpleaños"
                                    className={`w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 ${michiCompleted ? '' : 'filter brightness-0 opacity-30'}`}
                                />
                            </div>
                        </div>

                        {/* Bio Medal (Right) */}
                        <div className="relative group flex flex-col items-center gap-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                <img
                                    src={medalBio}
                                    alt="Medalla Biotecnóloga"
                                    className={`w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 ${michiCompleted ? '' : 'filter brightness-0 opacity-30'}`}
                                />
                            </div>
                        </div>

                        {/* Gatuna Medal (New) */}
                        <div className="relative group flex flex-col items-center gap-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                <img
                                    src={medalGatuna}
                                    alt="Medalla ADN Gatuna"
                                    className={`w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 ${michiCompleted ? '' : 'filter brightness-0 opacity-30'}`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shelf */}
                    <div className="relative w-full h-4 mt-2">
                        {/* Shelf Top Surface */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 rounded-full" />
                        {/* Shelf Front/Shadow */}
                        <div className="absolute top-1 left-2 right-2 h-3 bg-gradient-to-b from-black/20 to-transparent blur-sm" />
                        {/* Reflection */}
                        <div className="absolute -bottom-8 left-0 w-full h-8 bg-gradient-to-b from-white/5 to-transparent blur-md transform scale-y-[-1] opacity-30" />
                    </div>
                </div>

                <div className="max-w-4xl w-full mb-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                        Jamir AI
                    </h2>
                    <p className="text-white/40 text-xs">
                        Tu asistente personal.
                    </p>
                </div>
                <ChatBot />

            </div>

            {/* Michi RPG Teaser Section */}
            <div className="w-full bg-slate-950 relative z-20 border-t border-white/10">
                <div className="relative w-full max-w-7xl mx-auto">
                    {/* Responsive Cover Image */}
                    <div className="relative w-full aspect-[9/16] md:aspect-[16/9] max-h-[80vh] overflow-hidden">
                        <img
                            src={coverMobile}
                            alt="Michi RPG Mobile Cover"
                            className="w-full h-full object-cover md:hidden"
                        />
                        <img
                            src={coverPC}
                            alt="Michi RPG Desktop Cover"
                            className="w-full h-full object-cover hidden md:block"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-center justify-end text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="max-w-2xl"
                            >
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_4px_0_rgba(0,0,0,1)] font-handwriting tracking-wider">
                                    Michi World
                                </h2>
                                <p className="text-indigo-200 text-sm md:text-lg mb-8 drop-shadow-md max-w-lg mx-auto">
                                    ¡Ayuda a los michis en esta aventura épica!
                                </p>

                                <button
                                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-lg rounded-lg hover:bg-indigo-500 hover:scale-105 focus:outline-none ring-offset-2 focus:ring-2 ring-indigo-400 shadow-[0_4px_0_rgb(55,48,163)] active:shadow-none active:translate-y-[4px]"
                                    onClick={onStartGame}
                                >
                                    <span className="text-md"></span>
                                    JUGAR
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

export default BioWorld;
