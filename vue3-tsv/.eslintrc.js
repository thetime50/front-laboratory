module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "vue/setup-compiler-macros":true
    },
    "parser":"vue-eslint-parser",
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-this-alias": [
            "error",
            {
                "allowDestructuring": false, // Disallow `const { props, state } = this`; true by default
                "allowedNames": ["self"] // Allow `const self = this`; `[]` by default
            }
        ]
    }
}
