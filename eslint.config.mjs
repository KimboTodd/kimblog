import nextConfig from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';
import tailwind from 'eslint-plugin-tailwindcss';

const config = [
  { ignores: ['.next/', 'node_modules/'] },
  ...nextConfig,
  ...tailwind.configs['flat/recommended'],
  prettier,
  {
    rules: {
      eqeqeq: ['warn', 'smart'],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      'prefer-template': 'warn',
      // React Compiler not adopted
      'react-compiler/react-compiler': 'off',
      // Dropchain game uses setState in effects intentionally
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];

export default config;
