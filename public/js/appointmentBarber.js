// Assuming `data` is the array of objects returned from the database query
Example: data = [{ first_name: 'John', category_name: 'Stylist', photo_url: './img/BarberPage/backgrBarber1.png'},
{ first_name: 'John2', category_name: 'Stylist2', photo_url: './img/BarberPage/backgrBarber2.png'}]

function createBarberCards(data) {
    const container = document.getElementById('containBarber');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create a card for each barber
    data.forEach(barber => {
        const card = document.createElement('div');
        card.className = 'barberCard';
        card.style.backgroundImage = `url('${barber.photo_url}')`;

        const nameSpan = document.createElement('span');
        nameSpan.className = 'barberCardName';
        nameSpan.textContent = barber.first_name;

        const categorySpan = document.createElement('span');
        categorySpan.className = 'barberCardCategory';
        categorySpan.textContent = barber.category_name;

        card.appendChild(nameSpan);
        card.appendChild(categorySpan);

        // Append the card to the container
        container.appendChild(card);
    });
}
createBarberCards(data);





// Function to handle the click event on a barber card
function handleBarberCardClick(event) {
    // Find the closest parent with the class 'barberCard'
    document.querySelectorAll('.barberCard').forEach(function(card) {
        card.classList.remove('selected');
      });
    var barberCard = event.currentTarget;
    
    // Get the name and category from the clicked card
    var name = barberCard.querySelector('.barberCardName').textContent;
    var category = barberCard.querySelector('.barberCardCategory').textContent;
    barberCard.classList.add('selected');
    // Update the table with the barber's name and category
    document.getElementById('selectedBarber').textContent = category + ' ' + name;
    
    document.getElementById('butonNext').classList.remove('butonNextNoActive');
    document.getElementById('butonNext').classList.add('butonNextActive');
  }
  
  // Add click event listeners to all barberCard elements
  document.querySelectorAll('.barberCard').forEach(function(barberCard) {
    barberCard.addEventListener('click', handleBarberCardClick);
  });

  
