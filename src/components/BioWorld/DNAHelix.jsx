import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

const DNAHelix = ({ zoomLevel, ...props }) => {
    const group = useRef();

    // Create DNA structure data
    const points = useMemo(() => {
        const count = 40;
        const radius = 2;
        const height = 14;
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = i / count;
            const angle = t * Math.PI * 8; // 4 full turns
            const y = (t - 0.5) * height;

            // Strand 1
            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;

            // Strand 2 (opposite)
            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius;

            temp.push({ x1, y, z1, x2, z2 });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (group.current) {
            // Ultra-slow rotation in Macro Mode (Level 2)
            const speed = zoomLevel === 2 ? 0.0002 : 0.002;
            group.current.rotation.y += speed;
        }
    });

    // Dynamic Colors based on Zoom Level
    const isMacro = zoomLevel === 2;

    // Normal: Soft Pink/Purple
    // Macro: Vibrant Cyan/Magenta/Lime mix
    const color1 = isMacro ? '#00FFFF' : '#FBCFE8';
    const color2 = isMacro ? '#FF00FF' : '#E9D5FF';

    // Macro Mode Material Props
    const materialProps = {
        roughness: isMacro ? 0.4 : 0.1,
        metalness: isMacro ? 0.3 : 0.1,
        emissiveIntensity: isMacro ? 0.2 : 0,
        transmission: isMacro ? 0.2 : 0.5,
        thickness: 0.5
    };

    const pastelColors = [
        '#FBCFE8', // Pink
        '#E9D5FF', // Purple
        '#C4B5FD', // Violet
        '#A7F3D0', // Mint
        '#FDE68A', // Yellow
        '#FECACA', // Red/Pink
        '#BFDBFE', // Blue
        '#DDD6FE'  // Lavender
    ];

    return (
        <group ref={group} {...props}>
            {points.map((p, i) => (
                <group key={i}>
                    {/* Strand 1 Sphere */}
                    <mesh position={[p.x1, p.y, p.z1]}>
                        <sphereGeometry args={[0.3, 16, 16]} />
                        <meshPhysicalMaterial
                            color={isMacro ? pastelColors[i % pastelColors.length] : color1}
                            emissive={isMacro ? pastelColors[i % pastelColors.length] : "black"}
                            {...materialProps}
                        />
                    </mesh>

                    {/* Strand 2 Sphere */}
                    <mesh position={[p.x2, p.y, p.z2]}>
                        <sphereGeometry args={[0.3, 16, 16]} />
                        <meshPhysicalMaterial
                            color={isMacro ? pastelColors[(i + 2) % pastelColors.length] : color2}
                            emissive={isMacro ? pastelColors[(i + 2) % pastelColors.length] : "black"}
                            {...materialProps}
                        />
                    </mesh>

                    {/* Connector */}
                    <mesh position={[(p.x1 + p.x2) / 2, p.y, (p.z1 + p.z2) / 2]} rotation={[0, (i / 40) * Math.PI * 8, Math.PI / 2]}>
                        <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
                        <meshStandardMaterial color="white" opacity={0.3} transparent />
                    </mesh>
                </group>
            ))}
            {/* Living Ecosystem Particles in Macro Mode */}
            {isMacro && (
                <group>
                    {/* Multi-colored Star Dust (Replaces White Dust) */}
                    {pastelColors.map((color, index) => (
                        <group key={`star-dust-${index}`}>
                            {/* Tiny twinkling stars */}
                            <Sparkles
                                count={80}
                                scale={15}
                                size={2}
                                speed={0.5 + (index * 0.1)}
                                opacity={0.8}
                                color={color}
                                noise={1}
                            />
                            {/* Larger floating particles */}
                            <Sparkles
                                count={30}
                                scale={12}
                                size={4 + (index % 3)}
                                speed={0.2 + (index * 0.05)}
                                opacity={0.6}
                                color={color}
                                noise={0.5}
                            />
                        </group>
                    ))}
                </group>
            )}
        </group>
    );
};

export default DNAHelix;
