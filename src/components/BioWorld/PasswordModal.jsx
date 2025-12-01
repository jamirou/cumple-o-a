import React from 'react';
import { motion } from 'framer-motion';
import { Lock, X, Eye, EyeOff } from 'lucide-react';

const PasswordModal = ({ onClose }) => {
    const [newPass, setNewPass] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');
    const [showPass, setShowPass] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const handleSave = () => {
        if (newPass.length < 3) {
            setError('La contraseña es muy corta (mínimo 3 caracteres).');
            return;
        }
        if (newPass !== confirmPass) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        localStorage.setItem('savedPassword', newPass.toLowerCase());
        setSuccess('¡Contraseña guardada exitosamente!');
        setError('');

        setTimeout(() => {
            onClose();
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 border border-indigo-500/30 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex justify-between items-center mb-6 relative z-10">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Lock size={20} className="text-indigo-400" />
                        Cambiar Contraseña
                    </h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4 relative z-10">
                    <div className="space-y-1">
                        <label className="text-xs text-indigo-300 font-bold ml-1">NUEVA CONTRASEÑA</label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                className="w-full bg-black/40 border border-indigo-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="Escribe tu nueva clave..."
                            />
                            <button
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-indigo-300 font-bold ml-1">CONFIRMAR CONTRASEÑA</label>
                        <input
                            type={showPass ? "text" : "password"}
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="w-full bg-black/40 border border-indigo-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Repite la clave..."
                        />
                    </div>

                    {error && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs font-bold bg-red-500/10 p-2 rounded border border-red-500/20">
                            ⚠️ {error}
                        </motion.p>
                    )}

                    {success && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 text-xs font-bold bg-green-500/10 p-2 rounded border border-green-500/20">
                            ✅ {success}
                        </motion.p>
                    )}

                    <button
                        onClick={handleSave}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95 mt-2"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PasswordModal;
