/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
  },
  create: function (context) {

    const importedStyles = new Set();
    return {
      ImportDeclaration(node) {
          const from = node.source.value;
          // locally scoped vanilla extract file
          if (from.endsWith('.css') && from.startsWith('./') && !from.endsWith('.module.css')) {
            if ('specifiers' in node && (node.specifiers.some(specifier => specifier.type !== 'ImportNamespaceSpecifier') || node.specifiers.length > 1)) {
              
              // adds all imported styles to a set
              node.specifiers.forEach(specifier => importedStyles.add(specifier.local.name));

              context.report({
                node,
                message: 'all css imports should be imported as `* as style`',
                fix: (fixer) => {
                  return fixer.replaceText(node, 'import * as style from "' + from + '";');
                }
              });
            }
          }
      },
      Identifier(node) {
        const name = node.name;
        if (importedStyles.has(name) && !['ImportSpecifier', 'ImportDeclaration', 'ImportNamespaceSpecifier'].includes(node.parent.type)) {
          context.report({
            node,
            message: 'do not access individual styles directly, use `style` instead',
            fix: (fixer) => {
              return fixer.replaceText(node, 'style.' + name);
            }
          });
        }
      }
    }
  }
};
