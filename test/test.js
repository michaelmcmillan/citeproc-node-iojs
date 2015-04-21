var fs        = require('fs');
var CSL       = require('../src/citeproc.js').CSL;
var citations = require('./citations.json');

var sys = {
    retrieveLocale: function (lang) {
        return fs.readFileSync('./locales/locales-en-US.xml').toString();
    },

    retrieveItem: function (id) {
        return citations[id];
    }
}

var xml = fs.readFileSync('./styles/chicago-fullnote-bibliography.csl').toString();
var citeproc = new CSL.Engine(sys, xml);

citeproc.updateItems(['Item-1','Item-2','Item-3','Item-4']);
var result = citeproc.makeBibliography();

console.log(result[1].join('\n'));
