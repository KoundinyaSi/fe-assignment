// src/app/layout.js
import './globals.css';
import ClientProvider from './client-provider';  // Import the Client Component wrapper

export const metadata = {
  title: 'My App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider> {/* Wrap with the client-side provider */}
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
