module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended', // для TypeScript
    'next/core-web-vitals', // для Next.js
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }], // Разрешить JSX/TSX в .jsx и .tsx
    'react/prop-types': 'off', // Отключить, если используете TypeScript
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 'off',
  },
};
