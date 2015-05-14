#!/bin/bash
# Exit if trying to deploy from non-master branch
if [ "$(git branch | grep "*")" != "* source" ]
then
	echo "Must deploy from source branch, please merge to source then try again"
	exit 1
fi

# Clean the tmp folders
BUILD_FOLDER=".build"
rm -rf "$BUILD_FOLDER"

# Checkout the current repo
git clone -b master $(git config --get remote.origin.url) .build

npm run build

cd .build
git checkout master
git add . --force
git commit -m "Automatic deployment of $(git rev-parse HEAD)"
git push origin 

#npm run build
#git add chapters
#git commit -m "Compiled chapter list"
#git push origin master
