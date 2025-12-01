import React from 'react';
import { Float, Html } from '@react-three/drei';

const TraitLabel = ({ position, text, emoji, percentage, color = "bg-white/20" }) => {
    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Html position={position} transform distanceFactor={12}>
                <div className={`
          px-2 py-1.5 rounded-full backdrop-blur-md border border-white/30 shadow-lg
          flex items-center gap-1.5 select-none whitespace-nowrap
          ${color}
        `}>
                    <span className="text-lg filter drop-shadow-md">{emoji}</span>
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-white/90">{percentage}</span>
                        <span className="text-xs font-bold text-white">{text}</span>
                    </div>
                </div>
            </Html>
        </Float>
    );
};

export default TraitLabel;
