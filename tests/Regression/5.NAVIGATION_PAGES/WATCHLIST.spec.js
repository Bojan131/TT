const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Watchlist } = require('../../../TT POM/Watchlist')
const { Base } = require('../../../TT Utils/Base')
const { watch } = require('fs')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let watchlist
let base
let isDataReset = false

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title !== 'Open in new browser(19)') {
    loginpage = new LoginPage(page)
    watchlist = new Watchlist(page)
    base = new Base(page)

    await loginpage.goTo()
    await loginpage.loginWS(dataset.username, dataset.password)
    await loginpage.successfullLogin()
    await base.NavigateTo('Watchlists')
    if (!isDataReset) {
      await base.resetData()
      isDataReset = true
    }
  }
})

test('Create Watchlist(1/2)', async () => {
  await base.chooseHeaderTab('Personal Watchlist Overview', 'Personal Watchlist Overview')
  await watchlist.watchlist()
  await watchlist.addNewWL()
})

test('Drag and drop(3/14)', async () => {
  await base.chooseHeaderTab('Personal Watchlist Overview', 'Personal Watchlist Overview')
  await watchlist.dragAndDropSymbol()
})

test('Edit Watchlist(5/6/7/11/12)', async () => {
  await base.chooseHeaderTab('All Watchlists', 'All Watchlists')
  await watchlist.clickOnWL3()
  await watchlist.editWatchlist()
  await watchlist.addTitleWL()
  await watchlist.editTitle()
  await watchlist.deleteSymbol()
  await watchlist.exitEditing()
})

test('Rename Watchliast(13)', async () => {
  await base.chooseHeaderTab('All Watchlists', 'All Watchlists')
  await watchlist.clickOnWL3()
  await watchlist.RenameWatchList()
})

test('Open in new browser(19)', async ({ page, browser }, testInfo) => {
  watchlist = new WATCHLIST(page)
  await watchlist.newBrowserWindow(browser)
})

test('Merge and delete Watchlist(20/21)', async () => {
  await base.chooseHeaderTab('All Watchlists', 'All Watchlists')
  await watchlist.mergeGroups()
  await watchlist.deleteWL()
})

test('Personal Watchlist(22/23/24/26)', async () => {
  await base.chooseHeaderTab('Personal Watchlist Overview', 'Personal Watchlist Overview')
  await watchlist.personalWatchlist()
  await watchlist.quoteBoards()
  await watchlist.addNewWL()
})

test('Personal Watchlist(27/29/30/31)', async () => {
  await base.chooseHeaderTab('Personal Watchlist Overview', 'Personal Watchlist Overview')
  await watchlist.chooseChart()
  await watchlist.removeFromOverview()
  await watchlist.RenameWatchList()
  await watchlist.deleteWL()
})
