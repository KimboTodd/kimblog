import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  { ignores: ['.next/', 'node_modules/'] },
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'prettier'),
  ...compat.plugins('tailwindcss'),
  {
    rules: {
      eqeqeq: ['warn', 'smart'],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      'prefer-template': 'warn',
    },
  },
];

export default config;
