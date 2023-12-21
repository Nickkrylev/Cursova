//const servicesData =  sessionStorage.getItem('selectedCategory');

function createServiceCards(data) {
    const container = document.getElementById('containService');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create a card for each service
    data.forEach(service => {
        const card = document.createElement('div');
        card.className = 'serviceCard';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'serviceCardName';
        nameSpan.textContent = service.name; // assuming 'description' is the property for service description

        const priceSpan = document.createElement('span');
        priceSpan.className = 'serviceCardPrice';
        priceSpan.textContent = `${service.price_with_markup}грн`; // assuming 'price' is the property for service price
        card.setAttribute('serdice-id', service.service_id);
        card.appendChild(nameSpan);
        card.appendChild(priceSpan);

        // Append the card to the container
        container.appendChild(card);
        // document.querySelectorAll('.serviceCard').forEach(function(serviceCard) {
        //   serviceCard.addEventListener('click', handleServiceCardClick);
        // });
        card.addEventListener('click', handleServiceCardClick);
    });
}

// Use this function with your data array like this:
// createServiceCards(servicesData);


// Функция для обработки события клика по карточке услуги
function handleServiceCardClick(event) {
    const selectedService = event.currentTarget.getAttribute('serdice-id')
    // Удаление класса 'selected' у всех карточек услуг
    document.querySelectorAll('.serviceCard').forEach(function(card) {
      card.classList.remove('selected');
    });
  
    // Добавление класса 'selected' к кликнутой карточке услуг
    event.currentTarget.classList.add('selected');
    
    // Получение названия и цены из кликнутой карточки
    var serviceName = event.currentTarget.querySelector('.serviceCardName').textContent;
    var servicePrice = event.currentTarget.querySelector('.serviceCardPrice').textContent;
  
    // Обновление таблицы данными о названии и цене услуги
    document.getElementById('selectedService').textContent = serviceName;
    document.getElementById('selectedPrice').textContent = servicePrice;
       document.getElementById('butonNext').classList.remove('butonNextNoActive');
    document.getElementById('butonNext').classList.add('butonNextActive');
    sessionStorage.setItem("serveceId",selectedService);
  }
  
  // Добавление обработчиков событий клика ко всем карточкам услуг
  