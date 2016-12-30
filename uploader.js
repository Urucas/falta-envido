#!/usr/bin/env node
const uploader = require('sauce-uploader')
const pkgDir = require('pkg-dir')
const path = require('path')

let localApp = path.join(pkgDir.sync(__dirname), 'platforms', 'android', 'build', 'outputs', 'apk', 'android-debug.apk')
let [err, response] = uploader.uploadSync({
  user: process.env.SAUCE_USER,
  access_key: process.env.SAUCE_KEY,
  app_path: localApp
})
if (err) {
  console.error(err)
  process.exit(1)
}
console.log('App uploaded to SauceLabs')
console.log(response)
process.exit(0)
