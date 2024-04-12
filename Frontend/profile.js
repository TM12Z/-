global_userpic = null

// Находим кнопку "плюс" в контейнере с фотографиями
var addPhotoButton = document.getElementById("addPhotoButton");

// Добавляем обработчик события на клик по кнопке "плюс"
addPhotoButton.addEventListener("click", function() {
    // Создаем элемент input типа file
    var input = document.createElement("input");
    input.type = "file";

    // Добавляем атрибуты для input
    input.accept = "image/*"; // Принимаем только изображения
    input.style.display = "none"; // Скрываем элемент, но будем вызывать его кликом на кнопке

    // Добавляем обработчик события для выбора файла
    input.addEventListener("change", function(event) {
        // Получаем выбранный файл
        var file = event.target.files[0];

        // Создаем объект FileReader для чтения файла
        var reader = new FileReader();

        // Обработчик события onLoad, вызывается когда файл прочитан
        reader.onload = function(event) {
            // Создаем новый элемент img
            var img = document.createElement("img");
            img.src = event.target.result; // Устанавливаем src изображения
            img.classList.add("photo"); // Добавляем класс для стилизации

            // Получаем контейнер с фотографиями и добавляем новую фотографию
            var photosContainer = document.getElementById("photosContainer");
            photosContainer.appendChild(img);
        };

        // Читаем файл как DataURL (base64)
        reader.readAsDataURL(file);
    });

    // Присоединяем input к документу
    document.body.appendChild(input);

    // Симулируем клик по input
    input.click();
});






// Обработчик события для поля ввода типа file
document.getElementById("avatarInput").addEventListener("change", function(event) {
    // Получаем выбранный файл
    var file = event.target.files[0];
    global_userpic = file;
    
    // Создаем объект FileReader для чтения файла
    var reader = new FileReader();

    // Обработчик события onLoad, вызывается когда файл прочитан
    reader.onload = function(event) {
        // Создаем новый элемент img
        var img = document.createElement("img");
        img.src = event.target.result; // Устанавливаем src изображения
        img.classList.add("avatar-image"); // Добавляем класс для стилизации
        img.setAttribute("id", "avatar");

        // Получаем контейнер аватара и добавляем новую картинку
        var avatarContainer = document.querySelector(".avatar-container");
        // Очищаем контейнер от предыдущего содержимого
        avatarContainer.innerHTML = '';
        // Добавляем картинку в контейнер
        avatarContainer.appendChild(img);
    };

    // Читаем файл как DataURL (base64)
    reader.readAsDataURL(file);
});








document.addEventListener("DOMContentLoaded", function() {
    // Получаем родительский элемент, который существует при загрузке страницы
    var parentElement = document.querySelector('.avatar-container');

    // Добавляем обработчик события клика на родительский элемент
    parentElement.addEventListener("click", function(event) {
        // Проверяем, был ли клик на элементе с идентификатором "avatar"
        if (event.target && event.target.id === "avatar") {

            // Создаем инпут для выбора файла
            var fileInput = document.createElement('input');
            fileInput.type = 'file';

            // Добавляем обработчик события для выбора файла
            fileInput.addEventListener('change', function(event) {
                // Получаем выбранный файл
                var file = event.target.files[0];
                global_userpic = file;
                
                // Создаем объект FileReader для чтения файла
                var reader = new FileReader();

                // Обработчик события onLoad, вызывается когда файл прочитан
                reader.onload = function(event) {
                    // Создаем новый элемент img
                    var newImg = document.createElement("img");
                    newImg.src = event.target.result; // Устанавливаем src изображения
                    newImg.classList.add("avatar-image"); // Добавляем класс для стилизации
                    newImg.setAttribute("id", "avatar" );
                    newImg.setAttribute("type", "file" );


                    // Получаем предыдущее изображение
                    var oldImg = parentElement.querySelector('#avatar');
                    
                    // Заменяем старое изображение на новое
                    if (oldImg) {
                        oldImg.remove();
                        parentElement.appendChild(newImg);
                    }
                };


                // Читаем файл как DataURL (base64)
                reader.readAsDataURL(file);
            });

            // Кликаем на инпут для выбора файла
            fileInput.click();
        }
    });

});

document.getElementById("saveChangesButton").addEventListener("click", function () {
    var nickname = document.getElementById("nickname").value;
    var description = document.getElementById("description").value;
    var userpic = global_userpic;
    alert("Данные сохранены");

    var formData = new FormData();
    formData.append('named', nickname);
    formData.append('description', description);
    if (userpic) {
        formData.append('image', userpic);
    }

    console.log(nickname, description, userpic);

    var token = localStorage.getItem('token');

    fetch('http://localhost:8080/api/user/refUser', {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Login response:', data);
            // Можно добавить обработку ответа здесь
        })
        .catch(error => {
            //console.error('Login error:', error);
            // Можно добавить обработку ошибки здесь
        });
});

window.onload = function() {

    var token = localStorage.getItem('token');

    fetch('http://localhost:8080/api/user/readUser', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Login response:', data);
            console.log(data[0][0].named);
            document.getElementById("nickname").value = data[0][0].named;
            document.getElementById("description").value = data[0][0].description;
            if (!(data[0][0].ref_userpic == null)) {
                var path = "../images/" + data[0][0].ref_userpic;
                var img = document.createElement("img");
                console.log(path);
                console.log(img);
                img.src = path;
                img.classList.add("avatar-image"); // Добавляем класс для стилизации
                img.setAttribute("id", "avatar");
                // Получаем контейнер аватара и добавляем новую картинку
                var avatarContainer = document.querySelector(".avatar-container");
                // Очищаем контейнер от предыдущего содержимого
                avatarContainer.innerHTML = '';
                // Добавляем картинку в контейнер
                avatarContainer.appendChild(img);
            }
            i = 1
            while(i < data[0].length) {
                var path = "../images/" + data[0][i].ref;
                var img = document.createElement("img");
                img.src = path; // Устанавливаем src изображения
                img.classList.add("photo"); // Добавляем класс для стилизации
                var photosContainer = document.getElementById("photosContainer");
                photosContainer.appendChild(img);
                i++
            }
        })
        .catch(error => {
            //console.error('Fetch error:', error);
        });
}

document.getElementById("logoutButton").addEventListener("click", function (event) {
    delete localStorage.token;
    window.location.href = "site.html";
});





document.addEventListener("DOMContentLoaded", function() {
        var photoChampLabel = document.getElementById("PhotoChampLabel");
        
        // Добавляем обработчик события клика на надпись "PhotoChamp"
        photoChampLabel.addEventListener("click", function() {
            // Перенаправляем пользователя на страницу site.html
            window.location.href = "site.html";
    });
});