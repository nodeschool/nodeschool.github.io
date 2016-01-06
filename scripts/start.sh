#!/bin/bash
mkdir -p .build
env WATCH=true P=$$ npm run build && live-server .build