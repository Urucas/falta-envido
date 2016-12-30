
const wd = require('wd')
const sleep = require('asyncbox').sleep
const chai = require('chai')
const path = require('path')
const pkgDir = require('pkg-dir')
const expect = chai.expect

let driver
let caps = {
  'appPackage': 'com.faltaenvido',
  'appActivity': '.MainActivity',
  'appWaitActivity': '.MainActivity',
  'browserName': '',
  'deviceName': 'Android Emulator',
  'platformName': 'Android',
  'platformVersion': '5.0'
}
let ondemand
let localApp = path.join(pkgDir.sync(__dirname), 'platforms', 'android', 'build', 'outputs', 'apk', 'android-debug.apk')
if (process.env.IS_LOCAL === '1') {
  ondemand = 'http://localhost:4723/wd/hub'
  caps['avd'] = 'Nexus_6_API_23'
  caps['app'] = localApp
} else {
  ondemand = `https://${process.env.SAUCE_USER}:${process.env.SAUCE_KEY}@ondemand.saucelabs.com:8000/wd/hub`
  caps['appiumVersion'] = '1.5.3'
  caps['app'] = 'sauce-storage:android-debug.apk'
  caps['public'] = 'public'
}

describe('Test app on Android 4.4', async () => {
  before(async () => {
    driver = await wd.promiseChainRemote(ondemand)
    await driver.init(caps)
  })
  after(async () => {
    await driver.quit()
  })
  it('Test Splash container', async () => {
    await driver.context('WEBVIEW_com.faltaenvido')
    await sleep(1500)
    let ids = [
      { id: 'home_container' },
      { id: 'ingresar' }
    ]
    for (let i in ids) {
      let id = ids[i].id
      let el = await driver.elementById(id)
      expect(el).to.not.equal(null)
      let isVisible = await el.isDisplayed()
      expect(isVisible).to.equal(true)
    }
    let els = [
      { className: 'texto' },
      { className: 'carta' }
    ]
    for (let i in els) {
      let className = els[i].className
      let el = await driver.elementByClassName(className)
      expect(el).to.not.equal(null)
    }
    let el = await driver.elementById('ingresar')
    await el.click()
    await sleep(1500)
    for (let i in ids) {
      let id = ids[i].id
      let el = await driver.elementById(id)
      expect(el).to.not.equal(null)
      let isVisible = await el.isDisplayed()
      expect(isVisible).to.equal(false)
    }
  })
  it('Test Players container', async () => {
    await sleep(1500)
    let ids = [
      { id: 'players_container' },
      { id: 'deco' },
      { id: 'logo_login' },
      { id: 'campo_1' },
      { id: 'versus' },
      { id: 'campo_2' },
      { id: 'comenzar' },
      { id: 'aquince' },
      { id: 'atreinta' },
      { id: 'nosotros' },
      { id: 'ellos' }
    ]
    for (let i in ids) {
      let id = ids[i].id
      let el = await driver.elementById(id)
      expect(el).to.not.equal(null)
      let isVisible = await el.isDisplayed()
      expect(isVisible).to.equal(true)
    }
    let el15 = await driver.elementById('aquince')
    let attr = await el15.getAttribute('class')
    expect(attr).to.equal('activo')
    let el30 = await driver.elementById('atreinta')
    attr = await el30.getAttribute('class')
    expect(attr).to.equal('')
    await el30.click()
    await sleep(100)
    attr = await el30.getAttribute('class')
    expect(attr).to.equal('activo')
    attr = await el15.getAttribute('class')
    expect(attr).to.equal('')
    await el15.click()
    await sleep(100)
    attr = await el15.getAttribute('class')
    expect(attr).to.equal('activo')
    attr = await el30.getAttribute('class')
    expect(attr).to.equal('')
    await sleep(2000)
    let elNos = await driver.elementById('nosotros')
    attr = await elNos.getAttribute('value')
    expect(attr).to.equal('Nosotros')
    let elEllos = await driver.elementById('ellos')
    attr = await elEllos.getAttribute('value')
    expect(attr).to.equal('Ellos')
    await elNos.sendKeys('vruno')
    await sleep(200)
    await driver.hideKeyboard()
    attr = await elNos.getAttribute('value')
    expect(attr).to.equal('vruno')
    await elEllos.sendKeys('pame')
    await sleep(200)
    await driver.hideKeyboard()
    attr = await elEllos.getAttribute('value')
    expect(attr).to.equal('pame')
    let el = await driver.elementById('comenzar')
    await el.click()
    await sleep(1500)
    el = await driver.elementById('players_container')
    expect(el).to.not.equal(null)
    let isVisible = await el.isDisplayed()
    expect(isVisible).to.equal(false)
  })
  it('Test Tanteador container 15', async () => {
    await sleep(1500)
    let ids = [
      { id: 'tanteador_container', visible: true },
      { id: 'popup', visible: false },
      { id: 'popup2', visible: false },
      { id: 'content_counter', visible: true },
      { id: 'nosotros_col', visible: true },
      { id: 'ellos_col', visible: true },
      { id: 'arrows_quince', visible: true },
      { id: 'arrow_left', visible: true },
      { id: 'arrow_right', visible: true },
      { id: 'content_fosforos', visible: true },
      { id: 'left', visible: true },
      { id: 'right', visible: true },
      { id: 'tanteador_nos', visible: true },
      { id: 'tanteador_ellos', visible: true }
    ]
    for (let i in ids) {
      let id = ids[i].id
      let visible = ids[i].visible
      let el = await driver.elementById(id)
      expect(el).to.not.equal(null)
      let isVisible = await el.isDisplayed()
      expect(isVisible).to.equal(visible)
    }
    let el = await driver.elementById('nosotros_col')
    let text = await el.text()
    expect(text).to.equal('vruno')
    el = await driver.elementById('ellos_col')
    text = await el.text()
    expect(text).to.equal('pame')
    let matches = await driver.elementsByClassName('match')
    expect(matches.length).to.equal(30)
    let nosPoints = await driver.elementById('tanteador_nos')
    text = await nosPoints.text()
    expect(text).to.equal('0')
    let ellosPoints = await driver.elementById('tanteador_ellos')
    text = await ellosPoints.text()
    expect(text).to.equal('0')
    let nosMatches = []
    let ellosMatches = []
    for (let i in matches) {
      let m = matches[i]
      let attr = await m.getAttribute('class')
      if (attr.indexOf('nos') !== -1) {
        nosMatches.push(m)
      } else {
        ellosMatches.push(m)
      }
      expect(attr.indexOf('activo')).to.equal(-1)
      await m.click()
      attr = await m.getAttribute('class')
      expect(attr.indexOf('activo')).to.not.equal(-1)
      await m.click()
      attr = await m.getAttribute('class')
      expect(attr.indexOf('activo')).to.equal(-1)
    }
    expect(nosMatches.length).to.equal(15)
    expect(ellosMatches.length).to.equal(15)
    // testing nosotros matches
    for (let i in nosMatches) {
      let m = nosMatches[i]
      await m.click()
      text = await nosPoints.text()
      expect(parseInt(text)).to.equal(parseInt(i) + 1)
    }
    await sleep(500)
    ids = [
      { id: 'popup2' },
      { id: 'mensaje2' },
      { id: 'si2' },
      { id: 'no2' }
    ]
    for (let i in ids) {
      let id = ids[i].id
      let el = await driver.elementById(id)
      expect(el).to.not.equal(null)
      let isVisible = await el.isDisplayed()
      expect(isVisible).to.equal(true)
    }
    el = await driver.elementById('no2')
    await el.click()
    await sleep(200)
    el = await driver.elementById('popup2')
    let isVisible = await el.isDisplayed()
    expect(isVisible).to.equal(false)
    for (let i in nosMatches) {
      let m = nosMatches[i]
      await m.click()
      await sleep(100)
      text = await nosPoints.text()
      expect(parseInt(text)).to.equal(15 - parseInt(i) - 1)
    }
    await sleep(200)
    text = await nosPoints.text()
    expect(text).to.equal('0')
    // testing ellos matches
    for (let i in ellosMatches) {
      let m = ellosMatches[i]
      await m.click()
      await sleep(100)
      text = await ellosPoints.text()
      expect(parseInt(text)).to.equal(parseInt(i) + 1)
    }
    await sleep(500)
    ids = [
      { id: 'popup2' },
      { id: 'mensaje2' },
      { id: 'si2' },
      { id: 'no2' }
    ]
    for (let i in ids) {
      let id = ids[i].id
      let el = await driver.elementById(id)
      expect(el).to.not.equal(null)
      let isVisible = await el.isDisplayed()
      expect(isVisible).to.equal(true)
    }
    el = await driver.elementById('no2')
    await el.click()
    await sleep(200)
    el = await driver.elementById('popup2')
    isVisible = await el.isDisplayed()
    expect(isVisible).to.equal(false)
    for (let i in ellosMatches) {
      let m = ellosMatches[i]
      await m.click()
      await sleep(100)
      text = await ellosPoints.text()
      expect(parseInt(text)).to.equal(15 - parseInt(i) - 1)
    }
    text = await ellosPoints.text()
    expect(text).to.equal('0')
    await sleep(500)
    for (let i in ellosMatches) {
      let m = ellosMatches[i]
      await m.click()
    }
    await sleep(100)
    el = await driver.elementById('si2')
    await el.click()
    await sleep(500)
    el = await driver.elementById('tanteador_container')
    isVisible = await el.isDisplayed()
    expect(isVisible).to.equal(false)
    el = await driver.elementById('players_container')
    isVisible = await el.isDisplayed()
    expect(isVisible).to.equal(true)
    await sleep(1500)
  })
  it('Test Tanteador container 30 & Clear button', async () => {
    let el = await driver.elementById('atreinta')
    await el.click()
    await sleep(100)
    el = await driver.elementById('comenzar')
    await el.click()
    await sleep(1500)
    el = await driver.elementById('tanteador_container')
    isVisible = await el.isDisplayed()
    expect(isVisible).to.equal(true)
    let matches = await driver.elementsByClassName('match')
    expect(matches.length).to.equal(60)
    let elClear = await driver.elementByClassName('clear')
    isVisible = await elClear.isDisplayed()
    expect(isVisible).to.equal(true)
    await elClear.click()
    await sleep(200)
    let ids = [
      { id: 'popup' },
      { id: 'mensaje' },
      { id: 'si' },
      { id: 'no' }
    ]
    for (let i in ids) {
      let id = ids[i].id
      let el = await driver.elementById(id)
      expect(el).to.not.equal(null)
      let isVisible = await el.isDisplayed()
      expect(isVisible).to.equal(true)
    }
    el = await driver.elementById('no')
    await el.click()
    await sleep(100)
    el = await driver.elementById('popup')
    let isVisible = await el.isDisplayed()
    expect(isVisible).to.equal(false)
    el = await driver.elementById('tanteador_container')
    isVisible = await el.isDisplayed()
    expect(isVisible).to.equal(true)
    await elClear.click()
    await sleep(200)
    el = await driver.elementById('si')
    await el.click()
    await sleep(500)
    el = await driver.elementById('tanteador_container')
    isVisible = await el.isDisplayed()
    expect(isVisible).to.equal(false)
    el = await driver.elementById('players_container')
    isVisible = await el.isDisplayed()
    expect(isVisible).to.equal(true)
    await sleep(1500)
  })
})
