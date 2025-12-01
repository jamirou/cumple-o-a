import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { STAGES, HEROES, VILLAINS } from '../../../data/michiData';

const Stage1_Baking = ({ onComplete, onGameOver }) => {
    const stageData = STAGES[0];
    const hero = HEROES[stageData.hero];
    const enemy = VILLAINS[stageData.enemy];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [enemyHp, setEnemyHp] = useState(enemy.hp);
    const [showHint, setShowHint] = useState(false);
    const [message, setMessage] = useState(`¡Un ${enemy.name} salvaje apareció!`);

    const handleAnswer = (index) => {
        const question = stageData.questions[currentQuestion];
        if (index === question.correct) {
            // Correct Answer
            const damage = 25; // Fixed damage for now
            const newHp = enemyHp - damage;
            setEnemyHp(newHp);
            setMessage(`¡${hero.name} usó ${hero.ability}! ¡Es súper efectivo!`);

            if (newHp <= 0) {
                setTimeout(() => {
                    onComplete();
                }, 1500);
            } else {
                setTimeout(() => {
                    if (currentQuestion < stageData.questions.length - 1) {
                        setCurrentQuestion(prev => prev + 1);
                        setMessage("¡El enemigo se tambalea! Siguiente pregunta...");
                        setShowHint(false);
                    } else {
                        // Loop questions if enemy still alive? Or just finish?
                        // For simplicity, let's finish if questions run out but enemy has HP (maybe hard mode later)
                        // Or just instant win for demo
                        onComplete();
                    }
                }, 1500);
            }
        } else {
            // Wrong Answer
            setMessage("¡Ataque fallido! El enemigo se ríe de tu masa aguada.");
            // Could reduce player HP here
        }
    };

    return (
        <div className="flex flex-col items-center justify-between h-full p-4 md:p-8">
            {/* Battle Arena */}
            <div className="flex-1 w-full flex items-center justify-between max-w-4xl mx-auto relative">

                {/* Hero */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-32 h-32 md:w-48 md:h-48 relative">
                        <img src={hero.img} alt={hero.name} className="w-full h-full object-contain drop-shadow-lg" />
                    </div>
                    <div className="bg-slate-800/80 p-2 rounded-lg text-white mt-2 border border-white/20">
                        <p className="font-bold">{hero.name}</p>
                        <div className="w-32 h-2 bg-slate-600 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-green-500 w-full" />
                        </div>
                    </div>
                </motion.div>

                {/* VS */}
                <div className="text-4xl font-bold text-white/50 italic">VS</div>

                {/* Enemy */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-32 h-32 md:w-48 md:h-48 relative">
                        {/* Placeholder for enemy if no image, or use generic */}
                        <div className="w-full h-full bg-red-500/20 rounded-full animate-pulse flex items-center justify-center text-4xl">
                            🍪
                        </div>
                    </div>
                    <div className="bg-slate-800/80 p-2 rounded-lg text-white mt-2 border border-white/20">
                        <p className="font-bold">{enemy.name}</p>
                        <div className="w-32 h-2 bg-slate-600 rounded-full mt-1 overflow-hidden">
                            <motion.div
                                className="h-full bg-red-500"
                                initial={{ width: '100%' }}
                                animate={{ width: `${(enemyHp / enemy.hp) * 100}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Dialogue/Question Box */}
            <div className="w-full max-w-4xl bg-slate-900/90 border-2 border-white/20 rounded-xl p-6 shadow-2xl mt-4">
                <p className="text-xl text-yellow-300 mb-4 font-bold">{message}</p>

                {enemyHp > 0 && (
                    <div className="space-y-4">
                        <p className="text-white text-lg md:text-2xl mb-6">
                            {stageData.questions[currentQuestion].q}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stageData.questions[currentQuestion].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className="p-4 bg-indigo-900/50 hover:bg-indigo-600 border border-indigo-500/30 rounded-lg text-left text-white transition-colors group"
                                >
                                    <span className="text-indigo-400 group-hover:text-white mr-2">➤</span>
                                    {opt}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-end mt-2">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="text-xs text-white/30 hover:text-white/80"
                            >
                                {showHint ? stageData.questions[currentQuestion].hint : "Pedir Pista (Michi Dev)"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stage1_Baking;
