var assert    = require('assert');
var citations = require('./citations.json');
var Citeproc  = require('../citeproc-wrapper.js');

describe('citeproc-js', function () {
    
    it('should parse a JSON object to a correct bibliography', function (done) {
        this.timeout(3000);

        var style  = './styles/chicago-fullnote-bibliography.csl';
        var locale = './locales/locales-en-US.xml';

        var cite   = new Citeproc(style, locale, function () {
            cite.setCitations(require('./citations.json'));
            done();
        });
    });
});
