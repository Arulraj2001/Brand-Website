import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Final Year CS Projects, IEEE Reports & MSME Certifications',
  description: 
    "Explore MSME-certified final year IEEE projects for engineering students - complete with documentation, PPT slides, and custom domains. Delivered by Ostrune.",
  alternates: { canonical: '/student-projects' },
  openGraph: {
    title: 'Student Final Year Projects | MSME-Certified | Ostrune',
    description:
      'IEEE-format documentation, PPT slides, MSME certification, and live custom domain projects for engineering students worldwide.',
    url: '/student-projects',
  },
};

export default function StudentProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
