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
  console.log("IN CreateNewGmail-Email");

  // INPUT SUBJECT BODY UNDER HERE
  let subjectText = "This is a Generated Subject";
  // INPUT BODY TEXT UNDER HERE
  // NOTE : you have to use backTicks ` ` in the text below so that it would support MultiLines
  let bodyText = `Hey Jonathan 
   Here is some random text 
    And a second Paragraph 
     All the Best`;

  // Text Body above here
  bodyText = bodyText.replace(/\n/g, "<br/>");
  let AudioLink = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/airhorn.mp3"; // This is the horn , can be replaced with any link that ends with .mp3
  let ComposeBtn = await WaitForQueryAll(".T-I.T-I-KE");
  ComposeBtn = ComposeBtn[0];
  ComposeBtn.click();
  let SubjectField = await WaitForQueryAll('[name="subjectbox"]');
  SubjectField = SubjectField[0];
  SubjectField.value = subjectText;
  let BodyField = await WaitForQueryAll('[aria-label="Message Body"]');
  BodyField = BodyField[1];
  BodyField.innerHTML = bodyText;
}
