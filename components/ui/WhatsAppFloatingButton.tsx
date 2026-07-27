'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';
import { useSiteSettings } from '@/lib/useSiteData';

export default function WhatsAppFloatingButton() {
  const { settings } = useSiteSettings();
  const phoneNumber = settings.whatsapp_number.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    'Hi ApexPulse Team! I would like to get a quote for my business project.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.55)] transition-shadow group min-h-[44px]"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <WhatsAppIcon size={24} fill="white" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
      </div>
      <span className="font-bold text-sm hidden sm:inline-block pr-1">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
