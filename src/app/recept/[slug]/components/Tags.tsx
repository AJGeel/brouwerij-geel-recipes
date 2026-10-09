import Link from "next/link";

import Reveal from "@/components/Reveal";
import { capitalize } from "@/utils/capitalize";

type Props = {
  tags: string[];
  /** Reveal index of the label, the tags follow after it */
  revealIndex: number;
};

const Tags = ({ tags, revealIndex }: Props) => (
  <div className="mt-8 flex flex-wrap items-center gap-3">
    <Reveal index={revealIndex}>
      <p className="font-medium">Tags: </p>
    </Reveal>
    {tags.map((item, index) => (
      <Reveal key={item} index={revealIndex + index + 1}>
        <Link
          href={`/tag/${item}`}
          className="inline cursor-pointer select-none rounded-sm text-sm text-gray-900 outline outline-2 outline-offset-2 outline-transparent duration-150 hover:outline-amber-100 focus:outline-amber-100 active:scale-95 active:opacity-70"
        >
          #{capitalize(item)}
        </Link>
      </Reveal>
    ))}
  </div>
);

export default Tags;
