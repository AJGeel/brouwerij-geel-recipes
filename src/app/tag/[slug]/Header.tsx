import HeaderLink from "./HeaderLink";

export const Header = ({ title }: { title: string }) => {
  return (
    <div className="mt-9 flex items-center justify-between">
      <HeaderLink href="/" isLeft={true} title="Alle recepten" />

      <div className="flex flex-col items-center">
        <p className="text-gray-500">Je bekijkt:</p>
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          #{title}
        </h1>
      </div>
      <HeaderLink href="/tag" isLeft={false} title="Alle tags" />
    </div>
  );
};
