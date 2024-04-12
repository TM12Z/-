document.getElementById("regForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var nickname = document.getElementById("nickname").value;
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;

    var userData = {
        named: nickname,
        description: "",
        login: login,
        password: password
    };

    fetch('http://localhost:8080/api/user/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Registration response:', data);
            localStorage.setItem('token', data.token);
        })
        .catch(error => {
            console.error('Registration error:', error);
            alert("Error");
            event.preventDefault();
        });
});