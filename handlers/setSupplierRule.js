if (document.readyState !== "complete") {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      initSetSupplierRule();
    }
  };
} else {
  initSetSupplierRule();
}
//

async function initSetSupplierRule() {
  console.log("Inside SetSupplierRules");
  //
  let list = await WaitForQueryAll(".ellipsize", 100);
  let supplier = list[2].textContent;
  let catagory = list[3].textContent;
  let tax = list[8].textContent;
  let description = await WaitForQueryAll(".d-text-area-control", 100);
  description = description[0].children[0].value;

  let dates = await WaitForQueryAll(".d-datepicker-control", 100);
  console.log(dates);
  let date1 = dates[0].children[0].children[0].value;
  let date2, DueIn;
  if (dates.length == 1) {
    date2 = false;
  } else {
    date2 = dates[1].children[0].children[0].value;
  }
  if (date2) {
    DueIn = DueDater(date1, date2); // Due In after calculation
  } else {
    DueIn = "";
  }

  let setRuleBtn = await WaitForQueryAll(".field-addendum", 100);

  setRuleBtn = setRuleBtn[0].children[0];
  setRuleBtn.click();
  // Banner Actions
  let banner = await WaitForQueryAll(".d-modal-overlay.js-focus-trapped", 200);
  banner = banner[0];
  let bannerInputs = banner.querySelectorAll(".ellipsize");
  let bannerCatagory = bannerInputs[1];
  bannerCatagory = bannerCatagory;
  let bannerDescription = banner.querySelector(".d-text-area-control");
  bannerDescription = bannerDescription.children[0];
  let bannerTax = bannerInputs[6];
  bannerTax = bannerTax.children[0];
  let bannerDateSelector = bannerInputs[5]; //days after invoice date
  bannerDateSelector = bannerDateSelector.children[0];
  let banenerDateNumber = await ChildInParent(banner, ".d-number-field-control", 100);
  banenerDateNumber = banenerDateNumber.children[0];
  // Banner inputting
  bannerCatagory.textContent = catagory;

  bannerDescription.value = description;
  bannerTax.textContent = tax;
  bannerDateSelector.textContent = "days after invoice date";
  banenerDateNumber.value = DueIn;
  runfileHere("./media/confetti.js");
  return;
}

function DueDater(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
