const { expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')
const exp = require('constants')
const { globalAgent } = require('https')

class Futures extends Base {
  constructor(page) {
    this.page = page
    this.symbolEMini = page.locator(".page-content .table_symbol_link:has-text('DAX FUTURES')")
    this.headerName = page.locator('.header-name')
    this.sidePanelsymbolEMini = page.locator(".aside-widgets-wrapper .table_symbol_link:has-text('DAX FUTURES')")
  }

  async futures() {
    await this.symbolEMini.first().click()
    await expect(this.headerName).toContainText(/DAX FUTURES/i)
    await this.sidePanelTab('Markets')
    await this.sidePanelsymbolEMini.first().click()
    await expect(this.headerName).toContainText(/DAX FUTURES/i)
  }
}

module.exports = { Futures }
