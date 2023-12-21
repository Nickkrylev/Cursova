
 let clickDate = null;
   // Array of date strings
function createCalendar(dateStrings){
  console.log(dateStrings)
  const availableDates = dateStrings.map(dateObj => {
    const dateString = dateObj.date; // Извлекаем строку даты из объекта
    const date = new Date(dateString);
    
    if (isNaN(date)) {
      console.error("Invalid Date found:", dateString);
    }
  
    return date;
  });

function isDateAvailable(date) {
  return availableDates.some(availableDate => 
    availableDate.getDate() === date.getDate() &&
    availableDate.getMonth() === date.getMonth() &&
    availableDate.getFullYear() === date.getFullYear()
  );
}

function generateCalendar(month, year) {
  const monthNames = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;

const daysOfWeek = ['Нед', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

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
        clickDate = new Date(this.getAttribute('data-date'));
        const selectedDate = clickDate;
        document.getElementById('selectedData').textContent = formatDate(selectedDate);
        const dateObject = new Date(clickDate);
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
return clickDate;
}

