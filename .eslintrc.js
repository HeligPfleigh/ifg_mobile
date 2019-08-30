module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    'func-names': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-prototype-builtins': 'off',
    'no-underscore-dangle': 'off',
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 'off',
    'react-native/no-inline-styles': 'off',
    'react/no-array-index-key': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/forbid-prop-types': 'off',
  },
};
