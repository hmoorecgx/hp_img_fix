// Selecting form and input elements
const form = document.getElementById("capForm");
const formSubmissionUrl =
  "https://unit-gear-submission-shopcgx.azurewebsites.net/api/unitGearOrderSubmit";

// Function to display error messages
const showError = function (field, errorText) {
  field.classList.add("error");

  const errorElement = document.createElement("small");
  errorElement.classList.add("error-text");
  errorElement.innerText = errorText;

  field.closest(".form-group").appendChild(errorElement);
};

const redirectToConfirmationPage = function () {
  window.location = "/pages/unit-gear-confirmation";
};

const hideResultsModal = function () {
  document.getElementById("modal-results").ariaHidden = true;
  document.querySelector(".PageOverlay").classList.remove("is-visible");
};

const showResultsModal = function ({
  header,
  success,
  closable,
  contentAugmenter,
}) {
  const modalHeader = document.getElementById("modal-results-header");
  modalHeader.innerHTML = header;

  const closeButtonElement = document.getElementById("modal-results-close");
  if (closable === false) {
    closeButtonElement.style.display = "none";
  } else {
    closeButtonElement.style.display = "block";
  }

  const modalContent = document.getElementById("modal-results-content");
  modalContent.innerHTML = "";
  modalContent.style.textAlign = "start";
  if (success === true) {
    modalContent.className = "Alert Alert--large Alert--success";
  } else if (success === false) {
    modalContent.className = "Alert Alert--large Alert--error";
  } else {
    modalContent.className = "";
  }

  if (contentAugmenter) {
    contentAugmenter(modalContent);
  }

  const modalPageOverlay = document.querySelector(".PageOverlay");
  modalPageOverlay.classList.add("is-visible");

  document.getElementById("modal-results").ariaHidden = false;
};

const showLoadingModal = function () {
  showResultsModal({
    header: "Submitting Order...",
    success: null,
    closable: false,
  });
};

// Function to make error window appear on screen
const showErrorModal = function (errorMessage, expectedError) {
  showResultsModal({
    header: "Error...",
    success: false,
    closable: true,
    contentAugmenter: function (contentElement) {
      const errorStartingElement = document.createElement("p");
      errorStartingElement.innerHTML =
        "An error occurred submitting your unit gear order";

      // TODO: Populate error message here
      if (expectedError) {
        errorStartingElement.innerHTML += ": " + errorMessage;
      } else {
        errorStartingElement.innerHTML +=
          ". " + "Contact customer support for assistance.";
      }

      contentElement.appendChild(errorStartingElement);
    },
  });
};

// Function that processes the results of form submission
const handleFormResultData = function (response) {
  if (response.ok) {
    response.json().then(function (content) {
      if (content.success) {
        console.log("Success: ", content);
        redirectToConfirmationPage();
      } else {
        console.error(
          "Error occurred when submitting unit gear order: ",
          content
        );
        hideResultsModal();
        showErrorModal(content.error, true);
      }
    });
  } else {
    console.error("Error occurred when submitting unit gear order: ", response);
    hideResultsModal();
    showErrorModal("", false);
  }
};

// Actual function that handles form submission
const submitFormData = function (e) {
  e.submitter.innerHTML = "Loading... Please wait...";
  showLoadingModal();

  const formElement = document.getElementById("capForm");
  const formData = new FormData(formElement);
  const formQueryParameters = new URLSearchParams();
  for (const pair of formData) {
    formQueryParameters.append(pair[0], pair[1]);
  }

  fetch(formSubmissionUrl, {
    body: formQueryParameters,
    credentials: "same-origin",
    method: "POST",
  })
    .then(function (response) {
      handleFormResultData(response);
      e.submitter.innerHTML = "Submit";
    })
    .catch(function (error) {
      console.error(
        "Unexpected error occurred when submitting the unit gear order: ",
        error
      );
      hideResultsModal();
      showErrorModal("", false);
      e.submitter.innerHTML = "Submit";
    });
};

// Function to handle form validation and submission
const handleFormData = function (e) {
  e.preventDefault();

  // Retrieving input elements
  var fullnameInput = document.getElementById("poc1name");
  var poc1phoneVal = document.getElementById("poc1phone");
  var emailInput = document.getElementById("email");
  var poc2nameVal = document.getElementById("poc2name");
  var poc2phoneVal = document.getElementById("poc2phone");
  var poc2emailVal = document.getElementById("poc2email");
  var unitStoreVal = document.getElementById("unitStore");
  var unitAddVal = document.getElementById("unitAdd");
  var unitCityVal = document.getElementById("unitCity");
  var unitStateVal = document.getElementById("unitSt");
  var unitZipVal = document.getElementById("unitZip");

  var shipSame = document.querySelector(
    'input[name="billAddSame"]:checked'
  ).value;
  var billAddVal = document.getElementById("billAdd");
  var billCityVal = document.getElementById("billCity");
  var billStVal = document.getElementById("billSt");
  var billZipVal = document.getElementById("billZip");

  var sizeSMVal = document.getElementById("sizeSM");
  var sizeMDVal = document.getElementById("sizeMD");
  var sizeLGVal = document.getElementById("sizeLG");
  var sizeXLGVal = document.getElementById("sizeXLG");
  var customVal = document.getElementById("custom");
  var verifyVal = document.getElementById("verify");
  var verifyCheckbox = document.getElementById("verify");

  // Getting trimmed values from input fields
  var fullname = fullnameInput.value.trim();
  var poc1phone = poc1phoneVal.value.trim();
  var email = emailInput.value.trim();
  var poc2name = poc2nameVal.value.trim();
  var poc2phone = poc2phoneVal.value.trim();
  var poc2email = poc2emailVal.value.trim();
  var unitStore = unitStoreVal.value.trim();
  var unitAdd = unitAddVal.value.trim();
  var unitCity = unitCityVal.value.trim();
  var unitSt = unitStateVal.value.trim();
  var unitZip = unitZipVal.value.trim();

  var billAdd = billAddVal.value.trim();
  var billCity = billCityVal.value.trim();
  var billSt = billStVal.value.trim();
  var billZip = billZipVal.value.trim();

  var sizeSM = sizeSMVal.value.trim();
  var sizeMD = sizeMDVal.value.trim();
  var sizeLG = sizeLGVal.value.trim();
  var sizeXLG = sizeXLGVal.value.trim();
  var custom = customVal.value.trim();

  // Regular expression pattern for email validation
  var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  // Clearing previous error messages
  document
    .querySelectorAll(".form-group .error")
    .forEach((field) => field.classList.remove("error"));
  document
    .querySelectorAll(".error-text")
    .forEach((errorText) => errorText.remove());

  // Performing validation checks
  if (fullname === "") {
    showError(fullnameInput, "The 1st POC: Full Name field is mandatory.");
  }
  if (poc1phone === "") {
    showError(poc1phoneVal, "The 1st POC: Phone Number field is mandatory.");
  }
  if (!emailPattern.test(email)) {
    showError(emailInput, "The 1st POC: Email Address field is mandatory.");
  }
  if (poc2name === "") {
    showError(poc2nameVal, "The 2nd POC: Full Name field is mandatory.");
  }
  if (poc2phone === "") {
    showError(poc2phoneVal, "The 2nd POC: Phone Number field is mandatory.");
  }
  if (!emailPattern.test(poc2email)) {
    showError(poc2emailVal, "The 2nd POC: Email Address field is mandatory.");
  }
  if (unitStore === "") {
    showError(
      unitStoreVal,
      "The Unit Name | Exchange Location (Store #) field is mandatory."
    );
  }
  if (unitAdd === "") {
    showError(unitAddVal, "The Address field is mandatory.");
  }
  if (unitCity === "") {
    showError(unitCityVal, "The City | APO | FPO field is mandatory.");
  }
  if (unitSt === "") {
    showError(unitStateVal, "The State | AP | AA | AE field is mandatory.");
  }
  if (unitZip === "") {
    showError(unitZipVal, "The Zip | APO | FPO field is mandatory.");
  }
  if (billAdd === "" && shipSame === "No") {
    showError(billAddVal, "Billing Address is mandatory");
  }
  if (billCity === "" && shipSame === "No") {
    showError(billCityVal, "City | APO | FPO");
  }
  if (billSt === "" && shipSame === "No") {
    showError(billStVal, "State | AP | AA | AE is mandatory");
  }
  if (billZip === "" && shipSame === "No") {
    showError(billZipVal, "Zip | APO | FPO is mandatory");
  }

  if (sizeSM === "") {
    showError(
      sizeSMVal,
      'The # SMALL: 6-3/8 thru 6-3/4 (20" thru 21-1/4") field is mandatory.'
    );
  }
  if (sizeMD === "") {
    showError(
      sizeMDVal,
      'The # MEDIUM: 6-7/8 thru 7-1/8 (21-5/8" thru 22-3/8") field is mandatory.'
    );
  }
  if (sizeLG === "") {
    showError(
      sizeLGVal,
      'The # LARGE: 7-1/4 thru 7-1/2 (22-3/4" thru 23-1/2") field is mandatory.'
    );
  }
  if (sizeXLG === "") {
    showError(
      sizeXLGVal,
      'The # X LARGE: 7-5/8 thru 8 (23-7/8" thru 25") field is mandatory.'
    );
  }
  if (custom === "") {
    showError(
      customVal,
      "The UNIT lettering is limited to 17 CHARACTERS MAX - inclusive of spacing, periods and hyphens (Refer to example above) field is mandatory. "
    );
  }
  if (!verifyCheckbox.checked) {
    showError(
      verifyVal,
      "The I have verified the information above. field is mandatory."
    );
  }

  // Checking for any remaining errors before form submission
  if (document.querySelectorAll(".form-group .error").length > 0) {
    return;
  }

  // Submitting the form
  console.log("Submitting form data...");
  submitFormData(e);
};

// Handling form submission event
form.addEventListener("submit", handleFormData);
