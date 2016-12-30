#!/usr/bin/env node
const path = require('path')
const spawn = require('child_process').spawn
const pkgDir = require('pkg-dir')
const suite = {
  'android': {
    'testName': 'test_android.js',
    'appiumVersions': ['1.4.16', '1.5.3'],
    'devices': ['Android Emulator', 'Android GoogleApi Emulator'],
    'platforms': ['4.4', '5.0', '5.1'],
    'avd': {
      'name': 'Nexus_6_API_23',
      'deviceName': 'Android Emulator',
      'platformVersion': '5.0'
    }
  }
}
function createGrid (suite, args) {
  let testArgs = []
  let grid = []
  for (let a in suite.appiumVersions) {
    for (let d in suite.devices) {
      for (let p in suite.platforms) {
        testArgs.push('--appiumVersion')
        testArgs.push(suite.appiumVersions[a])
        testArgs.push('--deviceName')
        testArgs.push(suite.devices[d])
        testArgs.push('--platformVersion')
        testArgs.push(suite.platforms[p])
        grid.push(args.concat(testArgs))
        testArgs = []
      }
    }
  }
  return grid
}
function runTest (cmd, grid) {
  if (grid.length === 0) {
    console.log('All tests done')
    process.exit(0)
  }
  let test = grid.shift()
  let child = spawn(cmd, test, {stdio: 'inherit'})
  child.on('close', function (code) {
    if (code !== 0) {
      process.exit(1)
    }
    runTest(cmd, grid)
  })
}
function testAllDaThings () {
  let cmd = './node_modules/mocha/bin/mocha'
  for (let key in suite) {
    let args = []
    args.push(path.join(pkgDir.sync(__dirname), 'tests', suite[key].testName))
    args.push('--compilers')
    args.push('js:babel-core/register')
    args.push('-t')
    args.push('0')
    args.push('-R')
    args.push('nyan')
    let grid = []
    if (process.env.IS_LOCAL === '1') {
      // local testing
      if (key === 'android') {
        args.push('--avdName')
        args.push(suite[key].avd.name)
        args.push('--deviceName')
        args.push(`'${suite[key].avd.deviceName}'`)
        args.push('--platformVersion')
        args.push(suite[key].avd.platformVersion)
      }
      grid.push(args)
    } else {
      // sauce testing
      grid = createGrid(suite[key], args)
    }
    runTest(cmd, grid)
  }
}

testAllDaThings()
