module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'chore',
        'feat',
        'test',
        'docs',
        'fix',
        'build',
        'ci',
        'perf',
        'refactor',
        'revert',
        'style'
      ]
    ],
    'subject-case': [2, 'always', 'lowerCase'],
    'subject-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case']
  }
}
