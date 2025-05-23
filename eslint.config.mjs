import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import {defineConfig} from 'eslint/config';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default defineConfig([
	js.configs.recommended,
	tsEslint.configs.recommended,
	eslintPluginUnicorn.configs.recommended,
	eslintConfigPrettier,
	{
		languageOptions: {
			globals: {...globals.node},

			ecmaVersion: 2025,
			sourceType: 'module',
		},

		rules: {
			'no-console': 'off',
			'no-plusplus': 'off',
			'no-await-in-loop': 'off',
			'no-restricted-syntax': 'off',
			'no-param-reassign': ['error'],
			'consistent-return': ['error'],
			'no-else-return': ['error'],
		},
	},
]);
