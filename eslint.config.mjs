import { type Linter } from "eslint";

const eslintConfig: Linter.Config[] = [
  {
    ignores: [".next/*", "node_modules/*"],
  },
];

export default eslintConfig;
