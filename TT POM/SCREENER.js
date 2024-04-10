const { expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')
const exp = require('constants')
const { globalAgent } = require('https')

class SCREENER {
  constructor(page) {
    this.page = page
    this.base = new Base(page)
    this.headerTitle = page.locator('.page-title')
    this.newScreenerButton = page.locator('.add-new-list')
    this.exchanges = page.locator('.source_label')
    this.usdCurrency = page.locator("[for='currency-USD']")
    this.numberOfDecimals = page.locator("[for='decimalsTechnical-2']")
    this.screenerTable = page.locator('.has_column_picker')
    this.screenerFilterOption = page.locator('.accordion-content .display-string')
    this.addFilterButton = page.locator('.add_filter_btn')
    this.chooseFilter = page.locator('.select-input')
    this.screenerSearch = page.locator(".screener_filters_container [placeholder='Search']")
    this.marketCap = page.locator(".option-list:has-text('MarketCap, total')")
    this.fiscalYear = page.locator("[for='fiscalYear']")
    this.calculateLatestPrice = page.locator("[for='useLiveData']")
    this.toolTipText = page.locator('.text-tooltip')
    this.newScreenTab = page.locator(".accordion-content .tab-item:has-text('New screen')")
    this.buttonAdd = page.locator("[type='button']:has-text('Add')")
    this.marketcapToolTip = page.locator(".tooltip-content:has-text('MarketCap, total')")
    this.slider = page.locator('.rc-slider-handle')
    this.execute = page.locator(".screener_buttons_container [type='submit']")
    this.screenerHeader = page.locator('.screener_execute_wrapper .ag-header-cell-text')
    this.perfOneY = page.locator('.option-list >> text="Perf. 1Y"')
    this.sliderInput = page.locator('.slider__input')
    this.nextFilterRelation = page.locator("[for='relation']")
    this.ComparisonButton = page.locator('.add_comparison_btn')
    this.comparisonFilter = page.locator("[for='filter']")
    this.comparisonField = page.locator('.select-input-placeholder')
    this.averageTrueRange = page.locator('.option-list >> text="Average True Range"')
    this.macdHistogram = page.locator('.option-list >> text="MACD Histogram"')
    this.toolTipContent = page.locator('.screener_execute_wrapper .tooltip-content')
    this.comparisonOperation = page.locator('.comparison_operators')
    this.deleteScreener = page.locator('.prefix__cls-2')
    this.deletescreenerButton = page.locator('.deleteButton')
  }

  async screener() {
    await expect(this.headerTitle).toHaveText('Screener')
    await this.newScreenerButton.click()
    await this.page.waitForSelector(".tab-content-txt:has-text('New screen')", { state: 'visible' })
    await this.base.isActive('New screen')
    await expect(this.exchanges).toBeVisible()
    await this.screenerFilterOption.nth(1).click()
    await this.page.waitForSelector(".ellipsis-option:has-text('USD')", { state: 'visible' })
    await expect(this.usdCurrency).toHaveClass(/.*checked.*/)
    await this.screenerFilterOption.nth(2).click()
    await expect(this.numberOfDecimals).toHaveClass(/.*checked.*/)
    await expect(this.screenerTable).toBeVisible()
    await this.screenerFilterOption.nth(2).click()
  }

  async addFilter() {
    let verify
    await this.addFilterButton.click()
    await this.chooseFilter.click()
    await this.screenerSearch.fill('marketcap')
    await this.marketCap.first().click()
    await expect(this.fiscalYear).toBeVisible()
    await expect(this.calculateLatestPrice).toBeVisible()
    await expect(this.toolTipText).toHaveText('Using fundamental data fields restricts the data universe to companies having company profiles available.')
    await this.buttonAdd.nth(1).click()
    await expect(this.marketcapToolTip).toBeVisible()
    await expect(this.slider.first()).toBeVisible()
    await expect(this.slider.last()).toBeVisible()
    await this.execute.click()
    await this.page.waitForSelector(".screener_execute_wrapper .ag-header-cell-text:has-text('MarketCap, total (live,USD)')", { state: 'visible' })
    await expect(this.screenerHeader.last()).toHaveText('MarketCap, total (live,USD)')
    await this.page.locator(".screener_execute_wrapper .ag-header-cell-text:has-text('MarketCap, total (live,USD)')").click()
    await this.page.waitForTimeout(3000)
    await this.page.locator(".screener_execute_wrapper .ag-header-cell-text:has-text('MarketCap, total (live,USD)')").click()
    await this.page.waitForTimeout(3000)
    const count = await this.page.locator(".screener_execute_wrapper .table_symbol_link:has-text('Apple')").count()
    if (count > 1) {
      verify = 1
    }
    expect(verify).toEqual(1)
  }

  async addnewFilter() {
    await this.addFilterButton.click()
    await this.chooseFilter.click()
    await this.screenerSearch.fill('perf')
    await this.perfOneY.click()
    await this.buttonAdd.nth(1).click()
    await this.sliderInput.nth(2).fill('6')
    await this.sliderInput.last().fill('250')
    await this.execute.click()
    await this.page.waitForSelector(".screener_execute_wrapper .ag-header-cell-text:has-text('Perf. 1Y')", { state: 'visible' })
    await expect(this.screenerHeader.last()).toHaveText('Perf. 1Y')
    await expect(this.nextFilterRelation).toBeVisible()
    await this.base.isActive('AND')
  }

  async comparisonButton() {
    await this.ComparisonButton.click()
    await expect(this.comparisonFilter.first()).toHaveText('Choose filter: 1')
    await expect(this.comparisonFilter.last()).toHaveText('Choose filter: 2')
    await this.comparisonField.first().click()
    await this.screenerSearch.first().fill('average')
    await this.averageTrueRange.first().click()
    await this.comparisonField.last().click()
    await this.screenerSearch.last().fill('macd')
    await this.macdHistogram.first().click()
    await this.buttonAdd.nth(1).click()
    await expect(this.toolTipContent.last()).toHaveText('Average True Range(Daily,14)')
    await expect(this.comparisonOperation).toBeVisible()
    await this.deleteScreener.last().click()
    await this.deletescreenerButton.click()
  }
}

module.exports = { SCREENER }
