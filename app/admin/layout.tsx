import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-scope min-h-screen bg-[#F8FAFC] text-[#1E293B] antialiased">
      {children}
    </div>
  );
}
