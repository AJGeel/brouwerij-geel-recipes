# Code style

- Don't add comments that restate what the code does. Only comment on the non-obvious "why" (workarounds, constraints, things to keep in sync).
- Match the comment density of the surrounding code.

# Keeping the codebase healthy

- Before adding a component, hook or helper, check whether something similar already exists and extend or reuse it instead of duplicating.
- When two or more pieces share most of their structure, extract the shared part into one generic helper and keep the pieces to what actually differs.
- After extracting, check whether the original pieces still justify their own files. If they are now thin wrappers, inline them.
- Name things for what they are: a function that isn't a hook doesn't get a `use` prefix, and a non-hook doesn't live in `hooks/`.
- Don't move or rename files you didn't create unless asked. If a file appears to be in the wrong place, ask first.
