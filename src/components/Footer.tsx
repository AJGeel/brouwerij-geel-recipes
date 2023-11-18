"use client";

import Image from "next/image";

const Footer = () => (
  <div className="mt-16 flex min-h-[120px] w-full grow justify-center bg-gradient-to-b from-transparent to-amber-100">
    <div
      className="mb-10 mt-auto cursor-pointer text-gray-900 duration-150 hover:opacity-50"
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
