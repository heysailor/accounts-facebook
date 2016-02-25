/* eslint-disable prefer-arrow-callback */
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
Package.describe({
  summary: 'Login service for Facebook (2.4) accounts (works with cordova)',
  version: '0.1.7',
  git: 'https://github.com/heysailor/accounts-facebook.git',
  author: 'Nick McIntosh',
  name: 'heysailor:accounts-facebook-cordova',
});

Package.onUse(function config(api) {
  api.use([
    'ecmascript@0.1.6',
    'accounts-base@1.2.2',
    'accounts-oauth@1.1.8',
    'heysailor:facebook@1.2.3',
    'service-configuration@1.0.5',
    'http@1.1.1',
    'underscore@1.0.4',
  ], ['client', 'server']);

  // Export Accounts (etc) to packages using this one.
  api.imply([
    'accounts-base',
  ], ['client', 'server']);

  // api.add_files('facebook_server.js', 'server');
  api.add_files('facebook.js');
});
