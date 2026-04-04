"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import gsap from "gsap";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Shaders ─── */
const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec4 mp = modelMatrix * vec4(position, 1.0);

  float elev = sin(mp.x * 1.5 - uTime * 1.2) * 0.2
             + sin(mp.y * 1.2 + uTime * 0.8) * 0.2;

  float dist = distance(uMouse, vec2(mp.x, mp.y));
  elev -= smoothstep(4.0, 0.0, dist) * 0.8;

  mp.z += elev;
  vElevation = elev;
  gl_Position = projectionMatrix * viewMatrix * mp;
}
`;

const fragmentShader = `
uniform vec3 uColor1;
uniform vec3 uColor2;
varying float vElevation;

void main() {
  float m = (vElevation + 0.3) * 1.8;
  vec3 color = mix(uColor1, uColor2, m);
  gl_FragColor = vec4(color, 1.0);
}
`;

/* ─── Cloth ─── */
function ClothMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouseTarget = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.set(
        (e.clientX / window.innerWidth) * 16 - 8,
        -(e.clientY / window.innerHeight) * 16 + 8
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_s, delta) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value += delta;
    matRef.current.uniforms.uMouse.value.lerp(mouseTarget.current, 0.05);
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#0a0a0a") },
      uColor2: { value: new THREE.Color("#1a1a1a") },
    }),
    []
  );

  return (
    <mesh rotation={[-0.3, 0, 0]} position={[0, -0.5, -4]}>
      <planeGeometry args={[8, 8, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/* ─── Particles ─── */
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      p[i] = (Math.random() - 0.5) * 20;
      p[i + 1] = (Math.random() - 0.5) * 20;
      p[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.5;
      arr[i * 3] += Math.sin(t + i * 0.1) * 0.001;
      if (arr[i * 3 + 1] > 10) arr[i * 3 + 1] = -10;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ff1a1a"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Visibility gate — pause canvas when out of view ─── */
function RenderGate({ children }: { children: React.ReactNode }) {
  const { gl } = useThree();
  const visible = useRef(true);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    obs.observe(gl.domElement);
    return () => obs.disconnect();
  }, [gl]);

  useFrame(() => {
    // Skip rendering when hero is off-screen
    if (!visible.current) return null;
  });

  return <>{children}</>;
}

/* ─── Hero ─── */
export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLHeadingElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line3 = useRef<HTMLHeadingElement>(null);
  const tagline = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* GSAP entrance timeline */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.4 });

      // Line 1 — "WEAR"
      tl.fromTo(line1.current, { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" });

      // Line 2 — "THE"
      tl.fromTo(line2.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, 1.6);

      // Line 3 — "VOID"
      tl.fromTo(line3.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }, 1.8);

      // CTA
      tl.fromTo(ctaRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 3.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Typewriter */
  useEffect(() => {
    const text = "SS26 COLLECTION — ZERO COMPROMISE";
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const startTimer = setTimeout(() => {
      const type = () => {
        if (tagline.current && i < text.length) {
          tagline.current.textContent = text.slice(0, i + 1);
          i++;
          timer = setTimeout(type, 60);
        }
      };
      type();
    }, 2800);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  /* Scroll hint — fade out after 100px scroll */
  useEffect(() => {
    const onScroll = () => {
      if (!scrollRef.current) return;
      scrollRef.current.style.opacity = window.scrollY > 100 ? "0" : "1";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Magnetic CTA */
  const onCtaMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(btn, { x: dx * 0.3, y: dy * 0.3, duration: 0.3, ease: "power2.out" });
  }, []);
  const onCtaLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* BG Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=1920&q=90&fit=crop")',
          filter: "brightness(0.75) contrast(1.1) saturate(0.85)",
        }}
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.95) 100%)",
        }}
      />

      {/* Three.js Canvas */}
      <div className="absolute inset-0 z-[2]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
          <RenderGate>
            <ambientLight intensity={0.4} />
            <pointLight position={[2, 3, 4]} color="#ff1a1a" intensity={0.8} />
            <directionalLight position={[-3, 5, 2]} color="#f0ede8" intensity={0.6} />
            <ClothMesh />
            <Particles />
          </RenderGate>
        </Canvas>
      </div>

      {/* HTML Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-[5vw]">
        {/* WEAR */}
        <h1
          ref={line1}
          className="font-bebas text-[clamp(8rem,18vw,20rem)] leading-none text-bone opacity-0"
        >
          WEAR
        </h1>

        {/* THE */}
        <span
          ref={line2}
          className="font-sans font-light text-[clamp(1.5rem,4vw,5rem)] text-red tracking-[0.8em] ml-[15vw] opacity-0"
        >
          THE
        </span>

        {/* VOID */}
        <h1
          ref={line3}
          className="font-bebas text-[clamp(8rem,18vw,20rem)] leading-none text-transparent opacity-0"
          style={{ WebkitTextStroke: "1.5px var(--bone)" }}
        >
          VOID
        </h1>

        {/* Tagline */}
        <p className="mt-8 h-5 flex items-center">
          <span
            ref={tagline}
            className="font-sans text-[0.7rem] font-normal tracking-[0.3em] text-steel"
          />
          <span className="w-[2px] h-[14px] bg-red ml-1 animate-pulse" />
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          onMouseMove={onCtaMove}
          onMouseLeave={onCtaLeave}
          className="group relative mt-10 border border-bone px-12 py-5 font-sans text-[0.7rem] font-medium tracking-[0.25em] uppercase text-bone overflow-hidden opacity-0"
        >
          <span className="absolute inset-0 bg-red origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease)] group-hover:scale-x-100" />
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
            EXPLORE THE DROP
          </span>
        </button>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 transition-opacity duration-500"
      >
        <span
          className="font-sans text-[0.55rem] tracking-[0.3em] text-steel"
          style={{ writingMode: "vertical-lr" }}
        >
          SCROLL
        </span>
        <div className="w-px h-10 bg-[rgba(240,237,232,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-red animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollPulse {
          0% { top: -33%; }
          100% { top: 100%; }
        }
      `}} />
    </section>
  );
}
