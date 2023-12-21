// Assuming 'availableDates' is an array of Date objects representing available dates
// You need to populate this array based on your SQL query results

   // Array of date strings
   function generateDateStrings() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Визначення останнього дня, який буде 21-е число наступного місяця
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const lastDay = new Date(nextMonthYear, nextMonth, 21);

    let date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let dateStrings = [];

    while (date <= lastDay) {
        dateStrings.push(date.toISOString().split('T')[0]);
        date.setDate(date.getDate() + 1);
    }

    return dateStrings;
}
const dateStrings = generateDateStrings() ;
dateStrings.shift()

const availableDates = dateStrings.map(dateStr => {
  const dateParts = dateStr.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Subtract 1 because months are 0-indexed
  const day = parseInt(dateParts[2], 10);

  return new Date(year, month, day);
});

function isDateAvailable(date) {
  return availableDates.some(availableDate => 
    availableDate.getDate() === date.getDate() &&
    availableDate.getMonth() === date.getMonth() &&
    availableDate.getFullYear() === date.getFullYear()
  );
}

function generateCalendar(month, year) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;
  
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let calendar = '<tr>' + daysOfWeek.map(day => `<th>${day}</th>`).join('') + '</tr>';
  
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
  
    let date = 1;
    let today = new Date();
    for (let i = 0; i < 6; i++) {
      calendar += '<tr>';
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          calendar += '<td></td>';
        } else if (date > daysInMonth) {
          calendar += '<td></td>';
        } else {
          let cellDate = new Date(year, month, date);
          let isToday = cellDate.toDateString() === today.toDateString() && month === today.getMonth() && year === today.getFullYear();
          let classes = isToday ? 'current-day' : '';
          if (isDateAvailable(cellDate)) {
            classes += (classes ? ' ' : '') + 'available-day';
            calendar += `<td class="${classes}" data-date="${cellDate.toISOString()}" style="color: white;">${date}</td>`;
          } else {
            calendar += `<td class="${classes}">${date}</td>`;
          }
          date++;
        }
      }
      calendar += '</tr>';
    }
  
    document.getElementById('calendar').innerHTML = calendar;
    addClickEventToAvailableDays();
  }
  
  function addClickEventToAvailableDays() {
    document.querySelectorAll('.available-day').forEach(day => {
      day.addEventListener('click', function() {
        document.querySelectorAll('.available-day').forEach(d => {
            d.style.border = ""; // Скидаємо рамку для всіх доступних днів
            d.style.color = "white";
            d.style.backgroundColor = "#ffffff00";
             // Встановлюємо колір тексту на білий для всіх доступних днів
          });
                  this.style.border = "2px solid white"; // Змінюємо рамку для вибраного дня
        this.style.color = "red";
        this.style.backgroundColor = "white";
        document.getElementById('butonNext').classList.remove('butonNextNoActive');
        document.getElementById('butonNext').classList.add('butonNextActive');
        const selectedDate = new Date(this.getAttribute('data-date'));
        document.getElementById('selectedData').textContent = formatDate(selectedDate);
        const dateObject = new Date(selectedDate);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Додаємо 1, так як місяці в JavaScript починаються з 0
        const day = String(dateObject.getDate()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day}`;
        sessionStorage.setItem('Date', formattedDate);
       
      });
    });
  }
  
  function formatDate(date) {
    const monthNames = ["січня", "лютого", "березня", "квітня", "травня", "червня",
                        "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
  
 

function updateNavigationButtons(month, year) {
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');
  
  const monthDifference = (year - startYear) * 12 + (month - startMonth);
  
  prevMonthButton.disabled = monthDifference <= 0;
  nextMonthButton.disabled = monthDifference >= 2;
}

document.getElementById('prev-month').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
  updateNavigationButtons(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
  updateNavigationButtons(currentMonth, currentYear);
});

// Add CSS for the hover effect
const style = document.createElement('style');
style.innerHTML = `
  .available-day:hover {
    border: 2px solid white;
  }`;
document.head.appendChild(style);

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const startMonth = new Date().getMonth();
const startYear = new Date().getFullYear();

generateCalendar(currentMonth, currentYear);
updateNavigationButtons(currentMonth, currentYear);