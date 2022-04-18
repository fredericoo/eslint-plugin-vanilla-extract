const { RuleTester } = require("eslint");

const rule = require('./omit-redundant-style');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

ruleTester.run('omit-redundant-style', rule, {
  valid: [
`import { style } from "@vanilla-extract/css";
import { atoms } from "../common/sprinkles.css";

export const buttonStyle = style([
  atoms({
    position: 'relative',
  }),
  atoms({
    display: 'flex',
  }),
]);
`,
  ].map(code => ({code})) ,
  invalid: [
    {
      code: `
import { style } from "@vanilla-extract/css";
import { atoms } from "../common/sprinkles.css";

export const buttonStyle = style([
  atoms({
    position: 'relative',
  })
]);
`,
      errors: [
        {
          message: 'style() function can be omitted',
        }
      ],
      output: `
import { style } from "@vanilla-extract/css";
import { atoms } from "../common/sprinkles.css";

export const buttonStyle = atoms({
    position: 'relative',
  });
`
    }
  ]
})
