/* eslint-disable prefer-arrow-callback */
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
Package.describe({
  summary: 'Login service for Facebook (2.4) accounts (works with cordova)',
  version: '0.0.6',
  git: 'https://github.com/heysailor/accounts-facebook.git',
  author: 'Nick McIntosh',
  name: 'heysailor:accounts-facebook-cordova4',
});

Package.onUse(function config(api) {
  api.versionsFrom('1.2.0.1');
  api.use([
    'ecmascript',
    'accounts-base',
    'accounts-oauth',
    'heysailor:facebook',
    'service-configuration',
    'http',
    'underscore',
  ], ['client', 'server']);

  // Export Accounts (etc) to packages using this one.
  api.imply([
    'accounts-base',
  ], ['client', 'server']);

  // api.add_files('facebook_server.js', 'server');
  api.add_files('facebook.js');
});
