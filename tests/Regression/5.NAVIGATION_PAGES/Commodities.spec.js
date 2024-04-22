const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Commodities } = require('../../../TT POM/Commodities')
const { Base } = require('../../../TT Utils/Base')
const dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
let loginpage
let commodities
let base
let isDataReset = false

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  commodities = new Commodities(page)
  base = new Base(page)

  await loginpage.goTo()
  await loginpage.loginWS(dataset.username, dataset.password)
  await loginpage.successfullLogin()
  await base.NavigateTo('Commodities')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Commodities(1)', async () => {
  await base.chooseHeaderTab('Commodities', 'Commodities')
  await commodities.commodities()
})

test('Precious Metals(2/3)', async () => {
  await base.chooseHeaderTab('Precious Metals', 'Precious Metals')
  await commodities.preciousMetals()
})

test('Gas Storage(4/5/6)', async () => {
  await base.chooseHeaderTab('Gas Storage Inventory', 'Gas Storage Inventory')
  await commodities.gasStorageInventory()
})
