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
  console.log("U-Script");

  let url = location.href;
  if (!url) {
    setTimeout(() => {
      return initApplication();
    }, 1000);
  }
  if (url.includes("xero.com/BankRec")) {
    runfileHere("./handlers/handleXeroBankRecords.js");
  } else if (url.includes("mail.google.com")) {
    runfileHere("./handlers/CreateNewGmail-Email.js");
  } else if (url.includes("https://docs.google.com/spreadsheets")) {
    runfileHere("./handlers/printPdfGsheets.js");
  } else {
    console.log("This Script Will only work on Xero.com/BankRec or GoogleMail or GSheets");
  }
  return;
}

// Helper functions
