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
  console.log("XeroBankRec-Discuss.js");
  let memory = await getMemory();
  let index = memory.memory;
  if (!index) {
    index = 0;
  } else if (index !== 0) {
    --index;
  }
  let list = await WaitForQueryAll("#statementLines", 100);
  list = list[0];

  let statements = list.querySelectorAll(".line");
  let currentStatment = statements[index];
  let DiscussBtn = await ChildInParent(currentStatment, ".t4");
  simulateMouseClick(DiscussBtn);
  let DiscussInput = await ChildInParent(currentStatment, "[aria-label='Comment']");
  DiscussInput.focus();
}
