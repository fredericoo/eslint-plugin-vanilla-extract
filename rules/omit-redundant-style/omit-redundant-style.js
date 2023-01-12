/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    fixable: true,
  },
  create: function (context) {
    let hasImportedStyle = false;

    return {
      ImportSpecifier(node) {
        const imported = node.imported.name
        const from = node.parent.source.value;
        if (from === '@vanilla-extract/css' && imported === 'style') {
          hasImportedStyle = true;
        }
      },
      CallExpression(node) {
        if (hasImportedStyle && node.callee.name === 'style') {
          const [cssRules] = node.arguments;

          if (cssRules && cssRules.type === 'ArrayExpression' && cssRules.elements.length < 2) {
            const [singleRule] = cssRules.elements
            const singleRuleCode = context.getSourceCode().getText(singleRule)

            context.report({
              node,
              message: 'style() function can be omitted',
              fix: (fixer) => {
                return fixer.replaceText(node, singleRuleCode);
              }
            });
          }
        }
      }
    }
  }
};
