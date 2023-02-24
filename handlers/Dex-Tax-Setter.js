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
  let mem = await getMemory();
  mem = mem.memory;
  console.log(mem);
  let rowName = mem.rowName;
  let optionName = mem.optionName;
  console.log("Dex-Tax-Setter");
  let inputs = document.querySelectorAll(".d-form-input");
  let taxRow = getElementByText(inputs, rowName);
  let input = taxRow.querySelector(".ellipsize");
  simulateMouseClick(input);
  let options = await WaitForQueryAll(".d-options");
  options = options[0].querySelectorAll("li");
  let selection = getElementByText(options, optionName);
  simulateMouseClick(selection);
}
function getElementByText(inputs, text) {
  for (let input of inputs) {
    if (input.textContent.includes(text)) {
      return input;
    }
  }
  return;
}
