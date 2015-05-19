#!/usr/bin/env node

const Path = require('path')
const Fs = require('fs')
const mkdirp = require('mkdirp')
const cmdwatcher = require('./util/cmdwatcher')
const processing = {}
const waiting = {}

function process(file) {
	if (processing[file]) {
		waiting[file] = true
	}
	processing[file] = true
	var output = Path.join('.build', file)
	mkdirp.sync(Path.dirname(output))
	Fs.createReadStream(file)
	  .pipe(
	  	Fs.createWriteStream(output)
	  	  .on('end', function () {
	  	  	delete processing[file]
	  	  	if (waiting[file]) {
	  	  		delete waiting[file]
	  	  		process(file)
	  	  	}
	  	  })
	  )
}

cmdwatcher('build-copy'
	     , ['!(node_modules)/**/*.@(png|jpg|svg|css|gif|ico)','*.@(png|jpg|svg|css|gif|ico)', 'js/*']
	     , function processFiles(files)
{
	files.forEach(process)
})