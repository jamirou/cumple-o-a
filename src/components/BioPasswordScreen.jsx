import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles, Float } from '@react-three/drei';
import { Lock, ArrowRight, HelpCircle } from 'lucide-react';

const BioPasswordScreen = ({ onComplete }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const savedPassword = localStorage.getItem('savedPassword') || 'flo';

        if (password.toLowerCase() === savedPassword.toLowerCase()) {
            onComplete();
        } else {
            setError('Contraseña incorrecta');
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setPassword('');
        }
    };

    const whatsappLink = "https://wa.me/56947185397?text=Hola%20Jamir%20lindo%20precioso%20hermoso,%20se%20me%20olvidó%20la%20contraseña%20👉👈";

    return (
        <div className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden flex items-center justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 10] }}>
                    <ambientLight intensity={0.5} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#818cf8" />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <mesh position={[4, -2, -5]}>
                            <sphereGeometry args={[1, 32, 32]} />
                            <meshStandardMaterial color="#4f46e5" wireframe opacity={0.2} transparent />
                        </mesh>
                    </Float>
                </Canvas>
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative z-10 w-full max-w-md p-8 mx-4"
            >
                <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-indigo-500/10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 border border-indigo-500/30">
                            <Lock className="text-indigo-400 w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Bienvenida Ñoña</h2>
                        <p className="text-indigo-200/60 text-sm text-center">
                            Ingresa tu contraseña para acceder a tu mundo
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className={`space-y-6 ${shake ? 'animate-shake' : ''}`}>
                        <style>{`
                            @keyframes shake {
                                0%, 100% { transform: translateX(0); }
                                10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                                20%, 40%, 60%, 80% { transform: translateX(4px); }
                            }
                            .animate-shake {
                                animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
                            }
                        `}</style>

                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-center tracking-widest text-lg"
                                placeholder="••••••"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-xs text-center font-medium"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            <span>Ingresar</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-indigo-300 transition-colors duration-300"
                        >
                            <HelpCircle className="w-3 h-3" />
                            <span>¿Olvidaste tu contraseña?</span>
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <div className="absolute bottom-6 text-white/10 text-xs tracking-widest uppercase">
                Sistema de Seguridad BioWorld v2.0
            </div>
        </div>
    );
};

export default BioPasswordScreen;
