#!/usr/bin/env sh


# Exit if trying to deploy from non-master branch

if [ "$(git branch | grep master)" != "* master" ]
then
	echo "Must deploy from master branch, please merge to master then try again"
	exit 1
fi

# Rough deployment process, could probably be improved

npm run build
git add chapters
git commit -m "Compiled chapter list"
git push origin master
git checkout gh-pages && git merge --no-ff master
git push origin gh-pages
git checkout master