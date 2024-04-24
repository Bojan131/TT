const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { DashboardPage } = require('../../../TT POM/DashboardPage')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let dashboard
let base
let isDataReset = false
let dataset

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title !== 'Ticker(9/10)') {
    loginpage = new LoginPage(page)
    dashboard = new DashboardPage(page)
    base = new Base(page)

    let username = process.env.USERNAME || dataset.username
    let password = process.env.PASSWORD || dataset.password
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
