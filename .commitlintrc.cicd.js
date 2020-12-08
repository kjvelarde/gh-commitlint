/*
DOC: Pattern structure breakup
first group(type): any word
second group(ticket): any word - any digit
third group(scope): any word
bridge: colon followed by a whitespace
fourth group(subject): any character
*/
const headerPattern = /(\w*)\((\w*-\d*)\)\[(\w*)\]:\s(.*)/;
const avalonTicketMatcher = /(AVLN-)[0-9]{0,}/g;
const example = 'e.g feat(AVLN-1234)[awd]: implement new feature';
module.exports = {
  extends: ['@commitlint/config-angular'],
  parserPreset: {
    parserOpts: {
      headerPattern,
      headerCorrespondence: ['type', 'ticket', 'scope', 'subject']
    }
  },
  rules: {
    'avln-ticket': [2, 'always'],
    'scope-case': [2, 'always', ['lower-case']],
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['awd', 'acs', 'arp', 'library', 'monorepo']],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']]
  },
  plugins: [
    {
      rules: {
        'avln-ticket': ({ ticket }) => [
          avalonTicketMatcher.test(ticket),
          `Invalid JIRA Ticket format for Avalon. ${example}`
        ]
      }
    }
  ]
};