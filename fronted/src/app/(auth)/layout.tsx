import { Toaster } from '@/components/ui/toaster';
import '../globals.css'
import { UserContextProvider } from '@/context/AuthContext';
export default function AuthLayout(
    {
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
          >
        <UserContextProvider>

          <Toaster/>
        {children}
        </UserContextProvider>
        
      </body>
    </html>
  );
}