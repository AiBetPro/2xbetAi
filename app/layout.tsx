import React from 'react';
import './globals.css';

export const metadata = {
  title: 'GOALIX - Sports Betting & AI Predictions',
  description: 'Advanced sports betting platform with AI-powered predictions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
                        }
