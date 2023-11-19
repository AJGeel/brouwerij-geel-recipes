import Link from "next/link";

import { getCarbonFootprint } from "@/services/carbonFootprint/getCarbonFootprint";

const HoverSpan = ({ label }: { label: string }) => (
  <>
    {" "}
    <span className="duration-150 group-hover:font-bold">{label}</span>{" "}
  </>
);

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
      className="group flex flex-col items-center divide-y divide-amber-200 rounded-md px-2 text-xs outline outline-1 outline-amber-200/0 duration-150 hover:scale-105 hover:bg-white hover:shadow-md hover:outline-amber-200"
    >
      <div className="flex rounded-md">
        <p className="py-1">
          Website Carbon:
          <HoverSpan label={`${footprintData.co2}g`} />
          of CO2/view
        </p>
      </div>
      <p className="w-full py-1 text-center">
        Cleaner than
        <HoverSpan label={`${footprintData.percentage}%`} />
        of pages tested
      </p>
    </Link>
  );
};

export default CarbonFootprint;
