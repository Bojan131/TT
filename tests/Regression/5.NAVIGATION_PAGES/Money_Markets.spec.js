const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Money_Markets } = require('../../../TT POM/Money_Markets')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let moneyMarkets
let base
let isDataReset = false
let dataset

try {
  dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
} catch (error) {
  console.error("Loading Login credentials from Github secrets")
  dataset = {}
}

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  moneyMarkets = new Money_Markets(page)
  base = new Base(page)

  let username = dataset.username || process.env.USERNAME
  let password = dataset.password || process.env.PASSWORD

  await loginpage.goTo()
  await loginpage.loginWS(username, password)
  await loginpage.successfullLogin()
  await base.NavigateTo('Money Markets')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Money Markets(1/2/3)', async () => {
  await base.chooseHeaderTab('Money Market Overview', 'Money Market Overview')
  await moneyMarkets.moneyMarketsOverview()
  await moneyMarkets.sonia()
  await moneyMarkets.interBankValue()
})

test('Inflation(4/5/6)', async () => {
  await base.chooseHeaderTab('Inflation', 'Inflation')
  await moneyMarkets.inflation()
  await moneyMarkets.checkboxes()
  await moneyMarkets.inflationHistorical()
})

test('Inflation Calculator(7/8)', async () => {
  await base.chooseHeaderTab('Inflation calculator', 'Inflation calculator')
  await moneyMarkets.inflationCalculator()
})
