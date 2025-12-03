import type { Metadata } from "next";
import { Patrick_Hand } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ui/Toast";

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-patrick',
});

export const metadata: Metadata = {
  title: "HomeConnect Pro - Find Trusted Local Contractors",
  description: "AI-powered matching connects you with the best-rated local contractors based on your specific needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body
        className={`${patrickHand.variable} font-sans antialiased bg-yellow-50 min-h-screen`}
      >
        <ToastProvider>
          <NavBar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
