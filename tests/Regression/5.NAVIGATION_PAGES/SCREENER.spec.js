const {test,expect} = require("@playwright/test");
const {LoginPage} = require("../../../TT POM/LoginPage");
const {SCREENER} = require("../../../TT POM/SCREENER");
const {Base} = require("../../../TT Utils/Base");
const dataset = JSON.parse(JSON.stringify(require("../../../TT Utils/placeorder.json")));
let loginpage;
let screener;
let base;

test.beforeEach(async ({page}) => {
    loginpage = new LoginPage(page);
    base = new Base(page);
    await loginpage.goTo();
    await loginpage.loginWS(dataset.username,dataset.password);
    await loginpage.successfullLogin();
    screener = new SCREENER(page);
    await base.NavigateTo("Screener");
  });

  test("Reset Data",async ()=>
  {
      await base.resetData();
  });

  test("Screener(1/2/3/4/5/6/7/8/9)",async ()=>
{
    await base.chooseHeaderTab("Screener","Screener");
    await screener.screener();
    await screener.addFilter();
    await screener.addnewFilter();
    await screener.comparisonButton();
});
