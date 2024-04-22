const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Futures } = require('../../../TT POM/Futures')
const { Base } = require('../../../TT Utils/Base')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let futures
let base
let isDataReset = false

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  futures = new Futures(page)
  base = new Base(page)

  await loginpage.goTo()
  await loginpage.loginWS(dataset.username, dataset.password)
  await loginpage.successfullLogin()
  await base.NavigateTo('Futures')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Futures(1)', async () => {
  await futures.futures()
})
