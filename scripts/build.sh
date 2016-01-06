#!/bin/bash
npm run build-chapters -- $@
npm run build-dependencies
npm run build-copy -- $@
npm run build-html -- $@