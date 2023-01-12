# eslint-plugin-vanilla-extract

Eslint plugin for vanilla extract lib

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
pnpm add eslint -D
```

Next, install `@fredericoo/eslint-plugin-vanilla-extract`:

```sh
pnpm add -D @fredericoo/eslint-plugin-vanilla-extract
```

## Usage

Add `@fredericoo/vanilla-extract` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@fredericoo/vanilla-extract"
    ]
}
```


Then configure the rules you want to use under the rules section.

e.g.:
```json
{
    "rules": {
        "@fredericoo/vanilla-extract/no-individual-styles-imported": 2
    }
}
```

## Supported Rules


| Rule ID | Description | Fixable |
|:--------|:------------|:--------|
| @fredericoo/vanilla-extract/omit-redundant-style | If you’s using `style()` to generate a className and only consuming atoms or other classNames, it is redundant and can be removed | ✅ |
| @fredericoo/vanilla-extract/no-individual-styles-imported | If you’re importing individual styles from a file, you should import the entire file with `* as style` and consume from it | ✅ |

