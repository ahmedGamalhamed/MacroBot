if (document.readyState !== "complete") {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      initApplication();
    }
  };
} else {
  initApplication();
}
if (typeof window.buttonIndex == "undefined") {
  var buttonIndex = 0;
}
async function initApplication() {
  let visiblebuttons = [];
  console.log("inside bank rec");
  let buttons = await WaitForQueryAll(".xbtn.skip.okayButton.exclude", 100);
  for (let button of buttons) {
    if (button.style.visibility == "visible") {
      visiblebuttons.push(button);
    }
    button.parentElement.parentElement.style.border = "";
  }
  let statement = visiblebuttons[buttonIndex].parentElement.parentElement;
  statement.scrollIntoView({ behavior: "smooth" });
  statement.style.border = "5px solid #d3af37";
  await PauseFor(500);
  visiblebuttons[buttonIndex].focus();

  if (buttonIndex < visiblebuttons.length - 1) {
    buttonIndex++;
  } else {
    buttonIndex = 0;
  }
}
