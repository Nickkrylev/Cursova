let currentBarberIndex = 0;
const barbers = [
    {
        first_name: "Олександр",
        category_name: "senior_barber",
        description: "Досвідчений майстер, який спеціалізується на класичних та сучасних стрижках.",
        photo_url: "./img/BarberPage/backgrBarber1.png",
        instagram_link: "https://www.instagram.com/oleksandr_barber"
    },
    {
        first_name: "Іван",
        category_name: "barber",
        description: "Іван відомий своїм вмінням створювати ідеальні бороди та укладання.",
        photo_url: "./img/BarberPage/backgrBarber2.png",
        instagram_link: "https://www.instagram.com/ivan_barber"
    },
    {
        first_name: "Михайло",
        category_name: "expert",
        description: "Михайло - експерт у творчих стрижках та стильних зачісках.",
        photo_url: "./img/BarberPage/backgrBarber3.png",
        instagram_link: "https://www.instagram.com/mykhailo_barber"
    }
    // Добавьте больше объектов по мере необходимости
];

const barberCategory = {
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