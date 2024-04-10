const { expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')
const exp = require('constants')
const { globalAgent } = require('https')

class PORTFOLIO {
  constructor(page) {
    this.page = page
    this.base = new Base(page)
    this.addNewPortfolioButton = page.locator('.buttons_container .plain')
    this.savePortfolioButton = page.locator(".footer [type='submit']")
    this.portfolioName = page.locator('.tab-content-txt')
    this.portfolioChartImage = page.locator('.portfolio_row .image-chart-image')
    this.portfolioNameField = page.locator(".form_row [name='portfolioName']")
    this.depositedAmountField = page.locator("[name='depositedAmount']")
    this.groupSamePositions = page.locator('.create_portfolio_form_wrapper .checkbox')
    this.valueCurrency = page.locator('.value_currency')
    this.moreInformation = page.locator('.more_information')
    this.marketsTableWrapper = page.locator('.markets_table_wrapper')
    this.portfolioNumberField = page.locator("[name='number']")
    this.symbolDax = page.locator(".markets_table_wrapper .table_symbol_link >> text='DAX'")
    this.symbolAdidas = page.locator(".markets_table_wrapper .table_symbol_link >> text='ADIDAS AG NA O.N.'")
    this.symbolApple = page.locator(".markets_table_wrapper .table_symbol_link >> text='Apple'")
    this.liveSearch = page.locator("[placeholder='Search']")
    this.portfolioName = page.locator('.portfolio_name')
    this.allPortfoliosButton = page.locator("[href='/portfolio/overview']")
    this.portfolioDate = page.locator('.react-date-picker__inputGroup')
    this.infoButton = page.locator('.ws_info_light')
    this.infoBlock = page.locator('.position_information_modal')
    this.splitShares = page.locator('.split_shares')
    this.ratioDenominatorField = page.locator("[name='ratioDenominator']")
    this.submitButton = page.locator(".footer [type='submit']")
    this.buyButton = page.locator('.ws_portfolio_buy')
    this.buyForm = page.locator('.portfolio_buy_sell_form_wrapper')
    this.sellButton = page.locator('.ws_portfolio_sell')
    this.closeForm = page.locator('.header .ws_clear')
    this.transactionTable = page.locator('.transactions_form')
    this.cancelPositionButton = page.locator('.ws_portfolio_cancel')
    this.buySellOthersButton = page.locator('.group-button')
    this.transactionSymbols = page.locator('.transactions_form .colored-link')
    this.deleteButton = page.locator('.deleteButton')
    this.portfolioChart = page.locator('.portfolio_chart')
    this.allChartButton = page.locator(".button_container a >> text='All'")
    this.dropDownFields = page.locator('.display-string')
    this.portfolioLabel = page.locator('.legend .label')
    this.refreshButton = page.locator(".button_holder [type='submit']")
    this.highChart = page.locator('.highcharts-series-group')
    this.riskMatrixChart = page.locator('.risk-matrix-widget')
    this.inputField = page.locator('.input_field')
    this.savePortfolioSettings = page.locator(".button_holder [type='submit']")
    this.gorupSamePositionSlider = page.locator("[name='groupPositions']")
    this.slider = page.locator('.slider')
    this.nameInputField = page.locator("[name='name']")
    this.exchangeInputField = page.locator("[name='exchange']")
    this.priceInputField = page.locator("[name='price']")
    this.blueIcon = page.locator('.blue')
    this.wlNameField = page.locator("[name='newWlName']")
    this.wlName = page.locator(".wl_title >> text='Portfolio WL'")
    this.wlActionMenu = page.locator('.watchlist_action_menu').first()
    this.deleteWLOption = page.locator('.action-list-item').last()
    this.nameHeader = page.locator("[value='name']")
    this.valueHeader = page.locator("[value='value']")
    this.DepositedAmmountHeader = page.locator("[value='capital']")
    this.totalAssetsHeader = page.locator("[value='totalAssets']")
    this.ascIcon = page.locator('.ws_sort_asc')
    this.portfolioValue = page.locator(".active >> text='Portfolio value'")
    this.portfolioValueASC = this.portfolioValue.locator('.ws_sort_asc')
    this.portfolioDepositedAmount = page.locator(".active >> text='Deposited amount'")
    this.portfolioDepositedAmountASC = this.portfolioDepositedAmount.locator('.ws_sort_asc')
    this.portfolioDepositedAmountDESC = this.portfolioDepositedAmount.locator('.ws_sort_desc')
    this.allPortfolioCharts = page.locator('.page-content  .image-chart-image')
    this.deleteWLButton = page.locator("[data-test-name='Delete watchlist']").last()
  }

  async createPorfolio1() {
    await this.addNewPortfolioButton.click()
    await this.savePortfolioButton.click()
    await this.moreInformation.click()
    await this.page.waitForSelector(".tab-content-txt >> text='Portfolio 1'", { state: 'visible' })
    await expect(this.portfolioName).toHaveText('Portfolio 1')
    await expect(this.portfolioChartImage).toBeVisible()
  }

  async createPortfolio2() {
    await this.addNewPortfolioButton.click()
    await this.portfolioNameField.fill('Portfolio 2')
    await this.depositedAmountField.fill('100000')
    await this.groupSamePositions.click()
    await this.savePortfolioButton.click()
    await this.page.waitForSelector(".tab-content-txt >> text='Portfolio 2'", { state: 'visible' })
    await expect(this.portfolioChartImage).toBeVisible()
    await expect(this.valueCurrency.last()).toHaveText('100,000.00EUR')
  }

  async choosePortfolio(name) {
    await this.allPortfoliosButton.click()
    await this.page.waitForSelector(`.portfolio_name >> text=${name}`, { state: 'visible' })
    const count = await this.moreInformation.count()
    for (let i = 0; i < count; ++i) {
      const text = await this.portfolioName.nth(i).textContent()
      if (name === text) {
        await this.moreInformation.nth(i).click()
        break
      }
    }
    await this.page.waitForSelector(`.tab-content-txt:has-text("${name}")`, { state: 'visible' })
    const activeText = await this.page.locator('.active .tab-content-txt').textContent()
    console.log(activeText)
    if (activeText === name) {
    } else {
      await this.page.locator(`.tab-content-txt:has-text("${name}")`).click({ force: true })
    }
  }

  async dragAndDropSymbolDAX() {
    await this.choosePortfolio('Portfolio 1')
    await this.base.sidePanelTab('Markets')
    await this.page.dragAndDrop('.aside_widget_content .table_symbol_link:has-text("DAX")', '.markets_table_wrapper')
    await this.portfolioNumberField.fill('0.01')
    await this.savePortfolioButton.click()
    await expect(this.symbolDax).toBeVisible()
  }

  async dragAndDropSymbolAdidas() {
    const textValue1 = await this.valueCurrency.first().textContent()
    await this.liveSearch.fill('Adidas')
    await this.page.dragAndDrop('.colored-link-light:has-text("ADIDAS")', '.markets_table_wrapper')
    await this.portfolioNumberField.fill('1')
    const textTransactionValue1 = await this.page.locator('.mod_right').nth(12).textContent()
    const priceValue1 = await this.page.locator('[name="price"]').getAttribute('value')
    await this.savePortfolioButton.click()
    await this.page.waitForSelector(".markets_table_wrapper .table_symbol_link >> text='ADIDAS AG NA O.N.'", { state: 'visible' })
    await expect(this.symbolAdidas).toBeVisible()
    const textValue2 = await this.valueCurrency.first().textContent()
    expect(textValue1).not.toEqual(textValue2)
    await this.liveSearch.fill('Adidas')
    await this.page.dragAndDrop('.colored-link-light:has-text("ADIDAS")', '.markets_table_wrapper')
    await this.portfolioNumberField.fill('5')
    await this.savePortfolioButton.click()
    await expect(this.page.locator('.markets_table_wrapper .base_cell_wrapper').nth(9)).toHaveText('6')
    await this.choosePortfolio('Portfolio 2')
    await this.liveSearch.fill('Adidas')
    await this.page.dragAndDrop('.colored-link-light:has-text("ADIDAS")', '.markets_table_wrapper')
    await this.portfolioNumberField.fill('1')
    await this.savePortfolioButton.click()
    await expect(this.page.locator('.markets_table_wrapper .base_cell_wrapper').nth(9)).toHaveText('1')
    await this.liveSearch.fill('Adidas')
    await this.page.dragAndDrop('.colored-link-light:has-text("ADIDAS")', '.markets_table_wrapper')
    await this.portfolioNumberField.fill('5')
    await this.savePortfolioButton.click()
    await expect(this.page.locator('.markets_table_wrapper .base_cell_wrapper').nth(9)).toHaveText('5')
  }

  async infoPage() {
    await this.choosePortfolio('Portfolio 1')
    await this.infoButton.first().click()
    await this.page.waitForSelector('.mod_right', { state: 'visible' })
    const textValue1 = await this.page.locator('.mod_right').nth(5).textContent()
    await expect(this.infoBlock).toBeVisible()
    await this.splitShares.click()
    await this.ratioDenominatorField.fill('5')
    await this.submitButton.click()
    await this.page.waitForTimeout(4000)
    const textValue2 = await this.page.locator('.mod_right').nth(5).textContent()
    expect(textValue1).not.toEqual(textValue2)
    await this.closeForm.click()
  }

  async buySell() {
    const textCHG1 = await this.page.locator('.markets_table_wrapper .ag-cell-value').nth(9).textContent()
    await this.buyButton.first().click()
    await expect(this.buyForm).toBeVisible()
    await this.portfolioNumberField.fill('0.1')
    await this.savePortfolioButton.click()
    await this.page.waitForTimeout(3000)
    const textCHG2 = await this.page.locator('.markets_table_wrapper .ag-cell-value').nth(9).textContent()
    expect(textCHG1).not.toEqual(textCHG2)
    await this.sellButton.first().click()
    await expect(this.buyForm).toBeVisible()
    await expect(this.page.locator(".mod_right:has-text('Sell')")).toBeVisible()
    await this.savePortfolioButton.click()
    await this.page.waitForSelector(".markets_table_wrapper .table_symbol_link:has-text('ADIDAS AG NA O.N.')", { state: 'hidden' })
    await expect(this.page.locator(".markets_table_wrapper .table_symbol_link:has-text('ADIDAS AG NA O.N.')")).not.toBeVisible()
  }

  async transactionTab() {
    await this.choosePortfolio('Portfolio 1')
    await this.base.chooseSymbolTab('Transactions')
    await expect(this.transactionTable).toBeVisible()
    await this.base.isActive('All')
    await expect(this.cancelPositionButton.first()).toBeVisible()
  }

  async buySellOthers() {
    await this.buySellOthersButton.nth(1).click()
    await this.page.waitForTimeout(3000)
    const buySymbolCount = await this.transactionSymbols.count()
    const countBuy = await this.page.locator(".base_cell_wrapper:has-text('Buy')").count()
    expect(buySymbolCount).toEqual(countBuy)
    await this.buySellOthersButton.nth(2).click()
    await this.page.waitForTimeout(3000)
    const sellSymbolCount = await this.transactionSymbols.count()
    const countsell = await this.page.locator(".base_cell_wrapper:has-text('Sell')").count()
    expect(sellSymbolCount).toEqual(countsell)
    await this.buySellOthersButton.nth(3).click()
    await expect(this.page.locator(".base_cell_wrapper:has-text('Deposit')")).toBeVisible()
  }

  async cancelPoistion() {
    await this.buySellOthersButton.first().click()
    await this.page.waitForTimeout(3000)
    const countSymbols1 = await this.transactionSymbols.count()
    await this.cancelPositionButton.first().click()
    await this.deleteButton.click()
    await this.page.waitForTimeout(3000)
    const countSymbols2 = await this.transactionSymbols.count()
    expect(countSymbols1).not.toEqual(countSymbols2)
  }

  async chartTab() {
    await this.choosePortfolio('Portfolio 1')
    await this.base.chooseSymbolTab('Chart')
    await expect(this.portfolioChart).toBeVisible()
  }

  async allButton() {
    await this.allChartButton.click()
    await this.base.isActive('All')
  }

  async comparePorfolio() {
    await this.dropDownFields.nth(1).click()
    await this.base.chooseEllipsis('Portfolio 2')
    await this.refreshButton.click()
    await expect(this.portfolioLabel).toHaveText('Portfolio 2')
  }

  async sportsPortfolio() {
    await this.addNewPortfolioButton.click()
    await this.portfolioNameField.fill('New Sports')
    await this.savePortfolioButton.click()
    await this.liveSearch.fill('Adidas')
    await this.page.waitForSelector('.markets_table_wrapper', { state: 'visible' })
    await this.page.dragAndDrop('.colored-link-light:has-text("ADIDAS")', '.markets_table_wrapper')
    await this.page.waitForSelector('.page-content .loader_wrapper', { state: 'hidden' })
    await this.portfolioNumberField.fill('1')
    await this.savePortfolioButton.click()
    await this.page.waitForSelector('.page-content .loader_wrapper', { state: 'hidden' })
    await this.liveSearch.fill('Nike')
    await this.page.waitForSelector(".colored-link-light:has-text('Nike')", { state: 'visible' })
    await this.page.dragAndDrop('.colored-link-light:has-text("Nike")', '.markets_table_wrapper')
    await this.portfolioNumberField.fill('1')
    await this.savePortfolioButton.click()
  }

  async structureTab() {
    await this.base.chooseSymbolTab('Structure')
    await this.page.waitForSelector('.highcharts-series-group', { state: 'visible' })
    const countPie = await this.highChart.count()
    expect(countPie).toEqual(5)
  }

  async RiskMatrix() {
    await this.base.chooseSymbolTab('Risk matrix')
    await expect(this.riskMatrixChart).toBeVisible()
  }

  async settings() {
    await this.base.chooseSymbolTab('Settings')
    await this.page.waitForSelector('.portfolio_name', { state: 'visible' })
    await this.inputField.first().fill('Sports')
    await this.slider.nth(1).click()
    await this.page.waitForTimeout(3000)
    await this.savePortfolioSettings.first().click()
    await this.page.waitForSelector(".portfolio_name >> text='Sports'", { state: 'visible' })
    await expect(this.portfolioName).toHaveText('Sports')
    await this.base.chooseSymbolTab('Overview')
    await this.liveSearch.fill('Adidas')
    await this.page.dragAndDrop('.colored-link-light:has-text("ADIDAS")', '.markets_table_wrapper')
    await this.portfolioNumberField.fill('1')
    await this.savePortfolioButton.click()
    await this.page.waitForTimeout(2000)
    const countSymbols = await this.page.locator('.markets_table_wrapper .table_symbol_link').count()
    expect(countSymbols).toEqual(3)
  }

  async portfolioManipulations() {
    await this.page.waitForTimeout(5000)
    await this.addNewPortfolioButton.click()
    await this.portfolioNameField.fill('Manipulations')
    await this.savePortfolioButton.click()
    await this.page.waitForTimeout(6000)
    await this.base.toolTip('Buy (manual input)')
    await expect(this.buyForm).toBeVisible()
    await this.nameInputField.fill('Apple')
    await this.exchangeInputField.fill('NYSE')
    await this.priceInputField.fill('1200')
    await this.portfolioNumberField.fill('1')
    await this.savePortfolioButton.click()
    await expect(this.symbolApple).toBeVisible()
    await expect(this.blueIcon).toBeVisible()
  }

  async addAllMembersToWatchList() {
    await this.base.sidePanelTab('Watchlists')
    await this.page.waitForSelector("[data-test-name='Add all members to watchlist']", { state: 'visible' })
    await this.base.toolTip('Add all members to watchlist')
    await this.wlNameField.fill('Portfolio WL')
    await this.savePortfolioButton.click()
    await this.page.waitForSelector(".wl_title >> text='Portfolio WL'", { state: 'visible' })
    await expect(this.wlName).toBeVisible()
    await this.base.NavigateTo('Watchlists')
    await this.base.chooseHeaderTab('Personal Watchlist Overview', 'Personal Watchlist Overview')
    await this.page.waitForSelector('.display-string', { state: 'visible' })
    await this.page.locator('.display-string').click()
    await this.page.locator("[placeholder='Search']").last().fill('Portfolio')
    await this.base.chooseEllipsis('Portfolio WL')
    await this.deleteWLButton.waitFor({ state: 'visible' })
    await this.deleteWLButton.click()
    await this.deleteButton.click()
  }

  async openNewBrowser(browser) {
    const { context, page } = await this.base.newWindowLogin(browser)
    await this.base.NavigateToNewBrowser(page, 'Portfolio')
    await page.locator(".tab-item >> text='Manipulations'")
    const [newPage] = await Promise.all([context.waitForEvent('page'), page.locator('.nav-icon').nth(6).click()])
    await newPage.waitForSelector('.page-title', { state: 'visible' })
    await expect(newPage.locator('.page-title')).toHaveText('Portfolios')
    await expect(newPage.locator(".markets_table_wrapper .table_symbol_link >> text='Apple'")).toBeVisible()
  }

  async deletePortfolio() {
    await this.page.waitForTimeout(5000)
    await this.page.waitForSelector('[data-test-name="Delete portfolio"]', { state: 'visible' })
    await this.base.toolTip('Delete portfolio')
    await this.deleteButton.click()
  }

  async allPortfolios() {
    await this.allPortfoliosButton.click()
    await this.page.waitForSelector('.portfolio_name', { state: 'visible' })
    const countPortfolio = await this.portfolioName.count()
    expect(countPortfolio).toEqual(2)
    await this.page.waitForSelector('.image-chart-image', { state: 'visible' })
    const countChart = await this.allPortfolioCharts.count()
    expect(countChart).toEqual(2)
    await expect(this.nameHeader).toBeVisible()
    await expect(this.valueHeader).toBeVisible()
    await expect(this.DepositedAmmountHeader).toBeVisible()
    await expect(this.totalAssetsHeader).toBeVisible()
    await expect(this.ascIcon).toBeVisible()
    await this.base.isActive('Portfolio name')
    await this.valueHeader.click()
    await this.base.isActive('Portfolio value')
    await expect(this.portfolioValueASC).toBeVisible()
    await this.DepositedAmmountHeader.click()
    await expect(this.portfolioDepositedAmountASC).toBeVisible()
    await this.DepositedAmmountHeader.click()
    await expect(this.portfolioDepositedAmountDESC).toBeVisible()
    await this.moreInformation.first().click()
  }
}

module.exports = { PORTFOLIO }
