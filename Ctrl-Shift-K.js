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
  console.log("K Script");
  let url = location.href;
  if (url.includes("https://go.xero.com/BankRec/BankRec")) {
    runfileHere("./handlers/BankRecBack.js");
  } else {
    console.log("This Script Will only work on Xero.com");
  }

  return;
}
