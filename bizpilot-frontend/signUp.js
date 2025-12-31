const passInp = document.querySelector('#password');
const genrateBtn = document.querySelector('#generateBtn');
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

function passGenrator() {

    passwordInput.type = "text";
    togglePassword.textContent = "🙈";

    let str = 'qwertyuiopasdfghjklzxcvbnm1234567890@#$&_.'
    let pass = ''
    for(let i = 1; i <= 8; i++) {
        let j = Math.floor(Math.random()* (str.length));
        pass += str[j];
        console.log(j);        
    };
    passInp.value = pass
}


togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";

  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "🙈" : "👁️";
});

genrateBtn.addEventListener("click" ,passGenrator);