const { expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')
const exp = require('constants')
const { globalAgent } = require('https')

class Baha_news extends Base {
  constructor(page) {
    this.page = page
    this.newsTitle = page.locator('.latest-news-list .news-title')
    this.newsSection = page.locator('.news-section').nth(1)
    this.moreNewsSection = page.locator('.news-section').last()
    this.newsSectionTitle = this.moreNewsSection.locator('.news-section-title')
    this.latestNews = this.newsSection.locator('.news-title')
    this.leftPanelNews = page.locator('.font_size_small')
    this.euroNews = page.locator('.more_live_tv_channel_en')
    this.dwNews = page.locator('.more_live_tv_channel_dw')
    this.popularNews = page.locator('.popular-news-title')
    this.newsSectionPopular = page.locator(".news-section-title:has-text('Popular')")
    this.newsSectionTrending = page.locator(".news-section-title:has-text('Trending')")
    this.searchTrendingNews = page.locator("[placeholder='Search Trending News']")
    this.newsSectionFocus = page.locator(".news-section-title:has-text('In Focus')")
    this.isFocusTitle = page.locator('.in_focus_title')
    this.loadMoreNews = page.locator('.load-more').first()
    this.returnToTopButton = page.locator('.return-to-top')
    this.searchNews = page.locator(".grid-container-row [name='searchTerm']")
    this.searchResultTitle = page.locator('.search-results-title')
    this.EconomySectionButton = page.locator("[href='/news/breaking-the-news/economy']")
    this.EconomynewsSectionTitle = page.locator(".news-section-title:has-text('Economy')")
    this.Title = page.locator('.for_marking')
    this.loadingLazy = page.locator("[loading='lazy']")
    this.otherNewsColumn = page.locator('.page-content .news-list-wrapper')
    this.PotusNews = page.locator('.page-content .news-title')
    this.potusChart = page.locator('.chart_components_wrapper')
    this.djEuroStock = page.locator(".tt_symbolText:has-text('DJ EURO STOXX 50 EUR Price')")
    this.closeChartButton = page.locator('.tt_closeButton')
    this.Stoxx50 = page.locator(".tt_symbolText:has-text('Stoxx 50')")
    this.filterNewsField = page.locator('.display-string')
    this.filterResults = page.locator('.page-content .news-list')
    this.newsSearchTab = page.locator(".page-content [name='searchTerm']")
    this.applyFilter = page.locator('.apply')
    this.newsFilterElements = page.locator('.page-content .font_size_small')
    this.saveFilterButton = page.locator('.openButton')
    this.saveFilterInput = page.locator("[placeholder='Please enter name for your filter!']")
    this.saveFilterNameButton = page.locator(".popover-body [type='button']")
    this.pinFilterToTop = page.locator('.page-content .ws_pin_to_top')
    this.deleteButton = page.locator('.delete')
    this.pinToTopSaveButton = page.locator('.pin_to_tab_popup .button')
    this.tabItem = page.locator('.tab-item')
    this.resetButton = page.locator('.news-filter-toolbar .secondary')
    this.cbOption = page.locator('.cb_options')
    this.awpIcon = page.locator('.awp')
    this.timeMachine = page.locator('.time-machine-container')
    this.similarActionButton = page.locator('.similar-articles-button')
    this.moreStories = page.locator('.more-stories')
    this.newsContainer = page.locator('.news-description-container')
    this.SearchTrendingNews = page.locator("[placeholder='Search Trending News']")
    this.autoCompleteWrapper = page.locator('.auto-complete-menu-wrapper')
    this.trendingNewsTitle = page.locator('.text_wrapper')
    this.timeMachineBarDate = page.locator('.tm-bar-value')
    this.toolTipTimeAgo = page.locator('.page-content .tooltip-time-ago')
    this.filterFontSizeSmall = page.locator('.page-content .font_size_small').first()
  }

  async bahaNews() {
    await this.isActive('Breaking The News')
    for (let i = 0; i < 5; ++i) {
      const text1 = await this.latestNews.nth(i).textContent()
      const text2 = await this.leftPanelNews.nth(i).textContent()
      console.log(text1)
      console.log(text2)
      expect(text1).toEqual(text2)
    }
    const isEuroNewsVisible = await this.euroNews.isVisible()
    if (isEuroNewsVisible) {
      await expect(this.euroNews).toBeVisible()
    }
    const isDWNewsVisible = await this.dwNews.isVisible()
    if (isDWNewsVisible) {
      await expect(this.dwNews).toBeVisible()
    }
    await expect(this.newsSectionPopular).toBeVisible()
    const countPopularNews = await this.popularNews.count()
    expect(countPopularNews).toEqual(4)
    await expect(this.newsSectionTrending).toBeVisible()
    await expect(this.searchTrendingNews).toBeVisible()
    await expect(this.newsSectionFocus).toBeVisible()
    const countInFocus = await this.isFocusTitle.count()
    expect(countInFocus).toEqual(3)
    await expect(this.loadMoreNews).toBeVisible()
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await this.page.waitForTimeout(3000)
    const expectedTexts = ['Markets', 'Economy', 'Business', 'Politics', 'Technology']
    await this.checkItems(this.newsSectionTitle, expectedTexts)
  }

  async moreNews() {
    const count1 = await this.newsTitle.count()
    await this.loadMoreNews.click({ force: true })
    await this.page.waitForTimeout(3000)
    const count2 = await this.newsTitle.count()
    expect(count1).not.toEqual(count2)
  }

  async returnToTop() {
    await this.returnToTopButton.click()
  }

  async searchNewsBar() {
    await this.searchNews.first().fill('Bitcoin')
    await this.page.keyboard.press('Enter')
    await expect(this.searchResultTitle).toHaveText('Search results for "Bitcoin"')
  }

  async economySection() {
    await this.EconomySectionButton.click()
    await expect(this.EconomynewsSectionTitle).toBeVisible()
  }

  async clickOnNews() {
    await this.page.waitForSelector('.latest-news-list .news-title', { state: 'visible' })
    const textOfNews = await this.newsTitle.first().textContent()
    await this.newsTitle.first().click()
    const textOfNews2 = await this.Title.first().textContent()
    expect(textOfNews).toEqual(textOfNews2)
    await this.page.waitForSelector("[loading='lazy']", { state: 'visible' })
    const count = await this.loadingLazy.count()
    expect(count).toEqual(4)
  }

  async otherNews() {
    await this.page.waitForSelector('.page-content .news-list-wrapper', { state: 'visible' })
    const count = await this.otherNewsColumn.count()
    expect(count).toEqual(2)
  }
  async potusNews() {
    await expect(this.PotusNews.first()).toBeVisible()
    await expect(this.potusChart).toBeVisible()
    await expect(this.djEuroStock).toBeVisible()
    await this.djEuroStock.hover()
    await this.closeChartButton.first().click()
    await expect(this.djEuroStock).not.toBeVisible()
    await this.sidePanelTab('Markets')
    await this.page.dragAndDrop('.aside_widget_content .table_symbol_link:has-text("Stoxx 50")', '.chart_components_wrapper')
    await expect(this.Stoxx50).toBeVisible()
  }

  async filterNews() {
    await expect(this.filterNewsField.first()).toBeVisible()
    await expect(this.filterResults).toBeVisible()
    await this.page.waitForTimeout(5000)
    const countNews1 = await this.newsFilterElements.count()
    await this.newsSearchTab.fill('Apple')
    await this.filterNewsField.nth(4).click()
    await this.chooseEllipsis('Date (from/to)')
    await this.applyFilter.click()
    await this.page.waitForTimeout(3000)
    const countNews2 = await this.newsFilterElements.count()
    console.log(countNews1)
    console.log(countNews2)
    expect(countNews1).not.toEqual(countNews2)
  }

  async saveFilter() {
    await this.saveFilterButton.click()
    await this.saveFilterInput.fill('Apple')
    await this.saveFilterNameButton.click()
    await this.filterNewsField.last().click()
    await this.chooseEllipsis('Apple')
    await expect(this.pinFilterToTop).toBeVisible()
    await this.pinFilterToTop.click()
    await this.filterNewsField.last().click()
    await this.chooseEllipsis('Apple')
    await this.pinToTopSaveButton.click()
    await expect(this.tabItem.last()).toHaveText('Apple')
    await this.deleteButton.click()
    await this.resetButton.click()
    await expect(this.newsSearchTab).toHaveText('')
  }

  async changeLanguageAndPackage() {
    await this.filterNewsField.nth(7).click()
    await this.chooseEllipsis('German')
    await this.filterNewsField.nth(6).click()
    await this.chooseEllipsis('Select all')
    await this.page.locator(".absolute-wrapper [placeholder='Search']").fill('AWP Premium Switzerland')
    await this.chooseEllipsis('AWP Premium Switzerland')
    await this.filterNewsField.nth(6).click()
    await this.applyFilter.click({ force: true })
    await expect(this.cbOption.last()).toHaveText('German')
    await expect(this.awpIcon.first()).toBeVisible()
  }

  async trending() {
    await expect(this.timeMachine).toBeVisible()
    await expect(this.similarActionButton.first()).toBeVisible()
    await this.page.waitForSelector('.tm-bar-value', { state: 'visible' })
    const today = new Date()
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
    const dateSelector = `[data-title="${formattedDate}"]`
    const isDateElementVisible = await this.page.isVisible(dateSelector)
    expect(isDateElementVisible).toBeTruthy()
  }

  async similarArticles() {
    let countArcticles
    const textContent = await this.similarActionButton.first().textContent()
    const matches = textContent.match(/\d+/)
    if (matches && matches.length > 0) {
      countArcticles = parseInt(matches[0], 10)
      console.log(countArcticles)
    }
    await this.similarActionButton.first().click()
    await this.page.waitForSelector('.more-stories', { state: 'visible' })
    const countSimilarArticles = await this.moreStories.count()
    for (let i = 0; i < countSimilarArticles; ++i) {
      await this.moreStories.nth(i).click()
    }
    const countStories = await this.newsContainer.count()
    expect(countArcticles).toEqual(countStories)
  }

  async searchTrendingNewsBar() {
    await this.SearchTrendingNews.fill('Apple')
    await expect(this.autoCompleteWrapper).toBeVisible()
    await this.page.keyboard.press('Enter')
    await expect(this.trendingNewsTitle.first()).toContainText('Apple')
  }

  async timeMachineBar() {
    await this.timeMachineBarDate.nth(46).click()
    await this.page.waitForSelector('.page-content .tooltip-time-ago', { state: 'visible' })
    const textDate1 = await this.timeMachineBarDate.nth(46).getAttribute('data-title')
    const textDate2 = await this.toolTipTimeAgo.first().textContent()
    const date1 = new Date(textDate1)
    const date2 = new Date(textDate2)
    const year1 = date1.getFullYear()
    const month1 = date1.getMonth()
    const year2 = date2.getFullYear()
    const month2 = date2.getMonth()

    expect(year1).toEqual(year2)
    expect(month1).toEqual(month2)
  }
}

module.exports = { Baha_news }
