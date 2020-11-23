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
const scopeMatcher = '[AVLN]{0,4}-[0-9]{0,}';
const typeMatcher = `[(](${types.toString().replace(/,/g, '|')})[)]`;
const example = 'e.g AVLN-1234(feat): add new feature';

module.exports = {
  // extends: ['@commitlint/config-angular'],
  // parserPreset: {
  //   parserOpts: {
  //     headerPattern: '^[A-Z]+-[0-9]+: ([a-z]*)\\(([^\\)]*)\\): (.*)$',
  //     headerCorrespondence: ['scope', 'type', 'subject'],
  //     issuePrefixes: ['AVLN-'],
  //     referenceActions: ['AVLN-'], // (!!)
  //   },
  // },
  rules: {
    'avln-scope': [2, 'always'],
    'avln-type': [2, 'always'],
    // 'avln-subject': [2, 'always'],
    'scope-case': [2, 'always', 'upper-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    // 'subject-empty': [2, 'never'],
    // 'type-case': [2, 'always', 'lower-case'],
    // 'scope-enum': [
    //   2,
    //   'always',
    //   ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']
    // ]
  },
  plugins: [
    {
      rules: {
        'avln-scope': ({ header }) => [
          header.match(scopeMatcher),
          `Your commit should start with a JIRA ticket ${example}`,
        ],
        'avln-type': ({ header }) => [
          header.match(typeMatcher),
          `must have a TYPE ${[...types]} \n${example}`,
        ],
        'avln-subject': (commit) => {
          return [
            commit.header.match(`${typeMatcher}`),
            `Your commit should start with a JIRA ticket (e.g AVLN-1234(feat): add new feature)${JSON.stringify(
              commit
            )}`,
          ];
        },
      },
    },
  ],
};
