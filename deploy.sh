#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://hamb0n3.github.io
# git push -f git@github.com:hamb0n3/hamb0n3.github.io.git main

# if you are deploying to https://hamb0n3.github.io/<REPO>
# git push -f git@github.com:hamb0n3/book-keeper.git main:gh-pages

git subtree push --prefix dist origin gh-pages

cd -