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
  console.log("F-Script");
  let url = location.href;
  if (url.includes("https://go.xero.com/BankRec/BankRec.aspx")) {
    runfileHere("./handlers/XeroBankRec-Discuss.js");
  } else if (url.includes("https://app.dext.com/" && "gamma/costs/inbox")) {
    runfileHere("./handlers/dext-select-catagory.js");
  } else {
    console.log("there is no combo for this button on this site");
  }
}

// Helper functions
