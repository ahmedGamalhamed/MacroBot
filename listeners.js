if (document.readyState !== "complete") {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      initApp();
    }
  };
} else {
  initApp();
}
chrome.storage.local.get(["Macros"], (res) => {
  response = res.Macros;
});
async function initApp() {
  url = location.href;
  setInterval(() => {
    chrome.runtime.sendMessage({ order: "StayAwake" });
  }, 4000);

  document.addEventListener("keydown", (e) => {
    let key = e.key;
    let ctrl = e.ctrlKey;
    let shift = e.shiftKey;
    if (key !== "Shift" && key !== "Alt" && key !== "" && ctrl && shift) {
      chrome.runtime.sendMessage({ order: "Macro", key: key, shift: shift, ctrl: ctrl });
      console.log(key, ctrl, shift);
    }
  });
  if (url.includes("https://app.dext.com/" && "gamma")) {
    let collapse = document.querySelectorAll(".js-sidebar-collapse");
    if (collapse.length > 0 && collapse[0].textContent == "Collapse menu") {
      collapse[0].click();
    }
    runfileHere("./handlers/NewLineItem.js");
  }
  let re = /https:\/\/app.dext.com\/gamma\/costs\/inbox\/*/g;
  if (re.test(url)) {
    runfileHere("./handlers/NewSupplierListener.js");
  } else if (url.includes("https://go.xero.com/BankRec/BankRec.aspx")) {
    setMemory(0);
    runfileHere("./handlers/BankRecSkip.js");

    setInterval(() => {
      getMemory().then((mem) => {
        let index = mem.memory;
        if (index !== false) {
          if (index > 0) --index;
          let list = document.getElementById("statementLines");
          if (!list) return;
          let statements = list.querySelectorAll(".line:not(.no-display)");
          for (let s of statements) {
            s.style.border = "";
          }
          let currentStatment = statements[index];
          currentStatment.style.border = "3px solid red";
        }
      });
    }, 1000);
  }
}
