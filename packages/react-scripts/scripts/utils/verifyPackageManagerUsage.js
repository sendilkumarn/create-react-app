// @remove-file-on-eject
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const fs = require('fs-extra');
const chalk = require('chalk');
const paths = require('../../config/paths');

function verifyPackageManagerUsage() {
  const yarnIntegrity = fs.existsSync(paths.yarnIntegrityFile);
  const mixedNpmAndYarn =
    (fs.existsSync(paths.yarnLockFile) || yarnIntegrity) &&
    fs.existsSync(paths.appPackageLockFile);

  if (mixedNpmAndYarn) {
    console.log();
    console.log(
      'You might have corrupted your dependencies, since you have used different package managers to manage dependencies'
    );
    console.log(
      chalk.red(
        "Please don't change the package manager: for more info https://bit.ly/CRA-yarn"
      )
    );
    console.log();

    console.log('So what can you do now?');
    console.log(
      'remove your node modules and the `lock files` then install your packages'
    );
    console.log('rm -Rf node_modules package-lock.json yarn.lock');
    if (yarnIntegrity) {
      console.log('yarn');
    } else {
      console.log('npm install');
    }

    process.exit(1);
  }
}

module.exports = verifyPackageManagerUsage;
