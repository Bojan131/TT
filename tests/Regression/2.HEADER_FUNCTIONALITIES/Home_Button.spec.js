const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { DashboardPage } = require('../../../TT POM/DashboardPage')
const { Base } = require('../../../TT Utils/Base')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let dashboard
let base
let isDataReset = false

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  base = new Base(page)
  await loginpage.goTo()
  await loginpage.loginWS(dataset.username, dataset.password)
  await loginpage.successfullLogin()
  dashboard = new DashboardPage(page)
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
  await loginpage.loginWS(dataset.username, dataset.password)
  await dashboard.EconomicDataCheck()
})
