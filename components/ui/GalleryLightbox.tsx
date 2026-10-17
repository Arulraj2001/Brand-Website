'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryLightboxProps {
  images: string[];
  projectTitle?: string;
}

export default function GalleryLightbox({ images, projectTitle }: GalleryLightboxProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const realScreenshots = (images || []).filter(
    (url) => Boolean(url) && !url.includes('images.unsplash.com')
  );

  if (realScreenshots.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
        <h2 className="text-2xl font-black text-white tracking-tight">System Dossier &amp; Architecture Gallery</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {realScreenshots.map((url, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(url)}
            className="relative h-72 rounded-2xl overflow-hidden cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 shadow-xl cursor-pointer group transition-all"
          >
            <Image
              src={url}
              alt={`${projectTitle || 'Project'} Screenshot ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-mono text-xs uppercase tracking-wider backdrop-blur-xs">
              <ZoomIn size={18} className="text-[#FFB800]" />
              <span>Inspect High-Res Vector</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          >
            <div className="relative max-w-5xl w-full h-[85vh] rounded-3xl overflow-hidden border border-white/[0.15] bg-[#0A0C14] shadow-[0_0_80px_rgba(0,0,0,0.9)]">
              <Image src={selectedImage} alt="Expanded Screenshot" fill className="object-contain p-2" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-[#FFB800] text-white hover:text-black flex items-center justify-center transition-all border border-white/20 shadow-lg cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
