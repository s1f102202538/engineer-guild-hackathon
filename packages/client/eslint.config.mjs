import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [...compat.extends(
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "next/typescript",
    "eslint-config-prettier",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        react,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",

            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    rules: {
        "react/react-in-jsx-scope": "off",

        "react/function-component-definition": [2, {
            namedComponents: "arrow-function",
            unnamedComponents: "arrow-function",
        }],

        "react/prop-types": "off",
    },
}];
