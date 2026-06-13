// Flat ESLint config (ESLint 9). Uses the base Next.js preset (not
// `core-web-vitals`) to keep `npm run lint` green on the current tree without
// mass-fixing pre-existing code. The preset's default export is a flat-config
// array, spread in directly.
import next from "eslint-config-next";

const config = [
  {
    ignores: [".next/**", ".open-next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  ...next,
];

export default config;
