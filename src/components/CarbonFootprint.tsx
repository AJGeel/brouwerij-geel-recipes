import Link from "next/link";

import { getCarbonFootprint } from "@/services/carbonFootprint/getCarbonFootprint";

const CarbonFootprint = async () => {
  const footprintData = await getCarbonFootprint();

  if (!footprintData.wasSuccessful) {
    return <></>;
  }

  return (
    <Link
      href="https://websitecarbon.com/website/brouwerij-geel-recipes-vercel-app"
      target="_blank"
      rel="noreferrer noopener"
      className="flex flex-col items-center rounded-md text-xs outline outline-amber-200 duration-150 hover:scale-105 hover:bg-white hover:shadow-md"
    >
      <div className="flex rounded-md">
        <p className="px-2.5 py-1">
          Website Carbon: {footprintData.co2}g of CO2/view
        </p>
      </div>
      <p className="w-full border-t border-amber-200 px-2.5 py-1">
        Cleaner than {footprintData.percentage}% of pages tested
      </p>
    </Link>
  );
};

export default CarbonFootprint;
