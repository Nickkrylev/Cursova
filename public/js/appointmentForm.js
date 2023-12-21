
function validateForm() {
    var name = document.forms[0]["name"].value;
    var phone = document.forms[0]["phone"].value;
    var email = document.forms[0]["email"].value;
    var errorMessage = "";

    if (name == "") {
        errorMessage += "Поле імя не може бути пустим.\n";
    }

    if (phone == "") {
        errorMessage += "Поле телефона не може бути пустим \n";
    } else if (!/^\+380\d{9}$/.test(phone)) {
        errorMessage += "Невірний формат телефону.Він повине мати вигляд +380ххххххх, без пробілів та тире \n";
    }

    if (email == "") {
        errorMessage += "Поле електроної пошти не може бути пустим \n";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errorMessage += "Невірний формат пошти\n";
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
let click = 0;
document.getElementById('butonNextForm').addEventListener('click', function() {

    let barberId  = sessionStorage.getItem('barberId');
    let serviceId  = sessionStorage.getItem('serveceId');

    let time  = sessionStorage.getItem('selctedTime');
    let date  = sessionStorage.getItem('Date');
    if(validateForm() == true && click != 1){
    var form = document.getElementById('clientForm');
    var formData = new FormData(form);
  
    // Object to hold form data
    var formObj = {};
    formData.forEach(function(value, key){
        formObj[key] = value;
    });
    formObj['barberId'] = barberId;
    formObj['serviceId'] = serviceId;
    formObj['time'] = time;
    formObj['date'] = date;
    // Log the form data object to the console
    console.log(formObj);
    fetch('/SendForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObj),
    })
    .then(response => {
        // Перевірка статусу відповіді
        if (response.ok) {
            // Якщо запит успішний, отримуємо текст відповіді
            mesageBox()
            return response.text();
        } else {
            // Якщо є помилка, кидаємо виключення
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        // Логування отриманого тексту відповіді
        console.log('Success:', data);
    })
    .catch(error => {
        // Логування помилки, якщо вона виникає
        console.error('Error:', error);
    });
     // Відключення кнопки після першого кліку
    // this.removeEventListener('click', handleClick);
     // Альтернатива: this.disabled = true;
     this.disabled = true;
     click++;

}
});

function mesageBox(){
    
    var closeButton = document.querySelector('.alert .close');
    var content = document.querySelector('.content');
    content.style.display = "block";
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            content.classList.add('hide');

            // Очікування завершення анімації перед зміною стилю
            content.addEventListener('animationend', function() {
                content.style.display = 'none';
            }, { once: true });
        });
    }

}

