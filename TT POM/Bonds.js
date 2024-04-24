const { expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')
const exp = require('constants')
const { globalAgent } = require('https')

class Bonds extends Base {
  constructor(page) {
    super(page)
    this.page = page
    this.tabItem = page.locator('.tab-item')
    this.tableHeaderName = page.locator('.table_name')
    this.highChart = page.locator('.highcharts-background')
    this.selectedYieldRow = page.locator('.ag-row-selected')
    this.yieldCheckbox = page.locator('.page-content .ag-checkbox-input-wrapper')
    this.checkedCheckBox = page.locator('.ag-checked')
    this.yieldCountryName = page.locator("[text-anchor='start']")
    this.dropDownMenu = page.locator('.display-string')
    this.chFlag = page.locator('.flag-icon-ch')
    this.highChartTitle = page.locator('.highcharts-title')
    this.bondsSearchFilters = page.locator('.page-content .display-string')
    this.maturityFrom = page.locator("[name='maturityFrom']")
    this.maturityTo = page.locator("[name='maturityTo']")
    this.submitButton = page.locator(".page-content [type='submit']")
    this.bondsSearchTable = page.locator('.bonds_search_table_wrapper')
    this.checkmark = page.locator('.page-content .checkmark')
    this.bondsIpoSearchOptions = page.locator('.bonds_ipo_options .display-string')
    this.bondsSymbol = page.locator('.page-content .table_symbol_link')
    this.symbol = page.locator('.page-content .table_symbol_link')
    this.bondsCalculatorFilter = page.locator('.filter_form')
    this.bondsCalculatorTable = page.locator('.four_columns_table')
    this.executeButton = page.locator("[type='button']:has-text('Execute')")
  }

  async bonds() {
    await this.isActive('Yield Curves')
    const expectedTexts = ['Yield Curves', 'Historic Yield Curves', 'Yield curves comparison', 'Bond spreads']
    await this.checkItems(this.tabItem, expectedTexts)
    await expect(this.highChart).toBeVisible()
    const expectedTexts2 = ['Yields', 'Government Bonds', 'Government Bond Yields']
    await this.checkItems(this.tableHeaderName, expectedTexts2)
  }

  async selectYieldCountry() {
    await this.page.waitForSelector('.ag-checked', { state: 'visible' })
    const count1 = await this.selectedYieldRow.count()
    await this.yieldCheckbox.nth(17).click()
    await this.page.waitForSelector("[text-anchor='start']:has-text('China')", { state: 'visible' })
    const expectedTexts = ['China']
    await this.checkItems(this.yieldCountryName, expectedTexts)

    const count2 = await this.selectedYieldRow.count()
    expect(count1).not.toEqual(count2)
    await this.yieldCheckbox.nth(17).click()
  }

  async governmentBondYields() {
    const count1 = await this.chFlag.count()
    await this.dropDownMenu.click()
    await this.chooseEllipsis('Switzerland')
    await this.page.waitForTimeout(3000)
    const count2 = await this.chFlag.count()
    expect(count1).not.toEqual(count2)
  }

  async historicYieldCurves() {
    await this.page.waitForSelector('.highcharts-title', { state: 'visible' })
    const expectedTexts = ['US Government Bond Yields', 'German Government Bond Yields', 'Yield comparison (today)']
    await this.checkItems(this.highChartTitle, expectedTexts)
  }

  async bondsSearch() {
    await expect(this.bondsSearchFilters.last()).toBeVisible()
    await this.bondsSearchFilters.first().click()
    await this.chooseEllipsis('Countries and Regions')
    await this.bondsSearchFilters.nth(3).click()
    await this.chooseEllipsis('Commercial Papers')
    await this.bondsSearchFilters.nth(3).click()
    await this.checkmark.last().click()
    await this.maturityFrom.fill('0')
    await this.maturityTo.fill('0.5')
    await this.submitButton.click()
    await expect(this.bondsSearchTable).toBeVisible()
  }

  async bondsIpo() {
    await this.page.waitForSelector('.bonds_ipo_options', { state: 'visible' })
    const countFilter = await this.bondsIpoSearchOptions.count()
    expect(countFilter).toEqual(5)
    await this.bondsIpoSearchOptions.first().click()
    await this.chooseEllipsis('Corporates')
    await this.page.waitForSelector('.page-content .loader_wrapper', { state: 'hidden' })
    await this.bondsIpoSearchOptions.nth(1).click()
    await this.chooseEllipsis('Germany')
    await this.page.waitForSelector('.page-content .loader_wrapper', { state: 'hidden' })
    await this.bondsIpoSearchOptions.nth(2).click()
    await this.chooseEllipsis('Traditional Bonds')
    await this.page.waitForSelector('.page-content .loader_wrapper', { state: 'hidden' })
  }

  async bondsCalculator() {
    await expect(this.bondsCalculatorFilter).toBeVisible()
    await this.executeButton.click()
    await this.page.waitForSelector('.four_columns_table', { state: 'visible' })
    await expect(this.bondsCalculatorTable).toBeVisible()
  }
}

module.exports = { Bonds }
