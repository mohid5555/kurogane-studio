"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Procedurally built futuristic katana.
 * No external assets — all geometry is generated to stay lightweight.
 */
function Katana({ charge }: { charge: number }) {
  const root = useRef<THREE.Group>(null);
  const blade = useRef<THREE.Mesh>(null);
  const edgeGlow = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state, dt) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;

    // idle float + slow rotation
    const idleY = Math.sin(t * 0.6) * 0.05;
    const idleRotZ = Math.sin(t * 0.4) * 0.02;

    // mouse parallax
    const tx = mouse.x * 0.35;
    const ty = mouse.y * 0.25;

    // charge: slight pull-back as user "unsheaths"
    const pull = charge * 0.6;

    root.current.position.x = THREE.MathUtils.damp(root.current.position.x, tx - pull * 0.8, 6, dt);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, ty + idleY + pull * 0.3, 6, dt);
    root.current.rotation.z = THREE.MathUtils.damp(
      root.current.rotation.z,
      Math.PI * 0.18 + idleRotZ - mouse.x * 0.18 - pull * 0.5,
      5,
      dt,
    );
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      -mouse.x * 0.25,
      5,
      dt,
    );
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      mouse.y * 0.12,
      5,
      dt,
    );

    if (edgeGlow.current) {
      const m = edgeGlow.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.35 + Math.sin(t * 3) * 0.05 + charge * 0.5;
    }
    if (blade.current) {
      const m = blade.current.material as THREE.MeshPhysicalMaterial;
      m.emissiveIntensity = 0.15 + charge * 1.2;
    }
  });

  // Blade shape (tapered)
  const bladeGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.04, 0);
    shape.lineTo(0.04, 0);
    shape.lineTo(0.025, 3.2);
    shape.lineTo(0, 3.45);
    shape.lineTo(-0.04, 3.2);
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.018,
      bevelEnabled: true,
      bevelSize: 0.008,
      bevelThickness: 0.008,
      bevelSegments: 2,
      steps: 1,
    });
    geom.center();
    return geom;
  }, []);

  return (
    <group ref={root} rotation={[0, 0, Math.PI * 0.18]} scale={1.0}>
      {/* Blade */}
      <mesh ref={blade} geometry={bladeGeom} castShadow>
        <meshPhysicalMaterial
          color="#e8ebef"
          metalness={1}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive="#ffffff"
          emissiveIntensity={0.15}
          envMapIntensity={1.6}
        />
      </mesh>

      {/* Edge glow plane */}
      <mesh ref={edgeGlow} position={[0.06, 0, 0.02]}>
        <planeGeometry args={[0.025, 3.4]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Tsuba (guard) */}
      <mesh position={[0, -1.78, 0]}>
        <torusGeometry args={[0.16, 0.025, 12, 32]} />
        <meshPhysicalMaterial color="#1a1a1f" metalness={0.9} roughness={0.35} />
      </mesh>
      <mesh position={[0, -1.78, 0]}>
        <boxGeometry args={[0.34, 0.04, 0.05]} />
        <meshPhysicalMaterial color="#0c0c10" metalness={1} roughness={0.25} />
      </mesh>

      {/* Handle (tsuka) — matte black wrap */}
      <mesh position={[0, -2.25, 0]}>
        <cylinderGeometry args={[0.05, 0.055, 0.95, 24]} />
        <meshPhysicalMaterial color="#08080a" metalness={0.2} roughness={0.85} />
      </mesh>
      {/* Wrap rings */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, -1.85 - i * 0.11, 0]}>
          <torusGeometry args={[0.058, 0.012, 8, 18]} />
          <meshPhysicalMaterial color="#15151a" roughness={0.6} metalness={0.4} />
        </mesh>
      ))}

      {/* Pommel cap */}
      <mesh position={[0, -2.78, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 24]} />
        <meshPhysicalMaterial color="#1d1d22" metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Sparks({ charge }: { charge: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 3;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.05;
    const m = ref.current.material as THREE.PointsMaterial;
    m.opacity = 0.3 + charge * 0.6;
    m.size = 0.012 + charge * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.014}
        transparent
        opacity={0.35}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function KatanaCanvas({ charge }: { charge: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#050507"]} />
      <fog attach="fog" args={["#050507", 6, 14]} />

      {/* Lighting rig — dramatic key + cool fill */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 4, 3]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-4, 2, 2]} intensity={0.9} color="#aab4c4" />
      <pointLight position={[0, 0, 3]} intensity={0.6 + charge * 2} color="#ffffff" distance={6} />

      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <Katana charge={charge} />
        </Float>
        <Sparks charge={charge} />
      </Suspense>
    </Canvas>
  );
}
