module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: ["eslint:recommended", "airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["prettier"],
  rules: {
    "linebreak-style": "off",
    "no-empty-function": "off",
    "object-shorthand": ["error", "always"],
    "no-underscore-dangle": "off",
    "spaced-comment": "off",
    "one-var": "off",
    "no-undef": "off",
    "no-var": "off",
    "no-void": "off",
    "no-shadow": "off",
    "no-unused-vars": "off",
    "prefer-template": "off",
    "no-useless-concat": "off",
    "vars-on-top": "off",
    "no-use-before-define": "off",
    "prettier/prettier": [
      "off",
      {
        endOfLine: "auto"
      },
      {
        usePrettierrc: true
      }
    ],
    "no-console": "off",
    "import/prefer-default-export": "off",
    "func-names": "off",
    "no-param-reassign": "off",
    "class-methods-use-this": "off",
    "consistent-return": "off",
    camelcase: "off",
    "import/extensions": "off",
    "no-new": "off"
  }
};
