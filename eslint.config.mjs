import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Determine __dirname for module-based projects.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up compatibility for legacy ESLint config formats.
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Extend modern Next.js and TypeScript ESLint configurations.
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended"
  ),

  {
    // Apply these rules for all JavaScript/TypeScript files.
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // --- React Rules ---
      // Prevent security vulnerabilities like XSS.
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [
            { char: ">", alternatives: [">"] },
            { char: "}", alternatives: ["}"] },
          ],
        },
      ],
      // Ensure performance in React lists.
      "react/jsx-key": "error",
      // Prevent unexpected behavior from duplicate props.
      "react/jsx-no-duplicate-props": "error",
      // Style rule, not critical for breaking or bloat.
      "react/self-closing-comp": "off",
      // Style rule, not critical for breaking or bloat.
      "react/jsx-curly-brace-presence": "off",

      // --- TypeScript Rules ---
      // Warn on type safety risks, but don’t block.
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow flexibility in type inference.
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // Highlight potential bloat, but don’t enforce.
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // Warn on risky assertions that could break at runtime.
      "@typescript-eslint/no-non-null-assertion": "warn",

      // --- Code Style & Quality ---
      // Warn on console logs to reduce bloat, allow debugging.
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Encourage good practice, but not critical.
      "prefer-const": "warn",
      // Prevent scope issues that could break code.
      "no-var": "error",
      // Enforce strict equality to avoid coercion bugs.
      "eqeqeq": ["error", "always", { null: "ignore" }],
      // Prevent confusion and potential errors.
      "no-duplicate-imports": "error",
      // Warn on param reassignment to avoid bugs.
      "no-param-reassign": "warn",
      // Style rule, not critical for breaking or bloat.
      "arrow-body-style": "off",

      // --- Maintainability & Complexity ---
      // Warn on overly complex code, but don’t block.
      "max-depth": ["warn", 4],
      // Warn on high complexity, but don’t enforce.
      "complexity": ["warn", 15],
      // Warn on readability issues, but allow flexibility.
      "no-nested-ternary": "warn",

      // --- Next.js Specific ---
      // Encourage optimization, but don’t enforce.
      "@next/next/no-img-element": "warn",
      // Critical for Next.js routing integrity.
      "@next/next/no-html-link-for-pages": "error",

      // --- Additional Best Practices ---
      // Style rule, not critical for breaking or bloat.
      "sort-imports": "off",
    },
  },

  {
    // Special overrides for test files to allow more flexibility.
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
];