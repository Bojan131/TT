const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../../TT POM/LoginPage')
const { Baha_news } = require('../../../TT POM/Baha_news')
const { Base } = require('../../../TT Utils/Base')
let loginpage
let news
let base
let isDataReset = false
let dataset

try {
  dataset = JSON.parse(JSON.stringify(require('../../../TT Utils/placeorder.json')))
} catch (error) {
  console.error("Failed to load 'placeorder.json'")
  dataset = {}
}

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page)
  news = new Baha_news(page)
  base = new Base(page)

  let username = dataset.username || process.env.USERNAME
  let password = dataset.password || process.env.PASSWORD

  await loginpage.goTo()
  await loginpage.loginWS(username, password)
  await loginpage.successfullLogin()
  await base.NavigateTo('baha News')
  if (!isDataReset) {
    await base.resetData()
    isDataReset = true
  }
})

test('baha News(1/2/3/4/5/6)', async () => {
  await base.chooseHeaderTab('Breaking The News', 'Breaking The News')
  await news.bahaNews()
  await news.moreNews()
  await news.returnToTop()
  await news.searchNewsBar()
  await news.economySection()
  await news.clickOnNews()
})

test('Other News(7)', async () => {
  await base.chooseHeaderTab('Other news', 'Other news')
  await news.otherNews()
})

test('Potus(Has no number)', async () => {
  await base.chooseHeaderTab('POTUS', 'POTUS')
  await news.potusNews()
})

test('Filter(8/9/10/11/12)', async () => {
  await base.chooseHeaderTab('Filter', 'Filter')
  await news.filterNews()
  await news.saveFilter()
})

test('Filter Language and Package(13/14)', async () => {
  await base.chooseHeaderTab('Filter', 'Filter')
  await news.changeLanguageAndPackage()
})

test('Trending(16/17/18)', async () => {
  await base.chooseHeaderTab('Trending', 'Trending')
  await news.trending()
  await news.similarArticles()
  await news.searchTrendingNewsBar()
})

test('Time Machine Bar(19)', async () => {
  await base.chooseHeaderTab('Trending', 'Trending')
  await news.timeMachineBar()
})
