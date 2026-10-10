import md from "markdown-it";

/** Renders markdown to HTML, one string per top-level block (paragraph, list, ...) */
export const renderMarkdownBlocks = (content: string): string[] => {
  const parser = md();
  const env = {};

  const blocks: ReturnType<typeof parser.parse>[] = [];
  let currentBlock: (typeof blocks)[number] = [];
  let depth = 0;

  for (const token of parser.parse(content, env)) {
    currentBlock.push(token);
    depth += token.nesting;

    if (depth === 0) {
      blocks.push(currentBlock);
      currentBlock = [];
    }
  }

  return blocks.map((block) =>
    parser.renderer.render(block, parser.options, env)
  );
};
