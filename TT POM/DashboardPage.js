const {expect} = require("@playwright/test");
const {Base} = require("../TT Utils/Base");
const exp = require("constants");

class DashboardPage{
    constructor(page){
        this.page = page;
        this.base = new Base(page);
        this.navigationTitle = page.locator(".navigation-title");
        this.footerText = page.locator(".footer-content span");
        this.search = page.locator("[placeholder='Search']");
        this.symbolName = page.locator('.search_category .symbol_name');
        this.browser = this.browser;
        this.OptionButton = page.locator(".open_drawer");
        this.TickerRow = page.locator(".ticker_row");
        this.buttonBig = page.locator("[value='Big']");
        this.rightButton = page.locator("[value='Right']");
        this.header = page.locator(".header-control");
    }

    async EconomicDataCheck(){

        await expect(this.page.locator(".page-title")).toHaveText("Economic Data");
    }

    async chooseOption(){
        await this.base.optionPicker("Settings start page","General");
        await this.page.locator(".start_page_content .reactor").click();
        await this.page.waitForTimeout(1000);
    }

    async chooseSymbolandClickLogo(){
        await this.base.NavigateTo("Funds");
        await this.page.locator(".app-logo").click();
        await expect(this.page.locator(".page-title")).toHaveText("Economic Data");
    }

    async LogOut(){
        
        await this.page.locator(".ws_icon_logout").click();
        await this.page.waitForTimeout(3000);
            }

    async typeBank(){
        await this.search.fill("bank");
        await this.page.waitForTimeout(4000);
        const texts = await this.page.locator('.search_category h4').allTextContents();
        console.log(texts);
        for(let i = 0; i < texts.length; ++i) {
            await expect(this.page.locator(".search_category h4").nth(i)).toHaveText(texts[i]);
        }
    }

    async typeNoResult(){
        await this.search.fill("//");
        await this.page.waitForTimeout(4000);
        await expect(this.page.locator(".search_category")).toHaveText("The Live-Search did not find any results");
    }

    async typeApple(){
        await this.search.fill("Apple");
        await this.page.waitForTimeout(4000);
        await expect(this.page.locator(".stock_exchange_name").first()).toHaveText("(NASDAQ)");
        await expect(this.page.locator(".stock_exchange_name").nth(1)).toHaveText("(NASDAQ Basic - NASDAQ Issues)");
        await expect(this.page.locator(".search_container h4").nth(2)).toHaveText("Related news articles");
    }

    async typeBMW(){
        await this.search.fill("BMW");
        await this.page.locator("[title='BAY.MOTOREN WERKE AG ST']").waitFor();
        await this.page.locator("[title='BAY.MOTOREN WERKE AG ST']").click();
        await this.page.locator(".header-name").waitFor();
        await expect(this.page.locator(".header-name")).toBeVisible();
    }

    async checkBMW(){
    await this.search.fill("BMW");
    await this.page.locator("[title='BAY.MOTOREN WERKE AG ST']").waitFor();
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    await this.page.locator(".header-name").waitFor();
    await expect(this.page.locator(".header-name")).toBeVisible();
    }

    async table(){
    await this.page.locator("[placeholder='Search']").fill("BMW");
    await this.page.locator("[title='BAY.MOTOREN WERKE AG ST']").waitFor();
    await this.page.locator(".ws_live_table").click();
    const texts = await this.page.locator('.ag-group-value').allTextContents();
    for(let i = 0; i < texts.length; ++i) {
    await expect(this.page.locator(".ag-group-value").nth(i)).toHaveText(texts[i]);
    }
    }

    async hoverAll(){
    await this.search.fill("BMW");
    await this.page.waitForSelector('.search_category .symbol_name', { state: 'visible' });

    const count = await this.symbolName.count();
    console.log(count);
    for (let i = 0; i < count; ++i) {
        await this.symbolName.nth(i).scrollIntoViewIfNeeded();
        await this.symbolName.nth(i).hover();

        const isIconVisible = await this.page.locator(".news_source_icon").nth(i).isVisible({ timeout: 3000 }).catch(() => false);
        if (!isIconVisible) {
            const noNewsText = await this.page.locator(".no_news_data").textContent({ timeout: 3000 }).catch(() => "");
            if (noNewsText.includes("No news found for your search parameters")) {
                console.log("No news data message is displayed for item", i);
            } else {
                console.log("Neither news source icon nor 'No news found' message is present for item", i);
            }
        } else {
            console.log("News source icon is visible for item", i);
        }
    }
    }
    async doubleClick(browser){
    const { context, page } = await this.base.newWindowLogin(browser);
    await page.locator("[placeholder='Search']").fill("BMW");
    await page.waitForTimeout(3000);
    const [newPage] = await Promise.all
    ([context.waitForEvent('page'),
    page.dblclick("[title='BAY.MOTOREN WERKE AG ST']")])
    await newPage.waitForTimeout(10000);
    await this.base.checkChartNewBrowser(newPage);
    }


    async deactivate(option){
        await this.search.click();
    await this.page.locator(".notification-container").click();
    await this.page.keyboard.press(option);
    await this.search.fill("abc");
    await expect(this.search).toHaveValue("abc");
    }

    async wei(){
    await this.search.fill("WEI");
    const textToFind = "World Equity Indices";
    await this.page.locator(`text=${textToFind}`).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator(".page-title")).toHaveText("Equities");
    await this.base.isActive("World");
    await this.base.isActive("Indices");
    }

    async ate(){
    await this.search.fill("ATE");
    const textToFind = "Austria Economic Events";
    await this.page.locator(`text=${textToFind}`).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator(".page-title")).toHaveText("Economic Data");
    await this.page.waitForSelector(".long_name >> text='Current Week'", { state: 'visible'});
    await this.base.isActive("Current Week");
    await expect(this.page.locator(".cb_options")).toHaveText("Austria");
    }

    
    async countTicker(number){
        const countTicker = await this.TickerRow.count();
        expect(countTicker).toBe(number);
    }

    async displaySymbolTicker(option,index){
        await this.page.locator(".display-string").nth(index).click();
        const count3 = await this.page.locator(".ellipsis-option").count();
    for(let i = 0; i < count3; ++i) {
        const text3 = await this.page.locator(".ellipsis-option").nth(i).textContent();
        if(text3 === option){
            await this.page.locator(".ellipsis-option").nth(i).click();
            break;
        }
    }
    }

    async dropdownTicker(){
        await this.base.optionPicker("Ticker","General");
        let emptyArray = [];
    await this.page.locator(".accordion-title-text").last().waitFor();
    await this.base.deactivateActivateTicker("Ticker1","on")
    await this.countTicker(1);
    await this.page.locator(".display-string").nth(0).click();
    for(let i = 0; i <= 12; i++){
       
        const a = await page.locator('.ellipsis-option').nth(i).textContent();
        
        console.log(i);
        if(a === "Market Overview"){
            emptyArray.push(a);
        }
        else if(a === "Indices") {
            emptyArray.push(a);
        }
        else if(a === "Index constituents"){
            emptyArray.push(a);
        }
        else if(a === "Price pages"){
            emptyArray.push(a);
        }
        else if(a === "Watchlists"){
            emptyArray.push(a);
        }
        else if(a === "Portfolios"){
            emptyArray.push(a);
        }

        await this.page.locator('.ellipsis-option').nth(i).scrollIntoViewIfNeeded();
        
    }
    const texts = ["Market Overview","Indices","Index constituents"];
    console.log(emptyArray);
    emptyArray.forEach(emptyArray => {
        expect(texts).toContain(emptyArray);
      });
    }

    async tickerBig(){
        await this.base.optionPicker("Ticker","General");
        await this.base.deactivateActivateTicker("Ticker1","on");
        await this.buttonBig.nth(0).click();
        await this.displaySymbolTicker("Europe",0);
        await this.countTicker(1);
        await expect(this.page.locator('.ticker_ui_title').nth(0)).toBeVisible();
        await expect(this.page.locator('.ticker_view_ui_value').nth(0)).toBeVisible();
        await expect(this.page.locator('.ticker_row .icon_arrow').nth(0)).toBeVisible();
        await expect(this.page.locator('.ticker_item_change').nth(0)).toBeVisible();
        await expect(this.page.locator('.ticker_item_chart').nth(0)).toBeVisible();
    }

    async tickerTwo(){
        await this.base.optionPicker("Ticker","General");
        await this.base.deactivateActivateTicker("Ticker1","on");
        await this.base.deactivateActivateTicker("Ticker2","on");
        await this.rightButton.nth(1).click();
        await this.displaySymbolTicker("SMI PR",1);
        await this.countTicker(2);
        await expect(this.page.locator('.ticker_ui_title').last()).toBeVisible();
        await expect(this.page.locator('.ticker_view_ui_value').last()).toBeVisible();
        await expect(this.page.locator('.ticker_row .ws_rt').last()).toBeVisible();
        await expect(this.page.locator('.ticker_row .icon_arrow').last()).toBeVisible();
        await expect(this.page.locator('.ticker_change_percent').last()).toBeVisible();
    }


    async compareTicker(browser){

    const { context, page } = await this.base.newWindowLogin(browser);
    await this.base.optionPickerNewBrowser(page,"Ticker","General");
    const text = await page.locator(".ticker_settings_wrapper").nth(1).textContent();
    if(text.includes("Deactivate")){
        await page.locator(".drawer-control .slider").nth(4).click();
        
    }
    else if(text.includes("Activate")){
        await page.locator(".drawer-control .slider").nth(4).click();
        await page.locator(".drawer-control .slider").nth(4).click();
    }
    const [newPage] = await Promise.all
    ([context.waitForEvent('page'),
    page.locator(".header-control").nth(2).click({ force: true })])
    await newPage.waitForSelector(".ticker_row", { state: 'visible'});
    const tickerRows = newPage.locator('.ticker_row');
    const count = await tickerRows.count();
    expect(count).toBe(1);
    }

    async helpButton(browser){
        const { context, page } = await this.base.newWindowLogin(browser);
        const [newPage] = await Promise.all
    ([context.waitForEvent('page'),
    page.locator(".header-control").nth(5).click()])
    await newPage.waitForTimeout(8000);
    await expect(newPage).toHaveURL('https://webstation.baha.com/api/help/en-dark/index.html');
    }

    async newBrowser(browser){
        const { context, page } = await this.base.newWindowLogin(browser);
        const currentUrl = page.url();
        const [newPage] = await Promise.all
    ([context.waitForEvent('page'),
    page.locator(".header-control").nth(2).click()])
    await newPage.waitForTimeout(8000);
    const newPagecurrentUrl = newPage.url();
    expect(currentUrl).toBe(newPagecurrentUrl);
    }
    
    async favourites(browser){
        const { context, page } = await this.base.newWindowLogin(browser);
        const compare = page.locator(".header-control svg g path").nth(6);
        await this.base.NavigateTo("Commodities");
        await  page.waitForTimeout(3000);
        await  page.locator(".header-control").nth(4).click();
        await  page.waitForTimeout(3000);
        await expect(compare).toHaveClass("primary-color");
        const [newPage] = await Promise.all
    ([context.waitForEvent('page'),
    page.locator(".header-control").nth(2).click()])
        await expect(newPage).toHaveTitle(/baha wealth/);
        await expect(newPage.locator(".footer-content span")).toHaveText("© 2024 baha GmbH. All rights reserved.");
        await page.locator(".header-control").nth(4).click();
    }

    async leftPanel() {
        const panel = this.page.locator(".header-control").nth(0);
        const expand = this.page.locator(".expand-handle");
        await panel.click();
        await this.page.waitForTimeout(2000);
        await expect(panel).toHaveClass(/.*aside-collapsed.*/);
        await panel.click();
        await this.page.waitForTimeout(2000);
        await expect(panel).not.toHaveClass(/.*aside-collapsed.*/);
        await expand.click();
        await expect(panel).toHaveClass(/.*aside-collapsed.*/);
        await expand.click();
        await this.page.waitForTimeout(2000);
        await expect(panel).not.toHaveClass(/.*aside-collapsed.*/);
    }
}
    

module.exports = {DashboardPage};