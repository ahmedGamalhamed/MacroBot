if (document.readyState !== "complete") {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      initApplication();
    }
  };
} else {
  initApplication();
}
//
async function initApplication() {
  StartXeroOrganization();
}

async function StartXeroOrganization() {
  let AudioLink = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/airhorn.mp3"; // This is the horn , can be replaced with any link that ends with .mp3

  let url = location.href;
  if (!url) {
    setTimeout(() => {
      return StartXeroOrganization();
    }, 1000);
  }
  let xeroCodes = ["!HX-WX"];
  let codeStart = url.match("!").index;
  let currentCode = url.slice(codeStart, codeStart + 6);
  let currentCodeIndex = xeroCodes.indexOf(currentCode);
  let nextCodeIndex = currentCodeIndex + 1;
  let nextLink = getXeroLinkFromCode(xeroCodes[nextCodeIndex]);

  // this following code will only run app/organistion / dashboard

  let dashboardRegex = /https:\/\/go.xero.com\/app\/.*\/dashboard/g;
  if (dashboardRegex.test(url)) {
    let accountingBtn = await getElementByXpath('//*[@id="shell-nav"]/header/div/ol[1]/li[3]/button', 5);
    accountingBtn ? accountingBtn.click() : "";
    let reportsBtn = await getElementByXpath('//*[@id="shell-nav"]/header/div/ol[1]/li[3]/div/div[2]/div/ol[1]/li[3]/a', 5);
    callMeBack();
    reportsBtn ? reportsBtn.click() : "";
  }
  let reportingRegex = /https:\/\/reporting.xero.com\/.*\/home/g;
  if (reportingRegex.test(url)) {
    let ProfitAndLoss = await getElementByXpath('//*[@id="report-centre-parent"]/div/div/div[4]/div[2]/div[2]/div/span[2]/a/div[2]');
    callMeBack();
    ProfitAndLoss ? ProfitAndLoss.click() : "";
  }
  let ProfitAndLossRunRegex = /https:\/\/reporting.xero.com\/.*\/v1\/Run\/1216/g;
  if (ProfitAndLossRunRegex.test(url)) {
    let dropDownBtn = await getElementByXpath('//*[@id="report-settings"]/div/div/div[1]/div/div[3]/button/div');
    dropDownBtn.click();
    let lastFinancialYear = await getElementByXpath('//*[@id="report-settings-date-option-2"]/button');
    lastFinancialYear.click();
    let updateBtn = await getElementByXpath('//*[@id="report-settings"]/div/div/div[4]/button');
    updateBtn.click();
    let exportBtn = await getElementByXpath('//*[@id="report-toolbar"]/footer/div/div[2]/div[2]/button');
    exportBtn.click();
    let excelBtn = await getElementByXpath('//*[@id="report-toolbar-export-excel-menuitem"]/button');
    excelBtn.click();
    runfileHere("./media/confetti.js");
    playAudio(AudioLink);

    if (nextCodeIndex < xeroCodes.length) {
      await PauseFor(4000);
      callMeBack();
      location.href = nextLink;
    } else {
      console.log("last stop");
    }
  }
}
function getXeroLinkFromCode(code) {
  let link = `https://go.xero.com/app/${code}/dashboard`;
  return link;
}
// Helper functions
