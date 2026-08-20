// ===============================
// ARRAY FOR THE NUMBERS
// ===============================

let numbers = [];


// These control whether the results
// are displayed

let showTotal = false;
let showHighestLowest = false;


// ===============================
// INSERT NUMBER
// ===============================

function insertNumber() {

    let input = document.getElementById("numberInput");

    let value = Number(input.value);


    // Check if input is empty

    if (input.value === "") {

        alert("Please enter a number.");

        return;
    }


    // Check if number is positive

    if (value <= 0) {

        alert("Please insert a positive number.");

        return;
    }


    // Add number to array

    numbers.push(value);


    // Display numbers

    displayNumbers();


    // Clear input box

    input.value = "";

    input.focus();
}


// ===============================
// DISPLAY NUMBERS
// ===============================

function displayNumbers() {

    let list = document.getElementById("numberList");

    list.innerHTML = "";


    numbers.forEach(function(number, index) {

        // Create row

        let row = document.createElement("div");

        row.className = "number-row";


        // ===============================
        // NUMBER
        // ===============================

        let numberText = document.createElement("span");

        numberText.className = "number";

        numberText.textContent = number;


        // ===============================
        // EVEN OR ODD
        // ===============================

        let typeText = document.createElement("span");

        typeText.className = "type";


        if (number % 2 === 0) {

            typeText.textContent = "EVEN";

        } else {

            typeText.textContent = "ODD";

        }


        // ===============================
        // REMOVE BUTTON
        // ===============================

        let removeButton = document.createElement("button");

        removeButton.className = "action-btn";

        removeButton.textContent = "Remove";


        removeButton.onclick = function() {

            removeNumber(index);

        };


        // ===============================
        // EDIT BUTTON
        // ===============================

        let editButton = document.createElement("button");

        editButton.className = "action-btn";

        editButton.textContent = "Edit";


        editButton.onclick = function() {

            editNumber(index);

        };


        // Add elements to row

        row.appendChild(numberText);

        row.appendChild(typeText);

        row.appendChild(removeButton);

        row.appendChild(editButton);


        // Add row to list

        list.appendChild(row);

    });
}


// ===============================
// REMOVE NUMBER
// ===============================

function removeNumber(index) {

    numbers.splice(index, 1);

    displayNumbers();

    displayResult();
}


// ===============================
// EDIT NUMBER
// ===============================

function editNumber(index) {

    let newNumber = prompt(
        "Enter the new positive number:",
        numbers[index]
    );


    // If user clicks Cancel

    if (newNumber === null) {

        return;
    }


    newNumber = Number(newNumber);


    // Check if valid

    if (isNaN(newNumber) || newNumber <= 0) {

        alert("Please enter a valid positive number.");

        return;
    }


    // Update number

    numbers[index] = newNumber;


    displayNumbers();

    displayResult();
}


// ===============================
// CLEAR ENTRY
// ===============================

function clearEntry() {

    let input = document.getElementById("numberInput");

    input.value = "";

    input.focus();
}


// ===============================
// CLEAR ALL ITEMS
// ===============================

function clearItems() {

    numbers = [];

    showTotal = false;

    showHighestLowest = false;


    document.getElementById("numberList").innerHTML = "";

    document.getElementById("result").innerHTML = "";

    document.getElementById("sortSelect").value = "";
}


// ===============================
// GET TOTAL
// ===============================

function getTotal() {

    if (numbers.length === 0) {

        alert("There are no inserted numbers.");

        return;
    }


    showTotal = true;

    displayResult();
}


// ===============================
// GET HIGHEST AND LOWEST
// ===============================

function getHighestLowest() {

    if (numbers.length === 0) {

        alert("There are no inserted numbers.");

        return;
    }


    showHighestLowest = true;

    displayResult();
}


// ===============================
// DISPLAY RESULT
// ===============================

function displayResult() {

    let result = document.getElementById("result");

    result.innerHTML = "";


    // ===============================
    // TOTAL
    // ===============================

    if (showTotal) {

        let total = numbers.reduce(
            function(sum, number) {

                return sum + number;

            },
            0
        );


        result.innerHTML +=
            "<strong>Total:</strong> " +
            total +
            "<br>";
    }


    // ===============================
    // HIGHEST AND LOWEST
    // ===============================

    if (showHighestLowest && numbers.length > 0) {

        let highest = Math.max(...numbers);

        let lowest = Math.min(...numbers);


        result.innerHTML +=
            "<strong>Highest Number:</strong> " +
            highest +
            "<br>";


        result.innerHTML +=
            "<strong>Lowest Number:</strong> " +
            lowest +
            "<br>";
    }
}


// ===============================
// SORT NUMBERS
// ===============================

function sortNumbers() {

    let sortType =
        document.getElementById("sortSelect").value;


    // If no option selected

    if (sortType === "") {

        return;
    }


    // If no numbers

    if (numbers.length === 0) {

        alert("There are no inserted numbers.");

        return;
    }


    // ===============================
    // ASCENDING
    // ===============================

    if (sortType === "ascending") {

        numbers.sort(function(a, b) {

            return a - b;

        });
    }


    // ===============================
    // DESCENDING
    // ===============================

    if (sortType === "descending") {

        numbers.sort(function(a, b) {

            return b - a;

        });
    }


    displayNumbers();

    displayResult();
}


// ===============================
// BUTTON EVENTS
// ===============================

document
    .getElementById("insertButton")
    .addEventListener("click", insertNumber);


document
    .getElementById("clearEntryButton")
    .addEventListener("click", clearEntry);


document
    .getElementById("clearItemsButton")
    .addEventListener("click", clearItems);


document
    .getElementById("totalButton")
    .addEventListener("click", getTotal);


document
    .getElementById("highestLowestButton")
    .addEventListener("click", getHighestLowest);


document
    .getElementById("sortSelect")
    .addEventListener("change", sortNumbers);


// ===============================
// ENTER KEY
// ===============================

document
    .getElementById("numberInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            insertNumber();

        }

    });