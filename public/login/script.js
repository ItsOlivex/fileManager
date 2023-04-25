let textInputs = document.querySelectorAll('.login-input.text-input input');
let submit = document.querySelector('.login-input.login-submit input');

textInputs.forEach((input, i) => {
  input.addEventListener('input', () => {
    if (textInputs[0].value && textInputs[1].value.length > 7) {
      submit.classList.add('active');
    } else {
      submit.classList.remove('active');
    }
  });
});

let form = document.querySelector('.login-form');
form.onsubmit = (e) => {
  if (!textInputs[0].value || textInputs[1].value.length < 8) {
    e.preventDefault();
  }
}