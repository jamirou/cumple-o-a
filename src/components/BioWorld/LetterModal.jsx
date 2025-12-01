import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import cartaMaca from '../../assets/cartaMaca.png';

const LetterModal = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.5, rotateY: 90, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                exit={{ scale: 0.5, rotateY: -90, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="relative text-gray-900 py-8 px-12 md:py-16 md:px-32 rounded-sm shadow-2xl w-full max-w-md md:max-w-3xl overflow-hidden max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundImage: `url(${cartaMaca})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors z-10 bg-white/50 rounded-full p-1"
                >
                    <X size={24} />
                </button>

                <div className="relative z-0 font-handwriting text-lg md:text-2xl leading-relaxed pt-4 text-gray-900 font-semibold drop-shadow-sm px-8 md:px-16">
                    <p className="mb-6 text-white font-bold text-xl md:text-3xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Chiquilla bonita,</p>
                    <p className="mb-6">
                        Si estás leyendo esto, es porque encontraste esta carta en medio de tu ADN. O quizá porque he experimentado un entrelazamiento al igual que dos átomos en un nudo infinito.
                    </p>
                    <p className="mb-6">
                        En la física moderna, el término entrelazamiento lo usan para evocar el concepto de dos partículas cuánticas conectadas, donde la acción de una afecta el estado de la otra, incluso si estas están separadas en partes diferentes del mundo. En realidad, las partículas ni siquiera tienen conexión física ni una línea de comunicación, pero hay algo en ellas que las conecta, las entrelaza.
                    </p>
                    <p className="mb-6">
                        Y cuando pienso en ti, y busco tu mirada, tiendo a decirme a mí mismo "no, no quiero nada, es muy temprano aún". Cuando en realidad, lo quiero todo.
                    </p>
                    <p className="mb-6">
                        Pero que lo calle no significa que no sea real, me hace recordar la frase "Los objetos sensibles existen solo cuando son percibidos". Al igual que un árbol, de estos enormes cayendo lentamente, sacudiendo sus ramas, llenando de partículas el aire que lo rodea, y cuando cae, estas se disipan por todas partes, dejando una tranquilidad inigualable, incluso para los animales e insectos que lo rodeaban, aunque hace un minuto todo era caos.
                    </p>
                    <p className="mb-6">
                        En este pequeño mundo, ni siquiera puedo plasmar una pequeña fracción de lo complejo y maravilloso que es el mundo que creó Dios. Pero sí puedo dejar este mensaje en el que expreso mi gratitud por haberte conocido.
                    </p>
                    <p className="mb-6">
                        Espero que este cumpleaños sea tan especial como la secuencia única con la que Dios te formó.
                    </p>
                    <p className="text-right mt-12 font-bold text-white leading-[2rem] text-xl md:text-2xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        Con mucho cariño,<br />
                        Jamir
                    </p>

                    <div className="flex justify-end mt-8 pb-4">
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-900 transition-colors font-light text-sm tracking-widest uppercase border-b border-transparent hover:border-gray-900 pb-1"
                            title="Cerrar carta"
                        >
                            cerrar
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LetterModal;
