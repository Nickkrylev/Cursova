

// Function to create barber cards
function createBarberCards(data) {
  const container = document.getElementById('containBarber');
  container.innerHTML = ''; // Clear existing content

  const barberCategoryMap = {
    "trainee": "Стажер",
    "senior_barber": "Старший барбер",
    "barber": "Барбер",
    "expert": "Експерт"
  }

  // Create a card for each barber
  data.forEach(barber => {
    const card = document.createElement('div');
    card.className = 'barberCard';
    card.style.backgroundImage = `url('${barber.photo_url}')`;
    card.setAttribute('data-category', barber.category_name); // Store the category in the card
    card.setAttribute('data-barber-id', barber.barber_id); 
    card.addEventListener('click', handleBarberCardClick); // Attach event listener

    const nameSpan = document.createElement('span');
    nameSpan.className = 'barberCardName';
    nameSpan.textContent = barber.first_name;

    const categorySpan = document.createElement('span');
    categorySpan.className = 'barberCardCategory';
    categorySpan.textContent = barberCategoryMap[barber.category_name];

    card.appendChild(nameSpan);
    card.appendChild(categorySpan);

    container.appendChild(card); // Append the card to the container
  });
}

// Function to handle the click event on a barber card
function handleBarberCardClick(event) {
  const barberCard = event.currentTarget; // Get the clicked .barberCard element
  const selectedCategory = barberCard.getAttribute('data-category'); // Get the category from the card

  // Update the UI based on the selected barber
  updateSelectedBarberUI(barberCard);
  
  const barberId = barberCard.getAttribute('data-barber-id'); // или любой другой способ получения идентификатора парикмахера
  
  // Сохранение selectedCategory и barberId в sessionStorage
  sessionStorage.setItem('selectedCategory', selectedCategory);
  sessionStorage.setItem('barberId', barberId);
  // Fetch prices for the selected category
 
}

// Function to update UI based on the selected barber
function updateSelectedBarberUI(barberCard) {
  const name = barberCard.querySelector('.barberCardName').textContent;
  const category = barberCard.querySelector('.barberCardCategory').textContent;
  
  // Remove 'selected' class from all cards
  document.querySelectorAll('.barberCard.selected').forEach(selectedCard => {
    selectedCard.classList.remove('selected');
  });

  // Add 'selected' class to the clicked card
  barberCard.classList.add('selected');

  // Update the display with the clicked barber's details
  document.getElementById('selectedBarber').textContent = `${category} ${name}`;

  // Change the button classes to reflect the active state
  const buttonNext = document.getElementById('butonNext');
  buttonNext.classList.remove('butonNextNoActive');
  buttonNext.classList.add('butonNextActive');
}


