
var OAuth = require('OAuth');

var OAuth2 = OAuth.OAuth2;    
 var twitterConsumerKey = 'your key';
 var twitterConsumerSecret = 'your secret';
 var oauth2 = new OAuth2(

  'c6898268991345d37d36f1752ab5aca9',
   '22253692fa212db88716eafb0961f560', 
   'https://emma.pixnet.cc/', 
   null,
   'oauth2/token', 
   null);
 oauth2.getOAuthAccessToken(
   '',
   {'grant_type':'client_credentials'},
   function (e, access_token, refresh_token, results){

    console.log(arguments);
 });

 /*
  https://emma.pixnet.cc/authorize?client_id=c6898268991345d37d36f1752ab5aca9&redirect_uri=http://localhost:3000
 */