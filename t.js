var OAuth = require('mashape-oauth').OAuth;
var OAuth2 = require('mashape-oauth').OAuth2;

var cb = function (error, token, secret, result) {
  
  console.log(arguments);
};
var oa = new OAuth2({
  clientId: "c6898268991345d37d36f1752ab5aca9",
  clientSecret: "22253692fa212db88716eafb0961f560",
  baseUrl: "https://emma.pixnet.cc",
  authorizationUrl: "/oauth2/authorize",
  //authorizationMethod,
  //accessTokenUrl:,
  //accessTokenName:,

});


oa.getOAuthAccessToken(
 '',
 {'grant_type':''},
 cb);