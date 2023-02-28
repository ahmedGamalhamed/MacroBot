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
  console.log("X-Script");
  let url = location.href;
  if (url.includes("https://app.dext.com/" && "gamma/costs/inbox")) {
    DexSetter("Tax", "20% (VAT on Expenses)");
  } else {
    console.log("This Site Doesnt Inlcude this Key Macro");
  }
}

// Helper functions
