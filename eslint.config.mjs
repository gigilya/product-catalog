import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import newlineDestructuring from 'eslint-plugin-newline-destructuring';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import stylistic from '@stylistic/eslint-plugin';

import reactHooks from 'eslint-plugin-react-hooks';

const eslintConfig = defineConfig(
    ...nextVitals,
    ...nextTs,
    prettier,
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        'node_modules/**',
    ]),
    {
        plugins: {
            '@stylistic': stylistic,
            'react-hooks': reactHooks,
            'simple-import-sort': simpleImportSort,
            'newline-destructuring': newlineDestructuring,
        },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'newline-destructuring/newline': ['warn', { items: 1 }],
            'react/react-in-jsx-scope': 'off',
            '@stylistic/padding-line-between-statements': [
                'warn',
                { blankLine: 'always', prev: '*', next: 'return' },
            ],
            'react/jsx-wrap-multilines': [
                'warn',
                { logical: 'parens-new-line' },
            ],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            'react/boolean-prop-naming': [
                'error',
                {
                    rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
                    message:
                        'It is better if your prop ({{ propName }}) matches this pattern: ({{ pattern }})',
                    validateNested: true,
                },
            ],
            'react/jsx-sort-props': [
                'warn',
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    multiline: 'last',
                    noSortAlphabetically: true,
                },
            ],
            'react/jsx-handler-names': [
                'error',
                {
                    eventHandlerPrefix: 'handle',
                    eventHandlerPropPrefix: 'on',
                    checkLocalVariables: true,
                    checkInlineFunction: true,
                },
            ],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^react', '^@{0}\\w', '^@?\\w'],
                        ['^ui-kit', '^ui-kit/(.*)'],
                        ['hooks', 'hooks/(.*)'],
                        ['^@app/[a-zA-Z]+$'],
                        ['^@pages/(.*)$'],
                        ['^@widgets/(.*)$'],
                        ['^@features/(.*)$'],
                        ['^@entities/(.*)$'],
                        ['^@shared/(.*)$'],
                        ['^\\u0000'],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        ['^.+\\.s?css$'],
                    ],
                },
            ],
            '@stylistic/key-spacing': [
                'error',
                { afterColon: true, mode: 'strict' },
            ],
            '@stylistic/comma-spacing': [
                'error',
                { before: false, after: true },
            ],
        },
    },
);

export default eslintConfig;
