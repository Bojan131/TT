const { test, expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')

class AccountSettings extends Base {
  constructor(page) {
    super(page) 
    this.page = page
    this.drawer = page.locator('.open_drawer')
    this.firstLayout = page.locator("[d='M0 0h7v30H0zM9 0h13v30H9zM24 0h26v30H24z']")
    this.secondLayout = page.locator("[d='M0 0h7v30H0zM9 0h41v30H9z']")
    this.sidePanel = page.locator('.aside-container')
    this.slider = page.locator('.drawer-space .slider')
    this.sliderNews = page.locator('.accordion-content .slider')
    this.navigationContainer = page.locator('.navigation-container')
    this.ellipsis = page.locator('.ellipsis-option')
    this.displayString = page.locator('.accordion-content .display-string')
    this.chartImage = page.locator('.ws-image-chart')
    this.chartTypeElement = page.locator('.tt_chartType')
    this.compare = page.locator("[title='Compare']")
    this.symbolText = page.locator('.tt_symbolText')
    this.dax = page.locator("[data-value='tts-514562']")
    this.checkMark = page.locator('.checkmark')
    this.symbol = page.locator('.table_symbol_link')
    this.economicdata = page.locator('.economic_data_left .colored-link')
    this.footerText = page.locator('.footer-content span')
    this.searchInput = page.locator(".search_input [placeholder='Search']")
    this.dateField = page.locator('.date_field')
    this.tabContent = page.locator('.tab-content-txt')
    this.verify = 0
    this.keyboardSlider = page.locator('.accordion-content .slider')
    this.newsValue10 = page.locator(".accordion-content-blocks [value='10']")
    this.newsValue1 = page.locator(".accordion-content-blocks [value='1']")
    this.headLine = page.locator('.headline')
    this.search = page.locator("[placeholder='Search']")
    this.symbolName = page.locator('.symbol_name')
    this.newsSectionHeadline = page.locator('.news_section .headline')
    this.timeAgo = page.locator('.aside-container  .tooltip-time-ago')
  }

  async changeLayout() {
    await this.drawer.first().click()
    await this.secondLayout.click()
    await this.page.waitForTimeout(2000)
    await expect(this.sidePanel).toHaveClass(/.*aside-collapsed-view.*/)
    await this.firstLayout.click()
  }

  async lightDark() {
    const fs = require('fs')
    const PNG = require('pngjs').PNG
    const pixelmatch = require('pixelmatch')
    await this.optionPicker('Ticker', 'General')
    await this.deactivateActivateTicker('Ticker1', 'off')
    await this.deactivateActivateTicker('Ticker2', 'off')
    await this.deactivateActivateTicker('Ticker3', 'off')
    await this.slider.nth(1).click()
    await this.page.waitForTimeout(3000)
    const screenshot1 = await this.page.screenshot()
    await this.slider.nth(0).click()
    await this.page.waitForTimeout(3000)
    const screenshot2 = await this.page.screenshot()
    const img1 = PNG.sync.read(screenshot1) // Converts picture into PNG
    const img2 = PNG.sync.read(screenshot2)
    const diff = new PNG({ width: img1.width, height: img1.height })
    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 })
    // Returns difference in pixels
    if (numDiffPixels > 0) {
      console.log('Light mode has been activated!')
      fs.writeFileSync('diff.png', PNG.sync.write(diff))
    } else {
      throw new Error('Screenshots match, but a difference was expected. Light mode activation failed.')
    }
    await this.slider.nth(0).click()
    await this.page.waitForTimeout(1000)
    await this.slider.nth(1).click()
  }

  async minimizeBahaFastlook() {
    await this.drawer.first().click()
    await this.slider.nth(2).click()
    await expect(this.navigationContainer).toHaveClass(/.*navigation-collapsed-view.*/)
    await this.slider.nth(2).click()
  }

  async disablePush() {
    const PNG = require('pngjs').PNG
    const pixelmatch = require('pixelmatch')
    await this.optionPicker('Ticker', 'General')
    await this.deactivateActivateTicker('Ticker1', 'off')
    await this.deactivateActivateTicker('Ticker2', 'off')
    await this.deactivateActivateTicker('Ticker3', 'off')
    await this.slider.nth(1).click()
    await this.page.waitForTimeout(4000)
    const screenshot1 = await this.page.screenshot()
    await this.page.waitForTimeout(4000)
    const screenshot2 = await this.page.screenshot()
    const img1 = PNG.sync.read(screenshot1)
    const img2 = PNG.sync.read(screenshot2)
    const { width, height } = img1
    const diff = new PNG({ width, height })
    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 1 })

    if (numDiffPixels > 0) {
      throw new Error('Push has not been turned off!')
    } else {
      console.log('Push has been turned off!')
    }
    await this.slider.nth(1).click()
  }

  async ChartTypeCandle() {
    await this.optionPicker('Chart', 'General')
    await this.displayString.first().click()
    await this.chooseEllipsis('Candlestick')
    await this.displayString.last().click()
    await this.chooseEllipsis('5 Years')
    await this.NavigateTo('Equities')
    await this.page.waitForTimeout(3000)
    await this.toolTip('Charts')
    await this.page.waitForTimeout(2000)
    await this.chartImage.first().click()
    await this.page.waitForTimeout(7000)
    await this.toolTip('Reset Chart settings')
    await this.page.waitForTimeout(7000)
    const dataValue = await this.chartTypeElement.getAttribute('data-value')
    expect(dataValue).toBe('candle')
    await this.isActive('5 Years')
  }

  async disableHTML5Chart() {
    await this.optionPicker('Chart', 'General')
    await this.page.locator('.accordion-content .slider').click()
    await this.page.waitForTimeout(1000)
    await this.NavigateTo('Equities')
    await this.toolTip('Charts')
    await this.page.waitForTimeout(2000)
    await this.chartImage.first().click()
    await this.page.waitForTimeout(4000)
    await this.compare.click()
    await this.dax.click()
    await this.page.waitForTimeout(1000)
    await this.page.reload()
    await this.page.waitForTimeout(15000)
    const count = await this.symbolText.count()
    expect(count).toBe(1)
    await this.optionPicker('Chart', 'General')
    await this.page.locator('.accordion-content .slider').click()
  }

  async doubleClick1(browser) {
    const { context, page } = await this.newWindowLogin(browser)
    await this.optionPickerNewBrowser(page, 'Chart', 'General')
    await page.locator('.checkmark').first().click()
    await page.waitForTimeout(1000)
    const [newPage] = await Promise.all([context.waitForEvent('page'), page.locator('.table_symbol_link').first().dblclick()])
    await newPage.waitForTimeout(6000)
    await this.checkChartNewBrowser(newPage)
  }

  async doubleClick2() {
    await this.optionPicker('Chart', 'General')
    await this.page.locator('.checkmark').last().click()
    await this.page.waitForTimeout(1000)
    await this.page.locator('.table_symbol_link').first().dblclick()
    await this.page.waitForTimeout(4000)
    await this.checkChart()
  }

  async mostVisited() {
    await this.optionPicker('Data', 'General')
    await this.displayString.nth(2).click()
    await this.chooseEllipsis('15')
    for (let i = 0; i <= 15; ++i) {
      await this.page.locator('.side-content .table_symbol_link').nth(i).click()
    }
    await this.page.locator('.tab:has-text("Favorites")').click()
    await this.page.waitForTimeout(5000)
    const count = await this.page.locator("[data-rbd-draggable-id='recentSecurities'] .table_symbol_link").count()
    expect(count).toEqual(15)
  }

  async economicData() {
    await this.optionPicker('Data', 'General')
    await this.page.locator("[name='economicEventsNumber']").last().click()
    await this.sidePanelTab('Markets')
    const count = await this.economicdata.count()
    expect(count).toEqual(6)
  }

  async events() {
    await this.optionPicker('Data', 'General')
    await this.displayString.first().click()
    await this.chooseEllipsis('Only US / Japan - High impact')
    await this.sidePanelTab('Markets')
    const dateStrings = await this.page.$$eval('.date_field', elements => elements.map(element => element.textContent.trim()))

    const dates = dateStrings.map(dateString => {
      const [monthDay] = dateString.split(' ')
      const [month, day] = monthDay.split('/')
      const year = new Date().getFullYear()
      return new Date(year, month - 1, day)
    })
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i].getTime()).toBeGreaterThanOrEqual(dates[i - 1].getTime(), `Date at index ${i} is not in ascending order`)
    }
  }

  async openFavourites(browser) {
    const { context, page } = await this.newWindowLogin(browser)
    await this.NavigateToNewBrowser(page, 'Equities')
    await page.locator('.header-control').nth(4).click()
    await this.chooseHeaderTabNewBrowser(page, 'Indices', 'Indices')
    await page.locator('.header-control').nth(4).click()
    await this.chooseHeaderTabNewBrowser(page, 'Index Reports', 'Index Reports')
    await page.locator('.header-control').nth(4).click()
    await this.optionPickerNewBrowser(page, 'Data', 'General')
    await page.locator('.accordion-content .display-string').nth(1).click()
    await this.chooseEllipsisNewBrowser(page, '3')
    await page.waitForTimeout(1000)
    await page.locator('.header-control').nth(1).click()
    await page.waitForTimeout(10000)
    const pages = context.pages()
    expect(pages.length).toBe(4)
    await expect(page).toHaveTitle(/baha wealth/)
    await expect(page.locator('.footer-content span')).toHaveText('© 2024 baha GmbH. All rights reserved.')
  }

  async russianLanguage() {
    await this.optionPicker('Time and language', 'General')
    await this.displayString.first().click()
    await this.chooseEllipsis('Pусский')
    await this.page.waitForTimeout(1000)
    await expect(this.footerText).toHaveText('© 2024 baha GmbH. Все права защищены.')
    await this.displayString.first().click()
    await this.chooseEllipsis('English')
  }

  async takeTime(array) {
    const count = await this.dateField.count()

    for (let i = 0; i < count; ++i) {
      const text = await this.dateField.nth(i).textContent()
      const parts = text.trim().split(/\s+/)
      if (parts.length > 1) {
        const time = parts[1]
        array.push(time)
      }
    }
  }

  async timeZone() {
    // This test checks if economic data hours are 5 hours apart in eruope and america region
    let array1 = []
    await this.page.waitForSelector('.table-widget', { state: 'visible' })
    await this.optionPicker('Time and language', 'General')
    await this.displayString.nth(2).click()
    await this.chooseEllipsis('America')
    await this.page.waitForSelector('.table-widget', { state: 'visible' })
    await this.optionPicker('Time and language', 'General')
    await this.displayString.nth(3).click()
    await this.searchInput.fill('Aruba')
    await this.page.waitForSelector('.ellipsis-option', { state: 'visible' })
    await this.chooseEllipsis('Aruba')
    await this.page.waitForSelector('.table-widget', { state: 'visible' })

    let array2 = []
    await this.takeTime(array2)

    function timeToDate(time) {
      return new Date(`1970-01-01T${time}:00`)
    }

    const areTimesFiveHoursApart = array1.every((time, index) => {
      const time1 = timeToDate(time)
      const time2 = timeToDate(array2[index])
      return time1 - time2 === 5 * 60 * 60 * 1000
    })
    console.log('Are times in array1 exactly 5 hours ahead of array2?', areTimesFiveHoursApart)
    console.log(array1)
    console.log(array2)
    expect(areTimesFiveHoursApart).toBeTruthy()
  }

  async settingsWatchlists(option) {
    await this.optionPicker('Settings watchlists', 'General')
    await this.displayString.click()
    await this.chooseEllipsis(option)
    await this.NavigateTo('Watchlists')
    await this.page.waitForTimeout(3000)
    await this.page.locator("[href='/watchlist/all-watchlists']").click()
    const count = await this.tabContent.count()
    for (let i = 0; i < count; ++i) {
      const text = await this.tabContent.nth(i).textContent()

      if (text === option) {
        this.verify = 1
        break
      }
    }
    expect(this.verify).toEqual(0)
  }

  async keyboardFunctions() {
    await this.NavigateTo('Equities')
    await this.optionPicker('Keyboard function keys', 'General')
    await this.keyboardSlider.click()
    await this.page.waitForTimeout(1000)
    await this.page.keyboard.press('F12')
    await this.isActive('Equities')
  }

  async newsMarketTab() {
    await this.optionPicker('News display in Markets tab (Overview pane)', 'News')
    await this.newsValue10.click()
    await this.sidePanelTab('Markets')
    await this.page.waitForTimeout(5000)
    const count = await this.headLine.count()
    expect(count).toEqual(10)
  }

  async newsDetailsPage() {
    await this.optionPicker('News settings', 'News')
    await this.newsValue10.click()
    await this.search.fill('Apple')
    await this.symbolName.first().click()
    await this.page.waitForTimeout(5000)
    const count = await this.newsSectionHeadline.count()
    expect(count).toEqual(10)
  }

  async newsAge() {
    await this.optionPicker('News settings', 'News')
    await this.newsValue1.first().click()
    await this.search.fill('Apple')
    await this.symbolName.first().click()
    await this.page.waitForTimeout(5000)

    let withinLastMonthCount = 0

    const count = await this.page.locator('.news_section .tooltip-time-ago').count()
    for (let i = 0; i < count; ++i) {
      const dateText = await this.page.locator('.news_section .tooltip-time-ago').nth(i).textContent()

      const newsDate = new Date(dateText.trim())
      if (!isNaN(newsDate.getTime())) {
        const currentDate = new Date()
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(currentDate.getMonth() - 1)
        if (newsDate.getTime() > oneMonthAgo.getTime()) {
          console.log('Date is within the last month:', dateText)
          withinLastMonthCount++
        } else {
          console.log('Date is older than one month:', dateText)
        }
      } else {
        console.log('Date is within the last month:', dateText)
        withinLastMonthCount++
      }
    }
    expect(withinLastMonthCount).toEqual(10)
  }

  async FontSize() {
    await this.optionPicker('News settings', 'News')
    await this.newsValue1.last().click()
    const count = this.headLine.count()
    for (let i = 0; i < count; ++i) {
      await expect(this.headLine.nth(i)).toHaveClass(/.*font_size_medium.*/)
    }
  }

  async displayNews() {
    await this.optionPicker('Display news time in first 24 hours as:', 'News')
    await this.page.locator(".accordion-content [type='button']").last().click()
    await this.page.waitForTimeout(2000)
    const count = await this.timeAgo.count()
    let verify = 0
    for (let i = 0; i < count; ++i) {
      const text = await this.timeAgo.nth(i).textContent()
      const parts = text.split(' ')
      const time = parts[1]
      if (time === 'AM' || time === 'PM') {
        verify = 1
      }
      expect(verify).toEqual(1)
    }
  }

  async newsVideoTicker() {
    await this.optionPicker('News streams', 'News')
    await this.sliderNews.first().click()
    await this.sliderNews.last().click()
    await this.NavigateTo('baha News')
    await this.page.waitForTimeout(3000)
    await expect(this.page.locator('.news-ticker-wrapper')).toBeHidden()
    await expect(this.page.locator('.live-tv-iframe')).toBeHidden()
  }
}

module.exports = { AccountSettings }
