import "./globals.css";

import { Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";

import Footer from "@/components/Footer";
import { metadataConfig } from "@/config/config";
import StyledToaster from "@/components/StyledToaster";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = metadataConfig;

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <html lang="nl" className="bg-amber-100">
    <body
      className={`${spaceGrotesk.className} min-h-screen flex flex-col md:border-t-4 border-amber-100 bg-white`}
    >
      {children}
      <Footer />
      <StyledToaster />
    </body>
  </html>
);

export default RootLayout;
