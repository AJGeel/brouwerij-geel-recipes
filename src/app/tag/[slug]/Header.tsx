import HeaderLink from "./HeaderLink";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => (
  <div className="mt-9 flex flex-row-reverse items-center justify-between md:flex-row">
    <HeaderLink href="/" isLeft={true} title="Alle recepten" />
    <div className="flex flex-col items-start md:items-center">
      <p className="text-gray-500">Je bekijkt:</p>
      <h1 className="truncate text-center text-xl font-bold text-gray-900 md:text-3xl">
        #{title}
      </h1>
    </div>
    <HeaderLink href="/tag" isLeft={false} title="Alle tags" />
  </div>
);
