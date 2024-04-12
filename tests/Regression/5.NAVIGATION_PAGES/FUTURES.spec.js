const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { FUTURES } = require('../../../TT POM/FUTURES')
const { Base } = require('../../../TT Utils/Base')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let futures
let base
let isDataReset = false

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  base = new Base(page)
  await loginpage.goTo()
  await loginpage.loginWS(dataset.username, dataset.password)
  await loginpage.successfullLogin()
  futures = new FUTURES(page)
  await base.NavigateTo('Futures')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Futures(1)', async () => {
  await futures.futures()
})
