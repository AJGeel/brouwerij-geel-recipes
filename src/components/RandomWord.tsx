"use client";

import { useState } from "react";

import { getRandomWord } from "@/services/ui/getRandomWord";

type Props = {
  initialWord: string;
};

const RandomWord = ({ initialWord }: Props) => {
  const [currentWord, setCurrentWord] = useState(initialWord);

  return (
    <span
      className="cursor-pointer select-none duration-150 hover:text-amber-500 active:text-amber-100"
      onClick={() => {
        const newWord = getRandomWord(currentWord);
        setCurrentWord(newWord);
      }}
    >
      {currentWord}
    </span>
  );
};

export default RandomWord;
