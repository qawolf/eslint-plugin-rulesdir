'use strict';

const fs = require('fs');
const path = require('path');
const PACKAGE_NAME = require('./package').name;

const SYMLINK_LOCATION = path.join(__dirname, 'node_modules', PACKAGE_NAME);

// Symlink node_modules/{package name} to this directory
// so that ESLint resolves this plugin name correctly.
// (Yes, this plugin still has to hack node_modules to bootstrap itself.)
if (!fs.existsSync(SYMLINK_LOCATION)) {
  fs.symlinkSync(__dirname, SYMLINK_LOCATION);
}

require('.').RULES_DIR = [path.resolve('fake-rule-dir-one'), path.resolve('fake-rule-dir-two'), path.resolve('fake-rule-dir-three'), path.resolve('does-not-exist')];

module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    sourceType: 'script',
  },
  rules: {
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    '@qawolf/rulesdir/fake-rule': 'error',
    '@qawolf/rulesdir/another-fake-rule': 'error',
    '@qawolf/rulesdir/yet-another-fake-rule': 'error',
    '@qawolf/rulesdir/a-fake-directory-rule': 'error',
  },
  plugins: [PACKAGE_NAME],
};
