"use client";

import Link from "next/link";

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
      <Link
        href="/"
        className="group flex h-48 items-center justify-center rounded-md border-2 border-amber-100 bg-white duration-150 ease-in-out active:scale-95 active:opacity-75 md:h-64"
      >
        <p className="text-gray-400 duration-1000 group-hover:scale-105">
          Terug naar alle recepten
        </p>
      </Link>
    </div>
  </div>
);

export default Error;
