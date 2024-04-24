const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { log } = require('console')
let loginpage
let username, password
let dataset

try {
  dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')));
} catch (error) {
  console.error("Failed to load 'placeorder.json'");
  dataset = {}
}

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)

  username = process.env.USERNAME || dataset.username
  password = process.env.PASSWORD || dataset.password

  await loginpage.goTo()
})

test('Failed login(wrong password)(1)', async () => {
  await loginpage.loginWS(username, '123')
  await loginpage.incorectLogin()
})

test('Failed login(empty password)(2)', async () => {
  await loginpage.loginWS(username, '')
  await loginpage.incorectLogin()
})

test('Failed login(Disabled user)(3)', async () => {
  await loginpage.loginWS('test.test18', 'test12')
  await loginpage.disabledAccountMessage()
})

test('Failed login(German)(4)', async () => {
  await loginpage.chooseLanguage('Deutsch')
  await loginpage.loginWS('dfdfgdg', password)
  await loginpage.incorectLoginGerman()
})

test('Failed login_2(German)(5)', async () => {
  await loginpage.chooseLanguage('Deutsch')
  await loginpage.loginWS(username, '123')
  await loginpage.incorectLoginGerman()
})

test('Forgot password(6)', async ({ browser }) => {
  await loginpage.resetPassword(browser, username)
})

test('Successfull login(7)', async () => {
  await loginpage.loginWS(username, password)
  await loginpage.successfullLogin()
})
