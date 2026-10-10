import { splitStepNumber } from "@/services/markdown/splitStepNumber";

type Props = {
  html: string;
};

const Step = ({ html }: Props) => {
  const step = splitStepNumber(html);

  if (step.number === null) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-100 font-display text-sm font-semibold text-amber-500"
      >
        {step.number}
      </span>
      <div
        className="min-w-0 flex-1 [&>p]:my-0"
        dangerouslySetInnerHTML={{ __html: step.html }}
      />
    </div>
  );
};

export default Step;
