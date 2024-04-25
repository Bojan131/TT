const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { DashboardPage } = require('../../../TT POM/DashboardPage')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let dashboard
let base
let isDataReset = false
let dataset

try {
  dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
} catch (error) {
  console.error("Loading Login credentials from Github secrets")
  dataset = {}
}

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title !== 'Ticker(9/10)') {
    loginpage = new LoginPage(page)
    dashboard = new DashboardPage(page)
    base = new Base(page)

    let username = dataset.username || process.env.USERNAME
    let password = dataset.password || process.env.PASSWORD

    await loginpage.goTo()
    await loginpage.loginWS(username, password)
    await loginpage.successfullLogin()
    if (!isDataReset) {
      await base.resetData()
      isDataReset = true
    }
  }
})

test('Ticker(1)', async () => {
  await base.optionPicker('Ticker', 'General')
  await base.deactivateActivateTicker('Ticker1', 'off')
  await dashboard.countTicker(0)
})

test('Ticker(2)', async () => {
  await dashboard.dropdownTicker()
})

test('Ticker(3)', async () => {
  await dashboard.tickerBig()
})

test('Ticker(4)', async () => {
  await dashboard.tickerTwo()
})

test('Ticker(9/10)', async ({ page, browser }, testInfo) => {
  dashboard = new DashboardPage(page)
  await dashboard.compareTicker(browser)
})
