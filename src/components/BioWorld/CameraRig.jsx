import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CameraRig = ({ zoomLevel }) => {
    useFrame((state) => {
        let targetDist = 18;
        if (zoomLevel === 1) targetDist = 10;
        if (zoomLevel === 2) targetDist = 4;

        const currentDist = state.camera.position.length();
        const newDist = THREE.MathUtils.lerp(currentDist, targetDist, 0.05);
        state.camera.position.setLength(newDist);
    });
    return null;
};

export default CameraRig;
