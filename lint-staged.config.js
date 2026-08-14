module.exports = {
    '*.{ts,tsx,js,jsx}': [
        'eslint --fix --max-warnings=0 --no-warn-ignored',
        'prettier --write',
    ],
    '*.{ts,tsx}': () => 'tsc --noEmit',
    '*.{css,scss,module.css}': ['prettier --write'],
    '*.{md,mdx}': ['prettier --write'],
    '*.{json,yml,yaml}': ['prettier --write'],
};
