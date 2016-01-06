#!/bin/bash
mkdir -p .build/js
browserify -r xhr -r mustache > .build/js/dependencies.js