const { test, expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')

class OverviewPage {
  constructor(page) {
    this.page = page
    this.base = new Base(page)
    this.otherNews = page.locator('.aside_widget .link_inactive')
    this.arrowRight = page.locator('.arrow_right')
    this.unPin = page.locator('.aside_widget_header .ws_clear')
    this.PinNews = page.locator("[data-rbd-drag-handle-draggable-id='leftNews'] .ws_pin_to_top")
    this.winnerBar = page.locator('.winner_bar')
    this.collapsedButton = page.locator('.collapsed-plus-icon')
    this.moveUp = page.locator('.ws_move_widget_up')
    this.PinChart = page.locator("[data-rbd-draggable-id='leftCharts'] .ws_pin_to_top")
    this.quickSearch = page.locator("[placeholder='Quick Search']")
    this.clear = page.locator('.quick_search_wrapper .ws_clear')
    this.openClose = page.locator('.open_close')
    this.actionButton = page.locator('.ws_icon_change_details')
    this.actionItemList = page.locator('.action-list-item')
    this.pageContent = page.locator('.page_content')
    this.FullSearch = page.locator("[name='searchTerm']")
    this.fullSearchSubmit = page.locator(".button_holder [type='submit']")
    this.table = page.locator('.most_relevant_table').nth(1)
    this.liveSearch = page.locator("[placeholder='Search']")
    this.leftFullSearch = page.locator('.left_securities_search_table_wrapper')
    this.checkMark = page.locator('.checkmark')
    this.exchange = page.locator('.aside_widget_content .display')
    this.searchFilters = page.locator('.bonds_search_section .display-string')
    this.tabItem = page.locator('.tab-item')
    this.GroupExchanges = page.locator('.element-header .checkmark')
    this.column = page.locator('.ag-side-button-label')
    this.tree = page.locator('.ag-icon-tree-closed')
    this.resetButton = page.locator('.ag-buttons-reset')
    this.Exact = page.locator("[name='searchMethod']")
    this.tickerSymbol = page.locator("[value='tickerSymbol']")
    this.FundSearch = page.locator("[data-rbd-draggable-id='leftFundsSearch'] [name='searchTerm']")
    this.fundSubmit = page.locator("[data-rbd-draggable-id='leftFundsSearch'] [type='submit']")
    this.blackRock = page.locator("[data-rbd-draggable-id='leftFundsSearch'] .table_symbol_link")
    this.fundType = page.locator("[data-rbd-draggable-id='leftFundsSearch'] .display-string")
    this.search = page.locator("[data-rbd-draggable-id='leftFundsSearch'] [placeholder='Search']")
    this.wsCreate = page.locator('.ws_create_new')
    this.watchlist = page.locator("[value='Watchlist']")
    this.watchlistSubmit = page.locator(".content_wrapper [type='submit']")
    this.wltitle = page.locator('.wl_title')
    this.agMenu = page.locator('.ag-menu-option-part:has-text("Add all members to watchlist")')
    this.displayString = page.locator('.display-string')
    this.leftPanelSymbols = page.locator("[data-rbd-draggable-id='marketOverviewLeftPanel'] .table_symbol_link")
    this.actionList = page.locator('.action-list-item')
    this.renameWlField = page.locator("[name='newWatchlistName']")
    this.ExpandWL = page.locator('.header_button')
    this.collapse = page.locator('.ws_colapse')
    this.watchListUser = page.locator('.ws_watchlist_user')
    this.shareWL = page.locator('.shared')
    this.sideColumnPicker = page.locator('.aside-widgets-wrapper .ag-side-button-label')
    this.sideIconTree = page.locator('.aside-widgets-wrapper .ag-icon-tree-closed')
    this.columnLabel = page.locator('.ag-column-select-column-label')
    this.compareTitle = page.locator('.page-content .justify-space-between')
    this.chartSymbol = page.locator('.tt_symbolText')
    this.dot = page.locator('.highcharts-point')
    this.highChart = page.locator('.highcharts-series-hover')
    this.CompareSymbolsWL = page.locator('.app-container .table_symbol_link')
    this.bigHighChart = page.locator('.highcharts-series')
    this.cancelButton = page.locator('.cancel_button')
    this.shortName = page.locator('.short_name')
    this.symbolName = page.locator('.symbol_name')
    this.EditFavorites = page.locator("[type='button']:has-text('Edit favorites')")
    this.favoritesDrag = page.locator('.ws_drag')
    this.favoritesRename = page.locator('.ws_alerts_edit')
    this.FavoritesDelete = page.locator('.ws_alerts_delete')
    this.inputField = page.locator('.input_field')
    this.check = page.locator('.ws_checked')
    this.iconButton = page.locator('.icon_button')
    this.typeWatchlistName = page.locator("[name='newWlName']")
    this.saveWatchlistButton = page.locator(".add_to_wl_form_wrapper [type='submit']")
    this.comparisonPie = page.locator('#pie-highchart-funds-comparison-pie-chart0')
    this.WatchlistActionButton = page.locator('.action')
    this.renameWatchlistActionList = page.locator(".action-list-item:has-text('Rename watchlist')")
  }
  async pinnedNews() {
    await this.otherNews.click({ force: true })
    await this.page.waitForTimeout(4000)
    await this.arrowRight.first().click({ force: true })
    await this.page.waitForTimeout(4000)
    await this.arrowRight.first().click({ force: true })
    await this.page.waitForTimeout(4000)
    await this.base.isActive('Breaking The News')
  }

  async pin() {
    await this.unPin.click()
    await expect(this.page.locator('.margin_top')).toBeHidden()
    await this.PinNews.click()
    await expect(this.page.locator('.tabs .no_margin').first()).toBeHidden()
  }

  async TopFlop() {
    await this.winnerBar.first().click()
    await this.page.waitForTimeout(3000)
    await this.base.isActive('Top/Flop')
  }

  async minimize() {
    const count = await this.collapsedButton.count()
    for (let i = 0; i < count; ++i) {
      await this.collapsedButton.nth(i).click()
    }
    await expect(this.page.locator('.aside-widgets-wrapper .ag-theme-alpine-dark').first()).toBeHidden()
  }

  async rearrange() {
    await this.moveUp.nth(2).click()
    await this.page.waitForTimeout(4000)
    await this.base.checkIndexPosition('.element-header', 'Interest rates', 3)
  }

  async typeTwoLetters() {
    await this.quickSearch.fill('ad')
    await expect(this.page.locator(".c-pointer:has-text('Indices')")).toBeVisible()
  }

  async clearSearch() {
    await this.clear.click()
  }

  async typeThreeLetters() {
    await this.quickSearch.fill('adi')
    await this.page.waitForTimeout(3000)
    await expect(this.page.locator(".colored-link-light:has-text('ADI')").first()).toBeVisible()
    await expect(this.page.locator(".colored-link:has-text('DAS AG')").first()).toBeVisible()
  }

  async hide() {
    await this.openClose.first().click()
    await expect(this.page.locator('.inner-tree').first()).toHaveClass(/.*hide.*/)
  }

  async displaySearchResults() {
    await this.actionButton.first().click()
    await this.actionItemList.last().click()
    await expect(this.pageContent).toBeVisible()
  }

  async displayAllGroupMembers() {
    await this.openClose.first().click()
    await this.actionButton.first().click()
    await this.page.waitForTimeout(1000)
    await this.actionItemList.first().click()
    await this.page.waitForTimeout(3000)
    await expect(this.page.locator(".colored-link:has-text('BEL 20')").first()).toBeVisible()
  }

  async fullSearch() {
    let array1 = []
    let array2 = []
    await this.FullSearch.first().fill('uni')
    await this.fullSearchSubmit.first().click()
    await this.page.waitForTimeout(3000)
    let count = await this.table.locator('.colored-link').count()
    for (let i = 0; i < count; ++i) {
      const text = await this.table.locator('.colored-link').nth(i).textContent()
      array1.push(text)
    }
    await this.liveSearch.fill('uni')
    await this.page.waitForTimeout(3000)
    for (let i = 0; i < count; ++i) {
      let titleValue = await this.page.locator('.symbol_name').nth(i).getAttribute('title')
      array2.push(titleValue)
    }
    expect(array1).toEqual(array2)
  }

  async CheckMark() {
    await this.checkMark.click()
  }

  async showResultsinOverview() {
    await this.fullSearchSubmit.first().click()
    await this.leftFullSearch.waitFor({ state: 'visible' })
    await expect(this.leftFullSearch).toBeVisible()
  }

  async exchangeAndType() {
    await this.exchange.first().click()
    await this.liveSearch.last().fill('NYSE')
    await this.base.chooseEllipsis('NYSE')
    await this.exchange.nth(1).click()
    await this.base.chooseEllipsis('Stock')
    await this.fullSearchSubmit.first().click()
    await this.base.isActive('Stock')
  }

  async onlyfullSearch() {
    await this.FullSearch.first().fill('uni')
    await this.fullSearchSubmit.first().click()
    await this.page.waitForTimeout(3000)
  }

  async currencyPick() {
    const text1 = await this.tabItem.nth(1).textContent()
    await this.searchFilters.first().click()
    await this.base.chooseEllipsis('USD - US Dollar')
    await this.searchFilters.first().click()
    await this.page.locator('.button_holder .primary').last().click()
    await this.page.waitForTimeout(8000)
    const text2 = await this.tabItem.nth(1).textContent()
    expect(text1).not.toEqual(text2)
  }

  async chooseBond() {
    await this.searchFilters.last().click()
    await this.base.chooseEllipsis('Bond')
    await this.page.locator('.button_holder .primary').last().click()
    await this.page.waitForTimeout(8000)
    await this.base.isActive('Bonds')
  }

  async groupExchanges() {
    const text1 = await this.tabItem.nth(5).textContent()
    await this.GroupExchanges.click()
    await this.page.waitForTimeout(7000)
    const text2 = await this.tabItem.nth(5).textContent()

    expect(text1).not.toEqual(text2)
  }

  async dragAndDropTable() {
    await this.page.dragAndDrop('.securities_search_filter_form .ag-cell-label-container:has-text("Name")', '.securities_search_filter_form .ag-cell-label-container:has-text("Last")')
    await this.page.waitForTimeout(2000)
  }

  async columnPicker() {
    await this.column.click()
    await this.tree.nth(2).click()
    await this.page.waitForTimeout(3000)
    await this.page.locator(".ag-column-select-column-label:has-text('Maturity (Years)')").click()
    await this.page.locator(".ag-column-select-column-label:has-text('Coupon (%)')").click()
    await this.page.locator(".ag-column-select-column-label:has-text('Yield to maturity (%)')").click()
    await this.page.waitForTimeout(3000)
    const allElements = await this.page.locator('.securities_search_filter_form .ag-header-cell-text').allTextContents()
    expect(allElements).toEqual(expect.arrayContaining(['Maturity (Years)', 'Coupon (%)', 'Yield to maturity (%)']))
  }

  async resetColumnPickerBonds() {
    await this.resetButton.click()
    await this.page.waitForTimeout(3000)
    const allElements = await this.page.locator('.securities_search_filter_form .ag-header-cell-text').allTextContents()
    ;['Maturity (Years)', 'Coupon (%)', 'Yield to maturity (%)'].forEach(item => {
      expect(allElements).not.toContain(item)
    })
  }

  async exact() {
    const text1 = await this.tabItem.nth(5).textContent()
    await this.Exact.last().click()
    await this.fullSearchSubmit.nth(2).click()
    await this.page.waitForTimeout(7000)
    const text2 = await this.tabItem.nth(5).textContent()

    expect(text1).not.toEqual(text2)
  }

  async ticker() {
    const text1 = await this.tabItem.nth(5).textContent()
    await this.tickerSymbol.click()
    await this.fullSearchSubmit.nth(2).click()
    await this.page.waitForTimeout(7000)
    const text2 = await this.tabItem.nth(5).textContent()

    expect(text1).not.toEqual(text2)
  }

  async fundSearch() {
    await this.FundSearch.fill('black rock')
    await this.fundType.nth(1).click()
    await this.base.chooseEllipsis('Money Market')
    await this.fundSubmit.click()
    await this.page.waitForTimeout(3000)
    const hrefValue = await this.blackRock.first().getAttribute('href')
    expect(hrefValue).toBe('/funds/details/FU_100073995/overview')
  }

  async simpleSearch() {
    await this.page.locator("[data-rbd-draggable-id='leftFundsSearch'] [type='button']:has-text('Simple search')").click()
    await this.page.waitForTimeout(3000)
    await this.base.isActive('Simple search')
  }

  async expertSearch() {
    await this.fundType.last().click()
    await this.search.fill('Switzerland')
    await this.base.chooseEllipsis('Switzerland')
    await this.page.locator("[data-rbd-draggable-id='leftFundsSearch'] [type='button']:has-text('Expert search')").click()
    await this.page.waitForTimeout(3000)
    await this.base.isActive('Expert search')
  }

  async chooseWLActionButton(name) {
    const countActionButton = await this.WatchlistActionButton.count()
    for (let i = 0; i < countActionButton; ++i) {
      const textWLName = await this.page.locator('.wl_title').nth(i).textContent()
      if (name.includes(textWLName)) {
        await this.WatchlistActionButton.nth(i).click()
        break
      }
    }
  }

  async chooseExpandButton(name) {
    await this.page.waitForTimeout(4000)
    const countExpandButton = await this.collapsedButton.count()
    for (let i = 0; i < countExpandButton; ++i) {
      const textWLName = await this.page.locator('.wl_title').nth(i).textContent()
      console.log(textWLName)
      if (name === textWLName) {
        await this.collapsedButton.nth(i).click()
        break
      }
    }
  }

  async createWL() {
    await this.base.NavigateTo('Watchlists')
    await expect(this.wsCreate.first()).toBeVisible()
    await expect(this.wsCreate.last()).toBeVisible()
  }

  async createNewWL(WL) {
    await this.wsCreate.first().click()
    await this.watchlist.fill(WL)
    await this.watchlistSubmit.click()
    await this.page.locator(`.wl_title:has-text("${WL}")`).waitFor({ state: 'visible' })
    await expect(this.page.locator(`.wl_title:has-text("${WL}")`)).toBeVisible()
  }

  async addAllMembers() {
    await this.page.waitForTimeout(3000)
    await this.page.click('[data-rbd-draggable-id="marketOverviewLeftPanel"] .table_symbol_link:has-text("DAX")', { button: 'right' })
    await this.agMenu.click()
  }

  async existingList() {
    await this.checkMark.first().click()
    await this.displayString.click()
    await expect(this.page.locator('.ellipsis-option').first()).toBeVisible()
  }

  async newList() {
    await this.page.locator("[value='Watchlist']").fill('DAX')
    await this.watchlistSubmit.click()
    await this.page.waitForTimeout(3000)
    await this.base.sidePanelTab('Watchlists')
    await this.page.locator(".wl_title >> text='DAX'").waitFor({ state: 'visible' })
    await expect(this.page.locator('.wl_title >> text="DAX"')).toBeVisible()
    await this.base.NavigateTo('Watchlists')
    await this.base.chooseHeaderTab('All Watchlists', 'All Watchlists')
    await this.page.locator('.exp-handle').click()
    await expect(this.page.locator('.tab-content-txt >> text="DAX"')).toBeVisible()
  }

  async deleteDax() {
    await this.chooseWLActionButton('DAX')
    await this.page.locator(".action-list-item:has-text('Delete watchlist')").click()
    await this.page.locator('.deleteButton').click()
  }

  async renameWL() {
    await this.chooseWLActionButton('WL2')
    await this.renameWatchlistActionList.click()
    await this.renameWlField.fill('WL7')
    await this.watchlistSubmit.click()
    await expect(this.page.locator(".wl_title:has-text('WL7')")).toBeVisible()
  }

  async collapseClick() {
    await this.collapsedButton.nth(5).click()
    if ((await this.page.locator('.collapse_all_watchlists i').count()) > 0) {
      const classAttribute = await this.page.locator('.collapse_all_watchlists i').getAttribute('class')
      console.log(classAttribute)
      if (classAttribute === 'ws_colapse') {
        await this.collapse.click()
      }
    }
  }

  async minWL() {
    await this.collapseClick()
    await this.chooseWLActionButton('123')
    let expectedArray = ['Rename watchlist', 'Add to workspace', 'Delete watchlist']
    let allTexts = await this.actionList.allTextContents()
    console.log(allTexts)
    if (JSON.stringify(allTexts) !== JSON.stringify(expectedArray)) {
      await this.collapsedButton.nth(1).click()
      await this.actionButton.first().click()
      expectedArray = ['Rename watchlist', 'Add to workspace', 'Delete watchlist']
      allTexts = await this.actionList.allTextContents()
    }
    expect(allTexts).toEqual(expectedArray)
  }

  async expandWL() {
    await this.chooseExpandButton('123')
    await this.chooseWLActionButton('123')
    let expectedArray = ['Delete symbol', 'Rename watchlist', 'Add to workspace', 'Delete watchlist', 'Add all members to watchlist', 'Copy as RTD link', 'Download as CSV', 'Copy as Text']
    let allTexts = await this.actionList.allTextContents()
    if (JSON.stringify(allTexts) !== JSON.stringify(expectedArray)) {
      await this.collapsedButton.nth(1).click()
      await this.actionButton.first().click()
      expectedArray = ['Delete symbol', 'Rename watchlist', 'Add to workspace', 'Delete watchlist', 'Add all members to watchlist', 'Copy as RTD link', 'Download as CSV', 'Copy as Text']
      allTexts = await this.actionList.allTextContents()
    }
    expect(allTexts).toEqual(expectedArray)
  }

  async deleteSymbol() {
    await this.collapseClick()
    await this.page.locator('.aside-widgets-wrapper .ws_clear').click()
    await this.chooseExpandButton('DAX')
    await this.page.waitForTimeout(4000)
    const count1 = await this.page.locator('.aside-widgets-wrapper .table_symbol_link').count()
    await this.chooseWLActionButton('DAX')
    await this.page.locator(".action-list-item:has-text('Delete symbol')").click()
    await this.page.locator('.aside-widgets-wrapper .ws_clear').nth(1).click()
    await this.chooseWLActionButton('DAX')
    await this.page.locator(".action-list-item:has-text('Finish deleting symbols')").click()
    await this.page.waitForTimeout(4000)
    const count2 = await this.page.locator('.aside-widgets-wrapper .table_symbol_link').count()
    expect(count1).not.toEqual(count2)
  }

  async shareWatchList(button) {
    const count1 = await this.shareWL.count()
    await this.watchListUser.first().click()
    await this.page.locator(`[type='button']:has-text("${button}")`).click()
    await this.page.waitForTimeout(2000)
    const count2 = await this.shareWL.count()
    expect(count1).not.toEqual(count2)
  }

  async addColumn() {
    await this.collapseClick()
    await this.collapsedButton.nth(1).click()
    await this.page.waitForTimeout(2000)
    await this.sideColumnPicker.click()
    await this.sideIconTree.nth(3).click()
    await this.page.locator('.aside-widgets-wrapper .ag-checkbox-input').last().click()
    await expect(this.page.locator('.content').last()).toHaveText('Maximum of 4 columns allowed! Please remove a column, before you add a new column!')
    await this.page.locator(".content_wrapper [type='button']:has-text('OK')").click()
  }

  async columnPickerOptions() {
    let verify
    await this.sideColumnPicker.click()
    await this.sideIconTree.nth(1).click()
    await this.page.locator(".ag-column-select-column-label:has-text('Chg. (%)')").click()
    await this.page.locator(".ag-column-select-column-label:has-text('Date/Time')").click()
    await this.page.locator('.ag-column-select .slider').click()
    await this.sideIconTree.nth(2).click()
    await this.page.locator(".ag-column-select-column-label:has-text('Currency')").click()
    await this.sideColumnPicker.click()
    const array1 = await this.page.locator('.aside-widgets-wrapper .ag-header-cell-text').allTextContents()
    if (array1.includes('Currency')) {
      verify = 1
    }
    expect(verify).toBe(1)
    await this.collapseClick()
    await this.collapsedButton.nth(2).click()
    const array2 = await this.page.locator('.aside-widgets-wrapper .ag-header-cell-text').allTextContents()
    if (!array2.includes('Currency')) {
      verify = 1
    } else {
      verify = 0
    }
    expect(verify).toBe(1)
  }

  async resetColumnPicker() {
    let verify
    await this.collapseClick()
    await this.collapsedButton.nth(1).click()
    await this.page.waitForTimeout(3000)
    await this.sideColumnPicker.click()
    await this.page.waitForTimeout(3000)
    await this.page.locator('.aside-widgets-wrapper .ag-buttons-reset').click()
    await this.sideColumnPicker.click()
    await this.page.locator(".aside-widgets-wrapper .ag-header-cell-text:has-text('Chg. (%)')").waitFor({ state: 'visible' })
    const array = await this.page.locator('.aside-widgets-wrapper .ag-header-cell-text').allTextContents()
    if (array.includes('Chg. (%)') && array.includes('Date/Time')) {
      verify = 1
    }
    expect(verify).toBe(1)
  }

  async moveWLDown() {
    await this.page.locator('.ws_move_widget_down').first().click()
  }

  async pinDax() {
    await this.page.locator('.ws_pin_to_top').nth(1).click()
    await this.page.waitForTimeout(2000)
    const count = await this.page.locator('.aside-widgets-wrapper .ws_clear').count()
    expect(count).toBe(1)
    await this.page.locator('.aside-widgets-wrapper .ws_clear').click()
  }

  async compareSymbols() {
    const clearButton = this.page.locator('.aside-widgets-wrapper .ws_clear')
    if (await clearButton.isVisible()) {
      await clearButton.click()
    }

    await this.collapseClick()
    await this.chooseExpandButton('123')
    await this.page.waitForTimeout(3000)
    await this.page.locator('.ag-checkbox-input').nth(10).click()
    await this.page.locator('.ag-checkbox-input').nth(11).click()
    await this.page.locator("[role='presentation']:has-text('Compare selected symbols')").click()
    await expect(this.compareTitle.first()).toHaveText('Securities comparison')
    await expect(this.compareTitle.nth(1)).toHaveText('Risk-Return Matrix Comparison')
    await expect(this.compareTitle.last()).toHaveText('Instruments')
  }

  async dragAndDropToChart() {
    await this.page.dragAndDrop('[data-rbd-draggable-id="marketOverviewLeftPanel"] .table_symbol_link >> text="DAX"', '.chart_components_wrapper')
    await expect(this.chartSymbol.last()).toHaveText('DAX')
  }

  async dotMatrix() {
    await this.dot.first().hover()
    await this.page.waitForSelector('.highcharts-series-hover', { state: 'visible', timeout: 2000 })
    await expect(this.highChart.first()).toBeVisible()
  }

  async StaticDynamicRiskMatrix() {
    await this.page.locator("[type='button']:has-text('Dynamic risk matrix')").click()
    await expect(this.page.locator("[type='button']:has-text('Static risk matrix')")).toBeVisible()
  }

  async hoverOver() {
    await this.CompareSymbolsWL.first().hover()
    await this.page.waitForSelector('.app-container .table_symbol_link', { state: 'visible', timeout: 3000 })
    await expect(this.page.locator("[visibility='visible']").first()).toBeVisible()
  }

  async makeFundsWatchlist() {
    await this.base.NavigateTo('Funds')
    await this.page.locator('.markets_table_wrapper .table_symbol_link').first().click({ button: 'right' })
    await this.agMenu.click()
    await this.typeWatchlistName.fill('111')
    await this.saveWatchlistButton.click()
  }

  async fundsComparison() {
    await this.cancelButton.click()
    await this.collapseClick()
    await this.chooseExpandButton('111')
    await this.page.locator('.checkmark').last().click()
    await this.page.waitForTimeout(3000)
    await this.page.locator('.ag-checkbox-input').nth(10).click()
    await this.page.locator('.ag-checkbox-input').nth(11).click()
    await expect(this.page.locator('text=Compare selected funds')).toBeVisible()
  }

  async fundsComparePage() {
    await this.page.click('text="Compare selected funds"')
    await this.page.waitForTimeout(3000)
    await expect(this.compareTitle).toHaveText('Fund comparison')
    await this.page.locator('.display-string').last().click()
    await this.base.chooseEllipsis('Countries')
    await this.page.waitForSelector('#pie-highchart-funds-comparison-pie-chart0', { state: 'visible' })
    await expect(this.comparisonPie).toBeVisible()
  }

  async deleteWL(name) {
    await this.chooseWLActionButton(name)
    await this.page.locator(".action-list-item:has-text('Delete watchlist')").click()
    await this.page.locator('.deleteButton').click()
  }

  async favorites() {
    await this.page.locator("[placeholder='Search']").fill('Apple')
    await this.symbolName.first().click()
    await this.page.waitForTimeout(3000)
    await this.page.locator('.header-control').nth(4).click()
    await this.base.chooseSymbolTab('Technical')
    await this.page.waitForTimeout(3000)
    await this.page.locator('.header-control').nth(4).click()
    await expect(this.shortName.first()).toHaveText('Apple Inc - Overview')
    await expect(this.shortName.last()).toHaveText('Apple Inc - Technical')
    await expect(this.page.locator('text=Most recently visited securities')).toBeVisible()
  }

  async editFavorites() {
    this.EditFavorites.click()
    await expect(this.favoritesDrag.first()).toBeVisible()
    await expect(this.favoritesRename.first()).toBeVisible()
    await expect(this.FavoritesDelete.first()).toBeVisible()
  }

  async favoritesDragAndDrop() {
    await this.page.dragAndDrop('.short_name:has-text("Apple Inc - Overview")', '.short_name:has-text("Apple Inc - Technical")')
    await expect(this.shortName.last()).toHaveText('Apple Inc - Overview')
    await expect(this.shortName.first()).toHaveText('Apple Inc - Technical')
  }

  async deleteFavorites() {
    await this.FavoritesDelete.first().click()
    await this.page.waitForTimeout(2000)
    const count = await this.shortName.count()
    expect(count).toEqual(1)
  }

  async renameFavorites() {
    await this.favoritesRename.click()
    await this.inputField.fill('Renamed Symbol')
    await this.check.first().click()
    await expect(this.shortName).toHaveText('Renamed Symbol')
    await this.favoritesRename.click()
    await this.iconButton.nth(1).click()
    await expect(this.shortName).toHaveText('Renamed Symbol')
    await this.favoritesRename.click()
    await this.iconButton.nth(2).click()
    await expect(this.shortName).toHaveText('Apple Inc - Overview')
  }
}

module.exports = { OverviewPage }
