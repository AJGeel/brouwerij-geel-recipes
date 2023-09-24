const dictionary = [
  "verboemelen",
  "verbrassen",
  "verbruiken",
  "verdoen",
  "verkloten",
  "verknoeien",
  "verkwanselen",
  "verkwijnen",
  "verkwisten",
  "verloederen",
  "verlummelen",
  "verprutsen",
  "verspatten",
  "verspelen",
  "verspillen",
  "verstieren",
];

export const getRandomWord = (currentWord?: string) => {
  const options = dictionary.filter((item) => item !== (currentWord ?? ""));

  return options[Math.floor(Math.random() * options.length)];
};
