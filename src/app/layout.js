import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://www.coflyn.my.id"),
  title: {
    template: "%s | coflyn",
    default: "Coflyn — Hello World!",
  },
  description:
    "Portfolio of Coflyn — Automation specialist creating bots, tools, and efficient web solutions.",
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
    url: "https://www.coflyn.my.id",
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

import { Suspense } from "react";
import { getProjects } from "@/lib/github";

async function ProjectPrefetcher() {
  try {
    await getProjects();
  } catch (e) {}
  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
        <Suspense fallback={null}>
          <ProjectPrefetcher />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
