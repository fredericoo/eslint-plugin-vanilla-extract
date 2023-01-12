/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  rules: {
    "omit-redundant-style": require('./rules/omit-redundant-style/omit-redundant-style'),
    "no-individual-styles-imported": require('./rules/no-individual-styles-imported/no-individual-styles-imported'),
  },
  configs: {
    recommended: {
      plugins: ['@fredericoo/vanilla-extract'],
    }
  }
}
