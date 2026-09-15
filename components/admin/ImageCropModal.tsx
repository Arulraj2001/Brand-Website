'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crop, ZoomIn, ZoomOut, RotateCcw, Check, X, Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface CropResult {
  file: File;
  previewUrl: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  reductionPercentage: number;
  dimensions: { width: number; height: number };
}

interface AspectRatioOption {
  id: string;
  label: string;
  ratio: number; // width / height
  targetWidth: number;
  targetHeight: number;
}

const ASPECT_RATIOS: AspectRatioOption[] = [
  { id: '16_9', label: '16:9 (Blog Card & Banner)', ratio: 16 / 9, targetWidth: 1200, targetHeight: 675 },
  { id: '1_91', label: '1.91:1 (Social / OG)', ratio: 1.91 / 1, targetWidth: 1200, targetHeight: 628 },
  { id: '4_3', label: '4:3 (Classic)', ratio: 4 / 3, targetWidth: 1200, targetHeight: 900 },
  { id: '1_1', label: '1:1 (Square)', ratio: 1 / 1, targetWidth: 1000, targetHeight: 1000 },
];

interface ImageCropModalProps {
  isOpen: boolean;
  rawFile: File | null;
  onClose: () => void;
  onConfirm: (result: CropResult) => Promise<void> | void;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function ImageCropModal({
  isOpen,
  rawFile,
  onClose,
  onConfirm,
}: ImageCropModalProps) {
  const [selectedAspect, setSelectedAspect] = useState<AspectRatioOption>(ASPECT_RATIOS[0]);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [imageNaturalSize, setImageNaturalSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [processing, setProcessing] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Derive Object URL via useMemo
  const imageSrc = useMemo(() => {
    if (!rawFile) return '';
    return URL.createObjectURL(rawFile);
  }, [rawFile]);

  // Clean up Object URL
  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  const handleImageLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedAspect(ASPECT_RATIOS[0]);
  };

  // Drag to pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile/trackpad
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel to zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    setZoom((prev) => Math.min(Math.max(prev + delta, 1), 3.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Crop and WebP Auto-Compression Execution
  const handleApplyCrop = useCallback(async () => {
    if (!imageRef.current || !containerRef.current || !rawFile) return;

    setProcessing(true);

    try {
      const img = imageRef.current;
      const container = containerRef.current;

      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      // Calculate the crop box relative to the image position and scale
      const scaleX = imageNaturalSize.width / imgRect.width;
      const scaleY = imageNaturalSize.height / imgRect.height;

      const cropX = Math.max(0, (containerRect.left - imgRect.left) * scaleX);
      const cropY = Math.max(0, (containerRect.top - imgRect.top) * scaleY);
      const cropWidth = Math.min(imageNaturalSize.width - cropX, containerRect.width * scaleX);
      const cropHeight = Math.min(imageNaturalSize.height - cropY, containerRect.height * scaleY);

      // Create off-screen canvas at target resolution
      const canvas = document.createElement('canvas');
      canvas.width = selectedAspect.targetWidth;
      canvas.height = selectedAspect.targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not initialize canvas context');

      // High quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw cropped area scaled to target size
      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        selectedAspect.targetWidth,
        selectedAspect.targetHeight
      );

      // Convert to WebP with 0.82 quality (optimal balance of sharpness and tiny byte size)
      const blob: Blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error('Failed to generate image blob'));
          },
          'image/webp',
          0.82
        );
      });

      // Construct clean WebP filename
      const baseName = (rawFile.name || 'cover').replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-');
      const optimizedFileName = `${baseName}-${selectedAspect.id}.webp`;

      const optimizedFile = new File([blob], optimizedFileName, {
        type: 'image/webp',
        lastModified: Date.now(),
      });

      const previewUrl = URL.createObjectURL(blob);
      const reduction = Math.max(
        0,
        Math.round(((rawFile.size - blob.size) / rawFile.size) * 100)
      );

      const result: CropResult = {
        file: optimizedFile,
        previewUrl,
        originalSizeBytes: rawFile.size,
        compressedSizeBytes: blob.size,
        reductionPercentage: reduction,
        dimensions: {
          width: selectedAspect.targetWidth,
          height: selectedAspect.targetHeight,
        },
      };

      await onConfirm(result);
      onClose();
    } catch (err) {
      console.error('Error during image crop & compression:', err);
    } finally {
      setProcessing(false);
    }
  }, [imageNaturalSize, rawFile, selectedAspect, onConfirm, onClose]);

  if (!isOpen || !rawFile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E5E7EB] flex flex-col"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FFF9E6] border border-[#FFD21E] text-[#FF9D00] flex items-center justify-center font-bold">
                <Crop size={16} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#1C1C1C]">
                  Crop &amp; Auto-Compress Cover Image
                </h3>
                <p className="text-[11px] text-[#6B7280]">
                  Frame your image to 16:9 card ratio and convert to ultra-lightweight WebP.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={processing}
              className="w-8 h-8 rounded-lg text-[#9CA3AF] hover:text-[#1C1C1C] hover:bg-[#E5E7EB] flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Aspect Ratio Selector Pills */}
          <div className="px-5 py-2.5 border-b border-[#E5E7EB] bg-white flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-[#6B7280] mr-1">Aspect Ratio:</span>
            {ASPECT_RATIOS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedAspect(item);
                  handleReset();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedAspect.id === item.id
                    ? 'bg-[#FF9D00] text-white shadow-xs'
                    : 'bg-[#F3F4F6] text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#E5E7EB]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Crop Viewport */}
          <div className="p-5 flex flex-col items-center bg-[#1C1C1C]/5">
            <div
              className="relative w-full overflow-hidden rounded-xl border-2 border-[#FF9D00] bg-[#1C1C1C] cursor-move shadow-inner select-none flex items-center justify-center"
              style={{
                aspectRatio: `${selectedAspect.ratio}`,
                maxHeight: '380px',
              }}
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
            >
              {/* Image Element */}
              {imageSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Crop Target"
                  onLoad={handleImageLoaded}
                  draggable={false}
                  className="max-w-none transition-transform duration-75 pointer-events-none"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: 'center center',
                  }}
                />
              )}

              {/* Rule of Thirds Guided Grid Lines */}
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-30">
                <div className="border-r border-b border-white/70" />
                <div className="border-r border-b border-white/70" />
                <div className="border-b border-white/70" />
                <div className="border-r border-b border-white/70" />
                <div className="border-r border-b border-white/70" />
                <div className="border-b border-white/70" />
                <div className="border-r border-white/70" />
                <div className="border-r border-white/70" />
                <div />
              </div>

              {/* Pan Hint Overlay Badge */}
              <div className="absolute bottom-2.5 left-2.5 pointer-events-none bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded text-[10px] font-semibold flex items-center gap-1.5 shadow-sm">
                <span>Drag to pan</span>
                <span>•</span>
                <span>Scroll to zoom</span>
              </div>

              {/* Output Resolution Tag */}
              <div className="absolute top-2.5 right-2.5 pointer-events-none bg-[#FF9D00] text-white px-2 py-0.5 rounded text-[10px] font-extrabold shadow-sm">
                {selectedAspect.targetWidth} × {selectedAspect.targetHeight} px
              </div>
            </div>

            {/* Controls Bar: Zoom Slider & Reset */}
            <div className="mt-4 w-full flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#E5E7EB]">
              {/* Zoom Slider */}
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.max(prev - 0.2, 1))}
                  className="p-1 rounded-md text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#F3F4F6]"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>

                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-[#FF9D00] cursor-pointer h-1.5 bg-[#E5E7EB] rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.min(prev + 0.2, 3))}
                  className="p-1 rounded-md text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#F3F4F6]"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>

                <span className="text-[11px] font-mono font-bold text-[#6B7280] w-10 text-right">
                  {zoom.toFixed(1)}x
                </span>
              </div>

              {/* Reset Re-center Button */}
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#6B7280] hover:text-[#1C1C1C] px-2.5 py-1.5 rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Optimization Stats Card */}
          <div className="px-5 py-3 bg-[#FFFDF5] border-t border-[#FEF3C7] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#FF9D00]" />
              <span className="font-bold text-[#1C1C1C]">Auto-Compression Engine:</span>
              <span className="text-[#6B7280]">
                Original: <strong className="text-[#1C1C1C]">{formatBytes(rawFile.size)}</strong>
              </span>
              <ArrowRight size={12} className="text-[#9CA3AF]" />
              <span className="text-[#10B981] font-bold">
                Target: WebP (~40–80 KB)
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280] font-semibold">
              <ImageIcon size={12} className="text-[#3B82F6]" />
              <span>Pixel-perfect card framing</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-5 py-3.5 border-t border-[#E5E7EB] bg-white flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={processing}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleApplyCrop}
              disabled={processing}
              className="min-w-[170px]"
            >
              {processing ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Compressing WebP...
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Check size={14} />
                  <span>Crop &amp; Auto-Compress</span>
                </span>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
