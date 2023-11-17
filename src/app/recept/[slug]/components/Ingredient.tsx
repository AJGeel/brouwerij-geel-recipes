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
    className="rounded-md flex items-center justify-between space-x-3 flex-shrink-0 outline outline-2 outline-offset-2 outline-transparent hover:outline-amber-100 focus:outline-amber-100 duration-150 cursor-pointer active:scale-95 active:opacity-70 select-none"
  >
    <div className="w-8 h-8 bg-amber-100 rounded-md">
      <Image src={imageSlug} width="32" height="32" alt={name} />
    </div>
    <p className="flex-grow">{name}</p>
    <p className="text-gray-400 font-thin text-right">{amount}</p>
  </Link>
);

export default Ingredient;
