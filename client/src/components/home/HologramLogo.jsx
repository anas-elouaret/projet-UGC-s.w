import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Text3D, OrbitControls, Sphere, Ring, Points, PointMaterial, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import helvetikerBoldFont from 'three/examples/fonts/helvetiker_bold.typeface.json?url';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Extend OrbitControls for object rotation
extend({ OrbitControls });

// Metal Material for Logo
const MetalMaterial = ({ emissiveIntensity = 0 }) => {
  return (
    <meshStandardMaterial
      color="#c0c0c0"
      metalness={0.9}
      roughness={0.1}
      emissive="#00ff00"
      emissiveIntensity={emissiveIntensity}
    />
  );
};

// Neon Strip Material
const NeonMaterial = ({ intensity = 1 }) => {
  return (
    <meshBasicMaterial
      color="#00ff00"
      transparent
      opacity={0.8}
      emissive="#00ff00"
      emissiveIntensity={intensity}
    />
  );
};

// Circuit Ground Material
const CircuitMaterial = () => {
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <meshStandardMaterial
      ref={materialRef}
      color="#000000"
      emissive="#004400"
      emissiveIntensity={0.1}
      transparent
      opacity={0.9}
    />
  );
};

// Particle Emitter for Click
const ParticleEmitter = ({ active }) => {
  const pointsRef = useRef();
  const particleCount = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current && active) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 2] += 0.05; // Move towards camera
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!active) return null;

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </Points>
  );
};

// Main GROWSTACK Logo Component
const GrowstackLogo = () => {
  const groupRef = useRef();
  const [state, setState] = useState('idle'); // idle, hover, clicked
  const [emissiveIntensity, setEmissiveIntensity] = useState(0.1);
  const [scale, setScale] = useState(1);
  const [particlesActive, setParticlesActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  // Audio
  const clickAudioRef = useRef(null);
  const rotationAudioRef = useRef(null);

  useEffect(() => {
    try {
      clickAudioRef.current = new Audio('/sounds/digital-click.mp3');
      rotationAudioRef.current = new Audio('/sounds/rotation-swish.mp3');
      rotationAudioRef.current.loop = true;
    } catch (error) {
      console.warn('Audio files not found, sounds will be disabled');
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;

      // Idle animation
      if (state === 'idle') {
        groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
        groupRef.current.rotation.y += 0.005;
        setEmissiveIntensity(0.1 + Math.sin(time * 2) * 0.05);
      }

      // Hover
      if (state === 'hover') {
        setEmissiveIntensity(0.3);
      }

      // Clicked
      if (state === 'clicked') {
        setScale(1.2);
        setEmissiveIntensity(1);
        setTimeout(() => {
          setState('idle');
          setScale(1);
          setParticlesActive(false);
        }, 500);
      }

      // Inertia
      if (!isDragging) {
        groupRef.current.rotation.y += velocityRef.current.y * 0.01;
        groupRef.current.rotation.x += velocityRef.current.x * 0.01;
        velocityRef.current.y *= 0.95;
        velocityRef.current.x *= 0.95;
      }

      // Rotation sound
      if (isDragging && rotationAudioRef.current) {
        const speed = Math.abs(velocityRef.current.y) + Math.abs(velocityRef.current.x);
        rotationAudioRef.current.playbackRate = 1 + speed * 10;
        try {
          if (rotationAudioRef.current.paused) {
            rotationAudioRef.current.play();
          }
        } catch (error) {
          console.warn('Failed to play rotation audio');
        }
      } else if (rotationAudioRef.current && !rotationAudioRef.current.paused) {
        try {
          rotationAudioRef.current.pause();
        } catch (error) {
          console.warn('Failed to pause rotation audio');
        }
      }
    }
  });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragRef.current.x;
      const deltaY = e.clientY - dragRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.01;
      groupRef.current.rotation.x += deltaY * 0.01;

      velocityRef.current.y = deltaX * 0.1;
      velocityRef.current.x = deltaY * 0.1;

      dragRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    setState('clicked');
    setParticlesActive(true);
    try {
      if (clickAudioRef.current) {
        clickAudioRef.current.play();
      }
    } catch (error) {
      console.warn('Failed to play click audio');
    }
  };

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOver={() => setState('hover')}
      onPointerOut={() => setState('idle')}
      onClick={handleClick}
    >
      {/* GROW Text */}
      <Text3D
        font={helvetikerBoldFont}
        size={0.8}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.05}
        bevelOffset={0}
        bevelSegments={8}
        position={[-1.5, 0, 0]}
      >
        GROW
        <MetalMaterial emissiveIntensity={emissiveIntensity} />
      </Text3D>

      {/* STACK Text */}
      <Text3D
        font={helvetikerBoldFont}
        size={0.8}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.05}
        bevelOffset={0}
        bevelSegments={8}
        position={[0.5, 0, 0]}
      >
        STACK
        <MetalMaterial emissiveIntensity={emissiveIntensity} />
      </Text3D>

      {/* Neon Strips */}
      <mesh position={[-1.5, -0.3, 0]}>
        <boxGeometry args={[2.5, 0.05, 0.05]} />
        <NeonMaterial intensity={emissiveIntensity * 2} />
      </mesh>
      <mesh position={[0.5, -0.3, 0]}>
        <boxGeometry args={[2.5, 0.05, 0.05]} />
        <NeonMaterial intensity={emissiveIntensity * 2} />
      </mesh>

      {/* Particle Emitter */}
      <ParticleEmitter active={particlesActive} />

      {/* Lights */}
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#00ff00" />
      <ambientLight intensity={0.1} color="#ffffff" />
    </group>
  );
};

// Ground Plane
const Ground = () => {
  return (
    <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <CircuitMaterial />
    </mesh>
  );
};

// Camera Controller
const CameraController = () => {
  const { camera } = useThree();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    camera.position.x = Math.sin(time * 0.1) * 2;
    camera.position.y = Math.cos(time * 0.15) * 1;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main Scene Component
const GrowstackScene = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: canvasRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(canvasRef.current, {
            scale: 1 - progress * 0.5,
            x: progress * -200,
            y: progress * -100,
            duration: 0.1,
            ease: 'none'
          });
        }
      });
    }, canvasRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={canvasRef}
      className="w-full h-screen relative overflow-hidden"
      style={{ transformOrigin: 'center' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <CameraController />

        <GrowstackLogo />

        <Ground />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            kernelSize={3}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.002, 0.002]}
          />
        </EffectComposer>
      </Canvas>

      {/* Overlay Text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-9xl font-bold mb-4 drop-shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600">
              GROW
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
              STACK
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-cyan-300 drop-shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Premium AI Platform
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GrowstackScene;