const {test,expect} = require("@playwright/test");
const {LoginPage} = require("../../../TT POM/LoginPage");
const {DashboardPage} = require("../../../TT POM/DashboardPage");
const {Base} = require("../../../TT Utils/Base");
const dataset = JSON.parse(JSON.stringify(require("../../../TT Utils/placeorder.json")));
let loginpage;
let dashboard;
let base;

test.beforeEach(async ({page},testInfo) => {
    if (testInfo.title !== 'Live search8'){
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

test("Live search(1)",async ()=>
{
   await dashboard.typeBank();
});

test("Live search(2)",async ()=>
{
  await dashboard.typeNoResult();
});

test("Live search(4)",async ()=>
{
   await dashboard.typeApple();
});

test("Live search(5)",async ()=>
{
    await dashboard.typeBMW();
});

test("Live search(6)",async ()=>
{
    await dashboard.checkBMW();
});
test("Live search(7)",async ()=>
{
    
    await dashboard.table();
});


test("Live search(8)", async () => {
    await dashboard.hoverAll();
});

test('Live search(9)', async ({page,browser},testInfo) => {
    dashboard = new DashboardPage(page);
    await dashboard.doubleClick(browser);
});

test("Live search(10)",async ()=>
{
    await dashboard.deactivate("/");
});

test("Live search(11)",async ()=>
{
    await dashboard.deactivate("-");
});

test("Live search(12)",async ({page})=>
{
    await dashboard.wei(page);
    
});

test("Live search(13)",async ({page})=>
{
    await dashboard.ate(page);

});

