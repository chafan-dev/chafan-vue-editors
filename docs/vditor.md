## Build and release

NOTE: Check out the right base release version.

```bash
# (First time: npm install)
# Change some code
# Test
# Update semver in package.json
# Commit and push to both latest-chafan and a new semvar vX.X.X barnches 
npm run build
npm publish --access=public --tag latest-chafan
```

## Build `lute.min.js`

```
brew install golang
export PATH=$PATH:$(go env GOPATH)/bin
go get -u github.com/gopherjs/gopherjs
go get golang.org/dl/go1.12.16
go1.12.16 download
export GOPHERJS_GOROOT="$(go1.12.16 env GOROOT)"
ln -s $PWD $(go env GOPATH)/src/github.com/88250/lute
cd javascript/
rm lute.min.js lute.min.js.map
bash build.sh
```

