import Image from "next/image";
import Link from "next/link";

type Props = {
  imageSlug: string;
  name: string;
  amount: string;
};

const Ingredient = ({ imageSlug, name, amount }: Props) => (
  <Link
    href={`/tag/${name}`}
    className="flex shrink-0 cursor-pointer select-none items-center justify-between space-x-3 rounded-md outline outline-2 outline-offset-2 outline-transparent duration-150 hover:outline-amber-100 focus:outline-amber-100 active:scale-95 active:opacity-70"
  >
    <div className="h-8 w-8 rounded-md bg-amber-100">
      <Image src={imageSlug} width="32" height="32" alt={name} />
    </div>
    <p className="grow">{name}</p>
    <p className="text-right font-thin text-gray-400">{amount}</p>
  </Link>
);

export default Ingredient;
