var servicesData = [
    { image_url: './img/iconService/iconService (1).png', name: 'Стрижка чоловіча', description: 'Виконується в комбінованих техніках машинками та ножицями...', trainee_price: 750, barber_price: 900, senior_barber_price: 1000, expert_price: 1100 },
    { image_url: './img/iconService/iconService (2).png', name: 'Стрижка жіноча', description: 'Виконується за сучасними модними тенденціями...', trainee_price: 800, barber_price: 950, senior_barber_price: 1050, expert_price: 1150 },
    { image_url: './img/iconService/iconService (3).png', name: 'Дитяча стрижка', description: 'Безпечні та веселі стрижки для дітей...', trainee_price: 500, barber_price: 650, senior_barber_price: 800, expert_price: 950 },
    { image_url: './img/iconService/iconService (1).png', name: 'Стрижка чоловіча', description: 'Виконується в комбінованих техніках машинками та ножицями...', trainee_price: 750, barber_price: 900, senior_barber_price: 1000, expert_price: 1100 },
    { image_url: './img/iconService/iconService (2).png', name: 'Стрижка жіноча', description: 'Виконується за сучасними модними тенденціями...', trainee_price: 800, barber_price: 950, senior_barber_price: 1050, expert_price: 1150 },
    { image_url: './img/iconService/iconService (3).png', name: 'Дитяча стрижка', description: 'Безпечні та веселі стрижки для дітей...', trainee_price: 500, barber_price: 650, senior_barber_price: 800, expert_price: 950 },
];


function populateTable(data) {
    var tableBody = document.getElementById('servicesTable').getElementsByTagName('tbody')[0];
    data.forEach(function(item, index) {
        var row = document.createElement('tr');
        var imgCell = row.insertCell();
        imgCell.rowSpan = 2;
        imgCell.innerHTML = '<img class="service-image" src="' + item.image_url + '" alt="' + item.name + '">';

        var nameDescCell = row.insertCell();
        nameDescCell.rowSpan = 2;
  
        nameDescCell.style.textAlign='start';
        nameDescCell.innerHTML = '<span class="service-name">' + item.name + '</span><span class="service-description">' + item.description + '</span>';

        // Ціни для кожної категорії
        var categories = ['Trainee', 'Barber', 'Senior Barber', 'Expert'];
        categories.forEach(function(category) {
            var priceCell = row.insertCell();
            priceCell.className = 'price-cell';
            priceCell.innerHTML = '<span class="category-label">' + category + '</span>' +
                                  item[category.toLowerCase().replace(' ', '_') + '_price'].toFixed(2) + ' ₴';
        });

        tableBody.appendChild(row);

        // Пустий рядок для відступу між послугами
        var spacerRow = document.createElement('tr');
        spacerRow.className = 'spacer-row';
        var spacerCell = spacerRow.insertCell();
        spacerCell.colSpan = 6;
        tableBody.appendChild(spacerRow);
    });
}



// Виклик функції для заповнення таблиці
populateTable(servicesData);