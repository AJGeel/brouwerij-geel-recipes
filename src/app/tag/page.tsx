import { generateTags, scanAllRecipes } from "@/services/markdown";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";

const getTags = async () => {
  const allRecipes = scanAllRecipes();
  const allTags = generateTags(allRecipes);

  return allTags;
};

const Page = async () => {
  const tags = await getTags();
  const iterableTags = Array.from(tags);

  return (
    <div className="border p-8 m-4">
      {iterableTags.map(([name, amount]) => (
        <Link
          href={`/tag/${name}`}
          key={name}
          className="inline-flex m-2 gap-2 items-center rounded-sm text-gray-900 duration-150 cursor-pointer outline outline-2 outline-offset-2 outline-transparent hover:outline-amber-100 active:scale-95 active:opacity-70 select-none"
        >
          <p className="text-bold">#{capitalize(name)}</p>
          <span className="text-xs text-gray-500">( {amount} )</span>
        </Link>
      ))}
    </div>
  );
};

export default Page;
