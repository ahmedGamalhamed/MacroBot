if (document.readyState !== "complete") {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      initApplication();
    }
  };
} else {
  initApplication();
}
async function initApplication() {
  let clickListener = () => {
    console.log("clicked");
    chrome.storage.local.get("lastXeroOrgCode", (data) => {
      console.log(data.lastXeroOrgCode);
    });
  };

  console.log("inside catchXeroOrgCode");
  if (location.href.includes("/dashboard")) {
    lastXeroOrgCode = location.href.split("/")[4];
    chrome.storage.local.set({ lastXeroOrgCode });
    console.log(lastXeroOrgCode);
  } else {
    console.log("else");

    chrome.storage.local.get("lastXeroOrgCode", (data) => {
      let lastXeroOrgCode;
      if (data.lastXeroOrgCode) {
        console.log(data);
        lastXeroOrgCode = data.lastXeroOrgCode;
      } else {
        document.addEventListener("click", clickListener);
      }
    });
  }
}
