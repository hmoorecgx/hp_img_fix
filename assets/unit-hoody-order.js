// Selecting form and input elements
const form = document.getElementById("hoodieForm");
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

  const formElement = document.getElementById("hoodieForm");
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
  var fullunitName = document.getElementById("unitName");
  var fullorderDate = document.getElementById("orderDate");
  var fulldelDate = document.getElementById("delDate");
  var unitStoreVal = document.getElementById("unitStore");
  var unitAddVal = document.getElementById("unitAdd");
  var unitCityVal = document.getElementById("unitCity");
  var fullcustomerName = document.getElementById("customerName");
  var unitZipVal = document.getElementById("unitZip");
  var fulltotal = document.getElementById("total");
  var fulltotal1 = document.getElementById("total1");
  var fulltotal2 = document.getElementById("total2");
  var fullhatFleece = document.getElementById("CP90hatFleece");
  var verifyCheckbox = document.getElementById("verify");

  // Getting trimmed values from input fields
  var unitName = fullunitName.value.trim();
  var orderDate = fullorderDate.value.trim();
  var delDate = fulldelDate.value.trim();
  var unitStore = unitStoreVal.value.trim();
  var unitAdd = unitAddVal.value.trim();
  var unitCity = unitCityVal.value.trim();
  var customerName = document.getElementById("fullcustomerName");
  var unitZip = unitZipVal.value.trim();


  var total = fulltotal.value.trim();
  var total1 = fulltotal1.value.trim();
  var total2 = fulltotal2.value.trim();
  var hatFleece = fullhatFleece.value.trim();

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
  if (unitName === "") {
    showError(fullunitName, "The Full Unit Name field is mandatory.");
  }

   if (customerName === "") {
    showError(fullcustomerName, "The Customer Name field is mandatory.");
  }
  if (orderDate === "") {
    showError(fullorderDate, "The Order Date  field is mandatory.");
  }
  if (delDate === "") {
    showError(fulldelDate, "Teh Delivery Date field is mandatory.");
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

  if (unitZip === "") {
    showError(unitZipVal, "The Zip | APO | FPO field is mandatory.");
  }

    if (total >=1 && total <24) {
    showError(
      fulltotal,
      'Must order at least 24 pieces of this item'
    );
  }

  if (total1 >=1 &&  total1 <24) {
    showError(
      fulltotal1,
      'Must order at least 24 pieces of this item'
    );
  }
  
  if (total2 >=1 &&  total2 <24) {
    showError(
      fulltotal2,
      'Must order at least 24 pieces of this item'
    );
  }

  if (hatFleece >=1 &&  hatFleece <24) {
    showError(
      fullhatFleece,
      'Must order at least 24 pieces'
    );
  }

function findTotal() {
  var arr = document.getElementsByName('size');
  var tot = 0;

  for (var i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].value))
      tot += parseInt(arr[i].value);
  }
  
  document.getElementById('total').value = tot;
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
