//1.Selecting Elements
const password = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strengthText");
const copyBtn = document.getElementById("copyBtn");
const toggleBtn = document.getElementById("toggleBtn");

//2.Selecting Items
const length = document.getElementById("length");
const lower = document.getElementById("lower");
const upper = document.getElementById("upper");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");

//3.Generate & Reset Button
const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");

//4. Strength Checker Function
function checkStrength(val) {
  let strength = 0;

  if (val.match(/[a-z]/)) strength++;
  if (val.match(/[A-Z]/)) strength++;
  if (val.match(/[0-9]/)) strength++;
  if (val.match(/[$@#&!]/)) strength++;
  if (val.length >= 8) strength++;

  if (val === "") {
    strengthBar.style.width = "0%";
    strengthBar.style.background = "transparent";
    strengthText.innerText = "Start typing....";
    return;
  }

  const levels = [
    ["20%", "#ff4f4f", "Very Weak 😣"],
    ["40%", "#ff914d", "Weak 😕"],
    ["60%", "#ffc93c", "Medium 😐"],
    ["80%", "#7cd992", "Strong 🙂"],
    ["100%", "#2ecc71", "Very Strong 💪"],
  ];

  const level = levels[strength - 1];

  if (level) {
    strengthBar.style.width = level[0];
    strengthBar.style.background = level[1];
    strengthText.innerText = level[2];
  }
}

/* real-time check */
password.addEventListener("input", () => {
  checkStrength(password.value);
});

//5.Toggle Password
toggleBtn.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    toggleBtn.classList.remove("fa-eye");
    toggleBtn.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    toggleBtn.classList.remove("fa-eye-slash");
    toggleBtn.classList.add("fa-eye");
  }
});

//6.Copy Password
copyBtn.addEventListener("click", () => {
  if (!password.value) {
    alert("Nothing to copy!");
    return;
  }
  navigator.clipboard
    .writeText(password.value)
    .then(() => alert("Password Copied!"))
    .catch(() => alert("Copy failed!"));
});

//7.Generate Password
const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "1234567890";
const symbolSet = "!@#$%&*()-_+?/";

function randomChar(set) {
  return set[Math.floor(Math.random() * set.length)];
}

function generatePassword() {
  let pass = "";
  let passLength = parseInt(length.value);

  const options = [
    lower.checked && lowerSet,
    upper.checked && upperSet,
    number.checked && numberSet,
    symbol.checked && symbolSet,
  ].filter(Boolean);

  if (options.length === 0) {
    alert("Select at least one option!");
    return;
  }

  for (let i = 0; i < passLength; i++) {
    const set = options[Math.floor(Math.random() * options.length)];
    pass += randomChar(set);
  }

  password.value = pass;

  //update strength after generating
  checkStrength(pass);
}
generateBtn.addEventListener("click", generatePassword);

//8.Copy Password
resetBtn.addEventListener("click", () => {
  password.value = "";
  strengthBar.style.width = "0%";
  strengthBar.style.background = "transparent";
  strengthText.innerText = "Start typing...";

  length.value = 8;
  lower.checked = true;
  upper.checked = true;
  number.checked = true;
  symbol.checked = false;
});
