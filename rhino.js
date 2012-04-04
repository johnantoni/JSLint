
importPackage(java.io);
importPackage(java.lang);

(function (a) {
  function commandName() {
    var c = environment['sun.java.command'].split(/\s+/),
      f = new java.io.File(c[1]);
      return f.getName();
  }

  function readFromFile(fileName) {
    var reader, input, line, output = '';

    if (fileName === 'STDIN') {
      input = new InputStreamReader(System['in']);
    }
    else {
      input = new FileReader(fileName);
    }

    reader = new BufferedReader(input);

    while ((line = reader.readLine())) {
      output += line + "\n";
    }

    return output;
  }

  var OPTIONS = {
    'bitwise': true,
    'eqeqeq': true,
    'immed': true,
    'newcap': true,
    'nomen': true,
    'onevar': true,
    'plusplus': true,
    'regexp': true,
    'browser': true,
    'undef': true,
    'white': true,
    'devel': true
  };

  if (a.indexOf('-h') >= 0) {
    print("Usage: " + commandName() + " [file1.js ... fileN.js] OR read from STDIN");
    quit(1);
  }

  (function() {
    var files, exit = 0;

    if (!a.length) {
      files = [ 'STDIN' ];
    }
    else {
      files = a;
    }

    files.forEach(function(fileName) {
      var input = readFromFile(fileName);

      if (!JSLINT(input, OPTIONS)) {
        (function() {
          print("ERRORS in " + fileName + ":");
          JSLINT.errors.forEach(function(e) {
            if (e) {
              print('Lint at line ' + e.line + ' character ' + e.character + ': ' + e.reason);
              print((e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
              print('');
            }
          });
          exit = 2;
        }());
      }
      else {
        print("SUCCESS! No problems found in " + fileName);
      }

      print("\n\n");
    });

    quit(exit);
  }());
}(arguments));
