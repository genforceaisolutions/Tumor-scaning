
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// Realistic MRI Machine Model
function MriMachine({ brainScan, animationProgress }) {
  const tubeRef = useRef<THREE.Mesh>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  
  // Animate the scan based on progress
  useFrame(() => {
    if (scanRef.current && animationProgress > 0.2) {
      scanRef.current.position.z = THREE.MathUtils.lerp(
        scanRef.current.position.z, 
        animationProgress > 0.5 ? 0 : 6, 
        0.05
      );
    }
  });

  return (
    <group>
      {/* Base/Table of MRI */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[7, 12, 0.75]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Padding on the table */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[6.5, 11, 0.3]} />
        <meshStandardMaterial color="#a0c8e0" />
      </mesh>
      
      {/* Main MRI Body - Outer shell */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[3.2, 3.2, 8, 32, 1, true]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Main Tube */}
      <mesh ref={tubeRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 10, 32, 1, true]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Inner tube details */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.45, 2.45, 10.1, 32, 1, true]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.4} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Control panel */}
      <mesh position={[4, -1, -3]}>
        <boxGeometry args={[1.5, 2.5, 1]} />
        <meshStandardMaterial color="#2a3a4a" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Screen on control panel */}
      <mesh position={[4, -0.8, -2.4]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#80c0ff" emissive="#4080ff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Machine Housing - Left side */}
      <mesh position={[-4.5, -1, 0]}>
        <boxGeometry args={[2, 3, 8]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Machine Housing - Right side */}
      <mesh position={[4.5, -1, 0]}>
        <boxGeometry args={[2, 3, 8]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Cooling vents */}
      {[-3, -1, 1, 3].map((pos, i) => (
        <mesh key={`vent-${i}`} position={[5.1, -1, pos]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.5, 0.1]} />
          <meshStandardMaterial color="#333" side={THREE.DoubleSide} />
        </mesh>
      ))}
      
      {/* Magnetic Rings */}
      {[-4, -2, 0, 2, 4].map((pos, i) => (
        <mesh key={i} position={[0, 0, pos]}>
          <torusGeometry args={[3.2, 0.3, 16, 100]} />
          <meshStandardMaterial color="#0080ff" metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
      
      {/* Lights inside the tube */}
      <pointLight position={[0, 0, -3]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#ffffff" />
      
      {/* Brain scan image plane that moves into the tube */}
      {brainScan && (
        <mesh 
          ref={scanRef} 
          position={[0, 0, 6]} 
          rotation={[0, 0, 0]}
        >
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial map={brainScan} transparent={true} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

// Add TypeScript interface for component props
interface MriMachineAnimationProps {
  imageUrl?: string;
  animationProgress?: number;
  isVisible?: boolean;
}

// Main component with canvas
const MriMachineAnimation: React.FC<MriMachineAnimationProps> = ({ 
  imageUrl, 
  animationProgress = 0, 
  isVisible = false
}) => {
  const brainScan = imageUrl ? useLoader(TextureLoader, imageUrl) : null;
  
  if (!isVisible) return null;

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
      <Canvas camera={{ position: [0, 1, 10], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.7} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <PresentationControls
          global
          rotation={[0, -0.2, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <MriMachine brainScan={brainScan} animationProgress={animationProgress} />
        </PresentationControls>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default MriMachineAnimation;
