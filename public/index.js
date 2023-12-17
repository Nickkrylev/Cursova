// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("buttonAppointment")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Get the login modal
var loginModal = document.getElementById("loginModal");

// Get the button that opens the login modal
var signInBtn = document.getElementById("signIn");

// Get the elements that close the login modal
var closeLoginBtn = document.getElementsByClassName("login-close")[0];
var prevLoginBtn = document.getElementsByClassName("login-prev")[0];
var nextLoginBtn = document.getElementsByClassName("login-next")[0];

// When the user clicks on the sign-in image, open the login modal
signInBtn.onclick = function() {
  loginModal.style.display = "block";
}

// Close the login modal
function closeLoginModal() {
  loginModal.style.display = "none";
}

closeLoginBtn.onclick = closeLoginModal;
prevLoginBtn.onclick = closeLoginModal;
nextLoginBtn.onclick = closeLoginModal;

// When the user clicks anywhere outside of the login modal, close it
window.onclick = function(event) {
  if (event.target == loginModal) {
    closeLoginModal();
  }
}
