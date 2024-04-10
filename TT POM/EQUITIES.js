const { expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')
const exp = require('constants')
const { globalAgent } = require('https')

class EQUITIES {
  constructor(page) {
    this.page = page
    this.base = new Base(page)
    this.asideWidgetSymbolDax = page.locator(".aside_widget_content .table_symbol_link:has-text('DAX')")
    this.groupName = page.locator('.ag-group-value')
    this.columnPerformance = page.locator('.column_performance')
    this.agIconDesc = page.locator('.markets_table_wrapper .ag-icon-desc')
    this.arrow = page.locator('.ws_more_link')
    this.headerText = page.locator('.tabs_content .ag-header-cell-text')
    this.columnPicker = page.locator('.ag-side-button-label')
    this.columnPickerLabel = page.locator('.ag-column-select-column-label')
    this.chartImage = page.locator('.ws-image-chart')
    this.chartQuoteboardOption = page.locator('.ws-am-rotate-90')
    this.mountainChart = page.locator("[data-test-name='Mountain']")
    this.chartPeriodOneYear = page.locator("[data-test-name='1 Year']")
    this.chartIndicatorMoneyFlow = page.locator("[data-test-name='Money Flow Index (20)']")
    this.quoteboard = page.locator('.qb-block')
    this.sortByIntraday = page.locator("[data-test-name='Intraday']")
    this.indexReportsChart = page.locator('.tt_firstPanel')
    this.indexReportsElementHeader = page.locator('.page-content .element-header h2')
    this.addIndicator = page.locator('.tt_addIndicator')
    this.indicatorSearchBar = page.locator('.tt_toolbar_search')
    this.atrIndicator = page.locator("[data-value='atr']")
    this.symbolTextATR = page.locator(".tt_symbolText:has-text('ATR (20)')")
    this.agIconTree = page.locator('.ag-icon-tree-closed')
    this.columnPickerElements = page.locator('.ag-column-select-column-label')
    this.indexReportsHeaderText = page.locator('.page-content  .ag-header-cell-text')
    this.VWap = page.locator(".ag-column-select-column-label:has-text('VWAP')")
    this.SettingsIcon = page.locator('.ws_icon_settings')
    this.tabItem = page.locator('.tab-item')
    this.applyButton = page.locator('.apply')
    this.userSettings = page.locator('.open_drawer')
    this.logOutButton = page.locator('.ws_icon_logout')
    this.loginButton = page.locator('#loginUser')
    this.name = page.locator("[name='userName']")
    this.password = page.locator("[name='password']")
    this.countryReportsHeaderName = page.locator('.page-content .justify-space-between')
    this.chartSymbolName = page.locator('.tt_symbolText')
    this.corporateCalnedar = page.locator(".title:has-text('Corporate Calendar Overview')")
    this.activeHotStock = page.locator('.hot_stocks_active')
    this.hotStocksGainersLosers = page.locator('.ag-group-value')
    this.hotStocksGainersLosersCount = page.locator('.ag-group-child-count')
    this.hotStockButtonOneYear = page.locator(".hot_stocks_button [role='presentation']:has-text('1 Year')")
    this.hotStockButtonHighest = page.locator(".hot_stocks_button [role='presentation']:has-text('highest high')")
    this.headerCell = page.locator('.page-content .ag-header-cell-text')
    this.quoteBoardHeaderText = page.locator('.ws-link-tooltip')
    this.tabItemLast = page.locator('.tab-item').last()
  }

  async openEquities() {
    await this.base.sidePanelTab('Markets')
    await this.asideWidgetSymbolDax.first().click()
    await this.base.checkSecurity('DAX', 'Equities')
  }

  async mergeGroups() {
    await expect(this.groupName).toBeHidden()
  }

  async quickPerformance() {
    await this.page.waitForSelector('.tabs_content .ag-header-cell-text', { state: 'visible' })
    const count = await this.page.locator('.tabs_content .ag-header-cell-text').count()
    expect(count).toEqual(2)
    await expect(this.columnPerformance).toHaveText('1 day')
    await expect(this.agIconDesc.last()).toBeVisible()
  }

  async quickPerformanceNextPage() {
    const expectedTexts = ['1 week', '1 month', '3 months', '6 months', 'YTD', '1 year', '3 years', '5 years', '10 years', '15 years', 'Since start']

    for (const text of expectedTexts) {
      await this.arrow.last().click()
      await expect(this.columnPerformance).toHaveText(text)
    }
    await expect(this.page.locator('.arrow-aligment').last()).toHaveClass(/.*disabled.*/)
  }

  async Overview() {
    await this.page.waitForSelector('.tabs_content .ag-header-cell-text', { state: 'visible' })
    const expectedTexts = ['Name', 'Last', 'Date/Time', 'Chg. (%)', 'Volume']
    await this.base.checkItems(this.headerText, expectedTexts)
  }

  async OverviewColumnPicker() {
    await this.columnPicker.click()
    await this.page.waitForSelector('.ag-column-select-column-label', { state: 'visible' })
    const expectedTexts = ['Active Columns', 'Basic values', 'Performance', 'Financials']
    await this.base.checkItems(this.columnPickerLabel, expectedTexts)
  }

  async Chart() {
    await this.page.waitForSelector('.ws-image-chart', { state: 'visible' })
    await expect(this.chartImage.last()).toBeVisible()
    await expect(this.chartQuoteboardOption.last()).toBeVisible()
  }

  async changeChart() {
    const screenshotBefore = await this.chartImage.first().screenshot()
    await this.base.toolTip('Chart type')
    await this.mountainChart.last().click()
    await this.page.waitForSelector('.ws-image-chart', { state: 'visible' })
    await this.base.toolTip('Period')
    await this.chartPeriodOneYear.last().click()
    await this.page.waitForSelector('.ws-image-chart', { state: 'visible' })
    await this.base.toolTip('Indicator')
    await this.chartIndicatorMoneyFlow.last().click()
    await this.page.waitForSelector('.ws-image-chart', { state: 'visible' })
    const screenshotAfter = await this.chartImage.first().screenshot()
    expect(screenshotBefore.length).not.toEqual(screenshotAfter.length)
  }

  async QuoteBoard() {
    await this.page.waitForSelector('.market_overview_wrapper', { state: 'visible' })
    await this.base.toolTip('Quoteboard')
    await this.page.waitForSelector('.qb-block', { state: 'visible' })
    await expect(this.quoteboard.last()).toBeVisible()
    await expect(this.chartQuoteboardOption.last()).toBeVisible()
  }

  async changeQuotboard() {
    await this.base.toolTip('Sort by')
    await this.sortByIntraday.last().click()
    await this.page.waitForTimeout(5000)
    const attributeName = await this.page.locator('.nav-toolbar-active').nth(5).getAttribute('data-test-name')
    expect(attributeName).toBe('Intraday')
  }

  async indices() {
    await this.page.waitForSelector(".page_content:has-text('Indices')", { state: 'visible' })
    await this.base.chooseHeaderTab('Indices', 'Indices')
    await this.page.waitForSelector('.tab-item', { state: 'visible' })
    await this.base.isActive('World')
    await this.page.waitForSelector(".ag-group-value:has-text('Europe')", { state: 'visible' })
    const expectedTexts = ['Europe', 'America', 'Asia/Pacific', 'Africa/Middle east']
    await this.base.checkItems(this.groupName, expectedTexts)
  }

  async indicesColumnPicker() {
    await this.columnPicker.click()
    await this.page.waitForSelector('.ag-column-select-column-label', { state: 'visible' })
    const expectedTexts = ['Active Columns', 'Basic values', 'Performance', 'Financials']
    await this.base.checkItems(this.columnPickerLabel, expectedTexts)
  }

  async Europe() {
    await this.base.chooseSymbolTab('Europe')
    await this.page.waitForSelector(".page_content:has-text('Austria')", { state: 'visible' })
    await this.page.waitForTimeout(3000)

    const expectedTexts = ['Austria', 'Belgium', 'Czech Republic', 'Denmark']
    await this.base.checkItems(this.groupName, expectedTexts)
  }

  async USA() {
    await this.base.chooseSymbolTab('USA')
    await this.page.waitForSelector(".page_content:has-text('Dow Jones')", { state: 'visible' })
    const expectedTexts = ['Dow Jones', 'S&P', 'NYSE', 'NASDAQ']
    await this.base.checkItems(this.groupName, expectedTexts)
  }

  async indexReports() {
    await this.page.waitForSelector(".tab-item:has-text('SMI PR')", { state: 'visible' })
    await this.base.isActive('SMI PR')
    await this.page.waitForTimeout(5000)
    const count = await this.indexReportsChart.count()
    expect(count).toEqual(2)
    await this.page.waitForSelector(".element-header:has-text('Gainers')", { state: 'visible' })
    const expectedTexts = ['Gainers', 'Losers']
    await this.base.checkItems(this.indexReportsElementHeader, expectedTexts)
  }

  async indexReportsColumnPicker() {
    await this.columnPicker.click()
    await this.page.waitForSelector('.ag-column-select-column-label', { state: 'visible' })
    const expectedTexts = ['Active Columns', 'Basic values', 'Performance', 'Financials']
    await this.base.checkItems(this.columnPickerLabel, expectedTexts)
  }

  async ATR() {
    await this.addIndicator.click()
    await this.indicatorSearchBar.fill('average true range')
    await this.atrIndicator.click()
    await expect(this.symbolTextATR.first()).toBeVisible()
  }

  async indexReportsAddColumns() {
    await this.page.waitForSelector('.ag-side-button-label', { state: 'visible' })
    await this.columnPicker.click()
    await this.agIconTree.nth(2).click()
    await this.page.mouse.wheel(0, 500)
    await this.page.waitForSelector(".ag-column-select-column-label:has-text('VWAP')", { state: 'visible' })
    const count = await this.VWap.count()
    for (let i = 0; i < count; i++) {
      await this.VWap.nth(i).click()
    }
    await this.page.waitForSelector(".page-content  .ag-header-cell-text:has-text('VWAP Chg. (%)')", { state: 'visible' })
    const expectedTexts = ['VWAP', 'VWAP date/time', 'VWAP Chg.', 'VWAP Chg. (%)']
    await this.base.checkItems(this.indexReportsHeaderText, expectedTexts)
  }

  async settingsIcon() {
    const count1 = await this.tabItem.count()
    await this.SettingsIcon.first().click()
    await this.base.chooseEllipsis('SPI TR')
    await this.applyButton.click()
    await this.page.waitForTimeout(3000)
    const count2 = await this.tabItem.count()
    expect(count1).not.toBe(count2)
  }

  async savedSettings() {
    const count1 = await this.tabItem.count()
    await this.userSettings.first().click()
    await this.logOutButton.click()
    await this.name.fill('bojan.colic23')
    await this.password.fill('Bb14011999')
    await this.loginButton.click()
    await this.tabItemLast.waitFor({ state: 'visible' })
    const count2 = await this.tabItem.count()
    expect(count1).toBe(count2)
    await this.page.waitForSelector(".tt_symbolText:has-text('ATR (20)')", { state: 'visible' })
    await expect(this.symbolTextATR.first()).toBeVisible()
  }

  async CountryReports() {
    await this.page.waitForSelector('.tab-item', { state: 'visible' })
    await this.base.isActive('USA')
    await this.page.waitForSelector(".element-header:has-text('Gainers')", { state: 'visible' })
    const expectedTexts = ['Index overview', 'Economic Data', 'Unusual Volumes', 'Newsaaa']
    await this.base.checkItems(this.countryReportsHeaderName, expectedTexts)
    await expect(this.corporateCalnedar).toBeVisible()
    const expectedTexts2 = ['Gainers', 'Losers']
    await this.base.checkItems(this.indexReportsElementHeader, expectedTexts2)
  }

  async countryReportsColumnPicker() {
    await this.columnPicker.click()
    await this.page.waitForSelector('.ag-column-select-column-label', { state: 'visible' })
    const expectedTexts = ['Active Columns', 'Basic values', 'Performance', 'Financials']
    await this.base.checkItems(this.columnPickerLabel, expectedTexts)
  }

  async HotStocks() {
    await expect(this.page.locator('.multiselect')).toBeVisible()
    await expect(this.activeHotStock.first()).toHaveText('1 Day')
    await expect(this.activeHotStock.last()).toHaveText('Close')
    await expect(this.hotStocksGainersLosers.first()).toHaveText('Gainers')
    await expect(this.hotStocksGainersLosersCount.first()).toHaveText('(20)')
    await expect(this.hotStocksGainersLosers.last()).toHaveText('Losers')
    await expect(this.hotStocksGainersLosersCount.last()).toHaveText('(20)')
  }

  async HotStocksColumnPicker() {
    await this.columnPicker.click()
    await this.page.waitForSelector('.ag-column-select-column-label', { state: 'visible' })
    const expectedTexts = ['Active Columns', 'Basic values', 'Performance', 'Financials']
    await this.base.checkItems(this.columnPickerLabel, expectedTexts)
  }

  async HotStockOneYearHighestHigh() {
    await this.hotStockButtonOneYear.click()
    await this.page.waitForTimeout(2000)
    await this.hotStockButtonHighest.click()
    await this.page.waitForTimeout(2000)
    await expect(this.activeHotStock.first()).toHaveText('1 Year')
    await expect(this.activeHotStock.last()).toHaveText('highest high')
  }

  async UnusualVolumes() {
    await this.page.waitForSelector(".page_content:has-text('Unusual Volumes')", { state: 'visible' })
    await expect(this.tabItem.first()).toHaveText('North America')
    await expect(this.tabItem.last()).toHaveText('Europe')
    await expect(this.page.locator('.multiselect')).toBeVisible()
    await expect(this.groupName.first()).toHaveText('Unusual Volumes - rising prices')
    await expect(this.groupName.last()).toHaveText('Unusual Volumes - falling prices')
    await expect(this.headerCell.first()).toHaveText('Vol. Chg %')
  }

  async UnusualVolumesColumnPicker() {
    await this.columnPicker.click()
    await this.page.waitForSelector('.ag-column-select-column-label', { state: 'visible' })
    const expectedTexts = ['Active Columns', 'Basic values', 'Performance']
    await this.base.checkItems(this.columnPickerLabel, expectedTexts)
  }
}

module.exports = { EQUITIES }
