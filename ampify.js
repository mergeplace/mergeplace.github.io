'use strict';

var ampify = require('ampify');
var fs = require('fs');


var src = "./dist/index.html",
    dest = "./dist/amp-index.html",
    options = {
        cwd: "./dist/" // Assets (images/styles) file path
    },
    amphtml = '<link rel="amphtml" href="http://merge.place/amp-index.html">',
    canonical = '<link rel="canonical" href="http://merge.place/index.html">';

var googleAnalyticsRegEx = /<script>[\s\S]*?<\/script>/ig;
var ampVideoTagRegEx = /<amp-video[\s\S]*?>[\s\S]*?<\/amp-video>/ig;


fs.readFile(src, 'utf8', function(err, html){

    var ampifiedHtml = ampify(html, options);

    ampifiedHtml = ampifiedHtml.replace(amphtml, canonical);
    ampifiedHtml = ampifiedHtml.replace(googleAnalyticsRegEx, '');
    ampifiedHtml = ampifiedHtml.replace(ampVideoTagRegEx, '');

    fs.writeFile(dest, ampifiedHtml, function(err){
        console.log('error: '+err);
    });
});



//ampify(src, options)
//    .then (function(res){
//        console.log(res)
//    });