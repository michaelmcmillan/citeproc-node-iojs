var assert    = require('assert');
var citations = require('./citations.json');
var Citeproc  = require('../citeproc-wrapper.js');

describe('citeproc-js', function () {
    
    it('should parse a JSON object to a correct bibliography', function (done) {
        this.timeout(3000);

        var style  = './styles/chicago-fullnote-bibliography.csl';
        var locale = './locales/locales-nb-NO.xml';

        var cite = new Citeproc(citations, style, locale, function (citeproc) {
            citeproc.updateItems(Object.keys(citations));
            var bibliography = citeproc.makeBibliography();
            console.log(bibliography);
            done();
        });
    });
});
