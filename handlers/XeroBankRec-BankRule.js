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
if (typeof window.payee == "undefined") {
  console.log("setting payee");
  var payee;
}
async function initApplication() {
  console.log("XeroBankRec-BankRule");
  let url = location.href;
  console.log("inside XeroBankRec-BankRule");
  if (url.includes("go.xero.com/BankRec/BankRec.aspx")) {
    let list = await getElementByXpath('//*[@id="statementLines"]');
    let statements = list.querySelectorAll(".line");
    for (let statement of statements) {
      if (!statement.attributes["data-Botlistener"]) {
        statement.setAttribute("data-Botlistener", true);
        statement.addEventListener("mousemove", (e) => {
          payee = statement.querySelector(".line-details").children[1].textContent;
        });
        statement.style.cursor = "alias";
      }
    }
    if (payee) {
      setMemory({ payee });
      callMeBack();
      location.href = "/Bank/BankRecRules.aspx";
    }
  } else {
    let Memory = await getMemory();
    Memory = Memory.memory.payee;
    let createBtn = await getElementByXpath('//*[@id="shell-app-root"]/article/main/header/div/div[2]/div/div/a');
    createBtn.click();
    let valueInput = await WaitForQueryAll(".xui-textinput--input");
    valueInput = valueInput[0];
    setNativeValue(valueInput, Memory);
    await PauseFor(200);
    valueInput.select();
  }
}
