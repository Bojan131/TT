const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { OverviewPage } = require('../../../TT POM/OverviewPage')
const { Base } = require('../../../TT Utils/Base')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let overview
let base
let isDataReset = false

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  base = new Base(page)
  await loginpage.goTo()
  await loginpage.loginWS(dataset.username, dataset.password)
  await loginpage.successfullLogin()
  overview = new OverviewPage(page)
  await base.sidePanelTab('Search')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Quick Search(1/2/3/4/5/6)', async () => {
  await overview.typeTwoLetters()
  await overview.clearSearch()
  await overview.typeThreeLetters()
  await overview.hide()
  await base.NavigateTo('baha News')
  await overview.displaySearchResults()
  await overview.displayAllGroupMembers()
})

test('Full Serach(1/2/3/4)', async () => {
  await overview.fullSearch()
  await overview.CheckMark()
  await overview.showResultsinOverview()
  await overview.CheckMark()
  await base.reloadPage()
  await overview.fullSearch()
  await overview.exchangeAndType()
})

test('Detail Page Search(1/2/3/4/5/6/7/8/9)', async () => {
  await overview.onlyfullSearch()
  await overview.currencyPick()
  await overview.chooseBond()
  await overview.groupExchanges()
  await overview.dragAndDropTable()
  await overview.columnPicker()
  await overview.resetColumnPickerBonds()
  await overview.ticker()
})

test('Fund Serach(1/2/4)', async () => {
  await overview.fundSearch()
  await overview.simpleSearch()
  await overview.expertSearch()
})
