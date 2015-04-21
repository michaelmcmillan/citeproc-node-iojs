var fs        = require('fs');
var CSL       = require('./src/citeproc.js').CSL;

function Citeproc (styleLocation, localeLocation, done) {
    
    // Constructs the wrapper
    this.construct = function () {
        var self = this;

        self.loadStyle(styleLocation, function () {
            self.loadLocale(localeLocation, function () {
                self.setupSys();
                citeproc = new CSL.Engine(sys, style);
                done();
            });
        });
    }

    // The internal CSL.Engine object 
    var citeproc;

    // Implements retrieveLocale and retrieveItem
    var sys;

    // Holds the content of a .csl file 
    var style;
    
    // All the added references which will be formatted
    var citations = [];
    
    // Holds the content of a locales-*-*.xml file
    var locale;

    // Setter for citation array
    this.setCitations = function (addedCitations) {
        citations = addedCitations;
    }

    // Rigs up the sys object for the internal citeproc
    this.setupSys = function () {
        sys = {
            retrieveLocale: function (language) {
                return locale;
            },
            retrieveItem: function (id) {
                return citations[id];
             }
        };
    }

    // Generates and returns the bibliography 
    this.makeBibliography = function () {
        citeproc = new CSL.Engine(sys, style);
        citeproc.updateItems(['Item-1','Item-2','Item-3','Item-4']);
        return citeproc.makeBibliography();
    }

    this.loadLocale = function (file, done) {
        fs.readFile(file, function (err, data) {
            if (err) return done(err);
            locale = data.toString();
            return done(); 
        });
    }

    this.loadStyle = function (file, done) {
        fs.readFile(file, function (err, data) {
            if (err) return done(err);
            style = data.toString();
            return done(); 
        });
    }

    this.construct();
}

module.exports = Citeproc;
