import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import GameEngine from './GameEngine';

const MichiWorld = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden font-pixel"
        >
            {/* Close Button */}


            {/* Game Container */}
            <div className="w-full h-full bg-slate-900 relative overflow-hidden shadow-2xl">
                <GameEngine onClose={onClose} />
            </div>
        </motion.div>
    );
};

export default MichiWorld;
