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
      className="w-16 h-16 flex items-center justify-center hover:bg-amber-100/50 cursor-pointer active:scale-90 duration-150 group"
      onClick={() => onPressShare(recipeName)}
    >
      <ShareIcon className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 duration-150" />
    </button>
  );
};

export default ShareButton;
