/**
 * SuggestPhotoController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


var fs = require('fs');
var request = require("request");
var querystring = require("querystring");
var _s = require("underscore.string");
var _ = require("underscore");

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/suggestphoto/search`
   */
   search: function (req, res) {
    
    fs.readFile(__dirname+'/../../assets/picked.json', function(err, data){

      var keywords = req.param("keywords", "").split(",");
      console.log(keywords);
      if (keywords[0] == "") {
        return res.json({});
      }

      data = JSON.parse(data);

      var result = [];
      data.forEach(function(o) {
        keywords.forEach(function(kw){
          if (o.title.indexOf(kw) != -1) {
            result.push(o);
            return;
          }
        });
      });
      return res.json(result);
    });

  },

  ckip: function(req, res) {

    var contents = req.param("contents", "");
    if (contents == "") {
      return res.json({});
    }

    var result = [];
    request.get("http://hondackip.herokuapp.com/?"+querystring.stringify({q: contents}), function (error, response, body ) {
      json = JSON.parse(body);

      json.result.forEach(function(sentance) {
        sentance.forEach(function(term) {
          console.log(_s.rpad("term: "+term.term, 15, " ")+" ,pos: "+term.pos);
          console.log(["N", "Nv", "Vt", "Vi"].indexOf(term.pos));
          if (["N", "Nv", "Vt", "Vi"].indexOf(term.pos) != -1) {
            if (term.term.length != 1) {
              result.push(term);
            }
          }
        });
      });

      result = result.map(function(n) { return JSON.stringify(n); });
      result = _.unique(result);
      result = result.map(function(n) { return JSON.parse(n); });
      

      return res.json(result);
    });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SuggestPhotoController)
   */
  _config: {}

  
};
