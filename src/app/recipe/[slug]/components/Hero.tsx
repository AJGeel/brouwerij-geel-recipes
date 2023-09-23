import Image from "next/image";

type Props = {
  imageSlug: string;
  title: string;
};

const Hero = ({ imageSlug, title }: Props) => (
  <div className="w-full mb-8 md:rounded-md bg-center bg-cover flex flex-col h-64 sm:h-80 md:h-96 relative overflow-hidden bg-amber-100">
    <Image
      src={`/images/recipes/${imageSlug}`}
      fill={true}
      alt={title}
      style={{ objectFit: "cover" }}
    />
    <h1 className="md:hidden text-white font-bold text-2xl p-5 mt-auto z-10">
      {title}
    </h1>
    <div className="absolute bg-gradient-to-b from-transparent to-black opacity-60 md:opacity-0 w-full h-1/2 mt-auto inset-0"></div>
  </div>
);

export default Hero;
