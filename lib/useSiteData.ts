'use client';

import { useState, useEffect } from 'react';
import {
  SiteSettings,
  TeamMember,
} from '@/types';
import {
  getSiteSettings,
  fetchSiteSettingsFromSupabase,
  saveSiteSettingsToSupabase,
  getTeamMembers,
  fetchTeamMembersFromSupabase,
  saveTeamMembersToSupabase,
  INITIAL_SITE_SETTINGS,
  INITIAL_TEAM_MEMBERS,
} from '@/lib/supabase/data';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    // 1. Initial load from local cache/defaults
    setSettings(getSiteSettings());

    // 2. Fetch fresh settings from Supabase DB asynchronously
    fetchSiteSettingsFromSupabase().then((fresh) => {
      if (fresh) setSettings(fresh);
    });

    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };

    window.addEventListener('apexpulse_settings_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('apexpulse_settings_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const saveSettings = async (newSettings: SiteSettings) => {
    setSettings(newSettings);
    await saveSiteSettingsToSupabase(newSettings);
  };

  return { settings, saveSettings };
}

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(getTeamMembers());

  useEffect(() => {
    setTeamMembers(getTeamMembers());

    fetchTeamMembersFromSupabase().then((freshTeam) => {
      if (freshTeam && freshTeam.length > 0) {
        setTeamMembers(freshTeam);
      }
    });

    const handleUpdate = () => {
      setTeamMembers(getTeamMembers());
    };

    window.addEventListener('apexpulse_team_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('apexpulse_team_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const saveTeam = async (newTeam: TeamMember[]) => {
    setTeamMembers(newTeam);
    await saveTeamMembersToSupabase(newTeam);
  };

  return { teamMembers, saveTeam };
}
