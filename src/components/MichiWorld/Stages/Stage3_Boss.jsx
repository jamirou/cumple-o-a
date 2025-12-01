import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { STAGES, HEROES, VILLAINS } from '../../../data/michiData';

const Stage3_Boss = ({ onComplete, onGameOver }) => {
    const stageData = STAGES[2];
    const enemy = VILLAINS[stageData.enemy];

    // Puzzle State
    const [dnaSequence, setDnaSequence] = useState([]);
    const targetSequence = stageData.puzzle.target;
    const [message, setMessage] = useState("¡El Dr. Aspiradora bloquea el camino!");
    const [enemyHp, setEnemyHp] = useState(enemy.hp);

    const handleBaseClick = (base) => {
        if (dnaSequence.length < 4) {
            const newSequence = [...dnaSequence, base];
            setDnaSequence(newSequence);

            if (newSequence.length === 4) {
                checkSequence(newSequence);
            }
        }
    };

    const checkSequence = (sequence) => {
        const isCorrect = sequence.every((val, index) => val === targetSequence[index]);

        if (isCorrect) {
            setMessage("¡SECUENCIA CORRECTA! ¡ADN RESTAURADO!");
            setEnemyHp(0);
            setTimeout(() => {
                onComplete();
            }, 2000);
        } else {
            setMessage("¡Secuencia inestable! Inténtalo de nuevo.");
            setTimeout(() => {
                setDnaSequence([]);
                setMessage("Reconstruye la hebra complementaria: A-T, C-G");
            }, 1500);
        }
    };

    return (
        <div className="flex flex-col items-center justify-between h-full p-4 md:p-8">
            <div className="flex-1 w-full flex items-center justify-between max-w-4xl mx-auto relative">
                {/* Team */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex -space-x-4">
                        {Object.values(HEROES).map(h => (
                            <img key={h.id} src={h.img} alt={h.name} className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-lg rounded-full border-2 border-white bg-slate-800" />
                        ))}
                    </div>
                    <div className="bg-slate-800/80 p-2 rounded-lg text-white mt-2 border border-white/20">
                        <p className="font-bold">Escuadrón Michi</p>
                    </div>
                </motion.div>

                <div className="text-4xl font-bold text-white/50 italic">VS</div>

                {/* Boss */}
                <motion.div
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-40 h-40 md:w-64 md:h-64 relative">
                        <img src={enemy.img} alt={enemy.name} className="w-full h-full object-contain drop-shadow-2xl filter drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]" />
                    </div>
                    <div className="bg-slate-800/80 p-2 rounded-lg text-white mt-2 border border-white/20">
                        <p className="font-bold text-red-400">{enemy.name}</p>
                        <div className="w-40 h-4 bg-slate-600 rounded-full mt-1 overflow-hidden border border-white/10">
                            <motion.div
                                className="h-full bg-red-600"
                                initial={{ width: '100%' }}
                                animate={{ width: `${(enemyHp / enemy.hp) * 100}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Puzzle Box */}
            <div className="w-full max-w-4xl bg-slate-900/90 border-2 border-red-500/50 rounded-xl p-6 shadow-2xl mt-4 relative overflow-hidden">
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>

                <p className="text-xl text-red-300 mb-4 font-bold relative z-10">{message}</p>

                {enemyHp > 0 && (
                    <div className="space-y-6 relative z-10">
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-white text-lg">Secuencia Objetivo (Hebra Molde):</p>
                            <div className="flex gap-2">
                                {stageData.puzzle.sequence.map((base, idx) => (
                                    <div key={idx} className="w-12 h-12 flex items-center justify-center bg-slate-700 rounded text-2xl font-bold text-gray-400">
                                        {base}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <p className="text-white text-lg">Tu Secuencia (Hebra Complementaria):</p>
                            <div className="flex gap-2 min-h-[3rem]">
                                {[0, 1, 2, 3].map((idx) => (
                                    <div key={idx} className={`w-12 h-12 flex items-center justify-center rounded text-2xl font-bold border-2 ${dnaSequence[idx] ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-600'}`}>
                                        {dnaSequence[idx] || ''}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mt-8">
                            {['A', 'T', 'C', 'G'].map((base) => (
                                <button
                                    key={base}
                                    onClick={() => handleBaseClick(base)}
                                    className="p-4 bg-slate-700 hover:bg-indigo-600 border border-white/10 rounded-lg text-2xl font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                                >
                                    {base}
                                </button>
                            ))}
                        </div>
                        <div className="text-center">
                            <button onClick={() => setDnaSequence([])} className="text-xs text-red-400 hover:text-red-300 mt-2">Reiniciar Secuencia</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stage3_Boss;
