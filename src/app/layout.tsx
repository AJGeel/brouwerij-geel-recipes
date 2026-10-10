import "./globals.css";

import { ReactNode } from "react";

import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

import Bubbles from "@/components/Bubbles";
import Footer from "@/components/Footer";
import StyledToaster from "@/components/StyledToaster";
import { metadataConfig, viewportConfig } from "@/config";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = metadataConfig;
export const viewport = viewportConfig;

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <html
    lang="nl"
    className={`${display.variable} ${sans.variable} bg-amber-100`}
  >
    <body
      className={`relative isolate flex min-h-screen flex-col border-amber-100 bg-surface text-foreground md:border-t-4`}
    >
      <Bubbles />
      {children}
      <Footer />
      <StyledToaster />
    </body>
  </html>
);

export default RootLayout;
