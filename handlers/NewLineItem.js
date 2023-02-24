console.log("NewLineButton Added");
handleHide();
initNewLineItem();

let LineItemsInterval;
let Tax1 = "20% (VAT on Expenses)";
let Tax2 = "No VAT";
let hide = false;
let AppInterval;

async function initNewLineItem() {
  AppInterval = setInterval(() => {
    let emptyBox = document.querySelector(".empty-box");
    if (!emptyBox) {
      setTimeout(() => {
        clearInterval(AppInterval);
        return initNewLineItem();
      }, 1000);
    } else {
      if (emptyBox.children.length == 1) {
        let createLine = emptyBox.children[0];
        let addTwoLines = createLine.cloneNode();
        addTwoLines.textContent = "Add Default line Items";
        addTwoLines.style.border = "#ffdc73 solid 4px";
        addTwoLines.style.backgroundColor = "#a67c00";
        addTwoLines.style.color = "white";
        addTwoLines.onclick = () => {
          emptyBox.children[0].click();
          handleClick();
        };
        emptyBox.appendChild(addTwoLines);
      }
    }
  }, 500);
}

async function handleClick() {
  let editLineItems = await WaitForQueryAll(".edit-line-items");
  editLineItems = editLineItems[0];
  editLineItems.setAttribute("data-bot", true);
  let addButton = document.querySelector(".add-new");
  addButton.click();
  addButton.click();
  handleTable();
}

async function handleTable() {
  let tbody = document.querySelectorAll("tbody")[1];
  if (!tbody) {
    setTimeout(() => {
      handleTable();
      return;
    }, 1000);
  }
  try {
    let taxInputs = tbody.querySelectorAll(".tax");

    let tax1 = taxInputs[0].children[0].children[0];
    simulateMouseClick(tax1);
    let dropdown = await ChildInParent(taxInputs[0], ".d-options");
    let items = dropdown.querySelectorAll("li");
    for (let item of items) {
      if (item.textContent == Tax1) simulateMouseClick(item);
    }
    let tax2 = taxInputs[1].children[0].children[0];
    simulateMouseClick(tax2);
    dropdown = await ChildInParent(taxInputs[1], ".d-options");
    items = dropdown.querySelectorAll("li");
    for (let item of items) {
      if (item.textContent == Tax2) simulateMouseClick(item);
    }
    return;
  } catch {
    return;
  }
}

function handleHide() {
  setInterval(() => {
    try {
      let table = document.querySelectorAll("table")[1];
      let rows = table.querySelectorAll("tr");
      if (!table) return;
      for (let i = 0; i < rows.length - 3; i++) {
        let length = rows[i].children.length;
        if (length == 13) {
          rows[i].children[4].style.display = "none";
          rows[i].children[5].style.display = "none";
          rows[i].children[7].style.display = "none";
          rows[i].children[8].style.display = "none";

          rows[i].children[6].setAttribute("colspan", 2);
          rows[i].children[9].setAttribute("colspan", 2);
          rows[i].children[10].setAttribute("colspan", 2);
          rows[i].children[11].setAttribute("colspan", 2);
        }
      }
    } catch {}
  }, 500);
}
