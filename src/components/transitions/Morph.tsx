import { ReactNode, ViewTransition } from "react";

type Props = {
  /** Elements with the same name morph into each other across pages */
  name: string;
  children: ReactNode;
};

/** A shared element that morphs between pages, see `.morph` in globals.css */
const Morph = ({ name, children }: Props) => (
  <ViewTransition name={name} share="morph" default="none">
    {children}
  </ViewTransition>
);

export default Morph;
