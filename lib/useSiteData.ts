'use client';

import { useState, useEffect } from 'react';
import {
  SiteSettings,
  TeamMember,
} from '@/types';
import {
  getSiteSettings,
  updateSiteSettings,
  getTeamMembers,
  saveTeamMembers,
  INITIAL_SITE_SETTINGS,
  INITIAL_TEAM_MEMBERS,
} from '@/lib/supabase/data';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);

  useEffect(() => {
    setSettings(getSiteSettings());

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

  const saveSettings = (newSettings: SiteSettings) => {
    updateSiteSettings(newSettings);
    setSettings(newSettings);
  };

  return { settings, saveSettings };
}

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);

  useEffect(() => {
    setTeamMembers(getTeamMembers());

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

  const saveTeam = (newTeam: TeamMember[]) => {
    saveTeamMembers(newTeam);
    setTeamMembers(newTeam);
  };

  return { teamMembers, saveTeam };
}
