if (document.readyState !== "complete") {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      initselectProduct();
    }
  };
} else {
  initselectProduct();
}
//
async function initselectProduct() {
  console.log("IN dext-select-catagory");
  let catagory = document.querySelectorAll(".ellipsize")[3];
  simulateMouseClick(catagory);
}
