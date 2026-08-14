'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';
import { useSiteSettings } from '@/lib/useSiteData';

export default function WhatsAppFloatingButton() {
  const { settings } = useSiteSettings();

  const activeSettings = settings;
  const phoneNumber = activeSettings.whatsapp_number.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    `Hi ${activeSettings.brand_name || 'Ostrune'}! I would like to book a strategy call for my project.`
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.6)] transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        <WhatsAppIcon size={24} fill="white" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
      </div>
    </motion.a>
  );
}
