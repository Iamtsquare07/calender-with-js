let currentYear, currentMonth;
let monthYearHeader = document.getElementById("month-year");
let yearHeader = document.getElementById("year");

function generateCalendar(year, month, day) {
    const calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = "";

    // Create a date object for the first day of the current month
    const firstDay = new Date(year, month, 1);

    // Get the number of days in the current month
    const lastDay = new Date(year, month + 1, 0);

    // Set the header to display the month and year
    monthYearHeader.innerText = `${firstDay.toLocaleString('default', { month: 'long' })}`;
    yearHeader.innerText = `${year}`;

    // Create a row for each week in the month
    let currentRow = document.createElement("tr");

    // Fill in the cells for the previous month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const cell = document.createElement("td");
        const prevMonthLastDate = new Date(year, month, 0).getDate();
        cell.innerText = prevMonthLastDate - firstDay.getDay() + i + 1;
        cell.classList.add("prev-month");
        currentRow.appendChild(cell);
    }

    for (let currDay = 1; currDay <= lastDay.getDate(); currDay++) {
        const cell = document.createElement("td");
        cell.innerText = currDay;

        // Add a class to the current day
        if (
            currDay === day &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            cell.classList.add("current-day");
        }

        // Add a click event listener to update the date input value
        cell.addEventListener("click", function() {
            const selectedDate = new Date(year, month, currDay);
            dateInput.value = selectedDate.toISOString().slice(0, 10);
            cell.focus()
        });

        currentRow.appendChild(cell);

        // Start a new row for each week
        if (currentRow.children.length === 7) {
            calendarBody.appendChild(currentRow);
            currentRow = document.createElement("tr");
        }
    }

    // Fill in the cells for the next month
    const nextMonthDays = 6 - lastDay.getDay();
    for (let i = 0; i < nextMonthDays; i++) {
        const cell = document.createElement("td");
        cell.innerText = i + 1;
        cell.classList.add("next-month");
        currentRow.appendChild(cell);
    }

    // Add the last row to the calendar
    calendarBody.appendChild(currentRow);
}


// Handle click on the current month to show all months
monthYearHeader = document.getElementById("month-year");
monthYearHeader.addEventListener("click", function() {
    const monthPicker = prompt("Enter a month (1-12):");
    if (monthPicker !== null) {
        const selectedMonth = parseInt(monthPicker, 10) - 1;
        if (!isNaN(selectedMonth) && selectedMonth >= 0 && selectedMonth <= 11) {
            currentMonth = selectedMonth;

            // Update the date input value when the month is changed
            const selectedDate = new Date(currentYear, currentMonth, currentDay);
            dateInput.value = selectedDate.toISOString().slice(0, 10);

            generateCalendar(currentYear, currentMonth, currentDay);
        } else {
            alert("Invalid month. Please enter a number between 1 and 12.");
        }
    }
});

// Handle click on the current year to navigate through past and future years
yearHeader = document.getElementById("year");
yearHeader.addEventListener("click", function() {
    const yearPicker = prompt("Enter a year:");
    if (yearPicker !== null) {
        // Ensure that the entered year is at least 4 digits long
        if (/^\d{4}$/.test(yearPicker)) {
            const selectedYear = parseInt(yearPicker, 10);
            if (!isNaN(selectedYear)) {
                currentYear = selectedYear;

                // Update the date input value when the year is changed
                const selectedDate = new Date(currentYear, currentMonth, currentDay);
                dateInput.value = selectedDate.toISOString().slice(0, 10);

                generateCalendar(currentYear, currentMonth, currentDay);
            } else {
                alert("Invalid year. Please enter a valid year.");
            }
        } else {
            alert("Invalid year format. Please enter a 4-digit year.");
        }
    }
});



// Get references to the date input and set its default value to the current date
const dateInput = document.querySelector("input[type='date']");
const currentDate = new Date();
dateInput.value = currentDate.toISOString().slice(0, 10);

// Add an event listener to the date input to update the calendar when the date changes
dateInput.addEventListener("change", function() {
    const selectedDate = new Date(this.value);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();
    generateCalendar(year, month, day);
});

// Call the function to generate the calendar for the current date
currentYear = currentDate.getFullYear();
currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();
generateCalendar(currentYear, currentMonth, currentDay);

// Get references to the "Previous" and "Next" buttons
let prev = document.querySelector('.previous'),
    next = document.querySelector('.next');
// Event listener for the "Previous" button
prev.addEventListener('click', function() {
    currentMonth--;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    // Update the date input value
    const newDate = new Date(currentYear, currentMonth, currentDay);
    dateInput.value = newDate.toISOString().slice(0, 10);

    generateCalendar(currentYear, currentMonth, currentDay);
});

// Event listener for the "Next" button
next.addEventListener('click', function() {
    currentMonth++;

    if (currentMonth > 11) {
        currentMonth = 0; // January
        currentYear++;
    }

    // Update the date input value
    const newDate = new Date(currentYear, currentMonth, currentDay);
    dateInput.value = newDate.toISOString().slice(0, 10);

    generateCalendar(currentYear, currentMonth, currentDay);
});
