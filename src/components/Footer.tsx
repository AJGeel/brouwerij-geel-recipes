"use client";

import Image from "next/image";

const Footer = () => (
  <div className="w-full bg-gradient-to-b from-transparent to-amber-100 flex-grow mt-16 min-h-[120px] flex justify-center">
    <div
      className="mt-auto mb-10 text-gray-900 hover:opacity-50 duration-150 cursor-pointer"
      onClick={() => alert("Brouwerij Geel... What else?")}
    >
      <Image
        src="/images/brouwerij-geel-logo.svg"
        width="100"
        height="62"
        alt="Brouwerij Geel Logo"
      />
    </div>
  </div>
);

export default Footer;
