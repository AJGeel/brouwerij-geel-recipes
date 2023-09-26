import HeaderLink from "./HeaderLink";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => (
  <div className="mt-9 flex flex-row-reverse md:flex-row items-center justify-between">
    <HeaderLink href="/" isLeft={true} title="Alle recepten" />
    <div className="flex flex-col items-start md:items-center">
      <p className="text-gray-500">Je bekijkt:</p>
      <h1 className="text-xl md:text-3xl font-bold text-gray-900 text-center truncate">
        #{title}
      </h1>
    </div>
    <HeaderLink href="/tag" isLeft={false} title="Alle tags" />
  </div>
);
