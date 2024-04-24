const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { OverviewPage } = require('../../../TT POM/OverviewPage')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let overview
let base
let isDataReset = false
let dataset

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  overview = new OverviewPage(page)
  base = new Base(page)

  let username = process.env.USERNAME || dataset.username
  let password = process.env.PASSWORD || dataset.password
  await loginpage.goTo()
  await loginpage.loginWS(username, password)
  await loginpage.successfullLogin()
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
