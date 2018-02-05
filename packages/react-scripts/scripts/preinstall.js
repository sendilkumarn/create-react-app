// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs-extra');
const chalk = require('chalk');
const paths = require('../config/paths');

const isYarnProject =
  fs.existsSync(paths.yarnLockFile) ||
  fs.existsSync(`${paths.appNodeModules}/.yarn-integrity`);

const isNpmProject = fs.existsSync(`${paths.appPath}/package.json`);

const errorMessage = command =>
  chalk.red(`Please use ${command}: for more info https://bit.ly/CRA-yarn`);

if (isYarnProject) {
  if (process.env.npm_execpath.indexOf('yarn') === -1) {
    console.error(errorMessage('yarn'));
    process.exit(1);
  }
}

if (isNpmProject) {
  if (
    !process.env.npm_config_git ||
    process.env.npm_execpath.indexOf('yarn') !== -1
  ) {
    console.error(errorMessage('npm'));
    process.exit(1);
  }
}