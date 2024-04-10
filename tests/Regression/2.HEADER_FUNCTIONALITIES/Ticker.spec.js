const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { DashboardPage } = require('../../../TT POM/DashboardPage')
const { Base } = require('../../../TT Utils/Base')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let dashboard
let base

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title !== 'Ticker(9/10)') {
    loginpage = new LoginPage(page)
    base = new Base(page)
    await loginpage.goTo()
    await loginpage.loginWS(dataset.username, dataset.password)
    await loginpage.successfullLogin()
    dashboard = new DashboardPage(page)
  }
})

test('Reset Data', async () => {
  await base.resetData()
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
