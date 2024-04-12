global_photo = null;

/*ЭТО ДЛЯ МОДАЛЬНОГО ОКНА ВЫБОРА ЗАГРУЗКИ*/
// При нажатии на кнопку "Загрузить фото"
document.getElementById("openModalButton").addEventListener("click", function() {
    // Отображаем модальное окно выбора типа загрузки
    document.getElementById("chooseUploadTypeModal").style.display = "block";
});

// Закрытие модального окна при нажатии на крестик
document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("chooseUploadTypeModal").style.display = "none";
});

// При нажатии на кнопку "Загрузить фотографию"
document.getElementById("uploadPhotoButton").addEventListener("click", function() {
    // Здесь будет код для открытия модального окна загрузки фотографии
    // Например, document.getElementById("uploadPhotoModal").style.display = "block";
});

// При нажатии на кнопку "Загрузить фотоальбом"
document.getElementById("uploadAlbumButton").addEventListener("click", function() {
    // Здесь будет код для открытия модального окна загрузки фотоальбома
    // Например, document.getElementById("uploadAlbumModal").style.display = "block";
});






/* ЭТО ДЛЯ МОДЛЬНОГО ОКНА ЗАГРУЗКИ ФОТОГРАФИИ*/
// При нажатии на кнопку "Загрузить фотографию"
document.getElementById("uploadPhotoButton").addEventListener("click", function() {
    // Закрываем модальное окно выбора типа загрузки
    document.getElementById("chooseUploadTypeModal").style.display = "none";
    // Открываем модальное окно загрузки фотографии
    document.getElementById("uploadPhotoModal").style.display = "flex";
});

// Закрытие модального окна загрузки фотографии при нажатии на крестик
document.getElementById("uploadPhotoModal").getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("uploadPhotoModal").style.display = "none";
});




/*  ЭТО ДЛЯ МОДАЛЬНОГО ОКНА ЗАГРУКИ ФОТОАЛЬБОМОВ*/
// При нажатии на кнопку "Загрузить фотоальбом"
document.getElementById("uploadAlbumButton").addEventListener("click", function() {
    // Закрываем модальное окно выбора типа загрузки
    document.getElementById("chooseUploadTypeModal").style.display = "none";
    // Открываем модальное окно загрузки фотоальбомов
    document.getElementById("uploadAlbumModal").style.display = "flex";
});

// Закрытие модального окна загрузки фотографии при нажатии на крестик
document.getElementById("uploadAlbumModal").getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("uploadAlbumModal").style.display = "none";
});





/*ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН НА КЛАВИШУ ESC*/
// Обработчик события для нажатия на клавишу ESC
window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        // Закрываем модальное окно выбора типа загрузки, если оно открыто
        if (document.getElementById("chooseUploadTypeModal").style.display === "block") {
            document.getElementById("chooseUploadTypeModal").style.display = "none";
        }
        // Закрываем модальное окно загрузки фотографии, если оно открыто
        if (document.getElementById("uploadPhotoModal").style.display === "flex") {
            document.getElementById("uploadPhotoModal").style.display = "none";
        }
        if (document.getElementById("uploadAlbumModal").style.display === "flex") {
            document.getElementById("uploadAlbumModal").style.display = "none";
        }
        if(document.getElementById("viewPhotoModal").style.display === "flex") {
            document.getElementById("viewPhotoModal").style.display = "none";
        }
    }
});





/*ВЫБОР ФОТОГРАФИИ С ПК ПРИ НАЖАТИИ НА КНОПКУ В ОКНЕ ДОБАВЛЕНИЯ ФОТОГРАФИИ*/
document.addEventListener("DOMContentLoaded", function() {
    // Получаем кнопку для загрузки фотографии
    var uploadButton = document.getElementById('uploadImageButton');
    
    // Добавляем обработчик события для нажатия на кнопку загрузки фотографии
    uploadButton.addEventListener('click', function() {
        // Создаем input элемент для выбора файла
        var fileInput = document.createElement('input');
        fileInput.type = 'file';

        // Добавляем обработчик события для выбора файла
        fileInput.addEventListener('change', function(event) {
            // Получаем выбранный файл
            var file = event.target.files[0];
            global_photo = file;
            console.log("Выбранный файл:", global_photo);

            // Создаем объект FileReader для чтения файла
            var reader = new FileReader();

            // Обработчик события onLoad, вызывается когда файл прочитан
            reader.onload = function(event) {
                // Создаем новый элемент img
                var img = document.createElement("img");
                img.src = event.target.result; // Устанавливаем src изображения
                img.classList.add("selected-photo"); // Добавляем класс для стилизации
                img.setAttribute("id", "uploadingPhoto")

                // Устанавливаем размеры изображения равными размерам кнопки
                img.style.width = uploadButton.offsetWidth + "px";
                img.style.height = uploadButton.offsetHeight + "px";

                // Получаем родительский элемент кнопки загрузки фотографии
                var parentElement = uploadButton.parentElement;

                // Убираем кнопку загрузки фотографии
                uploadButton.remove();

                // Добавляем изображение вместо кнопки
                parentElement.appendChild(img);
            };

            // Читаем файл как DataURL (base64)
            reader.readAsDataURL(file);
        });

        // Кликаем на input для выбора файла
        fileInput.click();
    });
});



document.getElementById("uploadImageButton").addEventListener("change", function (event) {
    var photoInput = event.target;
    var photo = photoInput.files[0];

    if (photo) {
        console.log("Выбранный файл:", photo);
    } else {
        console.log("Файл не выбран");
    }
});



/*ВЫБОР ФОТОГРАФИИ ПРИ ДОБАВЛЕНИИ ЕЁ НА САЙТ, ЕСЛИ ОНА УЖЕ ВЫБРАНА*/
document.addEventListener("click", function(event) {
    // Проверяем, был ли клик на элементе с id "uploadingPhoto"

    const idImage = event.target.getAttribute("imageId");

    if (event.target && event.target.id === "uploadingPhoto") {
        // Создаем input элемент для выбора файла
        var fileInput = document.createElement('input');
        fileInput.type = 'file';

        // Добавляем обработчик события для выбора файла
        fileInput.addEventListener('change', function(event) {
            // Получаем выбранный файл
            var file = event.target.files[0];
            global_photo = file;
            console.log("Выбранный файл:", global_photo);

            // Создаем объект FileReader для чтения файла
            var reader = new FileReader();

            // Обработчик события onLoad, вызывается когда файл прочитан
            reader.onload = function(event) {
                // Получаем элемент фотографии
                var uploadingPhoto =
                document.querySelector(`[imageid='${idImage}']`) ||
                document.getElementById("uploadingPhoto");

                // Устанавливаем src для фотографии
                uploadingPhoto.src = event.target.result;
            };

            // Читаем файл как DataURL (base64)
            reader.readAsDataURL(file);
        });

        // Кликаем на input для выбора файла
        fileInput.click();
    }
});






/*ВЫКЛАДЫВАНИЕ ФОТОГРАФИИ НА САЙТ*/
var photoIndex = 0;
var photoNameIndex = 0;

// При нажатии на кнопку "ОК" в модальном окне загрузки фотографии
document.getElementById("okButton").addEventListener("click", function() {
    // Получаем загруженную фотографию
    var uploadedPhoto = document.getElementById("uploadingPhoto");

    // Получаем название и описание фотографии
    var photoName = document.getElementById("photoNameInput").value;
    var photoDescription = document.getElementById("photoDescriptionInput").value;

    // Создаем новый элемент для фотографии
    var photoElement = document.createElement("div");
    photoElement.classList.add("photo");

    // Создаем элемент изображения и устанавливаем его источник
    var photoImage = document.createElement("img");

    photoImage.src = uploadedPhoto.src;
    photoImage.alt = photoName;
    photoImage.setAttribute("id", "photoImage" + photoIndex);
    photoIndex++;

    // Создаем элемент для названия фотографии
    var photoNameElement = document.createElement("div");
    photoNameElement.classList.add("photo-name");
    photoNameElement.textContent = photoName;
    photoNameElement.setAttribute("id", "photoName" + photoNameIndex);
    photoNameIndex++;






    var photo_img = global_photo;
    var formData = new FormData();
    formData.append('named', photoName);
    formData.append('description', photoDescription);
    if (photo_img) {
        formData.append('image', photo_img);
    }

    console.log(photoName, photoDescription, photo_img);

    var token = localStorage.getItem('token');

    fetch('http://localhost:8080/api/photo/create', {
        method: 'POST',
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

    






    /*ПРОСМОТР ФОТОГРАФИИ ПРИ НАЖАТИИ НА НЕЁ НА ГЛАВНОЙ СТРАНИЦЕ*/
    // Добавляем обработчик события для нажатия на фотографию
    photoImage.addEventListener('click', function() {
        document.getElementById("viewPhotoModal").style.display = "flex";
        document.getElementById("viewPhotoImage").src = photoImage.src;
        document.getElementById("viewPhotoName").value = photoNameElement.textContent;
        document.getElementById("viewPhotoDescription").value = photoDescription;
    });

    








    // Добавляем элементы в контейнер фотографии
    photoElement.appendChild(photoImage);
    photoElement.appendChild(photoNameElement);

    // Устанавливаем максимальную ширину для названия фотографии
    photoNameElement.style.maxWidth = "200px";

    // Обрезаем название фотографии, если оно не влезает, и добавляем троеточие
    if (photoNameElement.scrollWidth > photoNameElement.clientWidth) {
    photoNameElement.textContent = photoName.slice(0, -3) + "...";
    }

    // Получаем контейнер для фотографий на главной странице
    var photosContainer = document.getElementById("photosContainer");

    // Добавляем фотографию в контейнер
    photosContainer.appendChild(photoElement);

    // Закрываем модальное окно загрузки фотографии
    document.getElementById("uploadPhotoModal").style.display = "none";

    // Очищаем поля ввода названия и описания фотографии
    document.getElementById("photoNameInput").value = "";
    document.getElementById("photoDescriptionInput").value = "";

    // Удаляем загруженную фотографию из модального окна
    uploadedPhoto.remove();

    // Восстанавливаем кнопку загрузки фотографии
    var uploadButton = document.createElement("button");
    uploadButton.setAttribute("id", "uploadImageButton");
    uploadButton.textContent = "+";
    var modalContent = document.querySelector("#uploadPhotoModal .modal-content");
    modalContent.insertBefore(uploadButton, modalContent.firstChild);

    // Добавляем обработчик события для нажатия на кнопку загрузки фотографии
    uploadButton.addEventListener('click', function() {
        // Создаем input элемент для выбора файла
        var fileInput = document.createElement('input');
        fileInput.type = 'file';

        // Добавляем обработчик события для выбора файла
        fileInput.addEventListener('change', function(event) {
            // Получаем выбранный файл
            var file = event.target.files[0];

            // Создаем объект FileReader для чтения файла
            var reader = new FileReader();

            // Обработчик события onLoad, вызывается когда файл прочитан
            reader.onload = function(event) {
                // Создаем новый элемент img
                var img = document.createElement("img");
                img.src = event.target.result; // Устанавливаем src изображения
                img.classList.add("selected-photo"); // Добавляем класс для стилизации
                img.setAttribute("id", "uploadingPhoto");

                // Устанавливаем размеры изображения равными размерам кнопки
                img.style.width = uploadButton.offsetWidth + "px";
                img.style.height = uploadButton.offsetHeight + "px";

                // Получаем родительский элемент кнопки загрузки фотографии
                var parentElement = uploadButton.parentElement;

                // Убираем кнопку загрузки фотографии
                uploadButton.remove();

                // Добавляем изображение вместо кнопки
                parentElement.appendChild(img);
            };

            // Читаем файл как DataURL (base64)
            reader.readAsDataURL(file);
        });

        // Кликаем на input для выбора файла
        fileInput.click();
    });
});






/*ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ПРОСМОТРА ФОТОГРАФИЙ*/
// Добавляем обработчик события для закрытия модального окна просмотра фотографии
document.getElementById("viewPhotoModal").addEventListener("click", function(event) {
    if (event.target.classList.contains("close")) {
        document.getElementById("viewPhotoModal").style.display = "none";
    }
});







/*ВЫБОР ФОТОГРАФИИ ДЛЯ АЛЬБОМОВ С ПК ПРИ НАЖАТИИ НА КНОПКУ В ОКНЕ ДОБАВЛЕНИЯ ФОТОГРАФИИ*/
var albumPhotoCounter = 0;

document.addEventListener("DOMContentLoaded", function () {
  // Получаем все кнопки для загрузки фотографии
  var uploadButtons = document.querySelectorAll(".add-button");

  // Создаем массив для отслеживания наличия фотографии на каждой кнопке
  var hasPhoto = new Array(uploadButtons.length).fill(false);

  // Перебираем все кнопки и добавляем обработчик события для каждой
  uploadButtons.forEach(function (uploadButton, index) {
    uploadButton.addEventListener("click", function () {
      if (!hasPhoto[index]) {
        // Если на кнопке нет фотографии
        // Создаем input элемент для выбора файла
        var fileInput = document.createElement("input");
        fileInput.type = "file";

        // Добавляем обработчик события для выбора файла
        fileInput.addEventListener("change", function (event) {
          // Получаем выбранный файл
          var file = event.target.files[0];

          // Создаем объект FileReader для чтения файла
          var reader = new FileReader();

          // Обработчик события onLoad, вызывается когда файл прочитан
          reader.onload = function (event) {
            // Создаем новый элемент img
            var img = document.createElement("img");
            img.src = event.target.result; // Устанавливаем src изображения
            img.classList.add("selected-photo2"); // Добавляем класс для стилизации
            img.setAttribute("id", "uploadingPhoto");
            img.setAttribute("imageid", `id-image-${index}`);

            // Устанавливаем размеры изображения равными размерам кнопки
            img.style.width = uploadButton.offsetWidth + "px";
            img.style.height = uploadButton.offsetHeight + "px";
            albumPhotoCounter++;
            document.getElementById("albumPhotoCounter").innerHTML = albumPhotoCounter + "/24";

            // Создаем кнопку удаления фотографии
            var deleteButton = document.createElement("div");
            deleteButton.classList.add("delete-button");
            deleteButton.innerHTML = "&times;";

            // Добавляем обработчик события для удаления фотографии
            deleteButton.addEventListener("click", function () {
              // Заменяем контейнер с фотографией на кнопку "+"
              img.parentNode.parentNode.replaceChild(
                uploadButton,
                img.parentNode
              );
              albumPhotoCounter--;
              document.getElementById("albumPhotoCounter").innerHTML = albumPhotoCounter + "/24";

              // Устанавливаем флаг, что на кнопке нет фотографии

              hasPhoto[index] = false;
              deleteButton.style.display = "none"; // Скрываем кнопку удаления
            });

            // Создаем контейнер для фотографии и кнопки удаления
            var container = document.createElement("div");
            container.style.position = "relative";
            container.appendChild(img);
            container.appendChild(deleteButton);

            // Заменяем кнопку на контейнер с фотографией и кнопкой удаления
            uploadButton.parentNode.replaceChild(container, uploadButton);
            // Устанавливаем флаг, что на кнопке есть фотография
            hasPhoto[index] = true;
            deleteButton.style.display = "flex"; // Показываем кнопку удаления
          };

          // Читаем файл как DataURL (base64)
          reader.readAsDataURL(file);
        });

        // Кликаем на input для выбора файла
        fileInput.click();
      } else {
        // Если на кнопке уже есть фотография
        // Ничего не делаем
      }
    });
  });
});


window.onload = function() {
    fetch('http://localhost:8080/api/photo/read', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Login response:', data);
            i = 0;
            while (i < data.length) {
                if (data[i].albumId == null) {
                    var photoElement = document.createElement("div");
                    photoElement.classList.add("photo");

                    // Создаем элемент изображения и устанавливаем его источник
                    var photoImage = document.createElement("img");
                    var path = "../images/" + data[i].ref;

                    photoImage.src = path;
                    console.log(photoImage.src);
                    photoImage.alt = data[i].named;
                    photoImage.setAttribute("id", "photoImage" + photoIndex);
                    photoIndex++;

                    var photoNameElement = document.createElement("div");
                    photoNameElement.classList.add("photo-name");
                    photoNameElement.textContent = data[i].named;
                    photoNameElement.setAttribute("id", "photoName" + photoNameIndex);
                    photoNameIndex++;


                    photoElement.appendChild(photoImage);
                    photoElement.appendChild(photoNameElement);

                    // Используем замыкание для сохранения значения переменных для каждой фотографии
                    (function(photo) {
                        photoImage.addEventListener('click', function() {
                            document.getElementById("viewPhotoModal").style.display = "flex";
                            document.getElementById("viewPhotoImage").src = "../images/" + photo.ref;
                            document.getElementById("viewPhotoName").value = photo.named;
                            document.getElementById("viewPhotoDescription").value = photo.description;
                        });
                    })(data[i]);


                    photoNameElement.style.maxWidth = "200px";

                    // Обрезаем название фотографии, если оно не влезает, и добавляем троеточие
                    if (photoNameElement.scrollWidth > photoNameElement.clientWidth) {
                        photoNameElement.textContent = photoName.slice(0, -3) + "...";
                    }

                    // Получаем контейнер для фотографий на главной странице
                    var photosContainer = document.getElementById("photosContainer");

                    // Добавляем фотографию в контейнер
                    photosContainer.appendChild(photoElement);
                }
                i++
            }
        })
        .catch(error => {
            //console.error('Fetch error:', error);
        });
}