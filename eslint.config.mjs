import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Static prototype assets served as-is (babel-runtime JSX, not part of the Next build).
    "public/**",
    // Build/codegen scripts run via tsx, not part of the app bundle.
    "scripts/**",
  ]),
]);

export default eslintConfig;
