import { ClockIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { openRecipe, recipeImageTransitionName } from "@/utils/viewTransitions";

import Morph from "../transitions/Morph";

type Props = {
  slug: string;
  title: string;
  durationLabel: string;
  imageSlug: string;
  morph?: boolean;
};

const RecipeRow = ({
  slug,
  title,
  durationLabel,
  imageSlug,
  morph,
}: Props) => (
  <Link
    href={`/recept/${slug}`}
    prefetch={true}
    transitionTypes={[openRecipe]}
    className="-mx-2 flex items-center gap-4 rounded-md p-2 duration-150 hover:bg-amber-100/50 active:scale-[0.99] active:opacity-75"
  >
    <Morph name={recipeImageTransitionName(slug)} enabled={morph}>
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-amber-100">
        <Image
          src={imageSlug}
          fill={true}
          alt=""
          sizes="56px"
          style={{ objectFit: "cover" }}
        />
      </div>
    </Morph>
    <p className="min-w-0 grow font-semibold leading-snug text-gray-900">
      {title}
    </p>
    <p className="flex shrink-0 items-center gap-1.5 text-sm text-gray-500">
      <ClockIcon weight="fill" className="h-4 w-4" />
      {durationLabel}
    </p>
  </Link>
);

export default RecipeRow;
