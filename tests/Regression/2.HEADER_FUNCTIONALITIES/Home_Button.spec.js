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
  dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')));
} catch (error) {
  console.error("Failed to load 'placeorder.json'");
  dataset = {}
}

test.beforeEach(async ({ page }) => {
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
})

test('Starting Page(1)', async () => {
  await base.NavigateTo('Economic Data')
  await dashboard.chooseOption()
  await dashboard.chooseSymbolandClickLogo()
})

test('Starting page(2)', async () => {
  await base.NavigateTo('Economic Data')
  await dashboard.chooseOption()
  await dashboard.LogOut()
  await loginpage.loginWS(process.env.USERNAME, process.env.PASSWORD)
  await dashboard.EconomicDataCheck()
})
