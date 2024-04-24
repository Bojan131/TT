const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { DashboardPage } = require('../../../TT POM/DashboardPage')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let dashboard
let base
let isDataReset = false
let dataset

try {
  dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')));
} catch (error) {
  console.error("Failed to load 'placeorder.json'");
  dataset = {}
}

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title !== 'Live search8') {
    loginpage = new LoginPage(page)
    dashboard = new DashboardPage(page)
    base = new Base(page)

    let username = process.env.USERNAME || dataset.username
    let password = process.env.PASSWORD || dataset.password

    console.log("Environment variable USERNAME:", process.env.USERNAME);
console.log("Dataset username:", dataset.username);

console.log("Environment variable PASSWORD:", process.env.PASSWORD);
console.log("Dataset password:", dataset.password);

    await loginpage.goTo()
    await loginpage.loginWS(username, password)
    await loginpage.successfullLogin()
    if (!isDataReset) {
      await base.resetData()
      isDataReset = true
    }
  }
})

test('Live search(1)', async () => {
  await dashboard.typeBank()
})

test('Live search(2)', async () => {
  await dashboard.typeNoResult()
})

test('Live search(4)', async () => {
  await dashboard.typeApple()
})

test('Live search(5)', async () => {
  await dashboard.typeBMW()
})

test('Live search(6)', async () => {
  await dashboard.checkBMW()
})
test('Live search(7)', async () => {
  await dashboard.table()
})

test('Live search(8)', async () => {
  await dashboard.hoverAll()
})

test('Live search(9)', async ({ page, browser }, testInfo) => {
  dashboard = new DashboardPage(page)
  await dashboard.doubleClick(browser)
})

test('Live search(10)', async () => {
  await dashboard.deactivate('/')
})

test('Live search(11)', async () => {
  await dashboard.deactivate('-')
})

test('Live search(12)', async () => {
  await dashboard.wei()
})

test('Live search(13)', async () => {
  await dashboard.ate()
})
