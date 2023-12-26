let selectedBarber = sessionStorage.getItem('BarberIDLogin');
fetch('/GetBusyDaysForBarber', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({ barberId: selectedBarber  }),
})
.then(response => response.json())
.then(data => {
  

  createCalendar(data)
})
.catch(error => {
  console.error('Error:', error);
});

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
     
     clickDate = new Date(this.getAttribute('data-date'));
     const selectedDate = clickDate;
   
     const dateObject = new Date(clickDate);
     const year = dateObject.getFullYear();
     const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Додаємо 1, так як місяці в JavaScript починаються з 0
     const day = String(dateObject.getDate()).padStart(2, '0');
     
     const formattedDate = `${year}-${month}-${day}`;
     sessionStorage.setItem('Date', formattedDate);
     timeBarber()
     
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


let clickDate = null;


function timeBarber() {
  let date = sessionStorage.getItem('Date');
  let selectedBarber = sessionStorage.getItem('BarberIDLogin');
  console.log(date);
  fetch('/GetAppointmentsForBarberOnDate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: date, barberId: selectedBarber }),
  })
  .then(response => response.json())
  .then(data => {
    let times;
      // Ensure 'data' is an array and has the property 'AppointmentTime'
      if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('AppointmentTime')) {
          // Extract just the times from the appointments
           times = data.map(appointment => appointment.AppointmentTime);
           createTimeSlots(times);
         
      } else {
          // Handle the case where 'data' is not as expected
          //console.error('Received data is not an array or is missing the AppointmentTime property');
          NoTime.textContent = "Немає даних"
      }
      
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

function createTimeSlots(times) {
  const timeContainer = document.getElementById('timeContainer');
  // Clear existing times
  NoTime.textContent = "Виберіть час запису"
  timeContainer.innerHTML = '';
  // Create time slots
  times.forEach(time => {
    const timeDiv = document.createElement('div');
    timeDiv.className = 'time';
    timeDiv.textContent = time; // Assuming time is a string
    timeDiv.addEventListener('click', handleTimeClick);
    timeContainer.appendChild(timeDiv);
  });
}
// Function to handle the click event on a time slot
function handleTimeClick(event) {
 // Remove the 'selected' class from all time slots
 document.querySelectorAll('.time').forEach(function(time) {
   time.classList.remove('selected');
 });

 // Add the 'selected' class to the clicked time slot
 event.currentTarget.classList.add('selected');


 // Update the selectedTime with the clicked time slot's value
 //document.getElementById('selectedTime').textContent = event.currentTarget.textContent;
 fetchApointment(event.currentTarget.textContent);

}
function fetchApointment(time){
  let selectedDate = sessionStorage.getItem('Date');
  let selectedBarber = sessionStorage.getItem('BarberIDLogin');
  fetch('/GetAppointmentsForBarber', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date:selectedDate, barberId: selectedBarber,time:time }),
})
.then(response => response.json())
.then(data => {
    
    updateAppointmentDetails(data);
})
.catch(error => {
    console.error('Error:', error);
});
}

function formatDate(dateString) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const date = new Date(dateString);
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getHours()}:${date.getMinutes()}`;
}

function updateAppointmentDetails(appointmentData) {

  // Check if there is at least one appointment
  if (appointmentData.length > 0) {
    const appointment = appointmentData[0]; // Taking the first appointment for example
    sessionStorage.setItem("AppointmentID",appointment.AppointmentID)
    // Update the name and surname
    const nameSurnameElement = document.getElementById('NameSurname');
    nameSurnameElement.textContent = `${appointment.FirstName} ${appointment.LastName || ''}`.trim();
    
    // Update the date and time
    const dateTimeElement = nameSurnameElement.nextElementSibling;
    dateTimeElement.textContent = formatDate(appointment.Time);
    
    // Update the service name
    const serviceNameElement = document.querySelector('.appointment-service span');
    serviceNameElement.textContent = appointment.ServiceName;
    
    // Update the phone number
    const phoneElement = document.querySelector('.appointment-phone span');
    phoneElement.textContent = appointment.PhoneNumber;
    
    // Update the email
    const emailElement = document.querySelector('.appointment-email span');
    emailElement.textContent = appointment.Email;
    
    // Assuming you have price data somewhere, update the price
    // const priceElement = document.querySelector('.appointment-price span');
    // priceElement.textContent = 'Price Data Here';
  }
}

// Call the function with the actual appointment data

document.querySelector('.confirm-button').addEventListener('click', function() {
  updateAppointmentStatus( 'completed');
});

document.querySelector('.cancel-button').addEventListener('click', function() {
  updateAppointmentStatus( 'cancelled');
});

function updateAppointmentStatus( newStatus) {
 let  appointmentId= sessionStorage.getItem("AppointmentID");
  // Replace with the correct server endpoint URL and method to call the SQL procedure
  fetch('/UpdateAppointmentStatus', {
    method: 'POST', // or 'GET' if the server expects a GET request
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appointmentID: appointmentId,
      newStatus: newStatus
    }),
  })
  .then(response => {
    if (response.ok) {
      console.log('Status updated successfully');
      alert("Статус успішно змінений");
      // Handle successful status update, e.g., refresh the page, display a message, etc.
    } else {
      console.error('Failed to update status');
      // Handle errors, e.g., display an error message
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
