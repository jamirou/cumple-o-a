import React from 'react';
import { Float, Html } from '@react-three/drei';
import { motion } from 'framer-motion';

const SecretEnvelope = ({ position, isMacro, onClick }) => {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Html position={position} transform distanceFactor={12} style={{ pointerEvents: 'none' }}>
                <motion.div
                    className={`relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 p-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500 ${isMacro ? 'cursor-pointer opacity-100 scale-100 pointer-events-auto' : 'opacity-30 scale-75 grayscale pointer-events-none'}`}
                    whileHover={isMacro ? { scale: 1.1 } : {}}
                    whileTap={isMacro ? { scale: 0.9 } : {}}
                    onClick={isMacro ? onClick : undefined}
                >
                    {/* Shine Effect - Only active in Macro */}
                    {isMacro && (
                        <motion.div
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 z-0"
                            initial={{ x: '-150%' }}
                            animate={{ x: '150%' }}
                            transition={{
                                repeat: Infinity,
                                repeatDelay: 3,
                                duration: 1.5,
                                ease: "easeInOut"
                            }}
                        />
                    )}
                    <span className="relative z-10 text-2xl filter drop-shadow-md">✉️</span>
                </motion.div>
            </Html>
        </Float>
    );
};

export default SecretEnvelope;
