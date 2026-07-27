'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryLightboxProps {
  images: string[];
}

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-extrabold text-[#0F1222]">Project Screenshots & Analytics Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((url, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(url)}
            className="relative h-72 rounded-2xl overflow-hidden border border-[#E7E8F0] shadow-sm cursor-pointer group"
          >
            <Image
              src={url}
              alt={`Gallery screenshot ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-[#0F1222]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold text-sm">
              <ZoomIn size={20} />
              <span>Click to Expand</span>
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
            className="fixed inset-0 z-50 bg-[#0F1222]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl w-full h-[80vh] rounded-3xl overflow-hidden border border-white/20">
              <Image src={selectedImage} alt="Expanded Screenshot" fill className="object-contain" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#0F1222] flex items-center justify-center transition-colors"
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
