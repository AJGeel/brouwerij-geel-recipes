import "./globals.css";

import { ReactNode } from "react";

import { Space_Grotesk } from "next/font/google";

import Footer from "@/components/Footer";
import StyledToaster from "@/components/StyledToaster";
import { metadataConfig } from "@/config";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = metadataConfig;

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <html lang="nl" className="bg-amber-100">
    <body
      className={`${spaceGrotesk.className} flex min-h-screen flex-col border-amber-100 bg-white md:border-t-4`}
    >
      {children}
      <Footer />
      <StyledToaster />
    </body>
  </html>
);

export default RootLayout;
