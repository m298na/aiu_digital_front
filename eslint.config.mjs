import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**"],
  },
  {
    rules: {
      // Client pages fetch in effects; setting loading flags there is intentional.
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
