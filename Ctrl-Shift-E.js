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
  console.log("E Script");

  if (location.href == "https://app.dext.com/en/login") {
    let email = await getElementByXpath('//*[@id="user_login_email"]');
    email.value = "process.st@fd-works.co.uk";
    let password = await getElementByXpath('//*[@id="user_login_password"]');
    password.value = "password123";
    let login = await getElementByXpath('//*[@id="new_user_login"]/div[3]/input');
    callMeBack();
    login.click();
  } else if (location.href == "https://app.dext.com/gamma/costs/inbox") {
    let check1 = await getElementByXpath('//*[@id="nnd-root"]/div[2]/div[2]/div/table/tbody/tr[1]/td[5]/a/span');
    check1.click();
  }
  //

  return;
}
// Helper functions

async function WaitForQueryAll(selector, Qinterval = 1300, killcount = "") {
  let res = await QueryPromise(selector, Qinterval, killcount);
  return res;
}
function QueryPromise(selector, Qinterval, killcount) {
  return new Promise((resolve, reject) => {
    let y,
      tries = 0;
    y = setInterval(() => {
      //console.log(tries)
      tries++;
      let x;
      try {
        x = document.querySelectorAll(selector);
      } catch {
        x = [];
      }
      if (x[0]) {
        clearInterval(y);
        //console.log("solved", x);
        resolve(x);
      } else if (killcount && tries > killcount) {
        //  console.log("killed",x)
        clearInterval(y);
        console.log("Killed...", selector);
        resolve("killed");
      }
      {
        //console.log("Not found restart", selector);
      }
    }, 1000);
  });
}

function PauseFor(timer) {
  //console.log("Pausing For ", timer);
  return new Promise((resolved) => {
    setTimeout(() => {
      resolved();
    }, timer);
  });
}

function random(min, max) {
  let number = Math.floor(Math.random() * (max - min)) + min;
  return number;
}
function getElementByXpath(path, killcount = "") {
  return new Promise((resolve, reject) => {
    let y,
      tries = 0;
    y = setInterval(() => {
      //console.log(tries)
      tries++;
      let x;
      try {
        x = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      } catch {
        x = [];
      }
      if (x) {
        clearInterval(y);
        //console.log("solved", x);
        resolve(x);
      } else if (killcount && tries > killcount) {
        //  console.log("killed",x)
        clearInterval(y);
        console.log("Killed...", selector);
        resolve("killed");
      }
      {
        //console.log("Not found restart", selector);
      }
    }, 500);
  });
}
function callMeBack() {
  chrome.runtime.sendMessage({ order: "CallMeBack" });
}
function confetti() {
  chrome.runtime.sendMessage({ order: "confetti" });
}
