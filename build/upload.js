const ci = require('miniprogram-ci');
const path = require('path');
const config = require('../example/project.config.json');
const package = require('../package.json');

const project = new ci.Project({
  appid: config.appid,
  type: 'miniProgram',
  projectPath: path.join(__dirname, '../example'),
  privateKeyPath: path.join(__dirname, './private.wx037c5b0955f584b0.key'),
  ignores: ['node_modules/**/*'],
});

ci.upload({
  project,
  version: package.version,
  desc: package.description,
  setting: config.setting,
});
