
const wd = require('wd')
const sleep = require('asyncbox').sleep
const chai = require('chai')
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
// set env for local testing
let ondemand
if (process.env.IS_LOCAL) {
  ondemand = 'http://localhost:4723/wd/hub'
  caps['avd'] = 'Nexus_6_API_23'
  caps['app'] = `${__dirname}/../platforms/android/build/outputs/apk/android-debug.apk`
} else {
  ondemand = `http://${process.env.SAUCE_USER}:${process.env.SAUCE_KEY}@ondemand.saucelabs.com:8000/wd/hub`
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
      { id: 'right', visible: true }
    ]
    for (let i in ids) {
      let id = ids[i].id
      let visible = ids[i].visible
      let el = await driver.elementById(id)
      expect(el).to.not.equal(null)
      let isVisible = await el.isDisplayed()
      console.log({ id: id, v: visible })
      expect(isVisible).to.equal(visible)
    }
  })
})
