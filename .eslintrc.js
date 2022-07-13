module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'airbnb-base',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': ['error', {
      tsx: 'never',
      css: 'always',
      png: 'always',
      svg: 'always',
      jpg: 'always',
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-underscore-dangle': 'off',
    'max-len': ['error', { ignoreComments: true, code: 200 }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    camelcase: 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
      ],
      rules: {
        'no-shadow': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        // always try to resolve types under `<root>@types` directory
        // even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        // Choose from one of the "project" configs below
        // or omit to use <root>/tsconfig.json by default
        // use <root>/path/to/folder/tsconfig.json
        // project: 'path/to/folder',

        // Multiple tsconfigs (Useful for monorepos)

        // use a glob pattern
        // project: 'packages/*/tsconfig.json',

        // // use an array
        // project: [
        //   'packages/module-a/tsconfig.json',
        //   'packages/module-b/tsconfig.json',
        // ],

        // // use an array of glob patterns
        // project: [
        //   'packages/*/tsconfig.json',
        //   'other-packages/*/tsconfig.json',
        // ],
      },
    },
  },
};
