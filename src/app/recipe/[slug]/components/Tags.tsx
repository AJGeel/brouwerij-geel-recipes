import { capitalize } from "@/utils/capitalize";
import Link from "next/link";

type Props = {
  tags: string[];
};

const Tags = ({ tags }: Props) => (
  <div className="mt-8 gap-3 flex flex-wrap items-center">
    <p className="font-medium">Tags: </p>
    {tags.map((item) => (
      <Link
        href={`/tag/${item}`}
        className="inline rounded-sm text-gray-900 duration-150 text-sm cursor-pointer outline outline-2 outline-offset-2 outline-transparent hover:outline-amber-100 focus:outline-amber-100 active:scale-95 active:opacity-70 select-none"
        key={item}
      >
        #{capitalize(item)}
      </Link>
    ))}
  </div>
);

export default Tags;
