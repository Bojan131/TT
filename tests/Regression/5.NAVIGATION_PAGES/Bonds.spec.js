const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Bonds } = require('../../../TT POM/Bonds')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let bonds
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
  bonds = new Bonds(page)
  base = new Base(page)

  let username = dataset.username || process.env.USERNAME
  let password = dataset.password || process.env.PASSWORD

  await loginpage.goTo()
  await loginpage.loginWS(username, password)
  await loginpage.successfullLogin()
  await base.NavigateTo('Bonds')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Bonds(1/2/3)', async () => {
  await base.chooseHeaderTab('Yield Curves', 'Yield Curves')
  await bonds.bonds()
  await bonds.selectYieldCountry()
  await bonds.governmentBondYields()
})

test('Historic yield search(4)', async () => {
  await base.chooseHeaderTab('Yield Curves', 'Yield Curves')
  await base.chooseSymbolTab('Historic Yield Curves')
  await bonds.historicYieldCurves()
})

test('Bonds Search(5/6)', async () => {
  await base.chooseHeaderTab('Bonds search', 'Bonds search')
  await bonds.bondsSearch()
})

test('Bonds IPO(7/8)', async () => {
  await base.chooseHeaderTab('Bonds IPO', 'Bonds IPO')
  await bonds.bondsIpo()
})

test('Bonds Calculator(9/10)', async () => {
  await base.chooseHeaderTab('Bond Calculator', 'Bond Calculator')
  await bonds.bondsCalculator()
})
