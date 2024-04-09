const {test,expect} = require("@playwright/test");
const {LoginPage} = require("../../../TT POM/LoginPage");
const {CURRENCIES} = require("../../../TT POM/CURRENCIES");
const {Base} = require("../../../TT Utils/Base");
const dataset = JSON.parse(JSON.stringify(require("../../../TT Utils/placeorder.json")));
let loginpage;
let currencies;
let base;

test.beforeEach(async ({page}) => {
    loginpage = new LoginPage(page);
    base = new Base(page);
    await loginpage.goTo();
    await loginpage.loginWS(dataset.username,dataset.password);
    await loginpage.successfullLogin();
    currencies = new CURRENCIES(page);
    await base.NavigateTo("Currencies");
  });

  test("Reset Data",async ()=>
  {
      await base.resetData();
  });

  test("Currencies(1/2/3/4)",async ()=>
{
    await base.chooseHeaderTab("Currencies","Currencies");
    await currencies.Currencies();
    await currencies.currenciesColumnPicker();
    await currencies.currenciesEurButton();
    await currencies.EurUsdSymbol(); 
});

test("Cross Rates(5/6/7/8)",async ()=>
{
    await base.chooseHeaderTab("Cross Rates","Cross Rates");
    await currencies.crossRates();
    await currencies.crossRatesCalculator();
    await currencies.calculatorDragAndDrop();
    
});

test("Cross Rates(9/10)",async ()=>
{
    await base.chooseHeaderTab("Cryptos","Cryptos");
    await currencies.Cryptos();
    await currencies.Bitcoin();
});

test("Crypto Pairs(11/12)",async ()=>
{
    await base.chooseHeaderTab("Crypto Pairs","Crypto Pairs");
    await currencies.CryptoPairs();
});

test("Crypto currency news(13)",async ()=>
{
    await base.chooseHeaderTab("Crypto currency news","Crypto currency news");
    await currencies.CryptoCurrenciesNews();
});