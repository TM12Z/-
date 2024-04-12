document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var login = document.getElementById("loginInput").value;
    var password = document.getElementById("passwordInput").value;

    var loginData = {
        login: login,
        password: password
    };

    fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login response:', data);
        // Можно добавить обработку ответа здесь
        localStorage.setItem('token', data.token);
        window.location.href = "profile.html";
    })
    .catch(error => {
        console.error('Login error:', error);
        // Можно добавить обработку ошибки здесь
        alert("Error");
    });
});