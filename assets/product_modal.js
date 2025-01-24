// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal
var img = document.querySelector(".ProductMeta__Description img");
var modalImg = document.getElementById("modalImage");
var hideProducts = document.querySelector(".ProductRecommendations");
var hideProducts2 = document.getElementById("modal__hide");
var hideProducts3 = document.getElementById("section-footer");
var hideProducts4 = document.querySelector(".modal__here");

if (img) {
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    hideProducts.classList.add("mystyle");
    hideProducts2.classList.add("mystyle");
    hideProducts3.classList.add("mystyle");
    hideProducts4.classList.add("mystyle");
  };
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    hideProducts2.classList.remove("mystyle");
    hideProducts.classList.remove("mystyle");
    hideProducts3.classList.remove("mystyle");
    hideProducts4.classList.remove("mystyle");
  }
};
