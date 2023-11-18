import Link from "next/link";

import { capitalize } from "@/utils/capitalize";

type Props = {
  tags: string[];
};

const Tags = ({ tags }: Props) => (
  <div className="mt-8 flex flex-wrap items-center gap-3">
    <p className="font-medium">Tags: </p>
    {tags.map((item) => (
      <Link
        href={`/tag/${item}`}
        className="inline cursor-pointer select-none rounded-sm text-sm text-gray-900 outline outline-2 outline-offset-2 outline-transparent duration-150 hover:outline-amber-100 focus:outline-amber-100 active:scale-95 active:opacity-70"
        key={item}
      >
        #{capitalize(item)}
      </Link>
    ))}
  </div>
);

export default Tags;
