const servicesData = [
    {
        description: "Стрижка волосся класична",
        price: "100"
    },
    {
        description: "Стрижка волосся модна",
        price: "200"
    },
    {
        description: "Королівське гоління",
        price: "150"
    },
    {
        description: "Камуфлювання сивини",
        price: "120"
    }
    // Додайте інші послуги за бажанням
];
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
        nameSpan.textContent = service.description; // assuming 'description' is the property for service description

        const priceSpan = document.createElement('span');
        priceSpan.className = 'serviceCardPrice';
        priceSpan.textContent = `${service.price}грн`; // assuming 'price' is the property for service price

        card.appendChild(nameSpan);
        card.appendChild(priceSpan);

        // Append the card to the container
        container.appendChild(card);
    });
}

// Use this function with your data array like this:
// createServiceCards(servicesData);

// Виклик функції:
createServiceCards(servicesData);

// Функция для обработки события клика по карточке услуги
function handleServiceCardClick(event) {
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
  }
  
  // Добавление обработчиков событий клика ко всем карточкам услуг
  document.querySelectorAll('.serviceCard').forEach(function(serviceCard) {
    serviceCard.addEventListener('click', handleServiceCardClick);
  });