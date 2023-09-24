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

export const getRandomWord = () =>
  dictionary[Math.floor(Math.random() * dictionary.length)];
