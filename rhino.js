
importPackage(java.io);
importPackage(java.lang);

(function (a) {
  function commandName() {
    var c = environment['sun.java.command'].split(/\s+/),
      f = new java.io.File(c[1]);
      return f.getName();
  }

  var OPTIONS = {
    'bitwise': true,
    'eqeqeq': true,
    'immed': true,
    'newcap': true,
    'nomen': false,
    'onevar': true,
    'plusplus': true,
    'regexp': true,
    'browser': true,
    'undef': true,
    'white': false,
    'devel': true
  };

  if (a.indexOf('-h') >= 0) {
    print("Usage: " + commandName() + " file.js OR read from STDIN");
    quit(1);
  }

  (function() {
    var fileName, input;

    if (!a.length) {
      (function() {
        var reader = new BufferedReader(new InputStreamReader(System['in'])),
          line;

        input = '';
        fileName = 'STDIN';

        while ((line = reader.readLine())) {
          input += line + "\n";
        }
      }());
    }
    else {
      input = readFile(a[0]);
      fileName = a[0];
    }

    if (!JSLINT(input, OPTIONS)) {
      (function() {
        var e, i;

        print("ERRORS in " + fileName + ":");
        for (i = 0; i < JSLINT.errors.length; i += 1) {
          e = JSLINT.errors[i];
          if (e) {
            print('Lint at line ' + e.line + ' character ' + e.character + ': ' + e.reason);
            print((e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
            print('');
          }
        }
        quit(2);
      }());
    }
    else {
      print("SUCCESS! No problems found in " + fileName);
      quit();
    }
  }());
}(arguments));
