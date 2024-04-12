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
  await base.sidePanelTab('Favorites')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Favourites(1/2/3/4/5/6/7)', async () => {
  await overview.favorites()
  await overview.editFavorites()
  await overview.favoritesDragAndDrop()
  await overview.deleteFavorites()
  await overview.renameFavorites()
})
