import Image from "next/image";

import Morph from "@/components/transitions/Morph";
import ResponsiveMorph from "@/components/transitions/ResponsiveMorph";
import { recipeTransitionName } from "@/utils/viewTransitions";

type Props = {
  slug: string;
  imageSlug: string;
  title: string;
};

function Hero({ slug, imageSlug, title }: Props) {
  return (
    <div className="relative mb-8 flex h-64 w-full flex-col overflow-hidden bg-amber-100 bg-cover bg-center sm:h-80 md:h-96 md:rounded-md">
      <Morph name={recipeTransitionName.image(slug)}>
        <div className="absolute inset-0">
          <Image
            src={imageSlug}
            fill={true}
            alt={title}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 mt-auto h-1/2 w-full bg-gradient-to-b from-transparent to-black opacity-60 md:opacity-0"></div>
        </div>
      </Morph>
      <div className="z-10 mt-auto p-5 md:hidden">
        <ResponsiveMorph
          name={recipeTransitionName.title(slug)}
          visibleOn="mobile"
        >
          <h1 className="w-fit text-2xl font-bold text-white">{title}</h1>
        </ResponsiveMorph>
      </div>
    </div>
  );
}

export default Hero;
