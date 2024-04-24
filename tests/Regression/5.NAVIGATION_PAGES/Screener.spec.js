const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Screener } = require('../../../TT POM/Screener')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let screener
let base
let isDataReset = false
let dataset

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  screener = new Screener(page)
  base = new Base(page)

  let username = process.env.USERNAME || dataset.username
  let password = process.env.PASSWORD || dataset.password
  await loginpage.goTo()
  await loginpage.loginWS(username, password)
  await loginpage.successfullLogin()
  await base.NavigateTo('Screener')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Screener(1/2/3/4/5/6/7/8/9)', async () => {
  await base.chooseHeaderTab('Screener', 'Screener')
  await screener.screener()
  await screener.addFilter()
  await screener.addnewFilter()
  await screener.comparisonButton()
})
