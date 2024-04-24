const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Equities } = require('../../../TT POM/Equities')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let equities
let base
let isDataReset = false
let dataset

try {
  dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
} catch (error) {
  console.error("Failed to load 'placeorder.json'")
  dataset = {}
}

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  equities = new Equities(page)
  base = new Base(page)

  let username = dataset.username || process.env.USERNAME
  let password = dataset.password || process.env.PASSWORD

  await loginpage.goTo()
  await loginpage.loginWS(username, password)
  await loginpage.successfullLogin()
  await base.NavigateTo('Equities')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Open Equities(1)', async () => {
  await base.chooseHeaderTab('Market Overview', 'Market Overview')
  await base.chooseSymbol('DAX')
  await base.checkSecurity('DAX', 'Equities')
  await equities.openEquities()
})

test('Merge Groups(2)', async () => {
  await base.chooseHeaderTab('Market Overview', 'Market Overview')
  await base.toolTip('Merge groups')
  await equities.mergeGroups()
})

test('Quick Performance(3/5)', async () => {
  await base.chooseHeaderTab('Market Overview', 'Market Overview')
  await base.toolTip('Quick Performance')
  await equities.quickPerformance()
  await equities.quickPerformanceNextPage()
})

test('Overview(6/7)', async () => {
  await base.chooseHeaderTab('Market Overview', 'Market Overview')
  await base.toolTip('Overview')
  await equities.Overview()
  await equities.OverviewColumnPicker()
})

test('Chart(8/9)', async () => {
  await base.chooseHeaderTab('Market Overview', 'Market Overview')
  await base.toolTip('Chart')
  await equities.Chart()
  await equities.changeChart()
})

test('Quoteboard(10/11)', async () => {
  await base.chooseHeaderTab('Market Overview', 'Market Overview')
  await equities.QuoteBoard()
  await equities.changeQuotboard()
})

test('Indices(12/13/14/15)', async () => {
  await equities.indices()
  await equities.indicesColumnPicker()
  await equities.Europe()
  await equities.USA()
})

test('Index reports(16/17/18/19/20/22)', async () => {
  await base.chooseHeaderTab('Index Reports', 'Index Reports')
  await equities.indexReports()
  await equities.indexReportsColumnPicker()
  await equities.ATR()
  await equities.indexReportsAddColumns()
  await equities.settingsIcon()
  await equities.savedSettings()
})

test('Index reports(23/24)', async () => {
  await base.chooseHeaderTab('Country Reports', 'Country Reports')
  await equities.CountryReports()
  await equities.countryReportsColumnPicker()
})

test('Hot Stocks(25/26/27)', async () => {
  await base.chooseHeaderTab('Hot Stocks', 'Hot Stocks')
  await equities.HotStocks()
  await equities.HotStocksColumnPicker()
  await equities.HotStockOneYearHighestHigh()
})

test('Unusual Volumes(28/29)', async () => {
  await base.chooseHeaderTab('Unusual Volumes', 'Unusual Volumes')
  await equities.UnusualVolumes()
  await equities.UnusualVolumesColumnPicker()
})
