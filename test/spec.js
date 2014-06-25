'use strict';

describe('Service: $parseEmail', function () {

  // load the service's module
  beforeEach(module('emailParser'));

  // instantiate service
  var $parseEmail;
  beforeEach(inject(function (_$parseEmail_) {
    $parseEmail = _$parseEmail_;
  }));

  it('should be a function', function() {
    expect(typeof($parseEmail)).toBe('function');
  });


  it('should parse a raw mail properly', function() {
    var rawMail =
     'Received: from EXCH1.example.com ([fe80::ec78:e6b5:870a:33e0])\n'+
     ' by exch1.example.com ([fe80::ec78:e6b5:870a:33e0%11]) with mapi\n'+
     ' id 14.03.0123.003; Fri, 20 Jun 2014 15:53:22 +0300\n'+
     'From: test <test@example.com>\n'+
     'To: user1 <user1@example.com>\n'+
     'Subject: Mail Parse Test\n'+
     'Thread-Topic: Mail Parse Test\n'+
     'Thread-Index: Ac+MhpN+VImFe9HxSVqxF/KPQjSSjQ==\n'+
     'Date: Fri, 20 Jun 2014 12:53:21 +0000\n'+
     'Message-ID:\n'+
     ' <5E1C52046921B443B75700D3214FE3AA3DA2588B@exch1.example.com>\n'+
     'Accept-Language: tr-TR, en-US\n'+
     'Content-Language: tr-TR\n'+
     'X-MS-Exchange-Organization-AuthAs: Internal\n'+
     'X-MS-Exchange-Organization-AuthMechanism: 04\n'+
     'X-MS-Exchange-Organization-AuthSource: exch1.example.com\n'+
     'X-MS-Has-Attach:\n'+
     'X-MS-Exchange-Organization-SCL: -1\n'+
     'X-MS-TNEF-Correlator:\n'+
     'x-ms-exchange-organization-originalclientipaddress: 10.138.48.155\n'+
     'x-ms-exchange-organization-originalserveripaddress: 10.138.48.91\n'+
     'Content-Type: text/plain; charset="us-ascii"\n'+
     'MIME-Version: 1.0\n'+
     '\n'+
     'Mail parse test body';

    var parsedMail = $parseEmail(rawMail);

    expect(parsedMail.headers.From).toBe('test <test@example.com>');
    expect(parsedMail.headers.To).toBe('user1 <user1@example.com>');
    expect(parsedMail.headers.Subject).toBe('Mail Parse Test');
    expect(parsedMail.body).toBe('Mail parse test body');
  });
});
