import React from 'react';
import { motion } from 'framer-motion';
import { terminalStrings } from '../../data/terminalData';

const QuantumQuiz = ({ shake, handleQuantumAnswer, error, borderColorClass, hoverBgClass }) => {
    return (
        <motion.div
            className={`w-full max-w-3xl mt-8 ${shake ? 'animate-shake' : ''}`}
        >
            <style>{`
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            .animate-shake {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
        `}</style>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                {terminalStrings.quizOptions.sort(() => Math.random() - 0.5).map((option, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-2 ${borderColorClass} px-2 py-2 ${hoverBgClass} transition-all text-xs md:text-base font-bold hover:scale-105 active:scale-95`}
                        onClick={() => handleQuantumAnswer(option.correct)}
                    >
                        {option.text}
                    </motion.button>
                ))}
            </div>
            {error && <p className="text-red-500 text-sm md:text-base font-bold animate-bounce mt-6 bg-black/50 p-2 rounded border border-red-500/50 inline-block">{error}</p>}
        </motion.div>
    );
};

export default QuantumQuiz;
