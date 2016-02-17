var assert    = require('assert');
var citations = require('./citations.json');
var Citeproc  = require('../citeproc-wrapper.js');

describe('citeproc-js', function () {
    
    it('should parse a JSON object to a correct bibliography', function (done) {
        this.timeout(3000);

        var style  = './styles/chicago-fullnote-bibliography.csl';
        var locale = './locales/locales-nb-NO.xml';

        var cite = new Citeproc(citations, style, locale, function (err, citeproc) {
            if(err) done(err);

            citeproc.updateItems(Object.keys(citations));
            var bibliography = citeproc.makeBibliography();
            console.log(bibliography);
            done();
        });
    });
    it('should error if an incorrect style used', function (done) {
        this.timeout(3000);

        var style  = './styles/this-does-not-exist.csl';
        var locale = './locales/locales-nb-NO.xml';

        var cite = new Citeproc(citations, style, locale, function (err) {
            if(err) console.log(err);
            done(!(err instanceof Error));
        });
    });
    it('should error if an incorrect locale used', function (done) {
        this.timeout(3000);

        var style  = './styles/chicago-fullnote-bibliography.csl';
        var locale = './locales/this-does-not-exist.xml';

        var cite = new Citeproc(citations, style, locale, function (err) {
            if(err) console.log(err);
            done(!(err instanceof Error));
        });
    });
});
