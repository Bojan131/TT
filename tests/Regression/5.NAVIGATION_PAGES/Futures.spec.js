const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Futures } = require('../../../TT POM/Futures')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let futures
let base
let isDataReset = false
let dataset

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  futures = new Futures(page)
  base = new Base(page)

  let username = process.env.USERNAME || dataset.username
  let password = process.env.PASSWORD || dataset.password
  await loginpage.goTo()
  await loginpage.loginWS(username, password)
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
