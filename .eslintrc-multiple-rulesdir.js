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

require('.').RULES_DIR = [path.resolve('fake-rule-dir-one'), path.resolve('fake-rule-dir-two'), path.resolve('fake-rule-dir-three')];

module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    sourceType: 'script',
  },
  rules: {
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'rulesdir/fake-rule': 'error',
    'rulesdir/another-fake-rule': 'error',
    'rulesdir/yet-another-fake-rule': 'error',
    'rulesdir/a-fake-directory-rule': 'error',
  },
  plugins: [PACKAGE_NAME],
};
