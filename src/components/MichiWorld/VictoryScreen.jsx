import React from 'react';
import { motion } from 'framer-motion';
import medalMichis from '../../assets/medallamichis.png';
import medalBirthday from '../../assets/medallacumpleaños20.png';
import medalBio from '../../assets/medallabiotecnologa.jpeg';
import medalGatuna from '../../assets/medallaADNGAtuna.png';
import jamirYFlo from '../../assets/jamiryflo.png'; // Using Flo image

const VictoryScreen = ({ onClose }) => {
    React.useEffect(() => {
        localStorage.setItem('michiWorldCompleted', 'true');
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-b from-indigo-900/50 to-purple-900/50 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="max-w-4xl w-full"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-yellow-300 mb-8 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
                    ¡MISIÓN CUMPLIDA!
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                    <motion.img
                        src={jamirYFlo}
                        alt="Flo"
                        className="w-48 h-48 object-contain drop-shadow-2xl"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    />

                    <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-md max-w-lg">
                        <p className="text-xl text-white mb-4 italic">
                            "¡Miau! Has recuperado el ADN Primordial. El Michi World vuelve a ser suave y esponjoso gracias a ti, Ñoña Suprema."
                        </p>
                        <p className="text-sm text-indigo-200">
                            - La Jefa Flo
                        </p>
                    </div>
                </div>

                <div className="flex justify-center gap-8 mb-12">
                    {[medalMichis, medalBirthday, medalBio, medalGatuna].map((medal, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 + (idx * 0.3) }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img src={medal} alt="Medalla" className="w-24 h-24 object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform" />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="space-y-4"
                >
                    <p className="text-pink-300 text-lg font-bold">
                        Mensaje Secreto Desbloqueado:
                    </p>
                    <p className="text-white text-md max-w-2xl mx-auto leading-relaxed">
                        "Al igual que este mundo necesitaba su ADN para tener color, mi mundo cobra sentido cuando estás en él. Feliz cumpleaños, Maca." <br />
                        <span className="text-xs text-white/50">- Jamir</span>
                    </p>

                    <button
                        onClick={onClose}
                        className="mt-8 px-8 py-3 bg-white text-indigo-900 rounded-full font-bold hover:bg-gray-200 transition-colors shadow-lg"
                    >
                        Volver a BioWorld
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default VictoryScreen;
