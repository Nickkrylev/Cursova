document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault(); // Зупиняємо стандартну відправку форми

    // Значення, які вводить користувач
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Тут ви можете вставити ваші перевірочні дані
    var correctEmail = 'example@email.com'; // Замініть на реальну електронну пошту
    var correctPassword = '1'; // Замініть на реальний пароль
    fetch('/CheckLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email , password:password }),
    })
    .then(response => response.json())
    .then(data => {
       
        console.log(data);
    
       // Перевірка на правильність електронної пошти і пароля
    if(data.success){
        // Якщо дані правильні, перенаправляємо на сторінку користувача
       window.location.href = 'barberAcount.html';
    } else {
        // Якщо дані неправильні, виводимо повідомлення
        alert('Неправильний логін або пароль');
    }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
});
