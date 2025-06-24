var signedInEmail = document.getElementById("signedInEmail");
var signedInPassword = document.getElementById("signedInPassword");
var registerEmail = document.getElementById("registerEmail");
var registerPassword = document.getElementById("registerPassword");
var userName = document.getElementById("userName");
var dashboard = document.getElementById("dashboard");
var signInError = document.getElementById("signInError");
var registerError = document.getElementById("registerError");
var emptyInputError = document.getElementById("emptyInputError");
var registerSuccess = document.getElementById("registerSuccess");
var users = JSON.parse(localStorage.getItem("users")) || []

function register() {
  registerError.classList.add("d-none");
  emptyInputError.classList.add("d-none");
  registerSuccess.classList.add("d-none");
  var name = userName.value.trim();
  var email = registerEmail.value.trim();
  var password = registerPassword.value.trim();
  if (!name || !email || !password) {
    emptyInputError.classList.remove("d-none")
    return
  }
  if (users.length) {
    flag = false
    users.forEach(e => {
      if (e.email == registerEmail.value) {
        registerError.classList.remove("d-none")
        flag = true
      }
    });
    if (flag) {
      return
    }
  }
  var user = {
    userName: name,
    email: registerEmail.value,
    password: registerPassword.value
  }
  users.push(user)
  localStorage.setItem("users", JSON.stringify(users))
  registerSuccess.classList.remove("d-none")
}
function login() {
  var flag = false
  if (users.length === 0) {
    signInError.classList.remove("d-none")
    return
  }
  users.forEach(e => {
    if (e.email === signedInEmail.value
      && e.password === signedInPassword.value) {
      localStorage.setItem("currentUserName", e.userName)
      window.location.href = "dashboard.html"
      flag = true
    }
  });
  if (flag === false) {
    signInError.classList.remove("d-none")
  }

}

function displayDashboard() {
  var path = window.location.pathname;
  if (path.includes("dashboard.html")) {
    var box = `<h1 class="text-center">Welcome ${localStorage.getItem("currentUserName")}</h1>`;
    dashboard.innerHTML = box;
  }
}

displayDashboard()
