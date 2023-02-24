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
  console.log("IN dext-select-description");
  let description = document.querySelector("textarea");
  description.select();
}
