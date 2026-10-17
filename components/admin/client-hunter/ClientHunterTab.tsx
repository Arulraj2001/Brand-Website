'use client';

import React, { useState, useEffect } from 'react';
import {
  Target,
  UploadCloud,
  FileSpreadsheet,
  Trash2,
  ExternalLink,
  MessageSquare,
  Phone,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Copy,
  Check,
  Eye,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Send,
  X,
  Mail,
  Loader2,
  Key,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ScrapedLead, LeadPriority, LeadStatus, ProcessingSummary } from '@/types/clientHunter';
import { processRawOmkarData, buildWhatsAppLink } from '@/lib/clientHunter/leadProcessor';
import { SAMPLE_OMKAR_TSV } from '@/lib/clientHunter/sampleOmkarData';

const STORAGE_KEY = 'ostrune_client_hunter_leads';
const API_KEY_STORAGE = 'ostrune_email_api_key';
const PROVIDER_STORAGE = 'ostrune_email_provider';

export default function ClientHunterTab() {
  const [leads, setLeads] = useState<ScrapedLead[]>([]);
  const [summary, setSummary] = useState<ProcessingSummary | null>(null);
  const [filterTab, setFilterTab] = useState<'ALL' | 'GOLDMINE' | 'REDESIGN' | 'MOBILE' | 'CONTACTED' | 'WON'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [rawInputText, setRawInputText] = useState('');
  const [showInputBox, setShowInputBox] = useState(false);
  const [selectedLeadForPitch, setSelectedLeadForPitch] = useState<ScrapedLead | null>(null);
  const [pitchChannel, setPitchChannel] = useState<'WHATSAPP' | 'EMAIL'>('WHATSAPP');
  const [customPitchText, setCustomPitchText] = useState('');
  const [emailRecipient, setEmailRecipient] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [emailProvider, setEmailProvider] = useState<'resend' | 'brevo'>('resend');
  const [showApiKeyField, setShowApiKeyField] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSendResult, setEmailSendResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem(API_KEY_STORAGE);
      if (savedKey) setApiKey(savedKey);
      const savedProv = localStorage.getItem(PROVIDER_STORAGE) as 'resend' | 'brevo' | null;
      if (savedProv) setEmailProvider(savedProv);

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads(parsed);
          return;
        }
      }
      // If nothing saved, load sample data so user sees it right away
      handleLoadSampleData();
    } catch {
      handleLoadSampleData();
    }
  }, []);

  const handleSaveApiKey = (keyVal: string) => {
    setApiKey(keyVal);
    try {
      localStorage.setItem(API_KEY_STORAGE, keyVal);
    } catch (e) {
      console.error('Failed to save API key', e);
    }
  };

  const handleSaveProvider = (provVal: 'resend' | 'brevo') => {
    setEmailProvider(provVal);
    try {
      localStorage.setItem(PROVIDER_STORAGE, provVal);
    } catch (e) {
      console.error('Failed to save email provider', e);
    }
  };

  // Save to localStorage when leads update
  const saveLeadsToStorage = (updatedLeads: ScrapedLead[]) => {
    setLeads(updatedLeads);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLeads));
    } catch (e) {
      console.error('Failed to save leads to localStorage', e);
    }
  };

  // Ingest raw data
  const handleProcessData = (textToProcess: string) => {
    if (!textToProcess || !textToProcess.trim()) return;
    const { leads: processedLeads, summary: procSummary } = processRawOmkarData(textToProcess);
    setSummary(procSummary);
    saveLeadsToStorage(processedLeads);
    setShowInputBox(false);
    setRawInputText('');
  };

  const handleLoadSampleData = () => {
    handleProcessData(SAMPLE_OMKAR_TSV);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all leads in this queue?')) {
      saveLeadsToStorage([]);
      setSummary(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        handleProcessData(content);
      }
    };
    reader.readAsText(file);
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus, updatedAt: new Date().toISOString() } : l));
    saveLeadsToStorage(updated);
  };

  const handleOpenPitchModal = (lead: ScrapedLead, initialChannel: 'WHATSAPP' | 'EMAIL' = 'WHATSAPP') => {
    setSelectedLeadForPitch(lead);
    setPitchChannel(initialChannel);
    setCustomPitchText(lead.pitchText || '');
    setEmailRecipient(lead.email || '');
    setEmailSubject(
      lead.priority === 'REDESIGN'
        ? `Quick fix for ${lead.name} website`
        : `Modern web architecture preview for ${lead.name}`
    );
    setEmailSendResult(null);
  };

  const handleCopyPitch = () => {
    if (!customPitchText) return;
    navigator.clipboard.writeText(customPitchText);
    setCopiedId('pitch-modal');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendColdEmailApi = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      alert('Please enter a valid recipient email address.');
      return;
    }
    if (!emailSubject || !customPitchText) {
      alert('Please provide both subject and email body.');
      return;
    }

    setIsSendingEmail(true);
    setEmailSendResult(null);

    try {
      const res = await fetch('/api/client-hunter/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: emailRecipient.trim(),
          toName: selectedLeadForPitch?.name,
          subject: emailSubject,
          bodyText: customPitchText,
          previewUrl: selectedLeadForPitch?.previewUrl,
          apiKey: apiKey.trim() || undefined,
          provider: emailProvider,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEmailSendResult({
          success: true,
          message: `✓ Cold email successfully delivered! (Message ID: ${data.messageId || 'sent'})`,
        });
        if (selectedLeadForPitch) {
          handleStatusChange(selectedLeadForPitch.id, 'PITCH_SENT');
        }
      } else {
        setEmailSendResult({
          success: false,
          message: data.error || 'Failed to dispatch email. Check your API key.',
        });
      }
    } catch (err: unknown) {
      setEmailSendResult({
        success: false,
        message: err instanceof Error ? err.message : 'Network error while calling send-email endpoint.',
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Metrics
  const totalCount = leads.length;
  const goldmineCount = leads.filter((l) => l.priority === 'GOLDMINE').length;
  const redesignCount = leads.filter((l) => l.priority === 'REDESIGN').length;
  const contactedCount = leads.filter((l) => l.status === 'PITCH_SENT' || l.status === 'DEMO_SHARED' || l.status === 'IN_TALKS').length;
  const wonCount = leads.filter((l) => l.status === 'WON').length;

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = l.name.toLowerCase().includes(q);
      const matchCity = l.city.toLowerCase().includes(q);
      const matchPhone = l.phone.includes(q);
      if (!matchName && !matchCity && !matchPhone) return false;
    }

    // Tab match
    if (filterTab === 'GOLDMINE') return l.priority === 'GOLDMINE';
    if (filterTab === 'REDESIGN') return l.priority === 'REDESIGN';
    if (filterTab === 'MOBILE') return l.phoneType === 'MOBILE';
    if (filterTab === 'CONTACTED') return l.status !== 'NEW' && l.status !== 'ARCHIVED';
    if (filterTab === 'WON') return l.status === 'WON';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-[#4F46E5] rounded-xl">
              <Target className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-[#1C1C1C] tracking-tight">
              Client Hunter & Outreach Engine
            </h1>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Automated Google Maps lead cleaner, intent scoring, and 1-click WhatsApp/Email conversion engine.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowInputBox(!showInputBox)}
            className="flex items-center gap-1.5 text-xs font-bold"
          >
            <UploadCloud className="w-3.5 h-3.5 text-[#4F46E5]" />
            {showInputBox ? 'Hide Ingest' : 'Ingest Omkar CSV'}
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={handleLoadSampleData}
            className="flex items-center gap-1.5 text-xs font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Sample Leads
          </Button>

          {leads.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* KPI METRICS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white border border-[#E5E7EB] p-4 rounded-xl shadow-sm">
          <span className="text-[11px] font-bold uppercase text-[#6B7280] tracking-wider block">
            Total Active Leads
          </span>
          <div className="text-2xl font-black text-[#1C1C1C] mt-1">{totalCount}</div>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3" /> Noise Filtered Out
          </span>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-xl shadow-sm">
          <span className="text-[11px] font-bold uppercase text-amber-800 tracking-wider block">
            🔥 Goldmine Leads
          </span>
          <div className="text-2xl font-black text-amber-900 mt-1">{goldmineCount}</div>
          <span className="text-[10px] text-amber-700 font-semibold">Zero Website + Mobile</span>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 p-4 rounded-xl shadow-sm">
          <span className="text-[11px] font-bold uppercase text-indigo-800 tracking-wider block">
            ⚠️ Redesign Needed
          </span>
          <div className="text-2xl font-black text-indigo-900 mt-1">{redesignCount}</div>
          <span className="text-[10px] text-indigo-700 font-semibold">Insecure HTTP or Low UI</span>
        </div>

        <div className="bg-white border border-[#E5E7EB] p-4 rounded-xl shadow-sm">
          <span className="text-[11px] font-bold uppercase text-[#6B7280] tracking-wider block">
            📨 Pitched / Active
          </span>
          <div className="text-2xl font-black text-[#4F46E5] mt-1">{contactedCount}</div>
          <span className="text-[10px] text-[#6B7280] font-semibold">Outreach Initiated</span>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-xl shadow-sm col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider block">
            🏆 Closed Won
          </span>
          <div className="text-2xl font-black text-emerald-900 mt-1">{wonCount}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Paying Clients</span>
        </div>
      </div>

      {/* CSV DROPZONE / INPUT BOX (COLLAPSIBLE) */}
      {showInputBox && (
        <Card className="p-6 bg-white border-2 border-dashed border-[#6366F1]/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1C1C1C] flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-[#4F46E5]" />
              Ingest Omkar Scraper CSV or Paste Text
            </h3>
            <button onClick={() => setShowInputBox(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Upload Box */}
            <label className="border-2 border-dashed border-gray-300 hover:border-[#6366F1] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition bg-gray-50/50">
              <UploadCloud className="w-8 h-8 text-[#6366F1] mb-2" />
              <span className="text-xs font-bold text-gray-700">Click to Upload Omkar .csv/.tsv</span>
              <span className="text-[11px] text-gray-400 mt-1">Exported directly from Omkar Scraper</span>
              <input type="file" accept=".csv,.tsv,.txt" onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Paste Box */}
            <div className="space-y-2">
              <textarea
                value={rawInputText}
                onChange={(e) => setRawInputText(e.target.value)}
                placeholder="Or paste raw CSV/TSV table content here..."
                rows={4}
                className="w-full text-xs font-mono border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#4F46E5]"
              />
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleProcessData(rawInputText)}
                disabled={!rawInputText.trim()}
                className="w-full text-xs font-bold"
              >
                Clean & Ingest Leads
              </Button>
            </div>
          </div>

          {summary && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-900 flex flex-wrap gap-4 font-medium">
              <span>Total rows processed: <strong>{summary.totalInput}</strong></span>
              <span>Personal noise filtered out: <strong>{summary.filteredNoise}</strong></span>
              <span>Valid commercial leads: <strong>{summary.validLeads}</strong></span>
              <span>Goldmines identified: <strong>{summary.goldmineCount}</strong></span>
            </div>
          )}
        </Card>
      )}

      {/* FILTER TABS & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#E5E7EB]">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterTab('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              filterTab === 'ALL' ? 'bg-[#1C1C1C] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Leads ({leads.length})
          </button>
          <button
            onClick={() => setFilterTab('GOLDMINE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              filterTab === 'GOLDMINE' ? 'bg-amber-600 text-white' : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            🔥 Goldmine ({goldmineCount})
          </button>
          <button
            onClick={() => setFilterTab('REDESIGN')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              filterTab === 'REDESIGN' ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-50'
            }`}
          >
            ⚠️ Redesign ({redesignCount})
          </button>
          <button
            onClick={() => setFilterTab('MOBILE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              filterTab === 'MOBILE' ? 'bg-emerald-600 text-white' : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            📱 Mobile / WhatsApp
          </button>
          <button
            onClick={() => setFilterTab('CONTACTED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              filterTab === 'CONTACTED' ? 'bg-purple-600 text-white' : 'text-purple-700 hover:bg-purple-50'
            }`}
          >
            📨 Contacted ({contactedCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search name, city, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4F46E5]"
          />
        </div>
      </div>

      {/* LEADS TABLE */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Priority / Status</th>
                <th className="py-3 px-4">Business Name & Niche</th>
                <th className="py-3 px-4">Reviews & Trust</th>
                <th className="py-3 px-4">Website Status</th>
                <th className="py-3 px-4">Phone / Channel</th>
                <th className="py-3 px-4 text-right">Instant Outreach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No leads found matching your current filter.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, index) => {
                  const isGoldmine = lead.priority === 'GOLDMINE';
                  const isRedesign = lead.priority === 'REDESIGN';
                  const whatsAppLink = buildWhatsAppLink(lead.cleanPhone, lead.pitchText || '');

                  return (
                    <tr key={`${lead.id}-${index}`} className="hover:bg-gray-50/60 transition group">
                      {/* Priority & Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="space-y-1.5">
                          {isGoldmine && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                              🔥 GOLDMINE
                            </span>
                          )}
                          {isRedesign && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-300">
                              ⚠️ REDESIGN
                            </span>
                          )}
                          {!isGoldmine && !isRedesign && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700">
                              {lead.priority}
                            </span>
                          )}

                          <div>
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                              className="text-[10px] font-semibold py-0.5 px-1.5 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-[#4F46E5]"
                            >
                              <option value="NEW">New</option>
                              <option value="PITCH_SENT">Pitched</option>
                              <option value="DEMO_SHARED">Demo Shared</option>
                              <option value="IN_TALKS">In Talks</option>
                              <option value="WON">🏆 Won Deal</option>
                              <option value="ARCHIVED">Archived</option>
                            </select>
                          </div>
                        </div>
                      </td>

                      {/* Name & Niche */}
                      <td className="py-3.5 px-4 max-w-[240px]">
                        <div className="font-bold text-[#1C1C1C] text-sm group-hover:text-[#4F46E5] transition line-clamp-1">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-[#6B7280] line-clamp-1 mt-0.5">
                          {lead.main_category || lead.categories?.[0]}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                          <span>📍 {lead.city}</span>
                        </div>
                      </td>

                      {/* Reviews & Trust */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-bold text-gray-800">
                          <span className="text-amber-500">★</span>
                          <span>{lead.rating ? lead.rating.toFixed(1) : '5.0'}</span>
                          <span className="text-gray-400 text-[11px] font-normal">
                            ({lead.reviews} reviews)
                          </span>
                        </div>
                        <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                          High Conversion Intent
                        </div>
                      </td>

                      {/* Website Status */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        {!lead.website ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                              <ShieldAlert className="w-3 h-3" /> NO WEBSITE
                            </span>
                            <div className="text-[10px] text-gray-500">Losing clients to competitors</div>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-mono truncate max-w-[180px]"
                            >
                              <Globe className="w-3 h-3 shrink-0" />
                              {lead.website.replace(/^https?:\/\//, '')}
                            </a>
                            {lead.website.startsWith('http://') && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                                Insecure HTTP (Fix SSL)
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Phone & Channel */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-800 flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {lead.phone || 'No phone'}
                        </div>
                        <div className="mt-0.5">
                          {lead.phoneType === 'MOBILE' ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              ✓ Mobile (WhatsApp OK)
                            </span>
                          ) : (
                            <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.2 rounded">
                              Landline
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp 1-Click Button */}
                          {lead.cleanPhone ? (
                            <a
                              href={whatsAppLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleStatusChange(lead.id, 'PITCH_SENT')}
                              title="Open WhatsApp Web with pre-written pitch"
                              className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#1faa53] text-black rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
                            >
                              <MessageSquare className="w-3.5 h-3.5 fill-black" />
                              WhatsApp
                            </a>
                          ) : (
                            <button
                              disabled
                              className="px-2 py-1 bg-gray-100 text-gray-400 rounded-lg text-xs cursor-not-allowed"
                            >
                              No Mobile
                            </button>
                          )}

                          {/* Email In-App API Button */}
                          <button
                            onClick={() => handleOpenPitchModal(lead, 'EMAIL')}
                            title="Compose and send cold email via API"
                            className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-[#4F46E5] border border-indigo-200 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
                          >
                            <Mail className="w-3.5 h-3.5 text-[#4F46E5]" />
                            Email
                          </button>

                          {/* Live Demo Preview Button */}
                          <a
                            href={lead.previewUrl || `/preview/real-estate?name=${encodeURIComponent(lead.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open live preview page"
                            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition"
                          >
                            <Eye className="w-4 h-4" />
                          </a>

                          {/* Inspect / Pitch Modal */}
                          <button
                            onClick={() => handleOpenPitchModal(lead, 'WHATSAPP')}
                            title="View and customize pitch script"
                            className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK PITCH CUSTOMIZER MODAL */}
      {selectedLeadForPitch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#6366F1] tracking-wider">
                  Outreach Dispatcher
                </span>
                <h3 className="text-lg font-black text-[#1C1C1C]">
                  {selectedLeadForPitch.name}
                </h3>
                <span className="text-xs text-gray-500">
                  {selectedLeadForPitch.city} • Rating: {selectedLeadForPitch.rating}★ ({selectedLeadForPitch.reviews} reviews)
                  {selectedLeadForPitch.email && ` • ✉️ ${selectedLeadForPitch.email}`}
                </span>
              </div>
              <button
                onClick={() => setSelectedLeadForPitch(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CHANNEL TOGGLE */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setPitchChannel('WHATSAPP')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
                  pitchChannel === 'WHATSAPP'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                WhatsApp Web
              </button>
              <button
                onClick={() => setPitchChannel('EMAIL')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
                  pitchChannel === 'EMAIL'
                    ? 'bg-white text-[#4F46E5] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-[#4F46E5]" />
                Cold Email (In-App API)
              </button>
            </div>

            {/* CHANNEL 1: COLD EMAIL INPUTS */}
            {pitchChannel === 'EMAIL' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Recipient Email
                    </label>
                    <input
                      type="email"
                      value={emailRecipient}
                      onChange={(e) => setEmailRecipient(e.target.value)}
                      placeholder="e.g. contact@business.com"
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Email Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Subject line..."
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>

                {/* API Settings Accordion */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700 flex items-center gap-1">
                      <Key className="w-3.5 h-3.5 text-amber-500" />
                      Email Provider & API Credentials
                    </span>
                    <button
                      onClick={() => setShowApiKeyField(!showApiKeyField)}
                      className="text-[11px] text-[#4F46E5] hover:underline font-bold"
                    >
                      {showApiKeyField ? 'Hide Settings' : 'Configure API Key'}
                    </button>
                  </div>

                  {showApiKeyField && (
                    <div className="space-y-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="provider"
                            value="resend"
                            checked={emailProvider === 'resend'}
                            onChange={() => handleSaveProvider('resend')}
                          />
                          <span className="font-bold">Resend API</span> (Free 3,000/mo)
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="provider"
                            value="brevo"
                            checked={emailProvider === 'brevo'}
                            onChange={() => handleSaveProvider('brevo')}
                          />
                          <span className="font-bold">Brevo API</span> (Free 300/day)
                        </label>
                      </div>
                      <div>
                        <input
                          type="password"
                          value={apiKey}
                          onChange={(e) => handleSaveApiKey(e.target.value)}
                          placeholder={
                            emailProvider === 'resend'
                              ? 'Enter Resend API Key (re_...)'
                              : 'Enter Brevo API Key (xkeysib-...)'
                          }
                          className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#4F46E5] bg-white font-mono"
                        />
                        <span className="text-[10px] text-gray-500 mt-0.5 block">
                          Key is stored safely in your local browser storage or read from .env.local.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PITCH BODY TEXT */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                <span>{pitchChannel === 'EMAIL' ? 'Email Body Copy' : 'WhatsApp Pitch Script'}</span>
                <span className="text-gray-400 font-normal">Editable</span>
              </div>
              <textarea
                rows={7}
                value={customPitchText}
                onChange={(e) => setCustomPitchText(e.target.value)}
                className="w-full text-xs font-sans border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#4F46E5] text-gray-800 leading-relaxed"
              />
            </div>

            {/* LIVE PREVIEW BADGE */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span className="truncate max-w-sm">Demo: <strong>{selectedLeadForPitch.previewUrl}</strong></span>
              </div>
              <a
                href={selectedLeadForPitch.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline font-bold flex items-center gap-1 shrink-0"
              >
                Open Demo
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* RESULT BANNER */}
            {emailSendResult && (
              <div
                className={`p-3 rounded-xl text-xs font-medium border flex items-center gap-2 ${
                  emailSendResult.success
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-red-50 border-red-300 text-red-800'
                }`}
              >
                {emailSendResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{emailSendResult.message}</span>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <button
                onClick={handleCopyPitch}
                className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                {copiedId === 'pitch-modal' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Pitch Text
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {pitchChannel === 'EMAIL' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={isSendingEmail}
                    onClick={handleSendColdEmailApi}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-500/20 transition flex items-center justify-center gap-2"
                  >
                    {isSendingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Dispatching via {emailProvider === 'resend' ? 'Resend' : 'Brevo'} API...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Send Cold Email via API
                      </>
                    )}
                  </Button>
                ) : (
                  selectedLeadForPitch.cleanPhone && (
                    <a
                      href={buildWhatsAppLink(selectedLeadForPitch.cleanPhone, customPitchText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        handleStatusChange(selectedLeadForPitch.id, 'PITCH_SENT');
                        setSelectedLeadForPitch(null);
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#25D366] hover:bg-[#1faa53] text-black rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 shadow-lg shadow-green-500/20"
                    >
                      <MessageSquare className="w-4 h-4 fill-black" />
                      Launch WhatsApp Web
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
