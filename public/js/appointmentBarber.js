// Assuming `data` is the array of objects returned from the database query
Example: data = [{ first_name: 'John', category_name: 'Stylist', photo_url: './img/BarberPage/backgrBarber1.png'}]

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
// You would call this function with the data from your database query
// For example, after fetching the data with AJAX:
// createBarberCards(fetchedData);
