import { ReactNode, ViewTransition } from "react";

type Props = {
  /** Later steps arrive later, see `.stagger-*` in globals.css */
  step: 0 | 1;
  children: ReactNode;
};

/** Fades and slides content up when arriving through a forward navigation */
const Stagger = ({ step, children }: Props) => (
  <ViewTransition
    default="none"
    enter={{ "nav-forward": `stagger-${step}`, default: "none" }}
  >
    {children}
  </ViewTransition>
);

export default Stagger;
