if (document.readyState !== "complete") {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      initApplication();
    }
  };
} else {
  initApplication();
}
if (typeof window.buttonIndex == "undefined") {
  var buttonIndex = 0;
}
async function initApplication() {
  console.log("BankRecSkip");
  let AudioLink = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/airhorn.mp3"; // This is the horn , can be replaced with any link that ends with .mp3

  let memory = await getMemory();
  index = memory.memory;
  if (!index) {
    index = 0;
  }

  let list = await getElementByXpath('//*[@id="statementLines"]');
  let statements = list.querySelectorAll(".line:not(.no-display)");
  if (index > statements.length) index = 0;
  for (let s of statements) {
    s.style.border = "";
  }
  let currentStatment = statements[index];
  if (currentStatment.attributes["data-botremove"]) {
    currentStatment = statements[index + 1];
  }
  currentStatment.style.border = "red 3px solid";
  currentStatment.scrollIntoView({ behavior: "smooth" });
  //let CurrentFindMatchBtn = currentStatment.querySelectorAll("a")[6];
  //CurrentFindMatchBtn.click();

  /*await waitForElementToIncludeClassName(currentStatment, "opened");
  currentStatment.scrollIntoView({ behavior: "smooth" });
  let payee = await ChildInParent(currentStatment, "[data-testid='payee']");
  payee = payee.textContent;
  let searchByName = await ChildInParent(currentStatment, "#searchNameText");
  searchByName.value = payee;
  searchByName.focus();*/
  setMemory(++index);
  if (index >= statements.length) {
    console.log("last");
    setMemory(0);
  }
  return;
}
