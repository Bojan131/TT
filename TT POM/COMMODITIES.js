const { expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')
const exp = require('constants')
const { globalAgent } = require('https')

class COMMODITIES {
  constructor(page) {
    this.page = page
    this.base = new Base(page)
    this.symbolGold = page.locator('.page-content .table_symbol_link >> text="Gold"')
    this.headerName = page.locator('.header-name')
    this.sidePanelGoldSymbol = page.locator('.aside_widget_content .table_symbol_link >> text="Gold"')
    this.iconGold = page.locator('.flag-icon-gold')
    this.iconPalladium = page.locator('.flag-icon-palladium')
    this.iconPlatinum = page.locator('.flag-icon-platinum')
    this.iconSilver = page.locator('.flag-icon-silver')
    this.commoditiesSymbol = page.locator('.precious_metals_wrapper .colored-link')
    this.gas = page.locator("[col-id='gas']")
    this.chartImage = page.locator('.ws_table_chart')
    this.highChart = page.locator('.highcharts-background')
    this.cbOptions = page.locator('.cb_options')
    this.timePeriodSixMonth = page.locator(".page-content [role='presentation']:has-text('6M')")
  }

  async commodities() {
    await this.page.waitForSelector('.page-content .table_symbol_link', { state: 'visible' })
    await this.symbolGold.click()
    await expect(this.headerName).toHaveText('Gold')
    await this.base.sidePanelTab('Markets')
    await this.sidePanelGoldSymbol.click()
    await expect(this.headerName).toHaveText('Gold')
  }

  async preciousMetals() {
    await this.page.waitForSelector('.flag-icon-silver', { state: 'visible' })
    await this.base.activeToolBar('6')
    await expect(this.iconGold).toBeVisible()
    await expect(this.iconPalladium).toBeVisible()
    await expect(this.iconPlatinum).toBeVisible()
    await expect(this.iconSilver).toBeVisible()
    await this.commoditiesSymbol.first().click()
    await this.page.waitForSelector('.tab-item', { state: 'visible' })
    await this.base.isActive('Overview')
  }

  async gasStorageInventory() {
    await this.page.waitForSelector("[col-id='gas']", { state: 'visible' })
    await expect(this.gas.first()).toBeVisible()
    await this.chartImage.nth(8).click()
    await this.page.waitForSelector('.highcharts-background', { state: 'visible' })
    await expect(this.highChart).toBeVisible()
    await this.base.isActive('1M')
    await expect(this.cbOptions).toHaveText('Spain')
    const screenshotBefore = await this.highChart.screenshot()
    await this.timePeriodSixMonth.click()
    await this.cbOptions.click()
    await this.base.chooseEllipsis('Belgium')
    await this.page.waitForSelector('.highcharts-background', { state: 'visible' })
    const screenshotAfter = await this.highChart.screenshot()
    expect(screenshotBefore.length).not.toEqual(screenshotAfter.length)
    await this.base.isActive('6M')
  }
}
module.exports = { COMMODITIES }
