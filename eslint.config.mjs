import globals from 'globals';
import tsEslintParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            globals: globals.node,
            parser: tsEslintParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
        plugins: {
            prettier: prettier,
        },
        rules: {
            'prettier/prettier': 'error',
        },
    },
];
