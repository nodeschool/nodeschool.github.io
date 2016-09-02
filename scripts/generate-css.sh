# Generates minified CSS files with autoprefixes and sourcemaps in root directory
#   -c = compressed
#   -m = sourcemap
#   -o = output
#   -u = utilize plugin

stylus -u autoprefixer-stylus -c -m ./styles/chapters.styl -o ./chapters.css
stylus -u autoprefixer-stylus -c -m ./styles/events.styl -o ./events.css
stylus -u autoprefixer-stylus -c -m ./styles/mapbox.styl -o ./mapbox.css
stylus -u autoprefixer-stylus -c -m ./styles/style.styl -o ./style.css
