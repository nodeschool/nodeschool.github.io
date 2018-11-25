#!/bin/bash
if [[ -f ../.env ]]
then
	echo 'Missing .env file'
	echo 'Please consult README for setup instructions'
	exit 1
fi
npm run build-chapters -- $@
npm run generate-css
npm run build-dependencies
npm run build-copy -- $@
npm run build-html -- $@