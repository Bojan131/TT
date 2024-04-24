const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Currencies } = require('../../../TT POM/Currencies')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let currencies
let base
let isDataReset = false
let dataset

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  currencies = new Currencies(page)
  base = new Base(page)

  let username = process.env.USERNAME || dataset.username
  let password = process.env.PASSWORD || dataset.password
  await loginpage.goTo()
  await loginpage.loginWS(username, password)
  await loginpage.successfullLogin()
  await base.NavigateTo('Currencies')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('Currencies(1/2/3/4)', async () => {
  await base.chooseHeaderTab('Currencies', 'Currencies')
  await currencies.Currencies()
  await currencies.currenciesColumnPicker()
  await currencies.currenciesEurButton()
  await currencies.EurUsdSymbol()
})

test('Cross Rates(5/6/7/8)', async () => {
  await base.chooseHeaderTab('Cross Rates', 'Cross Rates')
  await currencies.crossRates()
  await currencies.crossRatesCalculator()
  await currencies.calculatorDragAndDrop()
})

test('Cross Rates(9/10)', async () => {
  await base.chooseHeaderTab('Cryptos', 'Cryptos')
  await currencies.Cryptos()
  await currencies.Bitcoin()
})

test('Crypto Pairs(11/12)', async () => {
  await base.chooseHeaderTab('Crypto Pairs', 'Crypto Pairs')
  await currencies.CryptoPairs()
})

test('Crypto currency news(13)', async () => {
  await base.chooseHeaderTab('Crypto currency news', 'Crypto currency news')
  await currencies.CryptoCurrenciesNews()
})
