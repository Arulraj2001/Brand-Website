import LoginPageClient from './LoginPageClient';

export const metadata = {
  title: 'Admin Login | Ostrune',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <LoginPageClient />;
}
