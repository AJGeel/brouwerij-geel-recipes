type Level = "warning" | "error";

const escapeAnnotation = (text: string) =>
  text.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");

/** Shows up inline in a pull request; a no-op outside GitHub Actions */
export const githubAnnotation = (
  level: Level,
  { title, file }: { title: string; file?: string },
  message: string,
) => {
  if (!process.env.GITHUB_ACTIONS) {
    return;
  }

  const properties = file ? `file=${file},title=${title}` : `title=${title}`;

  process.stdout.write(
    `::${level} ${properties}::${escapeAnnotation(message)}\n`,
  );
};
