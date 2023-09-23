import { capitalize } from "@/utils/capitalize";

type Props = {
  tags: string[];
};

const Tags = ({ tags }: Props) => (
  <div className="mt-4 gap-3 flex flex-wrap items-center">
    <p className="font-medium">Tags: </p>
    {tags.map((item) => {
      return (
        <p
          className="inline rounded-sm text-gray-600 hover:text-gray-900 duration-150 text-sm cursor-pointer"
          key={item}
        >
          #{capitalize(item)}
        </p>
      );
    })}
  </div>
);

export default Tags;
