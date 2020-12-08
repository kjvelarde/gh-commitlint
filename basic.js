const types = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
];
const scopeMatcher = new RegExp('(AVLN-)[0-9]{0,}', 'g');

const example = 'e.g feat(AVLN-1234): add new feature';

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'avln-scope': [2, 'always'],
    'scope-case': [2, 'always', 'upper-case'],
  },
  plugins: [
    {
      rules: {
        'avln-scope': ({ scope }) => [
          scopeMatcher.test(scope),
          `Your commit should start with a JIRA ticket ${example} ${`[(](${types
            .toString()
            .replace(/,/g, '|')})[)]`}`,
        ],
      },
    },
  ],
};
