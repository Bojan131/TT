const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { log } = require('console')
//const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
//await loginpage.loginWS(dataset.username, dataset.password)
let loginpage

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  await loginpage.goTo()
})

test('Failed login(wrong password)(1)', async () => {
  await loginpage.loginWS(process.env.USERNAME, '123')
  await loginpage.incorectLogin()
})

test('Failed login(empty password)(2)', async () => {
  await loginpage.loginWS(process.env.USERNAME, '')
  await loginpage.incorectLogin()
})

test('Failed login(Disabled user)(3)', async () => {
  await loginpage.loginWS('test.test18', 'test12')
  await loginpage.disabledAccountMessage()
})

test('Failed login(German)(4)', async () => {
  await loginpage.chooseLanguage('Deutsch')
  await loginpage.loginWS('dfdfgdg', process.env.PASSWORD)
  await loginpage.incorectLoginGerman()
})

test('Failed login_2(German)(5)', async () => {
  await loginpage.chooseLanguage('Deutsch')
  await loginpage.loginWS(process.env.USERNAME, '123')
  await loginpage.incorectLoginGerman()
})

test('Forgot password(6)', async ({ browser }) => {
  await loginpage.resetPassword(browser, process.env.USERNAME)
})

test('Successfull login(7)', async () => {
  await loginpage.loginWS(process.env.USERNAME, process.env.PASSWORD)
  await loginpage.successfullLogin()
})
