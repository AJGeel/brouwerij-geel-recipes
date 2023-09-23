const dictionary = [
  "verboemelen",
  "verbrassen",
  "verbruiken",
  "verdoen",
  "verkloten",
  "verkwanselen",
  "verkwisten",
  "verlummelen",
  "verprutsen",
  "verspelen",
  "verspillen",
  "verteren",
];

export const randomWaste = () =>
  dictionary[Math.floor(Math.random() * dictionary.length)];
