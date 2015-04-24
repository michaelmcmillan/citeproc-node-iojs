# citeproc-node-iojs (LittList)
Please not that this is the LittList version. It includes changes to citeproc-js
that makes it easier to implement for what I need citeproc for. Please do not use
this branch unless you appreciate my changes.

A working citeproc-js wrapper for node and iojs.

To download the styles and languages required for this module to work, run the following:
````bash
git submodule add git@github.com:citation-style-language/styles.git
git submodule add git@github.com:citation-style-language/locales.git
````

Reference them when calling the wrapper. See test/test.js for how to do that.
