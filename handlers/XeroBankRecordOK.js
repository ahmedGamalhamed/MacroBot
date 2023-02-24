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
  console.log("XeroBankRecordOK");

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
  //currentStatment.scrollIntoView({ behavior: "smooth" });
  let okayBtn = currentStatment.querySelector(".okayButton ");
  if (okayBtn.style.visibility !== "hidden" || true) {
    okayBtn.click();
    currentStatment.remove(); // simulate hidding

    setMemory(index);
    currentStatment.setAttribute("data-botRemove", true);
    console.log(currentStatment);
    runfileHere("./handlers/BankRecSkip.js");
  }
}
