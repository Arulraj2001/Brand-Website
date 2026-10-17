'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
}

export default function Hero3DCanvas({ className = '', theme = 'auto' }: Hero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'auto';

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xff9d00, 4, 20);
    goldPointLight.position.set(5, 5, 5);
    scene.add(goldPointLight);

    const cyanPointLight = new THREE.PointLight(0x3b82f6, 3, 20);
    cyanPointLight.position.set(-5, -5, 3);
    scene.add(cyanPointLight);

    const emeraldPointLight = new THREE.PointLight(0x10b981, 2, 20);
    emeraldPointLight.position.set(0, 6, -3);
    scene.add(emeraldPointLight);

    // 3. Central 3D Cybernetic Crystal Core
    // Outer Wireframe Cage (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(1.9, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xffd21e,
      wireframe: true,
      wireframeLinewidth: 1.5,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0xff9d00,
      emissiveIntensity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // Inner Glowing Core (Octahedron / Diamond)
    const innerGeo = new THREE.OctahedronGeometry(1.1, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffa500,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      ior: 1.5,
      thickness: 1.2,
      emissive: 0xff7700,
      emissiveIntensity: 0.6,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // 4. Dual Orbital Tech Rings
    const ring1Geo = new THREE.TorusGeometry(2.6, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xffd21e,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0xffb800,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.1, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0x2563eb,
      emissiveIntensity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    scene.add(ring2);

    // 5. Tech Satellite Nodes on the Rings
    const nodeCount = 3;
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeColors = [0xffd21e, 0x10b981, 0x3b82f6];

    for (let i = 0; i < nodeCount; i++) {
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        emissive: nodeColors[i],
        emissiveIntensity: 0.8,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      scene.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    }

    // 6. Ambient Particle Cloud / Starfield Dust
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const col1 = new THREE.Color(0xffd21e);
    const col2 = new THREE.Color(0xff9d00);
    const col3 = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 2.5 + Math.random() * 3.5;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(theta);

      const chosenCol = Math.random() > 0.6 ? col1 : Math.random() > 0.3 ? col2 : col3;
      particleColors[i3] = chosenCol.r;
      particleColors[i3 + 1] = chosenCol.g;
      particleColors[i3 + 2] = chosenCol.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    setIsLoaded(true);

    // 7. Mouse & Touch Interaction Tracking (with lerp damping)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let clickImpulse = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.9;
      targetY = y * 0.9;
    };

    const onPointerClick = () => {
      clickImpulse = 1.0;
      setIsInteracting(true);
      setTimeout(() => setIsInteracting(false), 600);
    };

    window.addEventListener('mousemove', onPointerMove);
    container.addEventListener('click', onPointerClick);

    // 8. Viewport Intersection Observer (Auto-pause when scrolled out of view)
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 9. Resize Handler
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Save GPU cycles when scrolled away

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Click shockwave decay
      if (clickImpulse > 0) {
        clickImpulse *= 0.92;
        if (clickImpulse < 0.01) clickImpulse = 0;
      }

      // Rotate Outer Core
      const baseSpeed = 0.4 + clickImpulse * 2.5;
      outerMesh.rotation.x = elapsedTime * baseSpeed * 0.5 + mouseY * 0.8;
      outerMesh.rotation.y = elapsedTime * baseSpeed * 0.7 + mouseX * 0.8;
      const scaleOuter = 1 + Math.sin(elapsedTime * 2) * 0.03 + clickImpulse * 0.2;
      outerMesh.scale.set(scaleOuter, scaleOuter, scaleOuter);

      // Rotate Inner Glowing Core
      innerMesh.rotation.x = -elapsedTime * baseSpeed * 0.8;
      innerMesh.rotation.z = elapsedTime * baseSpeed * 0.6;
      const scaleInner = 1 + Math.cos(elapsedTime * 3) * 0.05 + clickImpulse * 0.3;
      innerMesh.scale.set(scaleInner, scaleInner, scaleInner);

      // Rotate Rings
      ring1.rotation.z = elapsedTime * 0.35;
      ring1.rotation.x = Math.PI / 3 + mouseY * 0.4;

      ring2.rotation.z = -elapsedTime * 0.25;
      ring2.rotation.y = Math.PI / 4 + mouseX * 0.4;

      // Position Orbiting Nodes along the rings
      const radius1 = 2.6;
      nodeMeshes[0].position.x = Math.cos(elapsedTime * 1.2) * radius1;
      nodeMeshes[0].position.y = Math.sin(elapsedTime * 1.2) * Math.sin(Math.PI / 3) * radius1;
      nodeMeshes[0].position.z = Math.sin(elapsedTime * 1.2) * Math.cos(Math.PI / 3) * radius1;

      const radius2 = 3.1;
      nodeMeshes[1].position.x = Math.cos(-elapsedTime * 0.9) * radius2;
      nodeMeshes[1].position.y = Math.sin(-elapsedTime * 0.9) * Math.cos(Math.PI / 4) * radius2;
      nodeMeshes[1].position.z = Math.sin(-elapsedTime * 0.9) * Math.sin(Math.PI / 4) * radius2;

      const radius3 = 1.9;
      nodeMeshes[2].position.x = Math.sin(elapsedTime * 1.5) * radius3;
      nodeMeshes[2].position.y = Math.cos(elapsedTime * 1.5) * radius3;
      nodeMeshes[2].position.z = Math.sin(elapsedTime * 1.5) * 0.5;

      // Rotate Particles gently
      particles.rotation.y = elapsedTime * 0.06 + mouseX * 0.2;
      particles.rotation.x = mouseY * 0.15;

      // Dynamic light movement
      goldPointLight.position.x = 4 * Math.cos(elapsedTime);
      goldPointLight.position.y = 4 * Math.sin(elapsedTime);

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('click', onPointerClick);
      observer.disconnect();

      // Dispose Three.js objects
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      nodeMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#FFB800]/60 animate-spin" />
        </div>
      )}
    </div>
  );
}
