import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 w-full h-full bg-black flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative mb-8">
                <motion.h1
                    className="text-3xl md:text-5xl font-mono font-bold text-green-500 tracking-widest"
                    initial={{ filter: "blur(10px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    𝐣⃥⃒̸𝐚⃥⃒̸𝐦⃥⃒̸ 𝐢⃥⃒̸𝐫⃥⃒̸ :: INITIALIZING...
                </motion.h1>
            </div>

            <div className="w-64 md:w-96 h-1 bg-green-900/30 rounded-full overflow-hidden relative">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.8, ease: "easeInOut" }}
                />
            </div>

            <div className="mt-2 font-mono text-green-500/70 text-xs md:text-sm animate-pulse">
                DECRYPTING_HEART_DATA...
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
