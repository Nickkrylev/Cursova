
document.addEventListener('DOMContentLoaded', function() {
    var currentIndex = 0;
    var sections = document.querySelectorAll('.Main > div'); // Assuming all these divs are direct children of the Main div
    var butonNext = document.getElementById('butonNext');

    butonNext.addEventListener('click', function() {
        if (this.classList.contains('butonNextActive')) {
            var currentElement = sections[currentIndex];
            var nextIndex = currentIndex + 1;

            if (nextIndex < sections.length) {
                // Hide current element
                currentElement.style.display = 'none';

                // Show next element
                var nextElement = sections[nextIndex];
                nextElement.style.display = 'block';

                // Update currentIndex
                currentIndex = nextIndex;

                // If the next element is the last one, change button text and classes
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
    resetButton.addEventListener('click', function() {
        document.querySelectorAll('.barberCard').forEach(function(card) {
            card.classList.remove('selected');
          });
          document.querySelectorAll('.available-day').forEach(d => {
            d.style.border = ""; // Скидаємо рамку для всіх доступних днів
            d.style.color = "white";
            d.style.backgroundColor = "#ffffff00";
             // Встановлюємо колір тексту на білий для всіх доступних днів
          });
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
        butonNext.classList.add('butonNextNoActive');
        butonNext.classList.remove('butonNextActive');
        butonNext.style.display = 'inline';
    });
}); 

document.getElementById('butonNextForm').addEventListener('click', function() {
    validateForm()
   
});


