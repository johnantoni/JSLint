#!/bin/sh

OUTPUT="build/jslint"

mkdir -p `dirname $OUTPUT`

echo "#!/usr/bin/env rhino

// vim: set ft=javascript:
" > $OUTPUT

cat jslint.js >> $OUTPUT
cat rhino.js >> $OUTPUT

chmod 0755 $OUTPUT

#  FileUtils.mkdir_p(File.dirname(OUTPUT))
#  File.open(OUTPUT, 'w').write(output)
#  File.chmod(0755, OUTPUT)
#end

#task :default do
#  Rake::Task['build'].execute
#end
