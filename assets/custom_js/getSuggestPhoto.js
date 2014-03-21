

getSuggestPhoto = function(contents, callback) {

  $.getJSON("/suggestphoto/ckip?contents="+contents).done(function(terms) {

    var keywords = _.pluck(terms, "term").join(",");
    console.log(terms);
    console.log(keywords);
    console.log("/suggestphoto/search?keywords="+encodeURI(keywords));
    $.getJSON("/suggestphoto/search?keywords="+encodeURI(keywords)).done(callback);
  })

}