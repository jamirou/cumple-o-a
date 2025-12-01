import React, { useEffect } from 'react';

const RainEffect = ({ rainDrops, setRainDrops }) => {
    useEffect(() => {
        if (rainDrops.length === 0) return;

        const interval = setInterval(() => {
            setRainDrops(prev =>
                prev.map(drop => ({
                    ...drop,
                    y: drop.y + drop.speed
                })).filter(drop => drop.y < 110)
            );
        }, 20);

        return () => clearInterval(interval);
    }, [rainDrops.length, setRainDrops]);

    return (
        <>
            {rainDrops.map(drop => (
                <div
                    key={drop.id}
                    className="absolute pointer-events-none z-30"
                    style={{
                        left: `${drop.x}%`,
                        top: `${drop.y}%`,
                        fontSize: `${drop.size}px`,
                        opacity: 0.7
                    }}
                >
                    {drop.emoji}
                </div>
            ))}
        </>
    );
};

export default RainEffect;
