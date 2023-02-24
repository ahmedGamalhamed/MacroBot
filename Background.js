let Combos = {};
let history = {};
let updateListener, updateFile, UpdatedTabId, historyFile, NewTabListener;
let memories = {};
chrome.storage.local.get(["Macros"], (res) => {
  Combos = res.Macros;
});

updateListener = function (senderTabId, info) {
  if (info.status === "complete" && senderTabId == UpdatedTabId) {
    chrome.tabs.onUpdated.removeListener(updateListener);
    RunFileHere(historyFile);
  }
};

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  let order = response.order;
  //console.log(order, response);
  // This is to start or Stop the APP
  if (order == "Macro") {
    console.log(response);
    let key = response.key;
    let shift = response.shift;
    let ctrl = response.ctrl;
    if (key && shift && ctrl) {
      try {
        if (!Object.keys(Combos).includes(key)) {
          console.log("Key Not Added to Combos");
          return;
        }
      } catch {
        console.log("Key Not Added to Combos");
      }

      file = `Ctrl-Shift-${key}.js`;
      if (Object.keys(Combos).includes(key)) {
        if (Combos[key].TabAndScript) {
          chrome.tabs.create(
            {
              url: Combos[key].url,
              active: true,
            },
            (tab) => {
              history[tab.id] = { key: key, file: file };
              console.log("History:", history);
              NewTabScript(tab.id, file);
            }
          );
        } else {
          RunFileHere(file);
        }
      }
    }
  } else if (order == "update") {
    Combos = response.Combos;
    chrome.storage.local.set({ Macros: Combos });
    console.log("Current Combos", Combos);
  } else if (order == "CallMeBack") {
    let senderTabId = sender.tab.id;
    UpdatedTabId = senderTabId;
    console.log("Wants a callback: ", UpdatedTabId);
    historyFile = history[UpdatedTabId].file;
    chrome.tabs.onUpdated.addListener(updateListener);
  } else if (order == "runFileHere") {
    let senderTabId = sender.tab.id;
    let file = response.file;
    RunFileAt(senderTabId, file);
  } else if (order == "playAudio") {
    let senderTabId = sender.tab.id;
    let audioLink = response.src;
    let func = playAudio;
    RunFuncHere(senderTabId, func, [audioLink]);
  } else if (order == "setMemory") {
    let senderTabId = sender.tab.id;
    let memory = response.memory;
    memories[senderTabId] = memory;
    console.log(memories);
  } else if (order == "getMemory") {
    let senderTabId = sender.tab.id;
    console.log(memories[senderTabId]);
    memories[senderTabId] ? sendResponse({ memory: memories[senderTabId] }) : sendResponse({ memory: false });
  }
  //
  return;
});
NewTabListener = function (tabId, info) {
  if (info.status === "complete") {
    chrome.tabs.onUpdated.removeListener(NewTabListener);
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: [file],
      })
      .catch((error) => {
        console.log("The Script for this combo doesnt exist \n OR bad URL", error);
      });
  }
};
async function NewTabScript(tabId, file) {
  chrome.tabs.onUpdated.addListener(NewTabListener);
}

//
function RunFileAt(tabId, file) {
  chrome.scripting
    .executeScript({
      target: { tabId: tabId },
      files: [file],
    })
    .catch(() => {
      console.log("Cant Find", file);
    });
}
function RunFuncHere(tabId, fun, args) {
  chrome.scripting
    .executeScript({
      args: args,
      target: { tabId: tabId },
      func: fun,
    })
    .catch(() => {
      console.log("Cant Find", file);
    });
}
async function RunFileHere(file) {
  console.log("Just scripting");
  console.log(file);

  let tab = await getCurrentTab();
  if (!tab) {
    console.log("Tab not in focus");
    return;
  }
  let tabId = tab.id;

  let key = file.split("-")[2].replace(".js", "");
  history[tab.id] = { key: key, file: file };
  console.log("History:", history);
  chrome.scripting
    .executeScript({
      target: { tabId: tabId },
      files: [file],
    })
    .catch(() => {
      console.log("The Script for this combo doesnt exist");
    });
}

// Helper Functions
function PauseFor(timer) {
  //console.log("Pausing For ", timer);
  return new Promise((resolved) => {
    setTimeout(() => {
      resolved();
    }, timer);
  });
}
async function stop() {
  BOT_ENABLED = 0;
  chrome.tabs.update(running_tab_id, { url: url });
  console.log("stopped");
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
// The Bot
function playAudio(link) {
  let audioEle = document.createElement("audio");
  audioEle.src = link;
  audioEle.setAttribute("id", "myAudioEle");
  audioEle.setAttribute("preload", "auto");
  document.body.append(audioEle);
  let audio = document.getElementById("myAudioEle");
  audio.play();
}
