const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { FUNDS } = require('../../../TT POM/FUNDS')
const { Base } = require('../../../TT Utils/Base')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let funds
let base
let isDataReset = false

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  base = new Base(page)
  await loginpage.goTo()
  await loginpage.loginWS(dataset.username, dataset.password)
  await loginpage.successfullLogin()
  funds = new FUNDS(page)
  await base.NavigateTo('Funds')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Funds(1/2/3)', async () => {
  await base.chooseHeaderTab('Funds Overview', 'Funds Overview')
  await funds.funds()
  await funds.threeMonths()
  await funds.equityMore()
})

test('Top Performer(4/5)', async () => {
  await base.chooseHeaderTab('Top performer', 'Top performer')
  await funds.topPerformer()
  await funds.filterTopPerformer()
})

test('Simple Search(6/7)', async () => {
  await base.chooseHeaderTab('Simple search', 'Simple search')
  await funds.simpleSearch()
  await funds.simpleSearchFilter()
})

test('Expert Search(8/9/10)', async () => {
  await base.chooseHeaderTab('Expert search', 'Expert search')
  await funds.expertSearch()
  await funds.expertSearchFilter()
  await funds.expertSearchPerformance()
})

test('ESG Funds(11/12)', async () => {
  await base.chooseHeaderTab('ESG Funds', 'ESG Funds')
  await funds.ESGFunds()
  await funds.esgFundsFilter()
})

test('Savings Calculator(13/14/15)', async () => {
  await base.chooseHeaderTab('Savings calculator', 'Savings calculator')
  await funds.savingsCalculator()
  await funds.savingsCalculatorFilter()
})
