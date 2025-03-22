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
      // Enforce safe HTML encoding in JSX.
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [
            { char: ">", alternatives: ["&gt;"] },
            { char: "}", alternatives: ["&#125;"] },
          ],
        },
      ],
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/self-closing-comp": "warn",
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],

      // --- TypeScript Rules ---
      // Encourage type safety while allowing flexibility.
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-non-null-assertion": "warn",

      // --- Code Style & Quality ---
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      "no-var": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-duplicate-imports": "error",
      "no-param-reassign": "warn",
      "arrow-body-style": ["warn", "as-needed"],

      // --- Maintainability & Complexity ---
      "max-depth": ["warn", 4],
      complexity: ["warn", 15],
      "no-nested-ternary": "warn",

      // --- Next.js Specific ---
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "error",

      // --- Additional Modern Best Practices ---
      // Optional: enforce a consistent import order to keep modules tidy.
      "sort-imports": [
        "warn",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
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
