const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { OverviewPage } = require('../../../TT POM/OverviewPage')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let overview
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
  overview = new OverviewPage(page)
  base = new Base(page)

  let username = dataset.username || process.env.USERNAME
  let password = dataset.password || process.env.PASSWORD

  await loginpage.goTo()
  await loginpage.loginWS(username, password)
  await loginpage.successfullLogin()
  await base.sidePanelTab('Watchlists')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('1.Creating new Watchlist(1/2)', async () => {
  await overview.createWL()
  await overview.createNewWL('111')
  await overview.deleteWL('111')
})

test('1.Add to existing watchlist(4/5)', async () => {
  await base.sidePanelTab('Markets')
  await overview.addAllMembers()
  await overview.existingList()
})

test('1.Add to new watchlist(4/6)', async () => {
  await base.sidePanelTab('Markets')
  await overview.addAllMembers()
  await overview.newList()
  await overview.deleteDax()
})

test('3.Action menu(1)', async () => {
  await overview.createNewWL('WL2')
  await overview.renameWL()
  await overview.deleteWL('WL7')
})

test('3.Action menu(2)', async () => {
  await overview.minWL()
})

test('3.Action menu(3)', async () => {
  await overview.expandWL()
})

test('3.Delete Symbol(4/5/6)', async () => {
  await base.sidePanelTab('Markets')
  await overview.addAllMembers()
  await overview.newList()
  await overview.deleteSymbol()
  await overview.deleteDax()
})

test('4.Share WatchList(1/2/3)', async () => {
  await overview.shareWatchList('Share watchlist')
  await overview.shareWatchList('Stop sharing')
})

test('5.Column Picker(1/2/3/4/5)', async () => {
  await overview.addColumn()
  await overview.columnPickerOptions()
  await overview.resetColumnPicker()
})

test('5.WatchList position(7/9)', async () => {
  await base.sidePanelTab('Markets')
  await overview.addAllMembers()
  await overview.newList()
  await base.sidePanelTab('Watchlists')
  await overview.moveWLDown()
  await base.checkIndexPosition('.wl_title', 'DAX', 1)
  await overview.pinDax()
  await overview.deleteDax()
})

test('6.Comparison(1/2/3/4/5/6/7)', async () => {
  await overview.compareSymbols()
  await base.sidePanelTab('Markets')
  await overview.dragAndDropToChart()
  await overview.dotMatrix()
  await overview.StaticDynamicRiskMatrix()
  await overview.hoverOver()
})

test('6.Comparison Funds(8/9/10)', async () => {
  await overview.makeFundsWatchlist()
  await overview.fundsComparison()
  await overview.fundsComparePage()
  await overview.deleteWL('111')
})
