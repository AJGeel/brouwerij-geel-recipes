"use client";

import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: Props) => (
  <div className="flex items-center flex-grow justify-center">
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12">
      <h2 className="text-xl font-bold">Oh jee!</h2>
      <p className="my-2">
        Deze pagina kan niet getoond worden. Mogelijk heeft iemand bier gemorst
        over de server...
      </p>
      <p className="text-sm my-2">Referentie: {error.digest}.</p>
      <button
        className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-amber-100 p-4 tracking-wide text-gray-900 hover:bg-amber-200 duration-150"
        onClick={() => reset()}
      >
        Probeer het opnieuw
      </button>
      <Link
        href="/"
        className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-gray-900 p-4 tracking-wide text-white hover:bg-gray-700 duration-150"
      >
        Terug naar home
      </Link>
    </div>
  </div>
);

export default Error;
