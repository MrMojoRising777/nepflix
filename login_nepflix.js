let loginButton = document.getElementById("loginButton");

loginButton.addEventListener('click', function () {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let checkbox = document.getElementById("rememberMe").value;

    let loginObject = {
        username: username,
        password: password,
        rememberMe: checkbox
    };

    if (username === 'admin' && password === 'admin123') {
        if (checkbox) {
            localStorage.setItem('loginObject', JSON.stringify(loginObject));
            window.location.href = 'index.html';
        } else {
            sessionStorage.setItem('loginObject', JSON.stringify(loginObject));
            window.location.href = 'index.html';
        }

    } else {
        alert('Username or password is incorrect!')
    }
});

// function to toggle dark mode
function changeStyle() {
    let element = document.body;
    element.classList.toggle("dark-mode");
}