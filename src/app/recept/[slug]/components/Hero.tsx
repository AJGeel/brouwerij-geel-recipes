import Image from "next/image";

import Reveal from "@/components/Reveal";
import Morph from "@/components/transitions/Morph";
import {
  morphDuration,
  recipeImageTransitionName,
} from "@/utils/viewTransitions";

type Props = {
  slug: string;
  imageSlug: string;
  title: string;
};

function Hero({ slug, imageSlug, title }: Props) {
  return (
    <div className="relative mb-8 flex h-64 w-full flex-col overflow-hidden sm:h-80 md:h-96 md:rounded-md">
      <Morph name={recipeImageTransitionName(slug)}>
        {/* The placeholder colour lives here, so it morphs along with the image */}
        <div className="absolute inset-0 bg-amber-100">
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
        {/* The morphing image covers the title until it lands */}
        <Reveal index={0} delay={morphDuration}>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </Reveal>
      </div>
    </div>
  );
}

export default Hero;
