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
  console.log("- Script");
  if (url.includes("https://go.xero.com/Setup/FinancialSettings.aspx")) {
    runfileHere("./handlers/XeroFinanical-decrease-month.js");
  } else if (url.includes("xero.com")) {
    popup("https://go.xero.com/Setup/FinancialSettings.aspx");
  }
}

// Helper functions
