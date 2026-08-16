'use client';

import { useState, useEffect } from 'react';
import {
  SiteSettings,
  TeamMember,
  StudentFeedbackVideo,
  StudentProject,
  SiteStat,
  ActivityFeedItem,
  ClientLogo,
} from '@/types';
import {
  getSiteSettings,
  fetchSiteSettingsFromSupabase,
  saveSiteSettingsToSupabase,
  getTeamMembers,
  fetchTeamMembersFromSupabase,
  saveTeamMembersToSupabase,
  getStudentFeedbackVideos,
  fetchStudentFeedbackFromSupabase,
  saveStudentFeedbackToSupabase,
  deleteStudentFeedbackFromSupabase,
  getStudentProjects,
  fetchStudentProjectsFromSupabase,
  saveStudentProjectToSupabase,
  deleteStudentProjectFromSupabase,
  getSiteStats,
  fetchSiteStatsFromSupabase,
  saveSiteStatToSupabase,
  deleteSiteStatFromSupabase,
  getActivityFeed,
  fetchActivityFeedFromSupabase,
  saveActivityFeedItemToSupabase,
  deleteActivityFeedItemFromSupabase,
  getClientLogos,
  fetchClientLogosFromSupabase,
  saveClientLogoToSupabase,
  deleteClientLogoFromSupabase,
  INITIAL_SITE_SETTINGS,
  INITIAL_STUDENT_FEEDBACK_VIDEOS,
  INITIAL_STUDENT_PROJECTS,
} from '@/lib/supabase/data';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);

  useEffect(() => {
    let active = true;

    // 1. Initial load from local cache/defaults
    Promise.resolve().then(() => {
      if (active) setSettings(getSiteSettings());
    });

    // 2. Fetch fresh settings from Supabase DB asynchronously
    fetchSiteSettingsFromSupabase().then((fresh) => {
      if (active && fresh) setSettings(fresh);
    });

    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };

    window.addEventListener('ostrune_settings_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('ostrune_settings_updated', handleUpdate);
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
    let active = true;

    Promise.resolve().then(() => {
      if (active) setTeamMembers(getTeamMembers());
    });

    fetchTeamMembersFromSupabase().then((freshTeam) => {
      if (active && freshTeam && freshTeam.length > 0) {
        setTeamMembers(freshTeam);
      }
    });

    const handleUpdate = () => {
      setTeamMembers(getTeamMembers());
    };

    window.addEventListener('ostrune_team_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('ostrune_team_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const saveTeam = async (newTeam: TeamMember[]) => {
    setTeamMembers(newTeam);
    await saveTeamMembersToSupabase(newTeam);
  };

  return { teamMembers, saveTeam };
}

export function useStudentData() {
  const [feedbackVideos, setFeedbackVideos] = useState<StudentFeedbackVideo[]>(INITIAL_STUDENT_FEEDBACK_VIDEOS);
  const [projects, setProjects] = useState<StudentProject[]>(INITIAL_STUDENT_PROJECTS);

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (!active) return;
      setFeedbackVideos(getStudentFeedbackVideos());
      setProjects(getStudentProjects());
    });

    fetchStudentFeedbackFromSupabase().then((fresh) => {
      if (active && fresh) setFeedbackVideos(fresh);
    });

    fetchStudentProjectsFromSupabase().then((freshProj) => {
      if (active && freshProj) setProjects(freshProj);
    });

    const handleUpdate = () => {
      setFeedbackVideos(getStudentFeedbackVideos());
      setProjects(getStudentProjects());
    };

    window.addEventListener('ostrune_student_data_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('ostrune_student_data_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const saveFeedbackVideo = async (item: StudentFeedbackVideo) => {
    const updated = await saveStudentFeedbackToSupabase(item);
    setFeedbackVideos(getStudentFeedbackVideos());
    return updated;
  };

  const deleteFeedbackVideo = async (id: string) => {
    await deleteStudentFeedbackFromSupabase(id);
    setFeedbackVideos(getStudentFeedbackVideos());
  };

  const saveStudentProject = async (item: StudentProject) => {
    const updated = await saveStudentProjectToSupabase(item);
    setProjects(getStudentProjects());
    return updated;
  };

  const deleteStudentProject = async (id: string) => {
    await deleteStudentProjectFromSupabase(id);
    setProjects(getStudentProjects());
  };

  return {
    feedbackVideos,
    projects,
    saveFeedbackVideo,
    deleteFeedbackVideo,
    saveStudentProject,
    deleteStudentProject,
  };
}

export function useSiteStats() {
  const [stats, setStats] = useState<SiteStat[]>(getSiteStats());

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (active) setStats(getSiteStats());
    });

    fetchSiteStatsFromSupabase().then((fresh) => {
      if (active && fresh) setStats(fresh);
    });

    const handleUpdate = () => {
      setStats(getSiteStats());
    };

    window.addEventListener('ostrune_stats_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('ostrune_stats_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const saveStat = async (stat: SiteStat) => {
    const updated = await saveSiteStatToSupabase(stat);
    setStats(getSiteStats());
    return updated;
  };

  const deleteStat = async (id: string) => {
    await deleteSiteStatFromSupabase(id);
    setStats(getSiteStats());
  };

  return { stats, saveStat, deleteStat };
}

export function useActivityFeed() {
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>(getActivityFeed());

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (active) setActivityFeed(getActivityFeed());
    });

    fetchActivityFeedFromSupabase().then((fresh) => {
      if (active && fresh) setActivityFeed(fresh);
    });

    const handleUpdate = () => {
      setActivityFeed(getActivityFeed());
    };

    window.addEventListener('ostrune_activity_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('ostrune_activity_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const saveActivityItem = async (item: ActivityFeedItem) => {
    const updated = await saveActivityFeedItemToSupabase(item);
    setActivityFeed(getActivityFeed());
    return updated;
  };

  const deleteActivityItem = async (id: string) => {
    await deleteActivityFeedItemFromSupabase(id);
    setActivityFeed(getActivityFeed());
  };

  return { activityFeed, saveActivityItem, deleteActivityItem };
}

export function useClientLogos() {
  const [logos, setLogos] = useState<ClientLogo[]>(getClientLogos());

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (active) setLogos(getClientLogos());
    });

    fetchClientLogosFromSupabase().then((fresh) => {
      if (active && fresh) setLogos(fresh);
    });

    const handleUpdate = () => {
      setLogos(getClientLogos());
    };

    window.addEventListener('ostrune_logos_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('ostrune_logos_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const saveLogo = async (logo: ClientLogo) => {
    const updated = await saveClientLogoToSupabase(logo);
    setLogos(getClientLogos());
    return updated;
  };

  const deleteLogo = async (id: string) => {
    await deleteClientLogoFromSupabase(id);
    setLogos(getClientLogos());
  };

  return { logos, saveLogo, deleteLogo };
}
