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
  console.log("Z-Script");
  let url = location.href;
  if (url.includes("app.dext.com/gamma/costs")) {
    runfileHere("./handlers/setSupplierRule.js");
  } else if (url.includes("go.xero.com/BankRec/BankRec.aspx")) {
    runfileHere("./handlers/CreateBankRule-NewWindow.js");
  } else {
    console.log("This Site Doesnt Inlcude this Key Macro");
  }
}

// Helper functions
