"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeOutBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

const BURST = 0.16; // estallido
const PKG_DELAY = 0.14; // el paquete entra un toque después del estallido
const ENTER = 1.45; // duración entrada paquete

function useSpark() {
  return useMemo(() => {
    const s = 64;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.85)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(c);
  }, []);
}

function Particles({
  color,
  count,
  size,
  speed,
  life,
  whiteRatio,
}: {
  color: string;
  count: number;
  size: number;
  speed: number;
  life: number;
  whiteRatio: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const spark = useSpark();
  const start = useRef<number | null>(null);

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const base = new THREE.Color(color);
    const white = new THREE.Color("#ffffff");
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const sp = speed * (0.4 + Math.random());
      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * sp;
      velocities[i * 3 + 1] = Math.cos(phi) * sp + 2.5;
      velocities[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * sp * 0.6;
      const c = Math.random() < whiteRatio ? white : base;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors, velocities };
  }, [color, count, speed, whiteRatio]);

  useFrame((state) => {
    const pts = ref.current;
    if (!pts) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current - BURST;
    const mat = pts.material as THREE.PointsMaterial;
    if (t < 0) {
      mat.opacity = 0;
      return;
    }
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const drag = 1 - Math.min(1, t / life) * 0.4;
      arr[i * 3] = velocities[i * 3] * t * drag;
      arr[i * 3 + 1] = velocities[i * 3 + 1] * t * drag - 5.5 * t * t;
      arr[i * 3 + 2] = velocities[i * 3 + 2] * t * drag;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    mat.opacity = Math.max(0, 1 - t / life);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={spark}
        size={size}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Shockwave({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const start = useRef<number | null>(null);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current - BURST;
    const mat = m.material as THREE.MeshBasicMaterial;
    if (t < 0 || t > 0.85) {
      mat.opacity = 0;
      return;
    }
    const k = t / 0.85;
    const s = 0.2 + easeOutCubic(k) * 9;
    m.scale.set(s, s, s);
    mat.opacity = 0.65 * (1 - k);
  });
  return (
    <mesh ref={ref} position={[0, 0, -0.5]}>
      <ringGeometry args={[0.62, 1, 56]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function Flash() {
  const ref = useRef<THREE.Mesh>(null);
  const start = useRef<number | null>(null);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current - BURST;
    const mat = m.material as THREE.MeshBasicMaterial;
    mat.opacity = t < 0 || t > 0.25 ? 0 : 0.8 * (1 - t / 0.25);
  });
  return (
    <mesh ref={ref} position={[0, 0, 3]}>
      <planeGeometry args={[40, 40]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function CameraShake() {
  const { camera } = useThree();
  const start = useRef<number | null>(null);
  const base = useRef(new THREE.Vector3(0, 0, 9));
  useFrame((state) => {
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current - BURST;
    if (t < 0 || t > 0.4) {
      camera.position.x = base.current.x;
      camera.position.y = base.current.y;
      return;
    }
    const mag = 0.25 * (1 - t / 0.4);
    camera.position.x = Math.sin(t * 80) * mag;
    camera.position.y = Math.cos(t * 70) * mag;
  });
  return null;
}

function Package({ pkg }: { pkg: string }) {
  const tex = useTexture(pkg);
  const group = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);
  const { viewport } = useThree();

  const img = tex.image as { width?: number; height?: number } | undefined;
  const aspect = (img?.width ?? 1300) / (img?.height ?? 1000);
  const w = Math.min(viewport.width * 0.82, 6.2);
  const h = w / aspect;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    const e = state.clock.elapsedTime - start.current;
    const t = e - BURST - PKG_DELAY;
    if (t < 0) {
      g.scale.setScalar(0.001);
      return;
    }
    if (t < ENTER) {
      const k = t / ENTER;
      const eb = easeOutBack(Math.min(1, k));
      g.scale.setScalar(Math.max(0.001, eb));
      g.position.z = -7 * (1 - easeOutCubic(k));
      g.rotation.y = (1 - easeOutCubic(k)) * Math.PI * 7;
      g.rotation.x = (1 - easeOutCubic(k)) * 0.6;
    } else {
      const it = e - (BURST + PKG_DELAY + ENTER);
      g.scale.setScalar(1);
      g.position.z = 0;
      g.position.y = Math.sin(it * 1.3) * 0.12;
      g.rotation.y = Math.sin(it * 0.6) * 0.18;
      g.rotation.x = Math.sin(it * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} transparent side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function PackageReveal({
  pkg,
  color,
  yOffset = 1.15,
}: {
  pkg: string;
  color: string;
  yOffset?: number;
}) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 42 }}
    >
      <ambientLight intensity={1} />
      <CameraShake />
      <Flash />
      <group position={[0, yOffset, 0]}>
        <Suspense fallback={null}>
          <Package pkg={pkg} />
        </Suspense>
        <Particles color={color} count={230} size={0.32} speed={7} life={1.5} whiteRatio={0.35} />
        <Particles color={color} count={80} size={0.7} speed={9} life={1.7} whiteRatio={0.2} />
        <Shockwave color={color} />
      </group>
      <EffectComposer>
        <Bloom
          intensity={0.95}
          luminanceThreshold={0.28}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
