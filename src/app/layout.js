import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://coflyn.vercel.app"),
  title: {
    template: "%s | coflyn",
    default: "coflyn — Hello World!",
  },
  description:
    "Portfolio of coflyn — a developer crafting tools, bots, and digital experiences. Exploring the boundaries of automation and web tech.",
  keywords: [
    "developer",
    "portfolio",
    "coflyn",
    "web development",
    "python",
    "automation",
    "bots",
  ],
  authors: [{ name: "coflyn" }],
  creator: "coflyn",
  openGraph: {
    title: "coflyn — Hello World!",
    description:
      "Portfolio of coflyn — a developer crafting tools, bots, and digital experiences.",
    url: "https://coflyn.vercel.app",
    siteName: "coflyn Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "coflyn portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "coflyn — Hello World!",
    description:
      "Portfolio of coflyn — a developer crafting tools, bots, and digital experiences.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
        <Analytics />
      </body>
    </html>
  );
}
