const login = document.getElementById("loginSection");
const register = document.getElementById("registerSection");

document.getElementById("showRegister").onclick = () => {
    login.classList.add("hidden");
    register.classList.remove("hidden");
};

document.getElementById("showLogin").onclick = () => {
    register.classList.add("hidden");
    login.classList.remove("hidden");
};

document.getElementById("signupTop").onclick = () => {
    login.classList.add("hidden");
    register.classList.remove("hidden");
};


/* Show password */

document.getElementById("showPassword").onclick = () => {

    const input = document.getElementById("loginPassword");
    const button = document.getElementById("showPassword");

    input.type = input.type === "password"
        ? "text"
        : "password";

    button.textContent =
        input.type === "password" ? "Show" : "Hide";
};


/* Login */

document.getElementById("loginForm").onsubmit = (e) => {

    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    emailError.textContent = "";
    passwordError.textContent = "";
    loginMessage.textContent = "";

    if (!email) {
        emailError.textContent = "Enter your email.";
        return;
    }

    if (!password) {
        passwordError.textContent = "Enter your password.";
        return;
    }

    // loginMessage.textContent = "Login successful.";
    // loginMessage.style.color = "#25835a";
    alert("Login successful! Welcome to InnovFund.");

    // Later connect this to your backend
};


/* Register */

document.getElementById("registerForm").onsubmit = (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value;
    const confirm = confirmPassword.value;

    registerMessage.textContent = "";

    if (!name || !email || !password || !confirm) {
        registerMessage.textContent = "Please fill all fields.";
        registerMessage.style.color = "#c65353";
        return;
    }

    if (password !== confirm) {
        registerMessage.textContent = "Passwords do not match.";
        registerMessage.style.color = "#c65353";
        return;
    }

    registerMessage.textContent = "Account created successfully.";
    registerMessage.style.color = "#25835a";
};


/* Forgot password */

document.getElementById("forgotBtn").onclick = () => {
    const email = prompt("Enter your registered email:");

    if (email) {
        alert("Password reset instructions will be sent to your email.");
    }
};

