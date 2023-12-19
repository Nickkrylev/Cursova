function validateForm() {
    var name = document.forms[0]["name"].value;
    var phone = document.forms[0]["phone"].value;
    var email = document.forms[0]["email"].value;
    var errorMessage = "";

    if (name == "") {
        errorMessage += "Поле имени не может быть пустым. ";
    }

    if (phone == "") {
        errorMessage += "Поле телефона не может быть пустым. ";
    } else if (!/^\+380\d{9}$/.test(phone)) {
        errorMessage += "Неверный формат номера телефона должен начинаться на +380";
    }

    if (email == "") {
        errorMessage += "Поле электронной почты не может быть пустым. ";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errorMessage += "Неверный формат электронной почты. ";
    }

    var mistakeElement = document.getElementById("mistakeForm");
    if (errorMessage != "") {
        mistakeElement.innerText = errorMessage;
        return false;
    } else {
        mistakeElement.innerText = ""; // Очищаем сообщения об ошибках, если все проверки пройдены
        return true;
    }
}
