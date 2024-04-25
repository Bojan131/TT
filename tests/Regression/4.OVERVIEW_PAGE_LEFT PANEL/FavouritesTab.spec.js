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
