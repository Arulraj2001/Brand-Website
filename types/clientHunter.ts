export type LeadPriority = 'GOLDMINE' | 'REDESIGN' | 'NEEDS_AUDIT' | 'LOW_PRIORITY';

export type LeadStatus =
  | 'NEW'
  | 'PITCH_SENT'
  | 'DEMO_SHARED'
  | 'IN_TALKS'
  | 'WON'
  | 'ARCHIVED';

export type PhoneType = 'MOBILE' | 'LANDLINE' | 'UNKNOWN';

export interface ScrapedLead {
  id: string;
  place_id?: string;
  name: string;
  description?: string;
  reviews: number;
  rating: number;
  website: string;
  email?: string;
  phone: string;
  cleanPhone: string;
  phoneType: PhoneType;
  main_category: string;
  categories: string[];
  address: string;
  city: string;
  owner_name?: string;
  featured_image?: string;
  link?: string;
  query?: string;
  can_claim?: boolean;
  priority: LeadPriority;
  priorityReason: string;
  status: LeadStatus;
  notes?: string;
  pitchText?: string;
  previewUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OutreachTemplate {
  id: string;
  name: string;
  niche: 'real_estate' | 'construction' | 'contractor' | 'healthcare' | 'general';
  language: 'en' | 'ta' | 'mixed';
  subject?: string;
  templateText: string;
}

export interface ProcessingSummary {
  totalInput: number;
  validLeads: number;
  filteredNoise: number;
  goldmineCount: number;
  redesignCount: number;
  mobileCount: number;
}
