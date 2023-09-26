"use client";

import Link from "next/link";

const Error = () => (
  <div className="max-w-7xl w-full mx-auto p-5 sm:p-8">
    <h1 className="text-3xl md:text-4xl mt-8 font-bold text-gray-900 max-w-lg ">
      Jammer de pammer...
    </h1>
    <p className="mt-4 max-w-lg">
      We konden niet vinden waar je naar zocht. Misschien heb je iets verkeerds
      getypt.
    </p>
    <div className="w-full mt-16">
      <Link
        href="/"
        className="bg-white border-2 border-amber-100 rounded-md h-48 md:h-64 flex items-center justify-center active:scale-95 active:opacity-75 duration-150 ease-in-out group"
      >
        <p className="group-hover:scale-105 duration-1000 text-gray-400">
          Terug naar alle recepten
        </p>
      </Link>
    </div>
  </div>
);

export default Error;
