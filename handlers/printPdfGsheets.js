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
  console.log("Inside PrintPdf Gsheets");
  //
  var element = document.getElementById("docs-file-menu");
  console.log(element);
  simulateMouseClick(element);
  let menuDownload = document.querySelectorAll("[aria-label='Download d']");
  menuDownload = menuDownload[0];
  simulateMouseClick(menuDownload);
  simulateMouseClick(menuDownload);
  let pdf = await WaitForQueryAll('[aria-label="PDF (.pdf) p"]');
  pdf = pdf[0];
  simulateMouseClick(pdf);
  let download = await WaitForQueryAll(".docs-material-button-content");
  download = download[7];
  simulateMouseClick(download);
  console.log(download[0]);
}
