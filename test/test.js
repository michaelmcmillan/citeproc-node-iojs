var fs        = require('fs');
var assert    = require('assert');
var CSL       = require('../src/citeproc.js').CSL;
var citations = require('./citations.json');

describe('citeproc-js', function () {
    
    it('should parse a JSON object to a correct bibliography', function () {

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
        
        assert.equal(result[1].join('\n').length > 100, true);
    });
});
