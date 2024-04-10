const { expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')
const exp = require('constants')
const { globalAgent } = require('https')

class MONEY_MARKETS {
  constructor(page) {
    this.page = page
    this.base = new Base(page)
    this.headerTitle = page.locator('.fixed_income_overview_wrapper .justify-space-between')
    this.soniaSymbol = page.locator("[data-type='gbp']")
    this.sonia1M = page.locator(".fixed_income_overview_wrapper .table_symbol_link >> text='SONIA TSRR 1M'")
    this.headerName = page.locator('.header-name')
    this.sideTabSonia1M = page.locator(".aside_widget_content .table_symbol_link >> text='SONIA TSRR 1M'")
    this.interBankValueSymbol = page.locator('.value')
    this.highChart = page.locator('.highcharts-background')
    this.inflationTableName = page.locator('.table_name')
    this.highChartCountries = page.locator("[text-anchor='start']")
    this.checkboxUS = page.locator(".inflation_rates_widget [type='checkbox']").nth(13)
    this.checkboxJapan = page.locator(".inflation_rates_widget [type='checkbox']").nth(15)
    this.chooseCountry = page.locator('.country_options .display-string')
    this.countryInflationRates = page.locator('.country_inflation_rates_table')
    this.sliders = page.locator("[role='slider']")
    this.bottomSection = page.locator('.bottom')
    this.inputNumberField = page.locator('.input-number')
  }

  async moneyMarketsOverview() {
    const expectedTexts = ['Interest market overview', 'Key interest rates', 'Interbank interest rates', 'SOFR USD']
    await this.base.checkItems(this.headerTitle, expectedTexts)
  }

  async sonia() {
    await this.soniaSymbol.click()
    await this.page.waitForSelector(".fixed_income_overview_wrapper .table_symbol_link >> text='SONIA TSRR 1M'", { state: 'visible' })
    await this.sonia1M.click()
    await expect(this.headerName).toHaveText('SONIA TSRR 1M')
    await this.base.sidePanelTab('Markets')
    await this.sideTabSonia1M.click()
    await expect(this.headerName).toHaveText('SONIA TSRR 1M')
  }

  async interBankValue() {
    await this.page.locator('.page-main-header a').first().click()
    await this.interBankValueSymbol.first().click()
    await expect(this.headerName).toHaveText('ESTR')
  }

  async inflation() {
    await this.page.waitForSelector('.highcharts-background', { state: 'visible' })
    await expect(this.highChart).toBeVisible()
    const expectedTexts1 = ['Inflation YOY', 'Inflation Historical']
    await this.base.checkItems(this.inflationTableName, expectedTexts1)
    const expectedTexts2 = ['Austria', 'European Union', 'Germany', 'Russian Federation', 'Switzerland', 'United Kingdom', 'United States of America']
    await this.base.checkItems(this.highChartCountries, expectedTexts2)
  }

  async checkboxes() {
    await this.checkboxUS.click()
    await this.checkboxJapan.click()
    await this.page.waitForSelector("[text-anchor='start'] >> text='Japan'", { state: 'visible' })
    const expectedTexts2 = ['Austria', 'European Union', 'Germany', 'Russian Federation', 'Switzerland', 'United Kingdom', 'Japan']
    await this.base.checkItems(this.highChartCountries, expectedTexts2)
  }

  async inflationHistorical() {
    const screenshotBefore = await this.countryInflationRates.screenshot()
    await this.chooseCountry.click()
    await this.base.chooseEllipsis('Australia')
    await this.page.waitForTimeout(3000)
    const screenshotAfter = await this.countryInflationRates.screenshot()
    expect(screenshotBefore.length).not.toEqual(screenshotAfter.length)
  }

  async inflationCalculator() {
    await this.page.waitForSelector("[role='slider']", { state: 'visible' })
    const countSliders = await this.sliders.count()
    expect(countSliders).toEqual(4)
    await expect(this.highChart).toBeVisible()
    await expect(this.bottomSection).toBeVisible()
    const screenshotBefore = await this.bottomSection.screenshot()
    await this.inputNumberField.nth(2).fill('10')
    await this.inputNumberField.nth(3).fill('10')
    const screenshotAfter = await this.bottomSection.screenshot()
    expect(screenshotBefore.length).not.toEqual(screenshotAfter.length)
  }
}

module.exports = { MONEY_MARKETS }
