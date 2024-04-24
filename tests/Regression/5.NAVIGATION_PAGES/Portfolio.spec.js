const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Portfolio } = require('../../../TT POM/Portfolio')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let portfolio
let base
let isDataReset = false
let dataset

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title !== 'Open in new browser(36)') {
    loginpage = new LoginPage(page)
    portfolio = new Portfolio(page)
    base = new Base(page)

    let username = process.env.USERNAME || dataset.username
    let password = process.env.PASSWORD || dataset.password
    await loginpage.goTo()
    await loginpage.loginWS(username, password)
    await loginpage.successfullLogin()
    await base.NavigateTo('Portfolio')
    if (!isDataReset) {
      await base.resetData()
      isDataReset = true
    }
  }
})

test('Create Portfolio(1/2/3/4)', async () => {
  await portfolio.createPorfolio1()
  await portfolio.createPortfolio2()
})

test('Add symbols to portfolio(5/6/7/8/9/10/11)', async () => {
  await portfolio.dragAndDropSymbolDAX()
  await portfolio.dragAndDropSymbolAdidas()
})

test('Edit portfolio(12/13/14/15/16/17)', async () => {
  await portfolio.infoPage()
  await portfolio.buySell()
})

test('Transaction tab(18/19/20)', async () => {
  await portfolio.transactionTab()
  await portfolio.buySellOthers()
  await portfolio.cancelPoistion()
})

test('Chart tab(21/22/24)', async () => {
  await portfolio.chartTab()
  await portfolio.allButton()
  await portfolio.comparePorfolio()
})

test('Sports Porfolio(25/26/27/28/29)', async () => {
  await portfolio.sportsPortfolio()
  await portfolio.structureTab()
  await portfolio.RiskMatrix()
  await portfolio.settings()
})

test('Manipulation with portfolio icons(30/31/32/33)', async () => {
  await portfolio.portfolioManipulations()
  await portfolio.addAllMembersToWatchList()
})

test('Open in new browser(36)', async ({ page, browser }) => {
  portfolio = new Portfolio(page)
  await portfolio.openNewBrowser(browser)
})

test('Delete Portfolio(37)', async () => {
  await portfolio.choosePortfolio('Manipulations')
  await portfolio.deletePortfolio()
  await portfolio.choosePortfolio('Sports')
  await portfolio.deletePortfolio()
})

test('All Portfolios(40/41/42/43)', async () => {
  await portfolio.allPortfolios()
  await portfolio.deletePortfolio()
  await portfolio.deletePortfolio()
})
