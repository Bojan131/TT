const { expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')
const exp = require('constants')
const { globalAgent } = require('https')

class Workspace extends Base {
  constructor(page) {
    this.page = page
    this.addnewWorkspaceButton = page.locator('.add-new-list')
    this.workspaceMessage = page.locator('.workspace-message')
    this.workspaceTabContent = page.locator('.tab-content-txt')
    this.workspaceName = page.locator("[name='workspaceName']")
    this.submitButton = page.locator(".update_workspace [type='submit']")
    this.deleteButton = page.locator('.delete')
    this.deleteWLButton = page.locator('.deleteButton')
    this.ws1Workspace = page.locator(".tab-content-txt >> text='WS1'")
    this.widgetName = page.locator('.widget_name')
    this.addWidgetButton = page.locator(".widget_list [type='button']")
    this.widgetTitleName = page.locator('.title_text')
    this.fontSmall = page.locator('.size-small')
    this.fontMedium = page.locator('.size-medium')
    this.fontLarge = page.locator('.size-large')
    this.fontSizeButton = page.locator('.font_size_button')
    this.newsHeadline = page.locator('.page-content .headline')
    this.pageTitle = page.locator('.page-title')
    this.filterLabel = page.locator('.filter_label')
    this.newsFilterName = page.locator("[name='newsFilterName']")
    this.newsSerachTerm = page.locator(".content [name='searchTerm']")
    this.newsFilterFields = page.locator('.page-content .display-string')
    this.newFilterCriteria = page.locator('.content_wrapper .display-string')
    this.filterApplyButton = page.locator('.apply')
    this.packagesFilterSearch = page.locator(".absolute-wrapper [placeholder='Search']")
    this.widgetActionButton = page.locator('.workspace-container .action')
    this.newPriceField = page.locator("[value='Price page']")
    this.createPricePage = page.locator(".create_wl_form_wrapper [type='submit']")
    this.pricePageMenuItem = page.locator('.menu_item')
    this.quoteBoards = page.locator('.qb-block')
    this.quoteboardsActionMenu = page.locator('.ws-action-menu')
    this.symbolHeaderName = page.locator('.header-name')
    this.wlWidgetSearch = page.locator(".menu_item_container [placeholder='Search']")
    this.wlActionButton = page.locator('.widget-title-wrapper .action_menu')
    this.deleteSymbolMark = page.locator('.page-content  .ws_clear')
    this.wlDragHandle = page.locator('.page-content  .ag-drag-handle')
    this.renameWatchlistField = page.locator("[name='newWatchlistName']")
    this.renameWatchlistSaveButton = page.locator(".rename_wl_form_wrapper [type='submit']")
    this.workspaceChart = page.locator('.chart_components_wrapper')
    this.wlRadioButtons = page.locator('.ws-simple-radio')
    this.hoveredwlRow = page.locator('.ag-row-hover')
    this.chartSymbolTitle = page.locator('.tt_symbolText')
    this.chartCBOptions = page.locator('.cb_options')
    this.dragAndDropMessage = page.locator('.drop_message')
    this.dropIcon = page.locator('.drop_icon')
    this.worksSpaceCrossRates = page.locator('.workspace_cross_rates')
    this.commoditiesWidget = page.locator('.workspace_commodities_matrix')
    this.deleteWidgetButton = page.locator("[data-test-name='Delete widget']")
    this.deleteWidgetButtonYes = page.locator('.deleteButton')
    this.newWLNameField = page.locator("[name='newWlName']")
    this.saveNewWLButton = page.locator(".footer [type='submit']")
    this.deleteWLButtonByDataTest = page.locator("[data-test-name='Delete watchlist']").last()
    this.wl1HeaderName = page.locator(".tab-content-txt:has-text('WS1')")
  }

  async openWorkspace() {
    await this.page.waitForSelector('.tab-content-txt', { state: 'visible' })
    const count = await this.workspaceTabContent.count()
    expect(count).toEqual(1)
  }

  async addNewWorkspace() {
    await this.addnewWorkspaceButton.click()
    await expect(this.workspaceMessage).toHaveText('You don´t have any widgets yet. Click here to add your first one!')
  }

  async countWorkspaces() {
    await this.page.waitForSelector(".tab-content-txt:has-text('Workspace')", { state: 'visible' })
    const count = await this.workspaceTabContent.count()
    expect(count).toEqual(2)
  }

  async renameWorkspace(name) {
    await this.toolTip('Rename workspace')
    await this.workspaceName.fill(name)
    await this.submitButton.click()
    await this.page.waitForSelector(`.tab-content-txt:has-text("${name}")`, { state: 'visible' })
    await this.isActive(name)
  }

  async deleteWorkspace() {
    await this.toolTip('Do you like to delete this workspace? This action cannot be undone.')
    await this.deleteButton.click()
  }
  async deleteWL1IfExists() {
    if (await this.wl1HeaderName.isVisible()) {
      await this.wl1HeaderName.click({ force: true })
      await this.page.waitForSelector("[data-test-name='Do you like to delete this workspace? This action cannot be undone.']", { state: 'visible' })
      await this.deleteWorkspace()
    }
  }

  async addWidget(widget) {
    await this.page.waitForSelector('.workspace-container', { state: 'visible' })
    await this.toolTip('Add widget')
    const expectedTexts = ['Interactive Chart', 'News filter', 'Breaking news', 'Watchlist', 'Price page', 'Economic data', 'Cross rates', 'Commodities matrix']
    await this.checkItems(this.widgetName, expectedTexts)
    const count = await this.widgetName.count()
    for (let i = 0; i < count; ++i) {
      const text = await this.widgetName.nth(i).textContent()
      if (widget === text) {
        await this.addWidgetButton.nth(i).click()
      }
    }
  }

  async breakingNewsWidget() {
    await expect(this.widgetTitleName).toHaveText('News')
    await expect(this.fontSmall).toHaveClass(/.*active.*/)
    await this.fontSizeButton.click()
    await expect(this.fontMedium).toHaveClass(/.*active.*/)
    await this.fontSizeButton.click()
    await expect(this.fontLarge).toHaveClass(/.*active.*/)
    await this.fontSizeButton.click()
    await expect(this.fontSmall).toHaveClass(/.*active.*/)
    await this.newsHeadline.first().click()
    await expect(this.pageTitle).toHaveText('baha News')
  }

  async addNewsFilter() {
    await this.page.waitForSelector('.page-content .headline', { state: 'visible' })
    const countNews1 = await this.newsHeadline.count()
    await this.toolTip('Add news filter')
    await this.page.waitForSelector(".filter_label >> text='Create news filter'", { state: 'visible' })
    await expect(this.filterLabel.first()).toHaveText('Create news filter')
    await this.filterLabel.first().click()
    await this.newsFilterName.fill('DJ industrial')
    await this.newsSerachTerm.fill('Dow Jones')
    await this.newFilterCriteria.nth(6).click()
    await this.packagesFilterSearch.fill('dpa')
    await this.chooseEllipsis('dpa-AFX International ProFeed English')
    await this.chooseEllipsis('dpa-AFX changed from APA/dpa-AFX ProFeed')
    await this.newFilterCriteria.nth(6).click()
    await this.filterApplyButton.click()
    await this.page.waitForSelector(".title_text >> text='DJ industrial'", { state: 'visible' })
    await expect(this.page.locator(".title_text >> text='DJ industrial'")).toBeVisible()
    const countNews2 = await this.newsHeadline.count()
    expect(countNews1).not.toEqual(countNews2)
  }

  async addNewsFilterFromMenu() {
    await this.page.waitForSelector('.page-content .headline', { state: 'visible' })
    const countNews1 = await this.newsHeadline.count()
    await this.addWidget('News filter')
    await this.page.waitForSelector(".filter_label >> text='Create news filter'", { state: 'visible' })
    await expect(this.filterLabel.first()).toHaveText('Create news filter')
    await this.filterLabel.last().click()
    await this.newsFilterFields.click()
    await this.chooseEllipsis('DJ industrial')
    await this.page.waitForTimeout(4000)
    await expect(this.page.locator(".title_text >> text='DJ industrial'").last()).toBeVisible()
    const countNews2 = await this.newsHeadline.count()
    expect(countNews1).not.toEqual(countNews2)
  }

  async addDaxToNewsFilter() {
    await this.sidePanelTab('Markets')
    await this.page.dragAndDrop('.aside_widget_content .table_symbol_link:has-text("DAX")', '.workspace-widget-content:nth-of-type(2)')
    await this.page.waitForSelector(".title_text >> text='DAX'", { state: 'visible' })
    await expect(this.page.locator(".title_text >> text='DAX'")).toBeVisible()
  }

  async deleteFilter() {
    await this.widgetActionButton.first().click()
    await this.newsFilterFields.last().click()
    await this.chooseEllipsis('DJ industrial')
    await this.widgetActionButton.first().click()
    await this.newsFilterFields.last().click()
    await this.page.waitForSelector(".ellipsis-option >> text='DJ industrial'", { state: 'hidden' })
  }

  async addPricePage() {
    await this.addWidget('Price page')
    await expect(this.pricePageMenuItem.first()).toHaveText('New price page')
    await expect(this.pricePageMenuItem.last()).toHaveText('Existing price page')
  }

  async newPricePage() {
    await this.pricePageMenuItem.first().click()
    await this.newPriceField.fill('PP1')
    await this.createPricePage.click()
    await expect(this.page.locator(".title_text >> text='PP1'")).toBeVisible()
  }

  async dragAndDropToPricePage() {
    await this.page.dragAndDrop('.aside_widget_content .table_symbol_link:has-text("DAX")', '.has_column_picker')
    await this.page.dragAndDrop('.aside_widget_content .table_symbol_link:has-text("S&P 500 INDEX")', '.has_column_picker')
    await expect(this.page.locator(".has_column_picker .table_symbol_link >> text='DAX'")).toBeVisible()
    await expect(this.page.locator(".has_column_picker .table_symbol_link >> text='S&P 500 INDEX'")).toBeVisible()
  }

  async openSymbolChart() {
    await this.page.locator(".has_column_picker .table_symbol_link >> text='DAX'").click({ button: 'right' })
    await this.page.locator(".ag-menu-option-text >> text='Details'").click()
    await this.page.locator(".ag-menu-option-text >> text='Chart'").click()
    await this.checkChart()
  }

  async quoteboardPricePage() {
    await this.page.waitForSelector("[data-test-name='Quoteboard']", { state: 'visible' })
    await this.toolTip('Quoteboard')
    await expect(this.quoteBoards.first()).toBeVisible()
    await this.quoteboardsActionMenu.first().click()
    await this.page.locator(".ws-am-options [role='presentation'] >> text='Overview'").click()
    await expect(this.symbolHeaderName).toHaveText('DAX')
    await this.isActive('Overview')
  }

  async wlActionButtonChoose(name) {
    await this.page.waitForSelector('.title_text', { state: 'visible' })
    const count = await this.widgetTitleName.count()
    for (let i = 0; i < count; ++i) {
      const text = await this.widgetTitleName.nth(i).textContent()
      if (name === text) {
        await this.wlActionButton.nth(i).click()
      }
    }
  }

  async newWL() {
    await this.page.locator(".aside_widget_content .table_symbol_link >> text='DAX'").click({ button: 'right' })
    await this.page.locator(".ag-menu-option-text:has-text('Add all members to watchlist')").click()
    await this.newWLNameField.fill('Workspace')
    await this.saveNewWLButton.click()
    await this.page.waitForTimeout(4000)
    await this.page.reload()
    await this.page.waitForSelector('.workspace-container', { state: 'visible' })
  }

  async addWatchlist() {
    await this.addWidget('Watchlist')
    await expect(this.pricePageMenuItem.first()).toHaveText('New watchlist')
    await expect(this.pricePageMenuItem.last()).toHaveText('Existing watchlist')
  }

  async existingWatchlist() {
    await this.pricePageMenuItem.last().click()
    await this.newsFilterFields.click()
    await this.wlWidgetSearch.fill('Workspace')
    await this.chooseEllipsis('Workspace')
    await expect(this.page.locator(".title_text >> text='Workspace'")).toBeVisible()
  }

  async deleteSymbol() {
    await this.wlActionButtonChoose('Workspace')
    await this.page.waitForTimeout(4000)
    await this.page.locator(".action-list-item >> text='Delete symbol'").click()
    await expect(this.deleteSymbolMark.first()).toBeVisible()
    await expect(this.wlDragHandle.first()).toBeVisible()
  }

  async finishDeletingSymbols() {
    const countSymbols1 = await this.page.locator('.has_column_picker .table_symbol_link').count()
    await this.deleteSymbolMark.first().click()
    await this.page.waitForTimeout(2000)
    const countSymbols2 = await this.page.locator('.has_column_picker .table_symbol_link').count()
    expect(countSymbols1).not.toEqual(countSymbols2)
    await this.wlActionButtonChoose('Workspace')
    await this.page.locator(".action-list-item >> text='Finish deleting symbols'").click()
    await expect(this.deleteSymbolMark.first()).not.toBeVisible()
  }

  async renameWatchlist() {
    await this.wlActionButtonChoose('Workspace')
    await this.page.locator(".action-list-item >> text='Rename watchlist'").click()
    await this.renameWatchlistField.fill('New Watchlist Name')
    await this.renameWatchlistSaveButton.click()
    await expect(this.page.locator(".title_text >> text='New Watchlist Name'")).toBeVisible()
  }
  async renameWatchlistBack() {
    await this.wlActionButtonChoose('New Watchlist Name')
    await this.page.locator(".action-list-item >> text='Rename watchlist'").click()
    await this.renameWatchlistField.fill('Workspace')
    await this.renameWatchlistSaveButton.click()
    await expect(this.page.locator(".title_text >> text='Workspace'")).toBeVisible()
  }

  async conntectListToAChart() {
    await this.wlActionButtonChoose('Workspace')
    await this.page.locator(".action-list-item >> text='Connect list to new chart'").click()
    await this.page.waitForSelector('.chart_components_wrapper', { state: 'visible' })
    await expect(this.workspaceChart).toBeVisible()
    await expect(this.wlRadioButtons.first()).toBeVisible()
    await this.wlRadioButtons.nth(1).hover()
    await expect(this.hoveredwlRow.nth(1)).toBeVisible()
  }

  async changeChartSymbolAndChooseTemplateAndDisconnect() {
    const textChart1 = await this.chartSymbolTitle.textContent()
    await this.wlRadioButtons.nth(1).click()
    await this.page.waitForSelector(`.tt_symbolText:has-text("${textChart1}")`, { state: 'hidden' })
    const textChart2 = await this.chartSymbolTitle.textContent()
    expect(textChart1).not.toEqual(textChart2)
    await this.wlRadioButtons.nth(2).click()
    await this.page.waitForSelector(`.tt_symbolText:has-text("${textChart2}")`, { state: 'hidden' })
    const textChart3 = await this.chartSymbolTitle.textContent()
    expect(textChart2).not.toEqual(textChart3)
    await this.wlActionButtonChoose(textChart3)
    await this.page.waitForTimeout(3000)
    await this.chartCBOptions.last().click()
    await this.chooseEllipsis('MACD + Volume')
    await expect(this.chartSymbolTitle.nth(1)).toHaveText('MACD (12,26,9)')
    await expect(this.chartSymbolTitle.last()).toHaveText('Volume ')
    await this.wlRadioButtons.first().click()
    await expect(this.chartSymbolTitle.nth(1)).toHaveText('MACD (12,26,9)')
    await expect(this.chartSymbolTitle.last()).toHaveText('Volume ')
    await this.wlActionButtonChoose(textChart1)
    await this.page.locator(".action-list-item >> text='Disconnect from list'").click()
    await expect(this.wlRadioButtons.first()).not.toBeVisible()
    await expect(this.chartSymbolTitle.nth(1)).toHaveText('MACD (12,26,9)')
    await expect(this.chartSymbolTitle.last()).toHaveText('Volume ')
  }

  async connectChartToList() {
    const textChart = await this.chartSymbolTitle.first().textContent()
    await this.wlActionButtonChoose(textChart)
    await this.page.locator('.display-string').nth(1).click()
    await this.chooseEllipsis('Workspace')
  }

  async interactiveChart() {
    await this.addWidget('Interactive Chart')
    await expect(this.dragAndDropMessage).toHaveText('Drag & Drop your chart symbol')
    await this.page.dragAndDrop('.workspace-widget-content .table_symbol_link:has-text("NIKKEI 225")', '.drop_icon')
    await this.page.waitForSelector(".tt_symbolText:has-text('NIKKEI 225')", { state: 'visible' })
    const count = await this.workspaceChart.count()
    expect(count).toEqual(2)
    await this.page.dragAndDrop('.workspace-widget-content .table_symbol_link:has-text("DJ EURO STOXX 50 EUR Price")', '.title_text:has-text("NIKKEI 225")')
    await this.page.waitForSelector(".tt_symbolText:has-text('DJ EURO STOXX 50 EUR Price')", { state: 'visible' })
    await expect(this.workspaceChart.last().locator('.tt_symbolText').first()).toHaveText('DJ EURO STOXX 50 EUR Price')
    await this.page.dragAndDrop('.workspace-widget-content .table_symbol_link:has-text("Stoxx 50")', '.tt_symbolText:has-text("DJ EURO STOXX 50 EUR Price")')
    await expect(this.workspaceChart.last().locator('.tt_symbolText').nth(1)).toHaveText('Stoxx 50')
  }

  async verifyNewsWidget(number) {
    let verify = 0

    const count = await this.widgetTitleName.count()
    const text1 = await this.page.locator('.workspace-widget-content .table_symbol_link').nth(number).textContent()
    for (let i = 0; i < count; ++i) {
      const text2 = await this.widgetTitleName.nth(i).textContent()
      if (text1.includes(text2)) {
        verify = 1
        break
      }
    }
    expect(verify).toEqual(1)
  }

  async connectWatchlistToNews() {
    await this.wlActionButtonChoose('Workspace')
    await this.page.locator(".action-list-item >> text='Connect watchlist with news'").click()
    const text1 = await this.page.locator('.workspace-widget-content .table_symbol_link').nth(0).textContent()
    await this.page.waitForSelector(`.title_text >> text="${text1}"`, { state: 'visible' })
    await expect(this.wlRadioButtons.first()).toBeVisible()
    await this.verifyNewsWidget(0)
    await this.wlRadioButtons.nth(1).click()
    const text2 = await this.page.locator('.workspace-widget-content .table_symbol_link').nth(1).textContent()
    await this.page.waitForSelector(`.title_text >> text="${text2}"`, { state: 'visible' })
    await this.verifyNewsWidget(1)
    await this.wlRadioButtons.nth(2).click()
    const text3 = await this.page.locator('.workspace-widget-content .table_symbol_link').nth(2).textContent()
    await this.page.waitForSelector(`.title_text >> text="${text3}"`, { state: 'visible' })
  }

  async crossRates() {
    await this.addWidget('Cross rates')
    await expect(this.page.locator(".title_text >> text='Cross Rates'")).toBeVisible()
  }

  async commodities() {
    await this.addWidget('Commodities matrix')
    await expect(this.page.locator(".title_text >> text='Commodities matrix'")).toBeVisible()
  }

  async deleteWidget() {
    const countWidgets1 = await this.widgetTitleName.count()
    await this.deleteWidgetButton.first().click()
    await this.deleteWidgetButtonYes.click()
    await this.page.waitForTimeout(3000)
    const countWidgets2 = await this.widgetTitleName.count()
    expect(countWidgets1).not.toEqual(countWidgets2)
  }

  async deleteWorkspace() {
    await this.toolTip('Do you like to delete this workspace? This action cannot be undone.')
    await this.deleteButton.click()
  }

  async deleteWL() {
    await this.NavigateTo('Watchlists')
    await this.chooseHeaderTab('Personal Watchlist Overview', 'Personal Watchlist Overview')
    await this.page.waitForSelector('.display-string', { state: 'visible' })
    await this.page.locator('.display-string').click()
    await this.page.locator("[placeholder='Search']").last().fill('Workspace')
    await this.chooseEllipsis('Workspace')
    await this.deleteWLButtonByDataTest.waitFor({ state: 'visible' })
    await this.deleteWLButtonByDataTest.click()
    await this.deleteWLButton.click()
  }
}

module.exports = { Workspace }
