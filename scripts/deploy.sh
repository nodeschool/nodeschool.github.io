#!/bin/bash
# Exit if trying to deploy from non-master branch

if [ [[ "$(git branch | grep '*')" != "* source" ]] -o [[ "$(git branch | grep '*')" != "* (detached"* ]] ]
then
	echo "Must deploy from source branch, please merge to source then try again, current branch: $(git branch | grep '*')"
	exit 1
fi

# Clean the tmp folders
BUILD_FOLDER=".build"
rm -rf "$BUILD_FOLDER"

# Checkout the current repo
if [[ -z $GITHUB_PERSONAL_ACCESS_TOKEN ]]
then
	git clone -b master git@github.com:nodeschool/nodeschool.github.io.git .build
else
	git clone -b master https://$GITHUB_USER:$GITHUB_PERSONAL_ACCESS_TOKEN@github.com/nodeschool/nodeschool.github.io.git .build
fi

npm run build

cd .build
git checkout master
git add . --force
git commit -m "Automatic deployment of $(git rev-parse HEAD)"
git push origin master
