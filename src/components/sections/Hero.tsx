"use client";
import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vElevation;

void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Wave simulation + mouse interaction
    float elevation = sin(modelPosition.x * 1.5 - uTime * 1.2) * 0.2;
    elevation += sin(modelPosition.y * 1.2 + uTime * 0.8) * 0.2;
    
    // Add mouse repulsion
    float dist = distance(uMouse, vec2(modelPosition.x, modelPosition.y));
    float mouseEffect = smoothstep(4.0, 0.0, dist) * 0.8;
    
    elevation -= mouseEffect;
    
    modelPosition.z += elevation;
    vElevation = elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
}
`;

const fragmentShader = `
uniform vec3 uColor1;
uniform vec3 uColor2;
varying float vElevation;

void main() {
    // Matte black cloth
    float mixStrength = (vElevation + 0.3) * 1.8;
    vec3 color = mix(uColor1, uColor2, mixStrength);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

function ClothMesh() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [mouse, setMouse] = useState(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse(new THREE.Vector2(
        (e.clientX / window.innerWidth) * 20 - 10,
        -(e.clientY / window.innerHeight) * 20 + 10
      ));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color("#050505") },
    uColor2: { value: new THREE.Color("#161616") }
  }), []);

  return (
    <mesh rotation={[-Math.PI / 6, 0, 0]} position={[0, -0.5, -4]}>
      <planeGeometry args={[35, 35, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesCount = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i+=3) {
      pos[i] = (Math.random() - 0.5) * 25; 
      pos[i+1] = (Math.random() - 0.5) * 25; 
      pos[i+2] = (Math.random() - 0.5) * 10 - 2; 
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for(let i = 0; i < particlesCount; i++) {
        posArray[i*3 + 1] += delta * 0.6; // Smoke moves up
        posArray[i*3] += Math.sin((state.clock.elapsedTime * 1000 + i)/1000) * 0.002;
        
        if(posArray[i*3 + 1] > 12) {
          posArray[i*3 + 1] = -12;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a0a0a0" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const typingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.3 }); // Wait for loader
      
      tl.fromTo(line1Ref.current, 
        { x: "-100vw", opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(line3Ref.current,
        { x: "100vw", opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=1.0"
      )
      .fromTo(line2Ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.6"
      );

      // Simple typing effect
      const tagline = "SS26 COLLECTION — ZERO COMPROMISE";
      if (typingRef.current) {
        typingRef.current.textContent = "";
        let i = 0;
        const type = () => {
          if (i < tagline.length) {
            typingRef.current!.textContent += tagline.charAt(i);
            i++;
            setTimeout(type, 30);
          }
        };
        setTimeout(type, 2400); // start after intro
      }
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Mouse Parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    gsap.to(line1Ref.current, { x: x * -30, y: y * -30, duration: 1, ease: "power2.out" });
    gsap.to(line2Ref.current, { x: x * -10, y: y * -10, duration: 1, ease: "power2.out" });
    gsap.to(line3Ref.current, { x: x * -60, y: y * -60, duration: 1, ease: "power2.out" });
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.5} />
          <ClothMesh />
          <Particles />
        </Canvas>
      </div>

      {/* Red grain specific to hero overlay */}
      <div className="absolute inset-0 z-[1] bg-red mix-blend-overlay opacity-8 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none h-full mt-10">
        
        {/* Texts container - to maintain centering despite offsets */}
        <div className="flex flex-col items-center relative mix-blend-difference">
          <h1 ref={line1Ref} className="font-bebas text-[20vw] leading-[0.75] text-bone tracking-tighter m-0 p-0 text-center">
            WEAR
          </h1>
          
          <h2 ref={line2Ref} className="absolute top-[35%] left-[80%] font-sans font-light text-red text-2xl md:text-4xl tracking-widest whitespace-nowrap">
            THE
          </h2>
          
          <h1 ref={line3Ref} className="font-bebas text-[20vw] leading-[0.75] text-transparent tracking-tighter m-0 p-0 text-center" 
              style={{ WebkitTextStroke: "2px var(--bone)" }}>
            VOID
          </h1>
        </div>

      </div>

      {/* Bottom element */}
      <div className="absolute bottom-10 left-0 w-full flex flex-col items-center z-10 pointer-events-auto">
        <p className="font-sans text-xs md:text-sm text-bone tracking-[0.4em] uppercase h-4 flex items-center">
          <span ref={typingRef}></span>
          <span className="w-[8px] h-[14px] bg-red ml-2 inline-block animate-pulse"></span>
        </p>
        
        <div className="mt-8 w-[1px] h-16 bg-gradient-to-b from-red to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[30%] bg-bone animate-[scrollIndicator_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollIndicator {
          0% { top: -30%; }
          100% { top: 100%; }
        }
      `}} />

    </section>
  );
}
