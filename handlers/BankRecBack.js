if (document.readyState !== "complete") {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      bankRecBack();
    }
  };
} else {
  bankRecBack();
}
if (typeof window.buttonIndex == "undefined") {
  var buttonIndex = 0;
}
async function bankRecBack() {
  console.log("BankRecSkip");
  let AudioLink = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/airhorn.mp3"; // This is the horn , can be replaced with any link that ends with .mp3

  let memory = await getMemory();
  index = memory.memory;
  let list = await getElementByXpath('//*[@id="statementLines"]');
  let statements = list.querySelectorAll(".line:not(.no-display)");
  if (index == undefined) {
    index = 0;
  } else if (index == 0) {
    index = statements.length - 2;
  } else if (index == 1) {
    index = statements.length - 1;
  } else if (index >= statements.length) {
    index = statements.length - 2;
  } else {
    index -= 2;
  }

  for (let s of statements) {
    s.style.border = "";
  }
  console.log(index);

  console.log(index);
  let currentStatment = statements[index];
  if (currentStatment.attributes["data-botremove"]) {
    console.log("true");
    currentStatment = statements[index + 1];
  }
  currentStatment.style.border = "red 3px solid";
  console.log(currentStatment);
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
  setMemory(index + 1);

  return;
}
