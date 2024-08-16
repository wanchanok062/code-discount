import globals from 'globals';
import tsEslintParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'], // Define the files ESLint should check
        languageOptions: {
            globals: globals.node, // Use Node.js globals (e.g., process, Buffer)
            parser: tsEslintParser, // Use TypeScript ESLint parser
            parserOptions: {
                ecmaVersion: 2020, // ECMAScript version 2020
                sourceType: 'module', // Enable ECMAScript modules
                project: './tsconfig.json', // Path to your TypeScript config
            },
        },
        plugins: {
            prettier: prettier, // Prettier plugin
        },
        rules: {
            // TypeScript-specific rules
            'prettier/prettier': 'error', // Prettier rule for formatting
        },
    },
];
