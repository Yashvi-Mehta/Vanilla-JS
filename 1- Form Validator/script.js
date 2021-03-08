const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Input error message functions
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const error_message = formControl.querySelector("small");
  error_message.textContent = message;
  //you could also have used .innerText instead of textContent
}
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add("success");
  //or use formControl.className="form-control success"
}

// check req inputs
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      // input.id returns name in all lowercase so using function for it
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  let len = input.value.length;
  if (len < min) {
    showError(
      input,
      `${getFieldName(input)} should be at least ${min} characters`
    );
    // `${getFieldName(input)} should be at least ${min} characters`;
  } else if (len > max) {
    showError(
      input,
      `${getFieldName(input)} should be not be more than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//check if passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value != input2.value) {
    showError(input2, "Please enter same password");
    showError(input1, "Please enter same password");
  } else {
    showSuccess(input1);
    showSuccess(input2);
  }
}

//Capitalize 1st letter of id to display in error
function getFieldName(input) {
  const name = input.id;
  return name.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  console.log("Submitted");
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
