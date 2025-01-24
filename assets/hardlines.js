// Selecting form and input elements
const form = document.getElementById("miscForm");
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

  const formElement = document.getElementById("miscForm");
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
  const fullUnitNameElement = document.getElementById("unitName");
  const emailElement = document.getElementById("ContactForm-email");
  const fullOrderDateElement = document.getElementById("orderDate");
  const fullDelDateElement = document.getElementById("delDate");
  const unitStoreElement = document.getElementById("unitStore");
  const unitAddElement = document.getElementById("unitAdd");
  const unitCityElement = document.getElementById("unitCity");
  const unitStateElement = document.getElementById("unitSt");
  const fullCustomerNameElement = document.getElementById("customerName");
  const fullCustomerPhoneElement = document.getElementById("customerphone");
  const unitZipElement = document.getElementById("unitZip");

  const countUnitMugElement = document.getElementById("unitMug");
  const countShotGlassElement = document.getElementById("shotGlass");
  const countUnitBearElement = document.getElementById("unitBear");
  const countUnitCoinElement = document.getElementById("unitCoin");
  const countUnitDecalElement = document.getElementById("unitDecal");
  const countUnitDecal3Element = document.getElementById("unitDecal3");
  const countUnitAfghanElement = document.getElementById("unitAfghan");
  const countUnitLighterElement = document.getElementById("unitLighter");

  const countUnitNalElement = document.getElementById("unitNal");
  const countUnitNalPrintColorElement =
    document.getElementById("unitNalPrintColor");
  const countUnitPatchElement = document.getElementById("unitPatch");
  const countUnitPatchSizeElement =
    document.getElementById("unitPatchPatchSize");
  const countUnitLowballElement = document.getElementById("unitLowball");
  const countUnitLowballColorElement =
    document.getElementById("unitLowballColor");
  const countUnitColsterElement = document.getElementById("unitColster");
  const countUnitColsterColorElement =
    document.getElementById("unitColsterColor");
  const countUnitTumbler10Element = document.getElementById("unitTumbler10");
  const countUnitTumbler10ColorElement =
    document.getElementById("unitTumbler10Color");
  const countUnitMug14Element = document.getElementById("unitMug14");
  const countUnitMug14ColorElement = document.getElementById("unitMug14Color");
  const countUnitBottle18Element = document.getElementById("unitBottle18");
  const countUnitBottle18ColorElement =
    document.getElementById("unitBottle18Color");
  const countUnitTumbler20Element = document.getElementById("unitTumbler20");
  const countUnitTumbler20ColorElement =
    document.getElementById("unitTumbler20Color");
  const countUnitBottle26Element = document.getElementById("unitBottle26");
  const countUnitBottle26ColorElement =
    document.getElementById("unitBottle26Color");
  const countUnitBottle36Element = document.getElementById("unitBottle36");
  const countUnitBottle36ColorElement =
    document.getElementById("unitBottle36Color");

  const verifyCheckboxElement = document.getElementById("verify");

  // Getting trimmed values from input fields
  const unitName = fullUnitNameElement.value.trim();
  const email = emailElement.value.trim();
  const orderDate = fullOrderDateElement.value.trim();
  const delDate = fullDelDateElement.value.trim();
  const unitStore = unitStoreElement.value.trim();
  const unitAdd = unitAddElement.value.trim();
  const unitCity = unitCityElement.value.trim();
  const unitState = unitStateElement.value.trim();
  const customerName = fullCustomerNameElement.value.trim();
  const customerphone = fullCustomerPhoneElement.value.trim();
  const unitZip = unitZipElement.value.trim();

  const unitMug = parseInt((countUnitMugElement.value || "0").trim());
  const shotGlass = parseInt((countShotGlassElement.value || "0").trim());
  const unitBear = parseInt((countUnitBearElement.value || "0").trim());
  const unitCoin = parseInt((countUnitCoinElement.value || "0").trim());
  const unitDecal = parseInt((countUnitDecalElement.value || "0").trim());
  const unitDecal3 = parseInt((countUnitDecal3Element.value || "0").trim());
  const unitAfghan = parseInt((countUnitAfghanElement.value || "0").trim());
  const unitLighter = parseInt((countUnitLighterElement.value || "0").trim());

  const unitNal = parseInt((countUnitNalElement.value || "0").trim());
  const unitNalPrintColor = countUnitNalPrintColorElement.value.trim();
  const unitPatch = parseInt((countUnitPatchElement.value || "0").trim());
  const unitPatchColor = countUnitPatchSizeElement.value.trim();
  const unitLowball = parseInt((countUnitLowballElement.value || "0").trim());
  const unitLowballColor = countUnitLowballColorElement.value.trim();
  const unitColster = parseInt((countUnitColsterElement.value || "0").trim());
  const unitColsterColor = countUnitColsterColorElement.value.trim();
  const unitTumbler10 = parseInt((countUnitTumbler10Element.value || "0").trim());
  const unitTumbler10Color = countUnitTumbler10ColorElement.value.trim();
  const unitMug14 = parseInt((countUnitMug14Element.value || "0").trim());
  const unitMug14Color = countUnitMug14ColorElement.value.trim();
  const unitBottle18 = parseInt((countUnitBottle18Element.value || "0").trim());
  const unitBottle18Color = countUnitBottle18ColorElement.value.trim();
  const unitTumbler20 = parseInt((countUnitTumbler20Element.value || "0").trim());
  const unitTumbler20Color = countUnitTumbler20ColorElement.value.trim();
  const unitBottle26 = parseInt((countUnitBottle26Element.value || "0").trim());
  const unitBottle26Color = countUnitBottle26ColorElement.value.trim();
  const unitBottle36 = parseInt((countUnitBottle36Element.value || "0").trim());
  const unitBottle36Color = countUnitBottle36ColorElement.value.trim();
  
  // Regular expression pattern for email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  // Clearing previous error messages
  document
    .querySelectorAll(".form-group .error")
    .forEach((field) => field.classList.remove("error"));
  document
    .querySelectorAll(".error-text")
    .forEach((errorText) => errorText.remove());

  // Performing validation checks
  if (unitName === "") {
    showError(fullUnitNameElement, "The Full Unit Name field is mandatory.");
  }
  if (customerName === "") {
    showError(fullCustomerNameElement, "The Customer Name field is mandatory.");
  }
  if (email === "" || !email.match(emailPattern)) {
    showError(emailElement, "The Customer e-mail field is mandatory.");
  }

  if (customerphone === "") {
    showError(
      fullCustomerPhoneElement,
      "The Customer Phone field is mandatory."
    );
  }
  if (orderDate === "") {
    showError(fullOrderDateElement, "The Order Date field is mandatory.");
  }
  if (delDate === "") {
    showError(fullDelDateElement, "The Delivery Date field is mandatory.");
  }
  if (unitStore === "") {
    showError(
      unitStoreElement,
      "The Unit Name | Exchange Location (Store #) field is mandatory."
    );
  }
  if (unitAdd === "") {
    showError(unitAddElement, "The Address field is mandatory.");
  }
  if (unitCity === "") {
    showError(unitCityElement, "The City | APO | FPO field is mandatory.");
  }
  if (unitState === "") {
    showError(unitStateElement, "The State field is mandatory.");
  }
  if (unitZip === "") {
    showError(unitZipElement, "The Zip | APO | FPO field is mandatory.");
  }
  if (unitMug >= 1 && unitMug < 24) {
    showError(countUnitMugElement, "There is a minimum of 24 items");
  }
  if (shotGlass >= 1 && shotGlass < 36) {
    showError(countShotGlassElement, "There is a minimum of 36 items");
  }
  if (unitBear >= 1 && unitBear < 12) {
    showError(countUnitBearElement, "There is a minimum of 12 items");
  }
  if (unitCoin >= 1 && unitCoin < 50) {
    showError(countUnitCoinElement, "There is a minimum of 50 items");
  }
  if (unitDecal >= 1 && unitDecal < 50) {
    showError(countUnitDecalElement, "There is a minimum of 50 items");
  }
  if (unitDecal3 >= 1 && unitDecal3 < 36) {
    showError(countUnitDecal3Element, "There is a minimum of 36 items");
  }
  if (unitAfghan >= 1 && unitAfghan < 16) {
    showError(countUnitAfghanElement, "There is a minimum of 16 items");
  }
  if (unitLighter >= 1 && unitLighter < 50) {
    showError(countUnitLighterElement, "There is a minimum of 50 items");
  }
  if (unitNal >= 1 && unitNal < 24) {
    showError(countUnitNalElement, "There is a minimum of 24 items");
  }
  if (unitPatch >= 1 && unitPatch < 50) {
    showError(countUnitPatchElement, "There is a minimum of 50 items");
  }
  if (unitLowball >= 1 && unitLowball < 6) {
    showError(countUnitLowballElement, "There is a minimum of 6 items");
  }
  if (unitColster >= 1 && unitColster < 6) {
    showError(countUnitColsterElement, "There is a minimum of 6 items");
  }
  if (unitTumbler10 >= 1 && unitTumbler10 < 6) {
    showError(countUnitTumbler10Element, "There is a minimum of 6 items");
  }
  if (unitMug >= 1 && unitMug < 6) {
    showError(countUnitMugElement, "There is a minimum of 6 items");
  }
  if (unitBottle18 >= 1 && unitBottle18 < 6) {
    showError(countUnitBottle18Element, "There is a minimum of 6 items");
  }
  if (unitTumbler20 >= 1 && unitTumbler20 < 6) {
    showError(countUnitTumbler20Element, "There is a minimum of 6 items");
  }

  if (unitBottle26 >= 1 && unitBottle26 < 4) {
    showError(countUnitBottle26Element, "There is a minimum of 4 items");
  }

  if (unitBottle36 >= 1 && unitBottle36 < 4) {
    showError(countUnitBottle36Element, "There is a minimum of 4 items");
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
