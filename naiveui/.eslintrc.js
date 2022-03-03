module.exports = {
  root: true,
  env: {
    node: true,
    // eslint-plugin-vue 配置 都是没有找到文档
    // https://eslint.vuejs.org/rules/comment-directive.html
    'vue/setup-compiler-macros': true, 
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
