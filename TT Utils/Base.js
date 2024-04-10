const { expect } = require('@playwright/test')
class Base {
  constructor(page) {
    this.page = page
  }
  async checkSymbol(Locator2, Locator3, Locator1 = null, Locator4 = null) {
    //Locator1 -> If it has chain locator
    //Locator4 -> If it has to click on different locator than text
    //await checkSymbol(Locator2Value, Locator3Value, undefined, Locator4Value);
    // For calling locator 4 and skipping locator 3
    const targetLocator2 = Locator1 ? Locator1.locator(Locator2) : Locator2
    const count = await targetLocator2.count()
    for (let i = 0; i < count; ++i) {
      const text1 = await targetLocator2.nth(i).textContent()
      console.log(text1)
      const targetLocator1 = Locator4 ? Locator1.locator(Locator4) : Locator1.locator(Locator2)
      await targetLocator1.nth(i).click()
      await this.page.waitForTimeout(3000)
      const text2 = await Locator3.textContent()
      expect(text1).toEqual(text2)
      break
    }
  }

  async isActive(data) {
    let verify
    const count = await this.page.locator('.active').count()
    for (let i = 0; i < count; ++i) {
      const text = await this.page.locator('.active').nth(i).textContent()
      console.log(text)
      if (text.includes(data)) {
        verify = 1
        break
      }
    }
    expect(verify).toEqual(1)
  }

  async NavigateTo(option) {
    const navigationTitle = this.page.locator('.navigation-title')
    const count = await navigationTitle.count()
    for (let i = 0; i < count; ++i) {
      const text = await navigationTitle.nth(i).textContent()
      console.log(text)
      if (text === option) {
        await navigationTitle.nth(i).click()
        break
      }
    }
    await this.page.waitForTimeout(5000)
  }

  async optionPicker(option, tab) {
    const optionpicker = this.page.locator('.accordion-title-text')
    const OptionButton = this.page.locator('.open_drawer')
    const OptionTab = this.page.locator(`.drawer-tabs [type='button']:has-text("${tab}")`)
    await OptionButton.last().click()
    await OptionTab.click()
    const count = await optionpicker.count()
    for (let i = 0; i < count; ++i) {
      const text = await optionpicker.nth(i).textContent()
      if (text === option) {
        await optionpicker.nth(i).click()
        break
      }
    }
  }

  async newWindowLogin(browser) {
    const context = await browser.newContext()
    const page = await context.newPage()
    const username = page.getByPlaceholder('Username')
    const password = page.getByPlaceholder('Password')
    const login = page.locator('#loginUser')
    await page.goto('https://webstation.baha.com/etfs/usa')
    await username.fill('bojan.colic23')
    await password.fill('Bb14011999')
    await login.click()
    await page.waitForTimeout(8000)
    return { context, page }
  }

  async deactivateActivateTicker(number, state) {
    const tickerDrawer = this.page.locator('.drawer-control .slider')
    const tickerWrapper = this.page.locator('.ticker_settings_wrapper')
    const count = await tickerWrapper.count()
    let actionIndex

    switch (number) {
      case 'Ticker1':
        actionIndex = 3
        break
      case 'Ticker2':
        actionIndex = 4
        break
      case 'Ticker3':
        actionIndex = 5
        break
      default:
        console.log('Invalid ticker number')
        return
    }

    for (let i = 0; i < count; ++i) {
      const text = await tickerWrapper.nth(i).textContent()

      // Determining action based on text and desired state
      if ((state === 'on' && text.includes('Activate')) || (state === 'off' && text.includes('Deactivate'))) {
        // Needs to toggle the state once
        await tickerDrawer.nth(actionIndex).click()
        await this.page.waitForTimeout(2000)
      } else if ((state === 'on' && text.includes('Deactivate')) || (state === 'off' && text.includes('Activate'))) {
        // Already in desired state but needs to ensure it stays or switches
        await tickerDrawer.nth(actionIndex).click()
        await this.page.waitForTimeout(2000)
        // Click again to ensure it either stays in the same state or toggles as needed
        await tickerDrawer.nth(actionIndex).click()
        await this.page.waitForTimeout(2000)
      }
      break // Assuming the action is required only for the first matching condition
    }
    await this.page.waitForTimeout(5000) // Additional wait if needed
  }

  async toolTip(option) {
    await this.page.waitForSelector('.enable-tooltip', { state: 'visible' })
    const elements = this.page.locator('.enable-tooltip')
    const count = await this.page.locator('.enable-tooltip').count()
    console.log(count)
    for (let i = 0; i < count; ++i) {
      const dataTestName = await elements.nth(i).getAttribute('data-test-name')
      console.log(dataTestName)
      if (dataTestName.includes(option)) {
        await elements.nth(i).click()
        break
      }
    }
  }

  async chooseEllipsis(option) {
    const ellipsis = this.page.locator('.ellipsis-option')
    const count = await ellipsis.count()
    for (let i = 0; i < count; ++i) {
      const text = await ellipsis.nth(i).textContent()
      if (text === option) {
        await ellipsis.nth(i).click()
        break
      }
    }
  }

  async checkChart() {
    const EmptyChart = this.page.locator('.empty_chart_image')
    await expect(EmptyChart).toBeHidden()
    const currentUrl = this.page.url()
    expect(currentUrl).toContain('chart')
  }

  async resetData() {
    await this.page.locator('.search-container').click()
    await this.optionPicker('User specific settings', 'General')
    await this.page.locator('.checkmark').last().click()
    await this.page.locator('.deleteButton').click()
    await this.page.waitForSelector('.table-widget', { state: 'visible' })
  }

  async sidePanelTab(tab) {
    await this.page.locator(`.tab:has-text("${tab}")`).click()
  }

  async chooseHeaderTab(active, option) {
    const activeHeader = this.page.locator('.nav-link_active')
    const header = this.page.locator('.page-main-header a')
    const count = await header.count()
    const activeText = await activeHeader.textContent()
    if (activeText === active) {
    } else {
      for (let i = 0; i < count; ++i) {
        const text = await header.nth(i).textContent()
        if (text === option) {
          await header.nth(i).click()
          break
        }
      }
    }
  }

  async reloadPage() {
    await this.page.reload()
    await this.page.waitForTimeout(8000)
  }

  async checkIndexPosition(locator, string, index) {
    let verify
    let array = []
    const count = await this.page.locator(locator).count()
    console.log(count)
    for (let i = 0; i < count; ++i) {
      const text = await this.page.locator(locator).nth(i).textContent()
      array.push(text)
    }
    if (array[index].includes(string)) {
      verify = 1
    }
    console.log(array)
    expect(verify).toEqual(1)
  }

  async chooseSymbolTab(tab) {
    const count = await this.page.locator('.tab-item').count()
    for (let i = 0; i < count; ++i) {
      const text = await this.page.locator('.tab-item').nth(i).textContent()

      if (text === tab) {
        await this.page.locator('.tab-item').nth(i).click()
        break
      }
    }
  }

  async chooseSymbol(element) {
    await this.page.locator(`.tabs_content .table_symbol_link:has-text("${element}")`).first().click()
  }

  async checkSecurity(element, title) {
    await this.page.waitForSelector('.page-title', { state: 'visible' })
    await expect(this.page.locator('.header-name')).toHaveText(element)
    await expect(this.page.locator('.page-title')).toHaveText(title)
  }

  async checkItems(locator, expectedTexts) {
    await this.page.waitForTimeout(4000)
    let allTexts = await locator.allTextContents()
    allTexts = allTexts.map(text => text.trim())
    console.log(allTexts)
    expectedTexts.forEach(expectedText => {
      expect(allTexts).toContain(expectedText)
    })
  }

  async activeToolBar(number) {
    await expect(this.page.locator('.nav-option').nth(number)).toHaveClass(/.*nav-toolbar-tabs-active.*/)
  }

  async NavigateToNewBrowser(page = this.page, option) {
    const navigationTitle = page.locator('.navigation-title')
    const count = await navigationTitle.count()
    for (let i = 0; i < count; ++i) {
      const text = await navigationTitle.nth(i).textContent()
      console.log(text)
      if (text === option) {
        await navigationTitle.nth(i).click()
        break
      }
    }
    await page.waitForTimeout(5000)
  }

  async optionPickerNewBrowser(page = this.page, option, tab) {
    const optionpicker = page.locator('.accordion-title-text')
    const OptionButton = page.locator('.open_drawer')
    const OptionTab = page.locator(`.drawer-tabs [type='button']:has-text("${tab}")`)
    await OptionButton.last().click()
    await OptionTab.click()
    const count = await optionpicker.count()
    for (let i = 0; i < count; ++i) {
      const text = await optionpicker.nth(i).textContent()
      if (text === option) {
        await optionpicker.nth(i).click()
        break
      }
    }
  }

  async chooseEllipsisNewBrowser(page = this.page, option) {
    const ellipsis = page.locator('.ellipsis-option')
    const count = await ellipsis.count()
    for (let i = 0; i < count; ++i) {
      const text = await ellipsis.nth(i).textContent()
      if (text === option) {
        await ellipsis.nth(i).click()
        break
      }
    }
  }

  async checkChartNewBrowser(page = this.page) {
    const EmptyChart = page.locator('.empty_chart_image')
    await expect(EmptyChart).toBeHidden()
    const currentUrl = page.url()
    expect(currentUrl).toContain('chart')
  }

  async chooseHeaderTabNewBrowser(page = this.page, active, option) {
    const activeHeader = page.locator('.nav-link_active')
    const header = page.locator('.page-main-header a')
    const count = await header.count()
    const activeText = await activeHeader.textContent()
    if (activeText === active) {
    } else {
      for (let i = 0; i < count; ++i) {
        const text = await header.nth(i).textContent()
        if (text === option) {
          await header.nth(i).click()
          break
        }
      }
    }
  }

  async chooseHeaderTabNewBrowser(page = this.page, active, option) {
    const activeHeader = page.locator('.nav-link_active')
    const header = page.locator('.page-main-header a')
    const count = await header.count()
    const activeText = await activeHeader.textContent()
    if (activeText === active) {
    } else {
      for (let i = 0; i < count; ++i) {
        const text = await header.nth(i).textContent()
        if (text === option) {
          await header.nth(i).click()
          break
        }
      }
    }
  }
}
module.exports = { Base }
