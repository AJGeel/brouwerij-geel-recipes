"use client";

import { getRandomWord } from "@/services/ui/getRandomWord";
import { useState } from "react";

type Props = {
  initialWord: string;
};

const RandomWord = ({ initialWord }: Props) => {
  const [word, setWord] = useState(initialWord);

  return (
    <span
      className="cursor-pointer hover:text-amber-500 duration-150 select-none active:text-amber-100"
      onClick={() => {
        const newWord = getRandomWord();
        setWord(newWord);
      }}
    >
      {word}
    </span>
  );
};

export default RandomWord;
