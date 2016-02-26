/* eslint-disable no-param-reassign */
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

///////////////////////////
//
// Set up login handler
//
///////////////////////////
Accounts.registerLoginHandler(function (loginRequest) {

  if (!loginRequest.fbConnect) {
    return undefined;
  }

  const authData = loginRequest.authResponse;
  const details = Facebook.getUserDetails(authData);

  return Accounts.updateOrCreateUserFromExternalService('facebook', details.serviceData, details.options);
});


///////////////////////////
//
// Change service settings
//
///////////////////////////
if (Meteor.settings &&
    Meteor.settings.facebook &&
    Meteor.settings.facebook.appId &&
    Meteor.settings.facebook.secret) {

  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });

  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: Meteor.settings.facebook.appId,
    secret: Meteor.settings.facebook.secret
  });

  Accounts.addAutopublishFields({
    // publish all fields including access token, which can legitimately
    // be used from the client (if transmitted over ssl or on
    // localhost). https://developers.facebook.com/docs/concepts/login/access-tokens-and-types/,
    // "Sharing of Access Tokens"
    forLoggedInUser: ['services.facebook'],
    forOtherUsers: [
      // https://www.facebook.com/help/167709519956542
      'services.facebook.id', 'services.facebook.username', 'services.facebook.gender'
    ]
  });

} else {
  console.log("Meteor settings for accounts-facebook-cordova not configured correctly:");
  console.log("Set Meteor.settings.facebook.appId, Meteor.settings.facebook.secret, Meteor.settings.facebook.profileFields[])")
}

///////////////////////////
//
// Facebook graph helpers
//
///////////////////////////
function getIdentity(accessToken, fields) {
  try {
    return HTTP.get('https://graph.facebook.com/me', {
      params: {
        access_token: accessToken,
        fields,
      },
    }).data;
  } catch (err) {
    throw _.extend(new Error(`Failed to fetch identity from Facebook: ${err.message}`),
                   { response: err.response });
  }
}

function getProfilePicture(accessToken) {
  try {
    // Minimum FB profile pic size is 180x180px
    return HTTP.get('https://graph.facebook.com/v2.0/me/picture/?redirect=false&height=180&width=180', {
      params: { access_token: accessToken },
    }).data.data.url;
  } catch (err) {
    throw _.extend(new Error(`Failed to fetch identity from Facebook: ${err.message}`),
                   { response: err.response });
  }
}
