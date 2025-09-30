## Commands to fix in terminal


### Make sure you are in the correct directory:

 `cd NanoSpace/server/public/attractions`

### First preview the files needed to change:

`find . -name "index.html" -exec sh -c 'if ! grep -q "javascript:history\.back();" "$1"; then echo "Will update: $1"; grep "back_to_nav" "$1"; else echo "Already correct: $1"; fi' _ {} \;`

### Then run command with grep check:

`find . -name "index.html" -exec sh -c 'if ! grep -q "javascript:history\.back();" "$1"; then sed -i "" "s|<a class=\"back_to_nav\" href=\"[^\"]*\">|<a class=\"back_to_nav\" href=\"javascript:history.back();\">|g" "$1" && echo "Updated: $1"; else echo "Already updated: $1"; fi' _ {} \;`