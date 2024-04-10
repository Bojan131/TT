const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { log } = require('console')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  await loginpage.goTo()
})

test('Failed login(wrong password)(1)', async () => {
  await loginpage.loginWS(dataset.username, '123')
  await loginpage.incorectLogin()
})

test('Failed login(empty password)(2)', async () => {
  await loginpage.loginWS(dataset.username, '')
  await loginpage.incorectLogin()
})

test('Failed login(Disabled user)(3)', async () => {
  await loginpage.loginWS('test.test18', 'test12')
  await loginpage.disabledAccountMessage()
})

test('Failed login(German)(4)', async () => {
  await loginpage.chooseLanguage('Deutsch')
  await loginpage.loginWS('dfdfgdg', dataset.password)
  await loginpage.incorectLoginGerman()
})

test('Failed login_2(German)(5)', async () => {
  await loginpage.chooseLanguage('Deutsch')
  await loginpage.loginWS(dataset.username, '123')
  await loginpage.incorectLoginGerman()
})

test('Forgot password(6)', async ({ browser }) => {
  await loginpage.resetPassword(browser, dataset.username)
})

test('Successfull login(7)', async () => {
  await loginpage.loginWS(dataset.username, dataset.password)
  await loginpage.successfullLogin()
})
