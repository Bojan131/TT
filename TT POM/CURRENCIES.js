const {expect} = require("@playwright/test");
const {Base} = require("../TT Utils/Base");
const exp = require("constants");
const { globalAgent } = require("https");

class CURRENCIES{
    constructor(page){
this.page = page;
this.base = new Base(page);
this.tableHeaderText = page.locator(".page-content .ag-header-cell-text");
this.tabItem = page.locator(".tab-item");
this.tableTitle = page.locator(".page-content .title");
this.columnPickerLabel = page.locator(".ag-column-select-column-label");
this.columnPicker = page.locator(".ag-side-button-label");
this.columnPickerArrow = page.locator(".ag-icon-tree-closed");
this.EurUsdsymbol = page.locator(".page-content .table_symbol_link:has-text('EUR/USD Spot')");
this.sidePanelEurUsdSymbol = page.locator("[data-rbd-draggable-id='currenciesLeftPanel'] .table_symbol_link:has-text('EUR/USD Spot')");
this.headerName = page.locator(".header-name");
this.crossRatesContent = page.locator(".page-content .ag-body-viewport");
this.currencycalculator = page.locator(".page-content .justify-space-between:has-text('Currency calculator')");
this.economicData = page.locator(".page-content .justify-space-between:has-text('Economic Data')");
this.calculatorField = page.locator(".cb_options");
this.calculatorinputField = page.locator(".currency_calculator_input");
this.currentDayCalendar = page.locator(".react-calendar__tile--now");
this.calendarButton = page.locator(".react-date-picker__inputGroup");
this.calendarActiveDay = page.locator(".react-calendar__tile--active");
this.japanFlag = page.locator(".page-content .flag-icon-jp");
this.cryptosHeader = page.locator(".page-content .justify-space-between:has-text('Cryptos')");
this.bitCoin = page.locator(".page-content .table_symbol_link:has-text('Bitcoin')")
this.cryptoNewsHeader = page.locator(".page-content .justify-space-between ");
this.newsTitle = page.locator(".news-section-title");

    }

    async Currencies(){

        await this.page.waitForSelector(".tab-item", { state: 'visible'});
        await this.base.isActive("overview");
        await this.page.waitForSelector(".ag-header-cell-text:has-text('Name')", { state: 'visible'});
        const expectedTexts = [
            "Name", "Last", "Chg. (%)", "1Y (%)", "3Y (%)","YTD (%)"
          ];
          await this.base.checkItems(this.tableHeaderText,expectedTexts);
          const expectedTexts2 = [
            "overview", "EUR", "USD", "GBP", "JPY","CHF","AUD","CAD","HKD","SGD"
          ];
          await this.base.checkItems(this.tabItem,expectedTexts2);
          await expect(this.tableTitle.first()).toBeVisible();

    }

    async currenciesColumnPicker(){

        
        await this.columnPicker.click();
       const expectedTexts = [
        "Active Columns", "Basic values", "Performance","Financials"
      ];
      await this.base.checkItems(this.columnPickerLabel,expectedTexts);
      
    }

    async currenciesEurButton(){

        await this.base.chooseSymbolTab("EUR");
        await this.page.waitForSelector(".ag-header-cell-text:has-text('Name')", { state: 'visible'});
        const expectedTexts = [
            "Name", "Last", "Chg. (%)", "1Y (%)", "3Y (%)","YTD (%)"
          ];
          await this.base.checkItems(this.tableHeaderText,expectedTexts);
    }

    async EurUsdSymbol(){

        await this.EurUsdsymbol.click();
        await expect(this.headerName).toHaveText("EUR/USD Spot");
        await this.base.sidePanelTab("Markets");
        await this.sidePanelEurUsdSymbol.click();
        await expect(this.headerName).toHaveText("EUR/USD Spot");
        await this.base.chooseSymbolTab("overview");
    }

    async crossRates(){

        await this.page.waitForSelector(".page-content .ag-body-viewport", { state: 'visible'});
        await expect(this.crossRatesContent).toBeVisible();
        await expect(this.currencycalculator).toBeVisible();
        await expect(this.economicData).toBeVisible();
    }

    async crossRatesCalculator() {
        await this.calculatorField.first().click();
        await this.base.chooseEllipsis("GBP - British pound");
        await this.calculatorField.last().click();
        await this.base.chooseEllipsis("NOK - Norwegian krone");
        await this.calculatorinputField.first().fill("5");
        await this.page.waitForSelector(".currency_calculator_input", { state: 'visible' });
        await expect(this.calculatorinputField.last()).toHaveValue(/.+/); // Expect to have any value
    }

    async calculatorDragAndDrop(){


        await this.page.waitForSelector(".page-content .ag-body-viewport", { state: 'visible'});
        await this.page.dragAndDrop(
            ".page-content .flag-icon-jp:nth-of-type(1)", 
            ".cb_options:nth-of-type(1)"
          );
          await this.page.waitForTimeout(5000);
          await this.calculatorinputField.first().fill("2");
          await expect(this.calculatorinputField.last()).toHaveValue(/.+/);
    }

    async Cryptos(){

        await this.page.waitForSelector(".page-content .ag-center-cols-container", { state: 'visible'});
        await expect(this.cryptosHeader).toBeVisible();
        await this.page.waitForSelector(".page-content .ag-header-cell-text", { state: 'visible'});
        const expectedTexts = [
            "Name", "Price (USD)", "Chg% (24h)", "Vol (24h)","Total Vol% (24h)","Market Cap","Sharpe Ratio (1Y)","Chg% (7D)","Price (BTC)","Symbol","Mountain-View Rating"
          ];
          await this.base.checkItems(this.tableHeaderText,expectedTexts);

    }

    async Bitcoin(){

        await this.page.click('.page-content .table_symbol_link >> text="Bitcoin"'); // Click on exactly that text
        await this.page.waitForSelector(".header-name", { state: 'visible'});
        await expect(this.headerName).toHaveText("BTC/USD");
        
    }
    
    async CryptoPairs(){

        await this.page.waitForSelector(".page-content .ag-group-value", { state: 'visible'});
        await expect(this.page.locator(".page-content .ag-group-value").first()).toBeVisible();
        await this.columnPicker.click();
       const expectedTexts = [
        "Active Columns", "Basic values", "Performance","Financials"
      ];
      await this.base.checkItems(this.columnPickerLabel,expectedTexts);

    }

    async CryptoCurrenciesNews(){

        await expect(this.cryptoNewsHeader).toHaveText("Comparison chart");
        await expect(this.newsTitle).toHaveText("Crypto currency news");

    }
}

module.exports = {CURRENCIES};