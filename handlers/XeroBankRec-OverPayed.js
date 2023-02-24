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
  console.log("XeroBankRec-OverPayed");

  let memory = await getMemory();
  let index = memory.memory;
  if (!index) {
    index = 0;
  } else if (index !== 0) {
    --index;
  }

  let list = await getElementByXpath('//*[@id="statementLines"]');
  let statements = list.querySelectorAll(".line");
  let currentStatment = statements[index];
  currentStatment.style.border = "red 3px solid";
  currentStatment.scrollIntoView({ behavior: "smooth" });
  let CurrentFindMatchBtn = currentStatment.querySelectorAll("a")[6];
  CurrentFindMatchBtn.click();
  let createNewTransaction = await WaitForQueryAll(
    "#createNewTransaction",
    500
  );
  createNewTransaction = createNewTransaction[0].children[0];
  simulateMouseClick(createNewTransaction);
  let createTransactionBtn = await WaitForQueryAll("#createTransaction", 500);
  createTransactionBtn = createTransactionBtn[0];
  simulateMouseClick(createTransactionBtn);
  let options = await WaitForQueryAll(".options", 500);
  options = options[0].children[0];
  simulateMouseClick(options);
  let overpaymentOption = await WaitForQueryAll("#overpaymentOption", 500);
  overpaymentOption = overpaymentOption[0];
  simulateMouseClick(overpaymentOption);
  console.log(options);
}
