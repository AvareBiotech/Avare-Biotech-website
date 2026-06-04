import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://avareit.com"),
  title: {
    default: "Knowledge Base — Avare Biotech",
    template: "%s — Avare Biotech",
  },
  description:
    "Free guides, protocols, and case studies for veterinarians, AI technicians, and farm managers on livestock semen handling, storage, and analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap"
          rel="stylesheet"
        />
        {children}
      </body>
    </html>
  );
}
