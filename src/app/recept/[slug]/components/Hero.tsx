import Image from "next/image";

type Props = {
  imageSlug: string;
  title: string;
};

function Hero({ imageSlug, title }: Props) {
  console.log(imageSlug);

  return (
    <div className="relative mb-8 flex h-64 w-full flex-col overflow-hidden bg-amber-100 bg-cover bg-center sm:h-80 md:h-96 md:rounded-md">
      <Image
        src={imageSlug}
        fill={true}
        alt={title}
        style={{ objectFit: "cover" }}
      />
      <h1 className="z-10 mt-auto p-5 text-2xl font-bold text-white md:hidden">
        {title}
      </h1>
      <div className="absolute inset-0 mt-auto h-1/2 w-full bg-gradient-to-b from-transparent to-black opacity-60 md:opacity-0"></div>
    </div>
  );
}

export default Hero;
