module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "tsconfigRootDir": __dirname,
        "project": [ "tsconfig-umd.json" ]
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "ignorePatterns": [
        "**/*.js",
        "**/*.mjs",
        "/node_modules/**/*",
        "src/stats/",
        "src/motion/tween/Tween.ts",
        "src/motion/tween/TweenPlugin.ts",
        "src/motion/tween/ITweenPlugin.ts",
        "/dist/*",
        "/dev/*",
        "/src/textures/parsers/BitmapTextParser.ts"
    ],
    "rules": {
        "@typescript-eslint/ban-types": [ "off" ],
        "@typescript-eslint/brace-style": [ "error", "allman", { "allowSingleLine": true } ],
        "@typescript-eslint/indent": [ "error", 4, { "SwitchCase": 1 } ],
        "@typescript-eslint/keyword-spacing": [ "error", { "after": true } ],
        "@typescript-eslint/no-empty-function": [ "error", { "allow": [ "functions", "arrowFunctions", "methods" ] } ],
        "@typescript-eslint/no-inferrable-types": [ "off" ],
        "@typescript-eslint/no-unsafe-assignment": [ "off" ],
        "@typescript-eslint/no-unsafe-call": [ "off" ],
        "@typescript-eslint/no-unsafe-member-access": [ "off" ],
        "@typescript-eslint/no-unsafe-return": [ "off" ],
        "@typescript-eslint/quotes": [ "error", "single" ],
        "@typescript-eslint/semi": [ "error", "always" ],
        "@typescript-eslint/space-before-function-paren": [ "error" ],
        "@typescript-eslint/unbound-method": [ "error", { "ignoreStatic": true } ],
        "array-bracket-spacing": [ "error", "always" ],
        "block-spacing": [ "error", "always" ],
        "brace-style": [ "off" ],
        "camelcase": "off",
        "comma-dangle": [ "error", "never" ],
        "comma-style": [ "error", "last" ],
        "eol-last": [ "error" ],
        "indent": [ "off" ],
        "linebreak-style": [ "off" ],
        "no-empty-function": "off",
        "no-lonely-if": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-plusplus": "off",
        "no-prototype-builtins": [ "off" ],
        "no-trailing-spaces": [ "error", { "skipBlankLines": true, "ignoreComments": true } ],
        "no-underscore-dangle": "off",
        "no-whitespace-before-property": "error",
        "object-curly-newline": [ "error", { "multiline": true, "minProperties": 0, "consistent": true } ],
        "one-var-declaration-per-line": [ "error", "initializations" ],
        "quote-props": [ "error", "as-needed" ],
        "quotes": [ "off" ],
        "semi-spacing": [ "error", { "before": false, "after": true } ],
        "semi": [ "off" ],
        "sort-imports": [ "error", { "ignoreCase": false } ],
        "space-before-blocks": "error",
        "space-before-function-paren": "off",
        "space-in-parens": [ "error",  "never" ],
        "space-infix-ops": [ "error", { "int32Hint": true } ],
        "spaced-comment": [ "error", "always", { "block": { "balanced": true, "exceptions": ["*", "!"] }} ],
        "wrap-regex": "error",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "default",
                "format": [ "camelCase" ]
            },
            {
                "selector": "function",
                "format": [ "PascalCase" ]
            },
            {
                "selector": "interface",
                "format": [ "PascalCase" ],
                "prefix": [ "I" ]
            },
            {
                "selector": "variable",
                "format": [ "camelCase", "UPPER_CASE", "PascalCase" ],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "property",
                "format": [ "camelCase", "UPPER_CASE" ],
                "leadingUnderscore": "forbid"
            },
            {
                "selector": "property",
                "modifiers": [ "private" ],
                "format": [ "camelCase" ],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "property",
                "modifiers": [ "protected" ],
                "format": [ "camelCase" ],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "property",
                "modifiers": [ "readonly" ],
                "format": [ "camelCase", "UPPER_CASE" ]
            },
            {
                "selector": "property",
                "prefix": [ "OES" ],
                "format": null
            },
            {
                "selector": "parameter",
                "format": [ "camelCase", "UPPER_CASE" ],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "memberLike",
                "modifiers": [ "private" ],
                "format": [ "camelCase" ],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "memberLike",
                "modifiers": [ "protected" ],
                "format": [ "camelCase" ],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "method",
                "modifiers": [ "private" ],
                "format": [ "camelCase" ],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "method",
                "modifiers": [ "static" ],
                "format": [ "camelCase", "UPPER_CASE", "PascalCase" ]
            },
            {
                "selector": "typeLike",
                "format": [ "PascalCase" ]
            }
        ]
    }
};
