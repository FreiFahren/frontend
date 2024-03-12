// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      'no-trailing-spaces': ['error'], // disallow trailing whitespaces at the end of lines
      'no-multiple-empty-lines': ['error', { 'max': 1 }], // disallow multiple empty lines
    }
  }
);