// Function to generate time slots
const times = ['10:00', '11:00', '12:00', '13:00'];
function createTimeSlots(times) {
     // Add more times as needed
    const timeContainer = document.getElementById('timeContainer');
  
    times.forEach(time => {
      const timeDiv = document.createElement('div');
      timeDiv.className = 'time';
      timeDiv.textContent = time;
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
    document.getElementById('butonNext').classList.remove('butonNextNoActive');
    document.getElementById('butonNext').classList.add('butonNextActive');
  
    // Update the selectedTime with the clicked time slot's value
    document.getElementById('selectedTime').textContent = event.currentTarget.textContent;
  }
  
  // Call the function to generate time slots
  createTimeSlots(times);