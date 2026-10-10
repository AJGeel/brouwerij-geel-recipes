export const dictionary = [
  "verboemelen",
  "verbrassen",
  "verbruiken",
  "verdoen",
  "verdoezelen",
  "verkloten",
  "verklungelen",
  "verknoeien",
  "verkwakkelen",
  "verkwanselen",
  "verkwijnen",
  "verkwisten",
  "verloederen",
  "verlummelen",
  "verpatsen",
  "verprutsen",
  "verspatten",
  "verspelen",
  "verspillen",
  "verstieren",
];

export const getRandomWord = (
  currentWord?: string,
  randomWords = dictionary
) => {
  const options = randomWords.filter((item) => item !== (currentWord ?? ""));

  return options[Math.floor(Math.random() * options.length)];
};
