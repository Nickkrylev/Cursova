
let savedBarberId = sessionStorage.getItem('barberId');


document.addEventListener('DOMContentLoaded', function() {
    var currentIndex = 0;
    var sections = document.querySelectorAll('.Main > div');
    var butonNext = document.getElementById('butonNext');

    butonNext.addEventListener('click', function() {
        if (currentIndex === 0) {
           fetchBarber()
        }
        if (currentIndex === 1) {
           fetchService()
         }
         if (currentIndex === 2) {
            fetchTime()
         }

        if (this.classList.contains('butonNextActive')) {
            var currentElement = sections[currentIndex];
            var nextIndex = currentIndex + 1;

            if (nextIndex < sections.length) {
                currentElement.style.display = 'none';
                var nextElement = sections[nextIndex];
                nextElement.style.display = 'block';
                currentIndex = nextIndex;

                if (nextIndex === sections.length - 1) {
                    butonNext.textContent = 'записатись';
                    butonNext.classList.add('butonNextActive');
                    butonNext.style.display="none";
                } else {
                    butonNext.classList.add('butonNextNoActive');
                    butonNext.classList.remove('butonNextActive');
                }
            }
        }
    });

    let globalData = null;
    function fetchBarber(){
    let selectedDate = sessionStorage.getItem('Date');

fetch('/getAvaibleBarberinDay', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date: selectedDate }),
})
.then(response => response.json())
.then(data => {
   

    createBarberCards(data)
})
.catch(error => {
    console.error('Error:', error);
});
    }
    function fetchService(){
        let selectedCategory = sessionStorage.getItem('selectedCategory');
console.log(selectedCategory)
fetch('/getPricesByCategory', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category: selectedCategory }),
})
.then(response => response.json())
.then(data => {
    //console.log(data);
    globalData = data;
   // sessionStorage.setItem('selectedCategory', data); // Сохранение данных в глобальной переменной
    sessionStorage.setItem('selectedCategory', JSON.stringify(data));
    createServiceCards(data);
})
.catch(error => {
    console.error('Error:', error);
});
    }


    
function fetchTime(){
    let selectedDate = sessionStorage.getItem('Date');
    let selectedBarber = sessionStorage.getItem('barberId');
   
fetch('/GetAvailableTime', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date: selectedDate , barberId:selectedBarber }),
})
.then(response => response.json())
.then(data => {
    console.log(data);

    createTimeSlots(data);
})
.catch(error => {
    console.error('Error:', error);
});
    }

    // Код для кнопки сброса
    var resetButton = document.getElementById('resetButton'); // Добавьте соответствующий идентификатор вашей кнопки сброса
    resetButton.addEventListener('click', function() {
         // Сброс содержимого выбранных элементов
         document.getElementById('selectedBarber').textContent = '';
         document.getElementById('selectedService').textContent = '';
         document.getElementById('selectedData').textContent = '';
         document.getElementById('selectedTime').textContent = '';
         document.getElementById('selectedPrice').textContent = '';
 
         // Сброс currentIndex и обновление видимости разделов
         currentIndex = 0;
         sections.forEach(function(section, index) {
             section.style.display = index === 0 ? 'block' : 'none';
         });
 
         // Восстановление начального состояния кнопки butonNext
         butonNext.textContent = 'далі';
         butonNext.classList.add('butonNextActive');
         butonNext.style.display = 'inline';
    });

    // Обработчик для butonNextForm
    document.getElementById('butonNextForm').addEventListener('click', function() {
        validateForm(); // Убедитесь, что функция validateForm() определена
    });
});



