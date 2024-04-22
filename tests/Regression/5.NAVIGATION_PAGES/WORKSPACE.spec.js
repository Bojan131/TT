const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Workspace } = require('../../../TT POM/Workspace')
const { Base } = require('../../../TT Utils/Base')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let workspace
let base
let isDataReset = false

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  workspace = new Workspace(page)
  base = new Base(page)

  await loginpage.goTo()
  await loginpage.loginWS(dataset.username, dataset.password)
  await loginpage.successfullLogin()
  await base.NavigateTo('Workspace')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Create,Rename and Delete new Workspace(1/2/3/4/5/7)', async () => {
  await workspace.openWorkspace()
  await workspace.addNewWorkspace()
  await workspace.countWorkspaces()
  await workspace.renameWorkspace('WS1')
  await workspace.deleteWorkspace()
})

test('Adding and Removing widgets(1/2/3/5)', async () => {
  await workspace.deleteWL1IfExists()
  await workspace.addWidget('Breaking news')
  await workspace.breakingNewsWidget()
})

test('Create news filter(6/7)', async () => {
  await workspace.addNewsFilter()
})

test('Choose News Filter(8/9/10/11)', async () => {
  await workspace.addNewsFilterFromMenu()
  await workspace.addDaxToNewsFilter()
  await workspace.deleteFilter()
})

test('Create Price Page(13/14)', async () => {
  await workspace.addPricePage()
  await workspace.newPricePage()
})

test('Add symbol to Price Page(15/18)', async () => {
  await workspace.dragAndDropToPricePage()
  await workspace.openSymbolChart()
})

test('Price Page Header Options(19/20)', async () => {
  await workspace.quoteboardPricePage()
})

test('Add Watchlist(21/22/23/24)', async () => {
  await workspace.newWL()
  await workspace.addWatchlist()
  await workspace.existingWatchlist()
  await workspace.deleteSymbol()
  await workspace.finishDeletingSymbols()
})

test('Watchlist action button options(25/26/27/28/29/30/31)', async () => {
  await workspace.renameWatchlist()
  await workspace.renameWatchlistBack()
  await workspace.conntectListToAChart()
  await workspace.changeChartSymbolAndChooseTemplateAndDisconnect()
})

test('Watchlists connections(33/34/35/36/37/38/39)', async () => {
  await workspace.connectChartToList()
  await workspace.interactiveChart()
  await workspace.connectWatchlistToNews()
})

test('Cross Rates and commodities(40/43/44/45)', async () => {
  await workspace.crossRates()
  await workspace.commodities()
  await workspace.deleteWidget()
  await workspace.deleteWorkspace()
  await workspace.addNewWorkspace()
  await workspace.renameWorkspace('1')
  await workspace.deleteWL()
})
