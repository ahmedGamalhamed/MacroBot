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
  let AudioLink = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/airhorn.mp3"; // This is the horn , can be replaced with any link that ends with .mp3

  let memory = await getMemory();
  index = memory.memory;
  if (!index) {
    index = 0;
  }

  let list = await getElementByXpath('//*[@id="statementLines"]');
  let statements = list.querySelectorAll(".line");
  let currentStatment = statements[index];
  let CurrentFindMatchBtn = currentStatment.querySelectorAll("a")[6];
  CurrentFindMatchBtn.click();

  await waitForElementToIncludeClassName(currentStatment, "opened");
  currentStatment.scrollIntoView({ behavior: "smooth" });
  let payee = await ChildInParent(currentStatment, "[data-testid='payee']");
  payee = payee.textContent;
  let searchByName = await ChildInParent(currentStatment, "#searchNameText");
  searchByName.value = payee;
  searchByName.focus();
  setMemory(++index);

  if (index >= statements.length) {
    console.log("last");
    setMemory(0);
  }
}
