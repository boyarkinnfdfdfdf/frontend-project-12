import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  js.configs.recommended,

  {
    ...stylistic.configs.customize({
      rules: {
        'arrow-parens': ['error', 'always'],
      },
    }),
    files: ['**/*.{js,jsx,ts,tsx}'],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['*/node_modules/*', '*/dist/*'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
