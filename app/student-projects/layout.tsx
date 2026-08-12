import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student IEEE Projects | MSME-Certified Final Year Projects',
  description: 
    "Explore MSME-certified final year IEEE projects for engineering students - complete with documentation, PPT slides, and custom domains. Delivered by Ostrune.",
  alternates: { canonical: '/student-projects' },
  openGraph: {
    title: 'Student Final Year Projects | MSME-Certified | Ostrune',
    description:
      'IEEE-format documentation, PPT slides, MSME certification, and live custom domain projects for engineering students worldwide.',
    url: '/student-projects',
  },
  keywords: [
    'final year project',
    'IEEE project',
    'MSME certified project',
    'engineering student projects',
    'final year project with documentation',
    'live project for students',
  ],
};

export default function StudentProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
