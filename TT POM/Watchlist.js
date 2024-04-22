const { expect } = require('@playwright/test')
const { Base } = require('../TT Utils/Base')
const exp = require('constants')
const { globalAgent } = require('https')

class Watchlist extends Base {
  constructor(page) {
    super(page)
    this.page = page
    this.addNewWatchlist = page.locator('.add-new-list')
    this.newWLField = page.locator("[value='Watchlist']")
    this.createWLButton = page.locator(".create_wl_form_wrapper [type='submit']")
    this.wl3Name = page.locator(".wl_name:has-text('WL3')")
    this.wl3Title = page.locator(".wl_title:has-text('WL3')")
    this.wl456Title = page.locator(".wl_title:has-text('456')")
    this.wl3PersnomalWatchlist = page.locator(".wl_name:has-text('WL3')")
    this.tabContent = page.locator('.tab-content-txt')
    this.tableWidget = page.locator('.page_content .table-widget')
    this.shareWatchlistIcon = page.locator('.watchlist_user_icons')
    this.shareWatchlistButton = page.locator('.footer .primary').last()
    this.sharedWL = page.locator('.shared')
    this.exitEditingButton = page.locator('.nav-title').nth(9)
    this.addTitle = page.locator('.ws_add_title')
    this.removeSymbolButton = page.locator('.page_content .ws_clear')
    this.dragButton = page.locator('.all_watchlist_page .ag-icon')
    this.editWatchListButton = page.locator("[data-test-name='Edit watchlist']").last()
    this.exitEditingButton = page.locator("[data-test-name='Exit editing']").last()
    this.wlHande = page.locator('.exp-handle')
    this.sideWidgetDaxSymbol = page.locator('.aside_widget_content .table_symbol_link >> text="DAX"')
    this.AddTitle = page.locator('.ws_add_title')
    this.addAllMembersToList = page.locator(".ag-menu-option-text:has-text('Add all members to watchlist')")
    this.checkMark = page.locator('.checkmark')
    this.displayString = page.locator('.content_wrapper .display-string')
    this.symbolDAX = page.locator(".page-content .table_symbol_link >> text='DAX'")
    this.submitButton = page.locator(".add_to_wl_form_wrapper [type='submit']")
    this.headerName = page.locator("[name='headerName']")
    this.addButton = page.locator(".content_wrapper [type='submit']")
    this.headerName = page.locator("[name='headerName']")
    this.editTitleHeader = page.locator("[title='Change']")
    this.newHeaderName = page.locator("[name='newHeaderName']")
    this.headerName2 = page.locator('.page-content .wl_header_name')
    this.remove = page.locator('.ws_clear')
    this.renameWLField = page.locator("[name='newWatchlistName']")
    this.watchListName = page.locator('.wl_name')
    this.deleteButton = page.locator('.deleteButton')
    this.personalWatchlistMessage = page.locator('.message_content')
    this.watchlistChooseField = page.locator('.display-string')
    this.tooltipOption = page.locator('.nav-icon')
    this.quoteboardsBlock = page.locator('.qb-block')
    this.chartImage = page.locator('.ws-image-chart')
    this.wlSearchField = page.locator(".personal_wl_select_wrapper [placeholder='Search']")
    this.searchInput = page.locator(".search_input [placeholder='Search']")
  }

  async watchlist() {
    await this.isActive('Personal Watchlist Overview')
  }

  async addNewWL() {
    await this.addNewWatchlist.click()
    await this.newWLField.fill('WL3')
    await this.createWLButton.click()
    await this.page.waitForTimeout(5000)
    await this.sidePanelTab('Watchlists')
    await this.page.waitForSelector('.wl_name', { state: 'visible' })
    await expect(this.wl3Name).toBeVisible()
    await expect(this.wl3Title).toBeVisible()
  }

  async dragAndDropSymbol() {
    await this.sidePanelTab('Markets')
    await this.page.dragAndDrop("[data-rbd-draggable-id='marketOverviewLeftPanel'] .table_symbol_link >> text='DAX'", '.page_content .table-widget')
    await expect(this.symbolDAX).toBeVisible()
    await this.shareWatchlistIcon.click()
    await this.shareWatchlistButton.click()
    await this.page.waitForSelector('.watchlist_user_icons', { state: 'visible' })
    await expect(this.shareWatchlistIcon).toHaveClass(/.*shared.*/)
    await this.sideWidgetDaxSymbol.click({ button: 'right' })
    await this.addAllMembersToList.click()
    await this.checkMark.first().click()
    await this.displayString.click()
    await this.searchInput.fill('WL3')
    await this.chooseEllipsis('WL3')
    await this.submitButton.click()
    await this.sidePanelTab('Watchlists')
    await this.page.waitForTimeout(5000)
    const count = await this.sharedWL.count()
    console.log(count)
    expect(count).toEqual(2)
    await this.sidePanelTab('Markets')
  }

  async clickOnWL3() {
    await this.wlHande.click()
    const Tab = this.page.locator(".tab-content-txt:has-text('WL3')")
    await Tab.evaluate(node => node.click())
  }

  async editWatchlist() {
    await this.editWatchListButton.click()
    await expect(this.exitEditingButton.first()).toBeVisible()
    await expect(this.page.locator('[data-test-name="Import symbols from excel/csv file"]')).toBeHidden()
    await expect(this.addTitle).toBeVisible()
    await this.page.waitForSelector(".tabs_content .table_symbol_link:has-text('DAX')", { state: 'visible' })
    await expect(this.removeSymbolButton.first()).toBeVisible()
    await expect(this.dragButton.nth(12)).toBeVisible()
  }

  async addTitleWL() {
    await this.AddTitle.click()
    await this.headerName.fill('Header 1')
    await this.addButton.click()
    await expect(this.headerName.first()).toBeVisible()
  }

  async editTitle() {
    await this.editTitleHeader.first().click()
    await this.newHeaderName.fill('Header 2')
    await this.addButton.click()
    await expect(this.headerName2.first()).toHaveText('Header 2')
  }

  async deleteSymbol() {
    const count1 = await this.remove.count()
    await this.remove.nth(2).click()
    await this.page.waitForTimeout(2000)
    const count2 = await this.remove.count()
    expect(count1).not.toEqual(count2)
  }

  async exitEditing() {
    await this.exitEditingButton.click()
    await expect(this.exitEditingButton.first()).not.toBeVisible()
    await expect(this.page.locator('[data-test-name="Import symbols from excel/csv file"]').last()).toBeVisible()
    await expect(this.addTitle).not.toBeVisible()
    await expect(this.removeSymbolButton).not.toBeVisible()
    await expect(this.dragButton.nth(12)).not.toBeVisible()
  }

  async RenameWatchList() {
    await this.page.locator("[data-test-name='Rename watchlist']").last().click()
    await this.renameWLField.fill('WatchList 3')
    await this.addButton.click()
    await this.page.waitForSelector('.wl_name', { state: 'visible' })
    await expect(this.watchListName).toHaveText('WatchList 3')
  }

  async newBrowserWindow(browser) {
    const { context, page } = await this.newWindowLogin(browser)
    await this.NavigateToNewBrowser(page, 'Watchlists')
    await this.chooseHeaderTabNewBrowser(page, 'All Watchlists', 'All Watchlists')
    await page.waitForSelector('.tab-content-txt', { state: 'visible' })
    const count1 = await page.locator('.tab-content-txt').count()
    const [newPage] = await Promise.all([context.waitForEvent('page'), page.locator("[data-test-name='Open in new browser window']").last().click()])
    await newPage.waitForSelector('.tab-content-txt', { state: 'visible' })
    const count2 = await newPage.locator('.tab-content-txt').count()
    expect(count1).toEqual(count2)
    let verify
    const count = await newPage.locator('.active').count()
    for (let i = 0; i < count; ++i) {
      const text = await newPage.locator('.active').nth(i).textContent()
      console.log(text)
      if (text.includes('WatchList 3')) {
        verify = 1
        break
      }
    }
    expect(verify).toEqual(1)
    await newPage.waitForSelector('[data-test-name="Import symbols from excel/csv file"]', { state: 'hidden' })
    await expect(newPage.locator('[data-test-name="Import symbols from excel/csv file"]').last()).toBeHidden()
    await expect(newPage.locator('.aside-widgets-wrapper')).toBeHidden()
    await expect(newPage.locator('.navigation-title')).toBeHidden()
    await expect(newPage.locator('.ticker-container')).not.toBeHidden()
  }

  async mergeGroups() {
    const count1 = await this.page.locator('.page-content  .wl_header_name').count()
    await this.page.locator('.nav-option').last().click()
    await this.page.waitForTimeout(5000)
    const count2 = await this.page.locator('.page-content  .wl_header_name').count()
    expect(count1).not.toEqual(count2)
  }

  async deleteWL() {
    await this.page.locator("[data-test-name='Delete watchlist']").last().click()
    await this.deleteButton.click()
    await expect(this.page.locator('.tab-content-txt:has-text("WatchList 3")')).toBeHidden()
    await expect(this.page.locator('.wl_title:has-text("WatchList 3")')).toBeHidden()
  }

  async personalWatchlist() {
    await expect(this.addNewWatchlist).toBeVisible()
    await expect(this.page.locator('.display-string')).toHaveText('Add watchlist to overview')
    await this.watchlistChooseField.click()
    await this.wlSearchField.fill('123')
    await this.chooseEllipsis('123')
    await this.page.waitForSelector('.nav-icon', { state: 'visible' })
    await expect(this.tooltipOption.first()).toBeVisible()
    await expect(this.page.locator('[data-test-name="Remove from overview"]').last()).toBeVisible()
  }

  async quoteBoards() {
    await this.page.locator("[data-test-name='Quoteboard']").first().click()
    await expect(this.quoteboardsBlock.first()).toBeVisible()
  }

  async chooseChart() {
    await this.page.waitForSelector("[data-test-name='Charts']", { state: 'visible' })
    await this.page.locator("[data-test-name='Charts']").first().click()
    await expect(this.chartImage.first()).toBeVisible()
  }

  async dragAndDropSymbolToPersonalWL() {
    await this.sidePanelTab('Markets')
    await this.page.dragAndDrop('.aside_widget_content .table_symbol_link:has-text("DAX")', '.page_content .table-widget')
    await expect(this.symbolDAX).toBeVisible()
  }

  async removeFromOverview() {
    await this.page.locator("[data-test-name='Remove from overview']").nth(1).click()
    await this.page.waitForTimeout(2000)
    const count = await this.watchListName.count()
    expect(count).toEqual(1)
  }
}

module.exports = { Watchlist }
