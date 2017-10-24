'use strict';

var ampify = require('ampify');
var fs = require('fs');


var src = {
    ua: "./dist/index.html",
    ru: "./dist/ru/index.html",
    en: "./dist/en/index.html"
},
    dest = {
        ua: "./dist/amp-index.html",
        ru: "./dist/ru/amp-index.html",
        en: "./dist/en/amp-index.html"
    };


//var src =  "./dist/index.html",
//    dest = "./dist/amp-index.html";

//console.log(src.ua, dest.ua);

//writeAmpHtml(src.ua, dest.ua);
//writeAmpHtml(src.ru, dest.ru);
//writeAmpHtml(src.en, dest.en);



function prepareAmpHtml(lang,html,ampify) {

    var options = {
            cwd: (lang=='ua') ? "./dist/" : "./dist/ru/"// Assets (images/styles) file path
            //cwd:  "./dist/" // Assets (images/styles) file path
    }, amphtml, canonical;

    var ampifiedHtml = ampify(html, options);

    if (lang == 'ua') {
        amphtml = '<link rel="amphtml" href="http://merge.place/amp-index.html">',
        canonical = '<link rel="canonical" href="http://merge.place/index.html">';
    } else {
        amphtml = '<link rel="amphtml" href="http://merge.place/'+lang+'/amp-index.html">',
        canonical = '<link rel="canonical" href="http://merge.place/'+lang+'/index.html">';
    }

    var googleAnalyticsRegEx = /<script>[\s\S]*?<\/script>/ig;
    var ampVideoTagRegEx = /<amp-video[\s\S]*?>[\s\S]*?<\/amp-video>/ig;

    ampifiedHtml = ampifiedHtml.replace(amphtml, canonical);
    ampifiedHtml = ampifiedHtml.replace(googleAnalyticsRegEx, '');
    ampifiedHtml = ampifiedHtml.replace(ampVideoTagRegEx, '');

    return ampifiedHtml
}


// UA
//var options = {
//            cwd: "./dist/" // Assets (images/styles) file path
//        },
//        amphtml = '<link rel="amphtml" href="http://merge.place/amp-index.html">',
//        canonical = '<link rel="canonical" href="http://merge.place/index.html">';
//
//var googleAnalyticsRegEx = /<script>[\s\S]*?<\/script>/ig;
//var ampVideoTagRegEx = /<amp-video[\s\S]*?>[\s\S]*?<\/amp-video>/ig;

fs.readFile(src.ua, 'utf8', function(err, html){

    var ampifiedHtml = prepareAmpHtml('ua', html, ampify);

    fs.writeFile(dest.ua, ampifiedHtml, function(err){
        console.log('error: '+err);
    });

});

fs.readFile(src.ru, 'utf8', function(err, html){

    var ampifiedHtml = prepareAmpHtml('ru', html, ampify);

    fs.writeFile(dest.ru, ampifiedHtml, function(err){
        console.log('error: '+err);
    });

});


fs.readFile(src.en, 'utf8', function(err, html){

    var ampifiedHtml = prepareAmpHtml('en', html, ampify);

    fs.writeFile(dest.en, ampifiedHtml, function(err){
        console.log('error: '+err);
    });

});