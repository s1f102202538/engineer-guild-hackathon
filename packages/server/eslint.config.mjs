import typescriptEslint from "@typescript-eslint/eslint-plugin";
import node from "eslint-plugin-node";
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

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:node/recommended",
    "eslint-config-prettier",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        node,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "node/no-unsupported-features/es-syntax": ["error", {
            ignores: ["modules"],
        }],

        "node/no-missing-import": "off",
        "node/no-unpublished-import": "off",
    },
}];
