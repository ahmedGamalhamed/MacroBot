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
  console.log("CreateBankRule-NewWindow");
  let memory = await getMemory();
  let index = memory.memory;
  if (!index) {
    index = 0;
  } else if (index !== 0) {
    --index;
  }
  let list = await WaitForQueryAll("#statementLines", 500);
  list = list[0];

  let statements = list.querySelectorAll(".line");
  let currentStatment = statements[index];
  currentStatment.style.border = "red 3px solid";

  let optionsBtn = currentStatment.querySelector('[aria-haspopup="listbox"]');

  optionsBtn.click();

  let createBankRule = await ChildInParent(currentStatment, "#create-bank-rule");

  let createBankRule_href = createBankRule.children[0].href;
  simulateMouseClick(currentStatment);

  popup(createBankRule_href);
}
