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
  console.log("+ Script");
  let url = location.href;
  if (url.includes("https://go.xero.com/Setup/FinancialSettings.aspx")) {
    runfileHere("./handlers/XeroFinanical-increase-month.js");
  } else if (url.includes("xero.com")) {
    location.href = "https://go.xero.com/Setup/FinancialSettings.aspx";
  }
}
