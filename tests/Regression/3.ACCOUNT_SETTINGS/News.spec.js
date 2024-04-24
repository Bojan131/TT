const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { AccountSettings } = require('../../../TT POM/AccountSettings')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let accountsettings
let base
let isDataReset = false
let dataset

try {
  dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
} catch (error) {
  console.error("Failed to load 'placeorder.json'")
  dataset = {}
}

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title !== 'Ticker6') {
    loginpage = new LoginPage(page)
    accountsettings = new AccountSettings(page)
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

test('News in Market Tab(1)', async () => {
  await accountsettings.newsMarketTab()
})

test('News in details page(2)', async () => {
  await accountsettings.newsDetailsPage()
})

test('News age(3)', async () => {
  await accountsettings.newsAge()
})

test('Font size(4)', async () => {
  await accountsettings.FontSize()
})

test('Display news(5)', async () => {
  await accountsettings.displayNews()
})

test('News video and ticker(7)', async () => {
  await accountsettings.newsVideoTicker()
})
