let barbers; // Оголошуємо змінну для зберігання отриманих даних

fetch('/barber_details')
  .then((response) => response.json())
  .then((data) => {
    // Отримані дані з сервера доступні в об'єкті "data"
    barbers = data; // Зберігаємо дані в змінну "barbers"
    console.log(barbers); // Виводимо дані в консоль

    // Викликаємо функцію для відображення даних після отримання
    updateBarberDisplay();
  })
  .catch((error) => {
    console.error('Помилка при отриманні даних:', error);
  });
let currentBarberIndex = 0;


const barberCategory = {
    "trainee":"Стажер",
    "senior_barber":"Старший барбер",
    "barber":"Барбер",
    "expert":"Експерт"
}
function updateBarberDisplay() {
    const barber = barbers[currentBarberIndex];
    document.getElementById('nameBarber').innerText = barberCategory[barber.category_name] +" "+ barber.first_name ;
    document.getElementById('descriptionBarber').innerText = barber.description;
    document.getElementById('bgBarber').src = barber.photo_url;
    console.log(`url(${barber.photo_url})`);
    document.getElementById('curentNumber').innerText = currentBarberIndex + 1;
    document.getElementById('maxNumber').innerText = barbers.length;
}

document.getElementById('arrowUp').addEventListener('click', () => {
    if (currentBarberIndex > 0) {
        currentBarberIndex--;
        updateBarberDisplay();
    }
});

document.getElementById('arrowDown').addEventListener('click', () => {
    if (currentBarberIndex < barbers.length - 1) {
        currentBarberIndex++;
        updateBarberDisplay();
    }
});

// Инициализация первого отображения
updateBarberDisplay();