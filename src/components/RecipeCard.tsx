import { ViewTransition } from "react";

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
  <Link href={`/recept/${slug}`} transitionTypes={["nav-forward"]}>
    <div className="group relative flex h-48 flex-col overflow-hidden rounded-md text-white duration-150 ease-in-out active:scale-95 active:opacity-75 md:h-64">
      <div className="z-10 mt-auto p-5">
        <ViewTransition name={`recipe-title-${slug}`} share="morph" default="none">
          <h1 className="w-fit text-xl font-medium leading-6">{title}</h1>
        </ViewTransition>
        <div className="mt-2 flex items-center space-x-1.5">
          <ClockIcon className="h-5 w-5 duration-1000 group-hover:rotate-[50deg]" />
          <span className="font-light">
            {formatDurationString(durationString)}
          </span>
        </div>
      </div>
      <ViewTransition
        name={`recipe-image-${slug}`}
        share="morph"
        default="none"
      >
        <div className="absolute h-full w-full">
          <div className="relative h-full w-full duration-1000 group-hover:scale-105">
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
          <div className="absolute inset-0 mt-auto h-2/3 w-full bg-gradient-to-b from-transparent to-black opacity-80" />
        </div>
      </ViewTransition>
    </div>
  </Link>
);

export default RecipeCard;
