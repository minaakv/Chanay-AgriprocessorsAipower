import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chanay Agriprocessors AI Studio',
  description: 'AI-powered image editing suite for premium sauces and chutneys.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
        {/* Tailwind Configuration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      brand: {
                        50: '#fdf8f6',
                        100: '#f2e8e5',
                        200: '#eaddd7',
                        300: '#e0cec7',
                        400: '#d2bab0',
                        500: '#9f1239', // Deep Rose/Red
                        600: '#881337',
                        700: '#4c0519',
                        800: '#3f090f', // Dark chutney color
                        900: '#280509',
                      }
                    },
                    fontFamily: {
                      serif: ['"Playfair Display"', 'serif'],
                      sans: ['"Lato"', 'sans-serif'],
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="bg-brand-50 text-slate-800 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}