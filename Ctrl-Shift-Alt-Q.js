console.log("Ctrl-Shift-Alt-Q");
chrome.storage.local.get("lastXeroOrgCode", (data) => {
  if (data.lastXeroOrgCode) {
    location.href = `https://go.xero.com/app/${data.lastXeroOrgCode}/dashboard`;
  } else {
    alert("You havent vistied any organization/dashboard to travel to yet");
  }
});
