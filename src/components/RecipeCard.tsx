import { ClockIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

import { formatDurationString } from "@/utils/duration/formatDurationString";
import { DurationString } from "@/utils/duration/types";

type Props = {
  slug: string;
  title: string;
  durationString: DurationString;
  imageSlug: string;
};

const RecipeCard = ({ slug, title, durationString, imageSlug }: Props) => (
  <Link href={`/recept/${slug}`}>
    <div className="flex flex-col h-48 md:h-64 rounded-md overflow-hidden text-white relative group active:scale-95 active:opacity-75 duration-150 ease-in-out">
      <div className="mt-auto z-10 p-5">
        <h1 className="font-medium text-xl leading-6">{title}</h1>
        <div className="flex items-center space-x-1.5 mt-2">
          <ClockIcon className="h-5 w-5 transform group-hover:rotate-[50deg] duration-1000" />
          <span className="font-light">
            {formatDurationString(durationString)}
          </span>
        </div>
      </div>
      <div className="absolute w-full h-full group-hover:scale-105 duration-1000">
        <Image
          src={imageSlug}
          fill={true}
          alt={title}
          sizes="(max-width: 768px) 100vw, "
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="absolute bg-gradient-to-b from-transparent to-black opacity-80 w-full h-2/3 mt-auto inset-0" />
    </div>
  </Link>
);

export default RecipeCard;
