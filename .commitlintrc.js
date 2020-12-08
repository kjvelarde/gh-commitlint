module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'subject-empty': [0],
    'type-empty': [0],
    'type-enum': [0],
    'header-max-length': [2, 'always', 72],
    'header-case': [2, 'always', ['lowercase', 'uppercase', 'sentence-case']],
  },
};
