const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Funds } = require('../../../TT POM/Funds')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let funds
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
  funds = new Funds(page)
  base = new Base(page)

  let username = dataset.username || process.env.USERNAME
  let password = dataset.password || process.env.PASSWORD

  await loginpage.goTo()
  await loginpage.loginWS(username, password)
  await loginpage.successfullLogin()
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
