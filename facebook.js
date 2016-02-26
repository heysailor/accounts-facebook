Accounts.oauth.registerService('facebook');
Meteor.loginWithFacebook = function(options, callback) {
  // support a callback without options
  if (! callback && typeof options === "function") {
    callback = options;
    options = null;
  }

  var fbLoginSuccess = function (data) {
    console.log('Logged in with FB Connect:', data);
    data.fbConnect = true;

    // console.log(Accounts.callLoginMethod);

    Accounts.callLoginMethod({
      methodArguments: [data],
      userCallback: callback
    });
  }

  var fbLoginError = function (error) {
    if (error) {
      console.log('FB Connect error:', error);
      return callback(error);
    }
  }

  var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);

  if (typeof facebookConnectPlugin != "undefined" && Meteor.settings) {
    // console.log('Calling FB Connect');
    facebookConnectPlugin.getLoginStatus(
      function (response) {
        // console.log('FB Connect response:', response);
        if (response.status != "connected") {
          // console.log('Logging in with FB Connect');
          facebookConnectPlugin.login(Meteor.settings.public.facebook.permissions,
              fbLoginSuccess,
              fbLoginError
          );
        } else {
          fbLoginSuccess(response);
        }
      },
      function (error) { console.log("" + error) }
    );
  } else {
    Facebook.requestCredential(options, credentialRequestCompleteCallback);
  }
};
