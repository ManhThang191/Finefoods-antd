import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier';

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    prettier: pluginPrettier,
    '@typescript-eslint': tseslint.plugin, // Đăng ký plugin đúng cách ✅
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  ignores: ['dist', 'node_modules'],
  languageOptions: {
    parser: tseslint.parser,
    sourceType: 'module'
  }
});