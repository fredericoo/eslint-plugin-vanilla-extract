const { RuleTester } = require("eslint");

const rule = require('./no-individual-styles-imported');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

ruleTester.run('no-individual-styles-imported', rule, {
  valid: [`import * as style from "./component.css";
          const className = style.label;`,
          `import { atomic } from "./sprinkles.css";
          const className = atomic({ color: 'red' });`,
  ].map(code => ({code})) ,
  invalid: [
    {
      code: `
import { label } from "./labelComponent.css";

const className = label;
`,
      errors: [
        {
          message: 'all css imports should be imported as `* as style`', line: 2,
        },
        { message: 'do not access individual styles directly, use `style` instead', line: 4  },
      ],
      output: `
import * as style from "./labelComponent.css";

const className = style.label;
`
    }
  ]
})
