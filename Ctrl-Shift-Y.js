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
  console.log("Y Script");
  let url = location.href;
  if (url.includes("xero.com") && url.includes("!")) {
    runfileHere("./handlers/handleXeroDashBoard.js");
  } else if (url.includes("https://go.xero.com/BankRec/BankRec")) {
    runfileHere("./handlers/BankRecSkip.js");
  } else {
    console.log("This Script Will only work on Xero.com");
  }

  return;
}
