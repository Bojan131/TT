const {test,expect} = require("@playwright/test");
const {LoginPage} = require("../../../TT POM/LoginPage");
const {DashboardPage} = require("../../../TT POM/DashboardPage");
const {Base} = require("../../../TT Utils/Base");
const dataset = JSON.parse(JSON.stringify(require("../../../TT Utils/placeorder.json")));
let loginpage;
let dashboard;
let base;

test.beforeEach(async ({page},testInfo) => {
    if (testInfo.title === 'Left panel(6/7/8)' || testInfo.title === 'Reset Data'){
    loginpage = new LoginPage(page);
    base = new Base(page);
    await loginpage.goTo();
    await loginpage.loginWS(dataset.username,dataset.password);
    await loginpage.successfullLogin();
    dashboard = new DashboardPage(page);
  }});

  test("Reset Data",async ()=>
  {
      await base.resetData();
  });

  test("HelpButton(1)",async ({page,browser})=>
{
    dashboard = new DashboardPage(page);
    await dashboard.helpButton(browser);
});

test("New Browser(2/3/4)",async ({page,browser})=>
{
    dashboard = new DashboardPage(page);
    await dashboard.favourites(browser);
});

test("Left panel(6/7/8)",async ()=>
{
    await dashboard.leftPanel();
});