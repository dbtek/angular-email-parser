angular-email-parser [![Build Status](https://travis-ci.org/dbtek/angular-email-parser.svg?branch=master)](https://travis-ci.org/dbtek/angular-email-parser)
====================

RFC 822 email parser module for Angular JS. Based on [header-parse.js](https://gist.github.com/whitelynx/2e44e2af82bb9f51230d).

### Install
Install via bower:  
```bash
 $ bower install angular-email-parser
````
Include js file and add dependency in your app.
```js
 angular.module('myApp', ['emailParser']);
```
Use provider: `$parseEmail`.

###Usage
```js
$parseEmail(mail, strict, parse);
```

**Parameters**
```
- mail (String) - Email source in plain text
- strict (Boolean) Optional - `true` for strict RFC822 compliance (don't treat \n without \r as line breaks)
- parse (Boolean) Optional - `false` to disable actually parsing headers (just separate the header block and the body)
```
**Returns**
```js
 {
   body: 'mail body content',
   headers: {
     From: '',
     To: [],
     ...
   }
 }
```

### Author
İsmail Demirbilek ([@dbtek](http://twitter.com/dbtek))

### License
[MIT](http://opensource.org/licenses/MIT)

### Credits
David Bronke - [header-parse.js](https://gist.github.com/whitelynx/2e44e2af82bb9f51230d)
