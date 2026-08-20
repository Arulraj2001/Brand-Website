import LoginPageClient from './LoginPageClient';

export const metadata = {
  title: 'Admin Login',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <LoginPageClient />;
}
