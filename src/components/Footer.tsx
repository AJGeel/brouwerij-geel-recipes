import Image from "next/image";
import Link from "next/link";

import CarbonFootprint from "./CarbonFootprint";

const Footer = () => (
  <div className="mt-16 flex min-h-[120px] w-full grow justify-center bg-gradient-to-b from-transparent to-amber-100">
    <div className="mb-10 mt-auto flex items-center gap-12 text-gray-900">
      <Link href="/">
        <Image
          src="/images/brouwerij-geel-logo.svg"
          className="cursor-pointer duration-150 hover:opacity-50"
          width="100"
          height="62"
          alt="Brouwerij Geel Logo"
        />
      </Link>
      <CarbonFootprint />
    </div>
  </div>
);

export default Footer;
