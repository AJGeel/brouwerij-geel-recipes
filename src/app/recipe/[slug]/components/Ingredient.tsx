import Image from "next/image";

type Props = {
  imageSlug: string;
  name: string;
  amount: string;
};

const Ingredient = ({ imageSlug, name, amount }: Props) => (
  <div className="rounded-md flex items-center justify-between space-x-3 flex-shrink-0">
    <div className="w-8 h-8 bg-gray-100 rounded-md">
      <Image
        src={`/images/ingredients/${imageSlug}.png`}
        width="32"
        height="32"
        alt={name}
      />
    </div>
    <p className="flex-grow">{name}</p>
    <p className="text-gray-400 font-thin text-right">{amount}</p>
  </div>
);

export default Ingredient;
