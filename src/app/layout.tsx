import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faajji Technologies | Innovation • Technology • Opportunity",
  description:
    "Integrated Ethiopian technology powerhouse: Enterprise Software & AI, Hardware Online Sales & Delivery, and EthioGatewayJobs digital employment platform.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-faajji-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
