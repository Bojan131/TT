const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { MONEY_MARKETS } = require('../../../TT POM/MONEY_MARKETS')
const { Base } = require('../../../TT Utils/Base')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let moneyMarkets
let base

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  base = new Base(page)
  await loginpage.goTo()
  await loginpage.loginWS(dataset.username, dataset.password)
  await loginpage.successfullLogin()
  moneyMarkets = new MONEY_MARKETS(page)
  await base.NavigateTo('Money Markets')
})

test('Reset Data', async () => {
  await base.resetData()
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
