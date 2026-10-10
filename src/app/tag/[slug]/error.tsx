"use client";

import BackToRecipes from "@/components/BackToRecipes";

const Error = () => (
  <div className="mx-auto w-full max-w-7xl p-5 sm:p-8">
    <h1 className="mt-8 max-w-lg text-3xl font-bold text-gray-900 md:text-4xl ">
      Jammer de pammer...
    </h1>
    <p className="mt-4 max-w-lg">
      We konden niet vinden waar je naar zocht. Misschien heb je iets verkeerds
      getypt.
    </p>
    <div className="mt-16 w-full">
      <BackToRecipes />
    </div>
  </div>
);

export default Error;
