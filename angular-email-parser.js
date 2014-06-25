/*!
 * angular-email-parser - v0.1.0
 * https://github.com/dbtek/angular-email-parser
 * (c) 2014 İsmail Demirbilek <ce.demirbilek@gmail.com>
 * License: MIT
 */
angular.module('emailParser', []);

angular.module('emailParser')
  /**
   * @ngdoc service
   * @name emailParser.services:$parseEmail
   * @description
   * RFC822 mail parser service.
   * @param {String} mail    - Email source in plain text
   * @param {boolean} strict - `true` for strict RFC822 compliance (don't treat `\n` without `\r` as line breaks)
   * @param {boolean} parse  - `false` to disable actually parsing headers (just separate the header block and the body)
   * @returns {object}       - Parsed result containing headers and body properties.
   */
  .factory('$parseEmail', function() {

    var regexes = {
        strict: {
            headerBlock: /^((?:\S+:(?:.*\r\n[ \t])*.*\r\n)*)\r\n/,
            header: /^(\S+):(.*)$/gm,
            fold: /\r\n([ \t])/g,
            trim: /^\s*(.*\S)?\s*$/,
        },
        loose: {
            headerBlock: /^((?:\S+:(?:.*\r?\n[ \t])*.*\r?\n)*)\r?\n/,
            header: /^(\S+):(.*)$/gm,
            fold: /\r?\n([ \t])/g,
            trim: /^\s*(.*\S)?\s*$/,
        },
    };

    /**
     * Parse all headers out of the given header block data.
     *
     * @param {(string|Buffer)} data
     * @param {boolean} strict - `true` for strict RFC822 compliance (don't treat `\n` without `\r` as line breaks)
     * @returns {Object.<string, string>} parsed headers
     */
    function parseHeaders(data, strict) {
        data = unfold(data, strict);
        var re = strict ? regexes.strict : regexes.loose;

        var headers = {};

        var match = re.header.exec(data);
        while(match) {
            headers[match[1]] = match[2].replace(re.trim, '$1');

            match = re.header.exec(data);
        } // end while

        return headers;
    }

    /**
     * Unfold all folded lines in the given data. (as defined by [RFC822 Section 3.1.1][])
     *
     * [RFC822 Section 3.1.1]: https://tools.ietf.org/html/rfc822#section-3.1.1
     *
     * @param {(string|Buffer)} data
     * @param {boolean} strict - `true` for strict RFC822 compliance (don't treat `\n` without `\r` as line breaks)
     * @returns {string} unfolded data
     */
    function unfold(data, strict) {
        data = data.toString();
        var re = strict ? regexes.strict : regexes.loose;

        return data.replace(re.fold, '$1');
    }

     /**
      * If the given data contains a header block, separate the headers and body.
      *
      * @param {(string|Buffer)} data
      * @param {boolean} strict - `true` for strict RFC822 compliance (don't treat `\n` without `\r` as line breaks)
      * @param {boolean} parse - `false` to disable actually parsing headers (just separate the header block and the body)
      * @returns {HeaderParseDocument}
      */
     return function (data, strict, parse) {
         data = data.toString();
         var re = strict ? regexes.strict : regexes.loose;

         var match = re.headerBlock.exec(data);
         if(match) {
             var doc = {
                 headerBlock: match[1],
                 body: data.slice(match[0].length),
             };

             if(parse === undefined || parse) {
                 doc.headers = parseHeaders(doc.headerBlock, strict);
             } // end if

             return doc;
         } // end if

         return {body: data};
     };
  });