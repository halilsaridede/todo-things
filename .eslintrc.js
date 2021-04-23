module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['prettier'],
  rules: {
    //'prettier/prettier': ['error'],
    "semi": ["error", "never"],
    'object-curly-newline': ['error', 'always'],
  },
};
