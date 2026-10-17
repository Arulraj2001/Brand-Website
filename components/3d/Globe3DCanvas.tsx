'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NodeLocation {
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  status: string;
  color: number;
  hexColor: string;
}

const GLOBAL_NODES: NodeLocation[] = [
  { name: 'San Francisco, US', shortName: 'SF / US-West', lat: 37.7749, lng: -122.4194, status: 'Active Clients', color: 0xffb800, hexColor: '#FFB800' },
  { name: 'New York, US', shortName: 'NYC / US-East', lat: 40.7128, lng: -74.006, status: 'Active Clients', color: 0xff9500, hexColor: '#FF9500' },
  { name: 'London, UK', shortName: 'London, UK', lat: 51.5074, lng: -0.1278, status: 'Active Clients', color: 0x00f0ff, hexColor: '#00F0FF' },
  { name: 'Frankfurt, EU', shortName: 'Frankfurt, EU', lat: 50.1109, lng: 8.6821, status: 'Active Clients', color: 0x00f0ff, hexColor: '#00F0FF' },
  { name: 'Dubai, UAE', shortName: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, status: 'Active Clients', color: 0x10b981, hexColor: '#10B981' },
  { name: 'India HQ', shortName: 'Engineering HQ', lat: 12.9716, lng: 77.5946, status: 'Core Engineering Hub', color: 0xffd21e, hexColor: '#FFD21E' },
  { name: 'Singapore', shortName: 'Singapore', lat: 1.3521, lng: 103.8198, status: 'Active Clients', color: 0x00f0ff, hexColor: '#00F0FF' },
  { name: 'Sydney, AU', shortName: 'Sydney, AU', lat: -33.8688, lng: 151.2093, status: 'Active Clients', color: 0xffb800, hexColor: '#FFB800' },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function Globe3DCanvas({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string>(GLOBAL_NODES[0].name);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.0;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const goldPoint = new THREE.PointLight(0xffb800, 3.5, 30);
    goldPoint.position.set(6, 5, 5);
    scene.add(goldPoint);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 3.0, 30);
    cyanPoint.position.set(-6, -4, 5);
    scene.add(cyanPoint);

    const globeRadius = 1.78;
    const globeMasterGroup = new THREE.Group();
    scene.add(globeMasterGroup);

    // 1. Inner Solid Glow Sphere (Gives the globe tangible 3D physical volume)
    const innerGeo = new THREE.SphereGeometry(globeRadius * 0.98, 48, 48);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x080c1e,
      emissive: 0x0f172a,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.92,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeMasterGroup.add(innerSphere);

    // 2. High-Density Luminous Surface Particle Cloud (Over 2,200 points)
    const particleCount = 2400;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x00f0ff);
    const cGold = new THREE.Color(0xffb800);
    const cWhite = new THREE.Color(0xffffff);
    const cBlue = new THREE.Color(0x38bdf8);

    // Fibonacci sphere distribution for uniform high-tech matrix dot coverage
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      particlePositions[i * 3] = x * globeRadius;
      particlePositions[i * 3 + 1] = y * globeRadius;
      particlePositions[i * 3 + 2] = z * globeRadius;

      // Color variation across latitude
      let col = cCyan;
      if (Math.abs(y) < 0.25) {
        col = Math.random() > 0.4 ? cGold : cWhite;
      } else if (y > 0.25) {
        col = Math.random() > 0.5 ? cCyan : cBlue;
      } else {
        col = Math.random() > 0.6 ? cGold : cCyan;
      }

      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    globeMasterGroup.add(particlePoints);

    // 3. Luminous Latitude & Longitude Coordinate Grid
    const gridGroup = new THREE.Group();
    // Parallels (Latitudes)
    for (let lat = -60; lat <= 60; lat += 20) {
      const ringR = Math.cos((lat * Math.PI) / 180) * (globeRadius * 1.002);
      const ringY = Math.sin((lat * Math.PI) / 180) * (globeRadius * 1.002);
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 96; j++) {
        const theta = (j / 96) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * ringR, ringY, Math.sin(theta) * ringR));
      }
      ringGeo.setFromPoints(points);

      const isEquator = lat === 0;
      const ringMat = new THREE.LineBasicMaterial({
        color: isEquator ? 0xffb800 : 0x00f0ff,
        transparent: true,
        opacity: isEquator ? 0.75 : 0.35,
      });
      gridGroup.add(new THREE.Line(ringGeo, ringMat));
    }

    // Meridians (Longitudes)
    for (let lng = 0; lng < 360; lng += 30) {
      const meridianGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const radLng = (lng * Math.PI) / 180;
      for (let j = -90; j <= 90; j += 4) {
        const radLat = (j * Math.PI) / 180;
        const x = -(globeRadius * 1.002 * Math.cos(radLat) * Math.sin(radLng));
        const z = globeRadius * 1.002 * Math.cos(radLat) * Math.cos(radLng);
        const y = globeRadius * 1.002 * Math.sin(radLat);
        points.push(new THREE.Vector3(x, y, z));
      }
      meridianGeo.setFromPoints(points);
      const meridianMat = new THREE.LineBasicMaterial({
        color: lng % 60 === 0 ? 0xffb800 : 0x00f0ff,
        transparent: true,
        opacity: 0.3,
      });
      gridGroup.add(new THREE.Line(meridianGeo, meridianMat));
    }
    globeMasterGroup.add(gridGroup);

    // 4. Atmospheric Outer Ring Halo
    const haloGeo = new THREE.RingGeometry(globeRadius * 1.03, globeRadius * 1.15, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // 5. Global City Node Beacons & Radar Disks
    const nodesGroup = new THREE.Group();
    const pulsingRings: THREE.Mesh[] = [];

    GLOBAL_NODES.forEach((node) => {
      const pos = latLngToVector3(node.lat, node.lng, globeRadius * 1.01);

      // Node core beacon sphere
      const pinGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 2.2,
        roughness: 0.2,
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      nodesGroup.add(pin);

      // Radar wave ring
      const pulseGeo = new THREE.RingGeometry(0.075, 0.13, 24);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
      pulseRing.position.copy(pos);
      pulseRing.lookAt(0, 0, 0);
      nodesGroup.add(pulseRing);
      pulsingRings.push(pulseRing);
    });
    globeMasterGroup.add(nodesGroup);

    // 6. High-Contrast Arcs & Animated Light Packets
    const indiaPos = latLngToVector3(12.9716, 77.5946, globeRadius * 1.01);
    const arcsGroup = new THREE.Group();
    const arcCurves: THREE.QuadraticBezierCurve3[] = [];
    const lightPackets: THREE.Mesh[] = [];

    GLOBAL_NODES.forEach((node) => {
      if (node.name === 'India HQ') return;
      const targetPos = latLngToVector3(node.lat, node.lng, globeRadius * 1.01);

      // Elevate arc peak based on distance
      const midPoint = new THREE.Vector3().addVectors(indiaPos, targetPos).multiplyScalar(0.5);
      const distance = indiaPos.distanceTo(targetPos);
      midPoint.normalize().multiplyScalar(globeRadius * (1.18 + distance * 0.15));

      const curve = new THREE.QuadraticBezierCurve3(indiaPos, midPoint, targetPos);
      arcCurves.push(curve);

      const arcPoints = curve.getPoints(48);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);

      // Light packet traveling on arc
      const packetGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      arcsGroup.add(packet);
      lightPackets.push(packet);
    });
    globeMasterGroup.add(arcsGroup);

    // 7. Interactive Drag & Mouse Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotSpeedX = 0.0005;
    let rotSpeedY = 0.0035;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      rotSpeedY = deltaX * 0.006;
      rotSpeedX = deltaY * 0.006;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Continuous natural rotation
      globeMasterGroup.rotation.y += rotSpeedY;
      globeMasterGroup.rotation.x += rotSpeedX;

      // Dampen manual drag back to default rotation
      if (!isDragging) {
        rotSpeedY += (0.0035 - rotSpeedY) * 0.04;
        rotSpeedX += (0.0002 - rotSpeedX) * 0.04;
      }

      // Animate pulsing radar rings
      pulsingRings.forEach((ring, idx) => {
        const scale = 1 + (Math.sin(time * 3.5 + idx * 0.7) + 1) * 0.45;
        ring.scale.set(scale, scale, scale);
      });

      // Animate light packets traveling along the communication arcs
      arcCurves.forEach((curve, idx) => {
        const packet = lightPackets[idx];
        if (packet) {
          const t = (time * 0.35 + idx * 0.18) % 1;
          const pos = curve.getPoint(t);
          packet.position.copy(pos);
        }
      });

      // Keep atmospheric halo facing camera
      haloMesh.lookAt(camera.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);

      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
}
