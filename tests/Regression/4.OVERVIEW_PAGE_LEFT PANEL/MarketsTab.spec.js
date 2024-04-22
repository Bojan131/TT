const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { OverviewPage } = require('../../../TT POM/OverviewPage')
const { Base } = require('../../../TT Utils/Base')
//const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let overview
let base
let isDataReset = false

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  base = new Base(page)
  await loginpage.goTo()
  await loginpage.loginWS(process.env.USERNAME, process.env.PASSWORD)
  await loginpage.successfullLogin()
  overview = new OverviewPage(page)
  await base.sidePanelTab('Markets')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Pinned news(1/2/3/4)', async () => {
  await overview.pinnedNews()
  await overview.pin()
})

test('Top/Flop(6)', async () => {
  await overview.TopFlop()
})

test('Minimize(7)', async () => {
  await overview.minimize()
})

test('Rearrange(8)', async () => {
  await overview.rearrange()
})
