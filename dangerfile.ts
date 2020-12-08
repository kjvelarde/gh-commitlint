import { danger, schedule, fail, warn } from 'danger';
const path = require('path');
const commitlint = require('@commitlint/core');
const defaults = require('defaults');

interface RuleOptions {
  configFile?: string;
}

async function loadConfig(file: string) {
  try {
    return {
      config: await commitlint.load(undefined, { file }),
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

export default async function lintTitle(ruleOptions?: RuleOptions) {
  if (!danger.github || !danger.github.pr) {
    throw new Error('Not a PR');
  }

  const options: Required<RuleOptions> = defaults(ruleOptions, {
    configFile: path.join(__dirname, '.commitlint.cicd.js'),
  });

  const { title } = danger.github.pr;

  const lintConfig = await loadConfig(options.configFile);

  if (lintConfig.error) {
    fail(`Error loading config: ${lintConfig.error}`);
  } else if (lintConfig.config) {
    const result = await commitlint.lint(
      title,
      lintConfig.config.rules as any,
      {
        defaultIgnores: lintConfig.config.defaultIgnores,
        ignores: lintConfig.config.ignores,
        plugins: lintConfig.config.plugins,
      }
    );

    const hasErrors = result.errors.length > 0;
    const hasWarnings = result.warnings.length > 0;

    if (hasErrors || hasWarnings) {
      const message = commitlint.format(
        {
          results: [result],
        },
        {
          color: false,
          helpUrl:
            'https://github.com/conventional-changelog/commitlint#what-is-commitlint',
        }
      );

      const failOrWarn = hasErrors ? fail : warn;

      failOrWarn(`PR title does not meet expected format:\n${message}`);
    }
  }
}

schedule(lintTitle());
