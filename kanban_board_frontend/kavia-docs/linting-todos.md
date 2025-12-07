# Linting TODOs

- The ESLint config declares browser/test globals (localStorage, FileReader, setTimeout, clearTimeout, console, require) to align with code usage.
- Unused vars are downgraded to `warn` with patterns to ignore common React/App placeholders and underscore-prefixed args. Review warnings periodically and clean up dead code where feasible.
- If additional non-auto-fixable errors appear, annotate with inline `// TODO:` and refactor in future commits.
