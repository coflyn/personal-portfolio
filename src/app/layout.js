import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata = {
  title: "coflyn — Hello World!",
  description:
    "Portfolio of coflyn — a developer crafting tools, bots, and digital experiences.",
  keywords: ["developer", "portfolio", "coflyn", "web development", "python"],
  authors: [{ name: "coflyn" }],
  openGraph: {
    title: "coflyn — Hello World!",
    description:
      "Portfolio of coflyn — a developer crafting tools, bots, and digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientProviders />
        {children}
      </body>
    </html>
  );
}
