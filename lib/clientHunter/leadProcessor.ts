import { ScrapedLead, LeadPriority, PhoneType, ProcessingSummary } from '@/types/clientHunter';

// Keywords that indicate personal residential pins, apartments, or housing colonies on Google Maps
const NOISE_NAME_KEYWORDS = [
  'house',
  'illam',
  'villa',
  'home',
  'housing society',
  'housing development',
  'apartment building',
  'nagar road',
  'railway road',
  'kudil',
  'apartments',
];

// Commercial terms that override noise words (e.g. "Dream Home Construction", "Shaghithya Homes", "AVP Properties")
const COMMERCIAL_OVERRIDE_KEYWORDS = [
  'builder',
  'construction',
  'realtor',
  'properties',
  'property',
  'developer',
  'promoters',
  'promoter',
  'agency',
  'consultant',
  'contractor',
  'interiors',
  'enterprises',
  'pvt ltd',
  'limited',
  'firm',
  'foundation',
  'associates',
  'solutions',
  'architect',
  'clinic',
  'dental',
  'hospital',
  'gym',
  'fitness',
  'restaurant',
  'cafe',
];

/**
 * Parses raw CSV or TSV string from Omkar scraper exports
 */
export function parseOmkarExport(rawText: string): Record<string, string>[] {
  if (!rawText || !rawText.trim()) return [];

  // Detect separator from the first line
  const firstNewline = rawText.indexOf('\n');
  const firstLine = firstNewline !== -1 ? rawText.slice(0, firstNewline) : rawText;
  const separator = firstLine.includes('\t') ? '\t' : ',';

  // State-machine parser that properly handles multiline text inside double quotes
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < rawText.length; i++) {
    const char = rawText[i];

    if (char === '"') {
      if (inQuotes && rawText[i + 1] === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === separator && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      // Consume \r\n as a single newline
      if (char === '\r' && rawText[i + 1] === '\n') {
        i++;
      }
      currentRow.push(currentField.trim());
      currentField = '';
      if (currentRow.some((field) => field.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentField += char;
    }
  }

  // Handle trailing field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((field) => field.length > 0)) {
      rows.push(currentRow);
    }
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.replace(/^"|"$/g, '').trim());
  const records: Record<string, string>[] = [];

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    const record: Record<string, string> = {};
    headers.forEach((header, colIndex) => {
      record[header] = (values[colIndex] || '').replace(/^"|"$/g, '').trim();
    });

    if (record['name']) {
      records.push(record);
    }
  }

  return records;
}

/**
 * Cleans phone number and detects if it is an Indian Mobile or Landline
 */
export function analyzePhone(rawPhone: string): { cleanPhone: string; phoneType: PhoneType } {
  if (!rawPhone) return { cleanPhone: '', phoneType: 'UNKNOWN' };

  // Remove spaces, brackets, hyphens
  let digits = rawPhone.replace(/\D/g, '');

  // Handle leading 0 (e.g. 09841844698 -> 9841844698)
  if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }

  // Handle country code 91
  if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  }

  // Indian mobile numbers have 10 digits starting with 6, 7, 8, or 9
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return {
      cleanPhone: `91${digits}`,
      phoneType: 'MOBILE',
    };
  }

  // Chennai / Indian landlines typically start with STD codes (like 044, 44, etc.)
  if (digits.length >= 8 && digits.length <= 11) {
    return {
      cleanPhone: digits,
      phoneType: 'LANDLINE',
    };
  }

  // International phone
  if (digits.length >= 10) {
    return {
      cleanPhone: digits,
      phoneType: 'MOBILE',
    };
  }

  return { cleanPhone: digits, phoneType: 'UNKNOWN' };
}

/**
 * Checks if a lead is personal residential noise vs a legitimate commercial business
 */
export function isResidentialNoise(name: string, category: string, categories: string): boolean {
  const combined = `${name} ${category} ${categories}`.toLowerCase();

  // If it explicitly mentions commercial terms, it's NOT noise
  const hasCommercialTerm = COMMERCIAL_OVERRIDE_KEYWORDS.some((kw) => combined.includes(kw));
  if (hasCommercialTerm) {
    return false;
  }

  // Check if name or category matches noise indicators
  const hasNoiseKeyword = NOISE_NAME_KEYWORDS.some((kw) => combined.includes(kw));
  return hasNoiseKeyword;
}

/**
 * Extracts city from address string or query
 */
export function extractCity(address: string, query: string): string {
  if (address) {
    const parts = address.split(',').map((p) => p.trim());
    if (parts.length >= 2) {
      // Return 2nd or 3rd from last (usually City, State PIN)
      for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i];
        if (/chennai|tirunelveli|bangalore|bengaluru|coimbatore|madurai|hyderabad|mumbai|delhi|dallas|austin|london/i.test(part)) {
          return part;
        }
      }
      return parts[parts.length - 2] || parts[parts.length - 1];
    }
  }

  if (query) {
    const match = query.match(/in\s+([^,]+)/i);
    if (match && match[1]) return match[1].trim();
  }

  return 'Chennai';
}

/**
 * Generates an automated, respectful, high-converting outreach pitch
 */
export function generateOutreachPitch(lead: Partial<ScrapedLead>): string {
  const name = lead.name || 'Sir/Madam';
  const city = lead.city || 'your city';
  const reviews = lead.reviews || 0;
  const rating = lead.rating ? lead.rating.toFixed(1) : '5.0';

  if (lead.priority === 'GOLDMINE') {
    return `Vanakkam / Hello ${name},

I saw your business on Google Maps with an impressive ${rating}★ rating and ${reviews} positive reviews!

I noticed that your Google profile doesn't have a website link attached yet. When potential clients in ${city} search online, they cannot easily view your past projects, pricing, or floor plans and might call competitors instead.

I put together a quick, modern 1-page website preview tailored for ${name} that is already mobile-friendly.

Would it be okay if I share the demo link with you? (No cost or strings attached).

Warm regards,
Arulraj S | Ostrune Web Architecture
+91 8637474067`;
  }

  if (lead.priority === 'REDESIGN') {
    return `Hello ${name},

I came across your listing on Google Maps while researching top businesses in ${city}. You have a great reputation with ${reviews} reviews.

I visited your website (${lead.website}) and noticed a quick fix that could help your conversions: it is currently loading over insecure HTTP (showing a "Not Secure" browser warning), which can cause up to 40% of visitors to bounce before calling you.

We recently built real estate & business platforms like Yourchoiceproperties.in and VizhiTn.in, and I’d be glad to share a quick 1-minute video breakdown of how to make your site secure, ultra-fast, and mobile-optimized.

Would you be open to checking it out?

Best,
Arulraj S | Ostrune Web Architecture
+91 8637474067`;
  }

  return `Hello ${name},

I was reviewing prominent services in ${city} and was impressed by your profile and reviews.

We help established businesses transform their online presence into automated customer acquisition engines with modern web architecture and Google ranking systems.

Would you be open to reviewing a quick sample preview of what a modern platform could look like for ${name}?

Best regards,
Arulraj S | Ostrune Web Architecture
+91 8637474067`;
}

/**
 * Builds the WhatsApp Web click-to-chat deep link
 */
export function buildWhatsAppLink(cleanPhone: string, pitchText: string): string {
  if (!cleanPhone) return '';
  const encoded = encodeURIComponent(pitchText);
  return `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
}

/**
 * Builds the Dynamic Preview URL
 */
export function buildPreviewUrl(lead: Partial<ScrapedLead>): string {
  const niche = lead.main_category?.toLowerCase().includes('real estate')
    ? 'real-estate'
    : lead.main_category?.toLowerCase().includes('construct')
    ? 'construction'
    : 'general-business';

  const params = new URLSearchParams({
    name: lead.name || '',
    phone: lead.cleanPhone || lead.phone || '',
    city: lead.city || 'Chennai',
    rating: String(lead.rating || 5),
    reviews: String(lead.reviews || 0),
    category: lead.main_category || 'Commercial Services',
  });

  return `/preview/${niche}?${params.toString()}`;
}

/**
 * Main ingestion & processing pipeline for raw Omkar export text
 */
export function processRawOmkarData(rawText: string): {
  leads: ScrapedLead[];
  summary: ProcessingSummary;
} {
  const rows = parseOmkarExport(rawText);
  let totalInput = rows.length;
  let filteredNoise = 0;
  let goldmineCount = 0;
  let redesignCount = 0;
  let mobileCount = 0;

  const leads: ScrapedLead[] = [];

  rows.forEach((row, index) => {
    const name = row['name'] || '';
    const mainCategory = row['main_category'] || '';
    const categoriesStr = row['categories'] || '';
    const website = (row['website'] || '').trim();
    const rawPhone = row['phone'] || '';
    const reviews = parseInt(row['reviews'] || '0', 10) || 0;
    const rating = parseFloat(row['rating'] || '0') || 0;
    const address = row['address'] || '';
    const query = row['query'] || '';

    // Check for residential noise
    if (isResidentialNoise(name, mainCategory, categoriesStr)) {
      filteredNoise++;
      return;
    }

    const { cleanPhone, phoneType } = analyzePhone(rawPhone);
    if (phoneType === 'MOBILE') {
      mobileCount++;
    }

    const city = extractCity(address, query);

    // Determine Gap Priority
    let priority: LeadPriority = 'NEEDS_AUDIT';
    let priorityReason = 'Standard prospect';

    if (!website) {
      if (reviews >= 2 && phoneType === 'MOBILE') {
        priority = 'GOLDMINE';
        priorityReason = 'No website, high rating, and direct mobile number available for WhatsApp.';
        goldmineCount++;
      } else {
        priority = 'NEEDS_AUDIT';
        priorityReason = 'No website, but low review count or no verified mobile phone.';
      }
    } else if (website.startsWith('http://') && !website.startsWith('https://')) {
      priority = 'REDESIGN';
      priorityReason = 'Website exists but is insecure (HTTP) and needs SSL & mobile modernization.';
      redesignCount++;
    } else if (rating > 0 && rating < 4.2 && reviews >= 5) {
      priority = 'REDESIGN';
      priorityReason = 'Lower review rating with active customer traffic. Needs social proof & conversion overhaul.';
      redesignCount++;
    } else {
      priority = 'LOW_PRIORITY';
      priorityReason = 'Already has a modern HTTPS website attached.';
    }

    const lead: ScrapedLead = {
      id: row['place_id'] ? `${row['place_id']}-${index}` : `lead-${Date.now()}-${index}`,
      place_id: row['place_id'],
      name,
      description: row['description'],
      reviews,
      rating,
      website,
      email: row['email'] || row['emails'] || '',
      phone: rawPhone,
      cleanPhone,
      phoneType,
      main_category: mainCategory,
      categories: categoriesStr.split(',').map((c) => c.trim()).filter(Boolean),
      address,
      city,
      owner_name: row['owner_name'],
      featured_image: row['featured_image'],
      link: row['link'],
      query,
      can_claim: row['can_claim'] === '1',
      priority,
      priorityReason,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    lead.pitchText = generateOutreachPitch(lead);
    lead.previewUrl = buildPreviewUrl(lead);

    leads.push(lead);
  });

  // Sort: GOLDMINE first, then REDESIGN, then by review count descending
  leads.sort((a, b) => {
    const priorityWeight: Record<LeadPriority, number> = {
      GOLDMINE: 3,
      REDESIGN: 2,
      NEEDS_AUDIT: 1,
      LOW_PRIORITY: 0,
    };
    if (priorityWeight[b.priority] !== priorityWeight[a.priority]) {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    return b.reviews - a.reviews;
  });

  return {
    leads,
    summary: {
      totalInput,
      validLeads: leads.length,
      filteredNoise,
      goldmineCount,
      redesignCount,
      mobileCount,
    },
  };
}
