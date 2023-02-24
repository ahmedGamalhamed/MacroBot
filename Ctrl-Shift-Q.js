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
  console.log("Q-Script");
  let bankRulesRegex = /https:\/\/go.xero.com\/app\/.*\/bank-rules\/spend/g;
  let url = location.href;
  if (url.includes("https://docs.google.com/spreadsheets")) {
    runfileHere("./handlers/handleGSheetsTitle.js");
  } else if (url.includes("go.xero.com/BankRec") || bankRulesRegex.test(url)) {
    runfileHere("./handlers/XeroBankRec-BankRule.js");
  } else {
    console.log("There is no Macro For this site on this macro");
  }
  return;
}

// Helper functions
