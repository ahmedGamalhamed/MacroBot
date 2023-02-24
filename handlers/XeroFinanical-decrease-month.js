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
  console.log("Decrease Month");

  let SoftLockInput = document.getElementById("SoftLockDate");
  let HardLockInput = document.getElementById("HardLockDate");
  let SoftLockDate = document.getElementById("SoftLockDate").value;
  let HardLockDate = document.getElementById("HardLockDate").value;
  //
  //console.log(SoftLockDate);
  //console.log(HardLockDate);

  //
  if (HardLockDate == "") {
    //console.log("empty");
    let date = new Date();
    date.setDate(1);
    date.setHours(-1);
    //console.log(date);
    let NumericDate = getNumericDate(date);
    SoftLockInput.value = NumericDate;
    HardLockInput.value = NumericDate;
    document.querySelectorAll(".green")[0].children[0].click();
  } else {
    let date = new Date(HardLockDate);
    //console.log(date);
    //let nextMonth = addMonths(date, 1);
    date.setDate(1);
    date.setHours(-1);
    let newDate = getNumericDate(date);
    let x = new Date(newDate);
    SoftLockInput.value = newDate;
    HardLockInput.value = newDate;
    document.querySelectorAll(".green")[0].children[0].click();
  }
}

// Helper functions
function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }

  return date;
}
function getNumericDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let NumericDate = `${day}/${month}/${year}`;
  return NumericDate;
}

// Helper functions
