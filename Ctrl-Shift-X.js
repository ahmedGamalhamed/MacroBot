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
  console.log("X-Script");
  let url = location.href;
  if (url.includes("go.xero.com/BankRec/BankRec.aspx")) {
    runfileHere("./handlers/XeroBankRecordOK.js");
  } else if (url.includes("https://app.dext.com/" && "gamma/costs/inbox")) {
    runfileHere("./handlers/dext-select-description.js");
  } else {
    console.log("This Site Doesnt Inlcude this Key Macro");
  }
}

// Helper functions
