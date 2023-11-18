"use client";

import { ShareIcon } from "@heroicons/react/20/solid";
import toast, { ToastOptions } from "react-hot-toast";

import { shareRecipe } from "@/services/ui/shareRecipe";

type Props = {
  recipeName: string;
};

const onPressShare = async (recipeName: string) => {
  const shareResponse = await shareRecipe(recipeName);

  const toastOptions: ToastOptions = {
    id: shareResponse.text,
  };

  if (shareResponse.wasSuccessful) {
    toast.success(shareResponse.text, toastOptions);
    return;
  }

  toast.error(shareResponse.text, toastOptions);
};

const ShareButton = ({ recipeName }: Props) => {
  return (
    <button
      className="group flex h-16 w-16 cursor-pointer items-center justify-center duration-150 hover:bg-amber-100/50 active:scale-90"
      onClick={() => onPressShare(recipeName)}
    >
      <ShareIcon className="h-6 w-6 shrink-0 text-gray-400 duration-150 group-hover:text-gray-900" />
    </button>
  );
};

export default ShareButton;
