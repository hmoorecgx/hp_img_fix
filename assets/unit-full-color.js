// Selecting form and input elements
const form = document.getElementById("fullColorOrderForm");
const formSubmissionUrl =
  "https://unit-gear-submission-shopcgx.azurewebsites.net/api/unitGearOrderSubmit";
const productCodes = [
  "M305US",
  "C0282AUH",
  "966M",
  "9300",
  "9388"
];
const productSizes = [
  "sizeSM",
  "sizeMD",
  "sizeLG",
  "sizeXLG",
  "size2XLG",
  "size3XLG"
];
const PRIMARY_MIN_QUANTITY = 36;
const SECONDARY_MIN_QUANTITY = 6;

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

  const formElement = document.getElementById("fullColorOrderForm");
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

const getProductQuantities = function (productCode, productSizes) {
  var quantities = [];
  var quantitiesDict = {};
  var quantityGrandTotal = 0;
  
  productSizes.forEach(function (size) {
    const sizeQuantityElement = document.getElementById(productCode + size);
    if (sizeQuantityElement) {
      const sizeQuantityDirty = parseInt((sizeQuantityElement.value || "0").trim());
      const sizeQuantity = isNaN(sizeQuantityDirty) ? 0 : sizeQuantityDirty;
      quantities.push(sizeQuantity);
      quantitiesDict[size] = sizeQuantity;
      quantityGrandTotal += sizeQuantity;
    }
  });

  return {
    productCode,
    productSizes,
    quantities,
    quantitiesDict,
    quantityGrandTotal
  };
}

// Function to handle form validation and submission
const handleFormData = function (e) {
  e.preventDefault();

  // Retrieving input elements
  const fullUnitNameElement = document.getElementById("unitName");
  const fullEmailElement = document.getElementById("ContactForm-email");
  const fullOrderDateElement = document.getElementById("orderDate");
  const fullDelDateElement = document.getElementById("delDate");
  const unitStoreElement = document.getElementById("unitStore");
  const unitAddElement = document.getElementById("unitAdd");
  const unitCityElement = document.getElementById("unitCity");
  const unitZipElement = document.getElementById("unitZip");

  const fullSpecialInstructionsElement = document.getElementById("specialInstructions");
  const verifyCheckboxElement = document.getElementById("verify");

  // Getting trimmed values from input fields
  const unitName = fullUnitNameElement.value.trim();
  const email = fullEmailElement.value.trim();
  const orderDate = fullOrderDateElement.value.trim();
  const delDate = fullDelDateElement.value.trim();
  const unitStore = unitStoreElement.value.trim();
  const unitAdd = unitAddElement.value.trim();
  const unitCity = unitCityElement.value.trim();
  const unitZip = unitZipElement.value.trim();
  const specialInstructions = fullSpecialInstructionsElement.value.trim();

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
  if (email === "" || !email.match(emailPattern)) {
    showError(fullEmailElement, "A valid e-mail address is mandatory.");
  }
  
  if (orderDate === "") {
    showError(fullOrderDateElement, "The Order Date field is mandatory.");
  }
  if (delDate === "") {
    showError(fullDelDateElement, "Teh Delivery Date field is mandatory.");
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
  if (unitZip === "") {
    showError(unitZipElement, "The Zip | APO | FPO field is mandatory.");
  }

  // Total code
  const productQuantities = {};
  productCodes.forEach(function (code) {
    productQuantities[code] = getProductQuantities(code, productSizes);
  });
  console.log("Product quantities: ", productQuantities);

  // At least one product size has to have a quantity of 36...
  var itemWithPrimaryProductMinQuantity = null;
  for (var code of productCodes) {
    const hasPrimaryMinQuantity = -1 !== productQuantities[code]
      .quantities.findIndex(quantity => quantity >= PRIMARY_MIN_QUANTITY);
    if (hasPrimaryMinQuantity) {
      itemWithPrimaryProductMinQuantity = code;
      break;
    };
  }

  // After a product has been chosen to have a quantity of 36,
  // any product thereafter would have to either have a quantity that
  // is equal-to 0 or more-than/equal-to 6. Note: we don't have to exclude
  var itemsWithoutSecondaryMinimumQuantity = [];
  for (var code of productCodes) {
    var noSecondaryMinQuantity = -1 !== productQuantities[code]
      .quantities.findIndex(quantity => !(quantity === 0 || quantity >= SECONDARY_MIN_QUANTITY));
    if (noSecondaryMinQuantity) {
      itemsWithoutSecondaryMinimumQuantity.push(code);
    }
  }

  if (!itemWithPrimaryProductMinQuantity) {
    productCodes.forEach(function (code) {
      const errorArea = document.getElementById("errorArea" + code);
      showError(errorArea, "A minimum quantity of 36 must be entered for this item or one of the others.");
    });
  } else if (itemsWithoutSecondaryMinimumQuantity.length > 0) {
    itemsWithoutSecondaryMinimumQuantity.forEach(function (code) {
      const errorArea = document.getElementById("errorArea" + code);
      showError(errorArea, "After quantity of 36 is entered for an item, any subsequent item must have a minimum quantity of 6.");
    });
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
