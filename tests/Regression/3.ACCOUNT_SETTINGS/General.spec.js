const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { AccountSettings } = require('../../../TT POM/AccountSettings')
const { Base } = require('../../../TT Utils/Base')
//const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let accountsettings
let base
let isDataReset = false

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  base = new Base(page)
  await loginpage.goTo()
  await loginpage.loginWS(process.env.USERNAME, process.env.PASSWORD)
  await loginpage.successfullLogin()
  accountsettings = new AccountSettings(page)
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Second Layout(6)', async () => {
  await accountsettings.changeLayout()
})

test('Light color(7)', async () => {
  await accountsettings.lightDark()
})

test('Minimize baha fastlook(8)', async () => {
  await accountsettings.minimizeBahaFastlook()
})

test('Turn off push(9)', async () => {
  await accountsettings.disablePush()
})

test('Chart type candle(12/13)', async () => {
  await accountsettings.ChartTypeCandle()
})

test('HTML5 Chart(14)', async () => {
  await accountsettings.disableHTML5Chart()
})

test('Double click(15)', async ({ browser }) => {
  await accountsettings.doubleClick1(browser)
})

test('Double click(16)', async ({ browser }) => {
  await accountsettings.doubleClick2(browser)
})

test('Most Visited(18)', async () => {
  await accountsettings.mostVisited()
})

test('Economic data settings(20)', async () => {
  await accountsettings.events()
})

test('Top 3 Favourites(21)', async ({ browser }) => {
  await accountsettings.openFavourites(browser)
})

test('Russian language(22)', async () => {
  await accountsettings.russianLanguage()
})

test('Time Zone(23/25)', async () => {
  await accountsettings.timeZone()
})

test('Settings watchlist(26)', async () => {
  await accountsettings.settingsWatchlists('futurestestdetail1')
})

test('Keyboard functions(27)', async () => {
  await accountsettings.keyboardFunctions()
})
