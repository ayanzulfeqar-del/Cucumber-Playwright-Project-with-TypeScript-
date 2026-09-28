module.exports = {
  default: {
    paths: ['tests/features/*.feature'],
    requireModule: ['ts-node/register'],
    require: [
      'tests/features/step_definations/*.ts',
      'tests/features/support/*.ts',
    ],
    format: ['progress', 'html:cucumber-report.html'],
  },
};
