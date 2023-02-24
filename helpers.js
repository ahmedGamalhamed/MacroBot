console.log("helpers injected");
async function WaitForQueryAll(selector, Qinterval = 500, killcount = "") {
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
    }, Qinterval);
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
        //console.log("killed", x);
        clearInterval(y);
        //console.log("Killed...", selector);
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
function runfileHere(file) {
  chrome.runtime.sendMessage({ order: "runFileHere", file: file });
}
function playAudio(link) {
  chrome.runtime.sendMessage({ order: "playAudio", src: link });
}
function ChildInParent(parentELe, childSelector) {
  let i;
  let child;
  return new Promise((resolved) => {
    i = setInterval(() => {
      child = parentELe.querySelector(childSelector);
      if (child) {
        clearInterval(i);
        resolved(child);
      } else {
        console.log("trying...");
      }
    }, 500);
  });
}
function waitForElementToIncludeClassName(ele, className) {
  let i;
  return new Promise((resolved) => {
    i = setInterval(() => {
      if (ele.className.includes(className)) {
        clearInterval(i);
        resolved();
      }
    }, 500);
  });
}
function setMemory(memory) {
  chrome.runtime.sendMessage({ order: "setMemory", memory });
}
async function getMemory() {
  let Memory = await chrome.runtime.sendMessage({ order: "getMemory" });
  return Memory;
}
function simuateKey(parent) {
  parent.dispatchEvent(
    new KeyboardEvent("keydown", {
      bubbles: true,
      composed: true,
      key: "w",
      keyCode: 87,
      code: "KeyW",
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
      which: 87,
    })
  );
}
function ChildsInParent(parentELe, childSelector) {
  let i;
  let child;
  return new Promise((resolved) => {
    i = setInterval(() => {
      child = parentELe.querySelectorAll(childSelector);
      if (child[0]) {
        clearInterval(i);
        resolved(child);
      } else {
        console.log("trying...");
      }
    }, 500);
  });
}
function simulateMouseClick(element) {
  const mouseClickEvents = ["mousedown", "click", "mouseup"];
  try {
    mouseClickEvents.forEach((mouseEventType) =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      )
    );
  } catch {}
}
function setNativeValue(element, value) {
  let lastValue = element.value;
  element.value = value;
  let event = new Event("input", { target: element, bubbles: true });
  // React 15
  event.simulated = true;
  // React 16
  let tracker = element._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  element.dispatchEvent(event);
}
function popup(url) {
  var params = [
    "height=" + screen.height,
    "width=" + screen.width,
    "fullscreen=yes", // only works in IE, but here for completeness
  ].join(",");
  // and any other options from
  // https://developer.mozilla.org/en/DOM/window.open

  var popup = window.open(url, "popup_window", params);
  popup.moveTo(0, 0);
}
function DexSetter(rowName, optionName) {
  options = {
    rowName,
    optionName,
  };
  setMemory(options);
  runfileHere("./handlers/Dex-Tax-Setter.js");
}
