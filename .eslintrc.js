module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/eslint-plugin-next/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint', '@next/eslint-plugin-next'],
  rules: {
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/no-array-index-key': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'jsx-a11y/anchor-is-valid': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-param-reassign': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: './tsconfig.json',
      },
      react: {
        version: 'detect',
      },
    },
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.tsx',
        'src/setupTests.ts',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
