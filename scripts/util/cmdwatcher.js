#!/usr/bin/env node

const glob = require('glob')
const posix = require('posix')
const isRunning = require('is-running')
const spawn = require('child_process').spawn
const fs = require('fs')

module.exports = function (name, inputPattern, watchPattern, processor) {
	if (typeof watchPattern === 'function') {
		processor = watchPattern
		watchPattern = null
	}
	if (!Array.isArray(inputPattern)) {
		inputPattern = [inputPattern]
	}

	var processAll = function () {
		inputPattern.forEach(function (pattern) {
			glob(pattern, function (err, files) {
				if (err) {
					return console.log(err)
				}
				processor(files)
			})		
		})
	}
	if (process.argv[2] === 'background') {
		console.log('starting background process')
		setInterval(function () {
			try {
				var running = isRunning(+process.argv[3]);
				if (!running) {
					console.log("closing building")
					process.exit()
				}	
			} catch(e) {
				console.log(e)
			}
		}, 200)
		var gaze = require('gaze')
		gaze(watchPattern, function (err, settingsWatcher) {
			if (err) {
				return console.log(err)
			}
			gaze(inputPattern, function (err, watcher) {
				if (err) {
					return console.log(err)
				}
				watcher.on('all', function (evt, file) {
					if (evt !== 'deleted') {
						processor([file]);
					} // Maybe we should delete the generated files?
				})
				settingsWatcher.on('all', processAll)
			})
		})
	} else if (process.env.WATCH === 'true') {
		var log = fs.openSync('.' + name + '.log', 'a')
		var forked = spawn(
			  process.argv[0]
			, [process.argv[1], 'background', process.argv[3] || process.argv[2]]
			, {detached: true, stdio: ['ignore', log, log]}
		)
		forked.unref()
		processAll()
	} else {
		processAll()
	}

}