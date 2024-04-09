const {expect} = require("@playwright/test");
const {Base} = require("../TT Utils/Base");
const exp = require("constants");
const { globalAgent } = require("https");

class FUNDS{
    constructor(page){
        this.page = page;
        this.base = new Base(page);
        this.headerTitle = page.locator(".label");
        this.performance = page.locator(".performance");
        this.oneYear = page.locator("[value='1 Year']");
        this.threeMonthsButton = page.locator("[value='3 Months']");
        this.fundsTables = page.locator("[data-page-term-id='Funds_Overview']");
        this.firstTable = page.locator(".page-content .ag-header").first();
        this.threeMHeader = this.firstTable.locator(".ag-header-cell-text >> text='3M (%)'");
        this.equityMoreIcon = page.locator(".more_icon").first();
        this.simpleSerachTable = page.locator(".simple_search_table_wrapper");
        this.topPerformerDropDown = page.locator(".grid-container-row .display-string");
        this.topPerformerTable = page.locator(".top_performer_table_wrapper").first();
        this.dropDownTextBox = page.locator(".grid-container-row .cb_options");
        this.searchTopPerformer = page.locator(".grid-container-row [placeholder='Search']");
        this.dropDownSearchField = page.locator(".display-string");
        this.highChart = page.locator(".highcharts-background");
        this.simpleSerachTable = page.locator(".simple_search_table_wrapper");
        this.simpleSerachField = page.locator("[name='searchTerm']");
        this.simpleSerachSubmitButton = page.locator(".page-content [type='submit']");
        this.symbol = page.locator(".page-content .table_symbol_link");
        this.sliderInput = page.locator(".slider__input");
        this.tableHeaderVolatility1Y = page.locator(".page-content .ag-header-cell-text >> text='Volatility 1Y'");
        this.esgFundsdropDownMenu = page.locator(".funds_esg_options .display");
        this.esgFundsSlider = page.locator(".rc-slider-track");
        this.esgFundsSearchField = page.locator(".page-content [placeholder='Search']");
        this.checkMark = page.locator(".checkmark");

    }

    async funds(){

        await this.page.waitForSelector(".label", { state: 'visible'});
        const countLabel = await this.headerTitle.count();
        expect(countLabel).toEqual(8);
        await expect(this.performance).toBeVisible();
        await expect(this.oneYear).toHaveClass(/.*active.*/);
    }

    async threeMonths(){

        await this.threeMonthsButton.click();
        await this.page.waitForSelector(".ag-header-cell-text >> text='3M (%)'", { state: 'visible'});
        await expect(this.threeMHeader).toBeVisible();
    }

    async equityMore(){

        await this.equityMoreIcon.click();
        await this.base.isActive("Simple search");
        await this.page.waitForSelector(".cb_options >> text='Equity'", { state: 'visible'});
        await expect(this.page.locator(".cb_options").first()).toHaveText("Equity");
        await expect(this.simpleSerachTable).toBeVisible();
    }

    async topPerformer(){

        await this.page.waitForSelector(".grid-container-row .display-string", { state: 'visible'});
        const countDropDown = await this.topPerformerDropDown.count();
        expect(countDropDown).toEqual(4);
        await expect(this.topPerformerTable).toBeVisible();

    }

    async filterTopPerformer(){
        
        await this.topPerformerDropDown.first().click();
        await this.base.chooseEllipsis("Equity");
        await expect(this.dropDownTextBox.first()).toHaveText("Equity");
        await this.topPerformerDropDown.nth(1).click();
        await this.searchTopPerformer.fill("Europe");
        await this.base.chooseEllipsis("Europe");
        await expect(this.dropDownTextBox.nth(1)).toHaveText("Europe");
        await this.topPerformerDropDown.nth(2).click();
        await this.searchTopPerformer.fill("Mixed Sectors");
        await this.base.chooseEllipsis("Mixed Sectors");
        await expect(this.dropDownTextBox.nth(2)).toHaveText("Mixed Sectors");
        await this.topPerformerDropDown.last().click();
        await this.base.chooseEllipsis("Austria");
        await expect(this.dropDownTextBox.last()).toHaveText("Austria");
    }

    async simpleSearch(){

        await expect(this.dropDownSearchField.first()).toHaveText("Please choose");
        await this.page.waitForSelector(".highcharts-background", { state: 'visible'});
        await expect(this.highChart).toBeVisible();
        await expect(this.simpleSerachTable).toBeVisible();
    }

    async simpleSearchFilter(){

        await this.simpleSerachField.fill("black rock");
        await this.dropDownSearchField.nth(1).click();
        await this.base.chooseEllipsis("Money Market");
        await this.simpleSerachSubmitButton.click();
        await this.page.waitForSelector(".page-content .table_symbol_link:has-text('Black Rock')", { state: 'visible'});
        await expect(this.symbol.first()).toContainText(/Black Rock/i);
    }

    async expertSearch(){

        await expect(this.dropDownSearchField.first()).toHaveText("Please choose");
        await expect(this.highChart).toBeVisible();
        await expect(this.simpleSerachTable).toBeVisible();
    }

    async expertSearchFilter(){

        await this.simpleSerachField.fill("Van");
        await this.dropDownSearchField.nth(1).click();
        await this.base.chooseEllipsis("Mixed Fund");
        await this.simpleSerachSubmitButton.click();
        await this.page.waitForSelector(".page-content .table_symbol_link:has-text('Vanguard')", { state: 'visible'});
        await expect(this.symbol.nth(1)).toContainText(/Vanguard/i);

    }

    async expertSearchPerformance(){

        await this.dropDownSearchField.nth(8).click();
        await this.base.chooseEllipsis("1 Year");
        await this.sliderInput.nth(2).fill("5.25")
        await this.simpleSerachSubmitButton.click();
        await this.page.waitForSelector(".page-content .ag-header-cell-text >> text='Volatility 1Y'", { state: 'visible'});
        await expect(this.tableHeaderVolatility1Y).toBeVisible();
    }

    async ESGFunds(){

        await this.page.waitForSelector(".funds_esg_options .display", { state: 'visible'});
        const countFields = await this.esgFundsdropDownMenu.count();
        expect(countFields).toEqual(4);
        await expect(this.esgFundsSlider).toBeVisible();
    }

    async esgFundsFilter(){

        const count1 = await this.symbol.count();
        await this.esgFundsdropDownMenu.first().click();
        await this.base.chooseEllipsis("Mixed Fund");
        await this.esgFundsdropDownMenu.nth(1).click();
        await this.esgFundsSearchField.fill("Europe");
        await this.base.chooseEllipsis("Europe");
        await this.esgFundsdropDownMenu.nth(2).click();
        await this.esgFundsSearchField.fill("mixed");
        await this.base.chooseEllipsis("Mixed Fund/Focus Equity");
        await this.sliderInput.first().fill("33.6");
        const count2 = await this.symbol.count();
        expect(count1).not.toEqual(count2);
    }

    async savingsCalculator(){

        await this.page.waitForSelector(".checkmark", { state: 'visible'});
        await expect(this.highChart).toBeVisible();
        const count = await this.checkMark.count();
        expect(count).toEqual(3);
    }

    async savingsCalculatorFilter(){

        const screenshotBefore = await this.highChart.screenshot();
        await this.sliderInput.first().fill("4000");
        await this.sliderInput.nth(3).fill("30");
        await this.sliderInput.nth(4).fill("45");
        await this.page.waitForTimeout(2000);
        const screenshotAfter = await this.highChart.screenshot();
        expect(screenshotBefore.length).not.toEqual(screenshotAfter.length);
    }

}

module.exports = {FUNDS};