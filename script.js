let numbers = [];
let showTotal = false;
let showHighestLowest = false;



function insertNumber() {

    let input = document.getElementById("numberInput");

    let value = Number(input.value);


    if (input.value === "") {

        alert("Please enter a number.");

        return;
    }


    if (value <= 0) {

        alert("Please insert a positive number.");

        return;
    }

    numbers.push(value);

    displayNumbers();



    input.value = "";

    input.focus();
}


function displayNumbers() {

    let list = document.getElementById("numberList");

    list.innerHTML = "";


    numbers.forEach(function(number, index) {


        let row = document.createElement("div");

        row.className = "number-row";



        let numberText = document.createElement("span");

        numberText.className = "number";

        numberText.textContent = number;


 
        let typeText = document.createElement("span");

        typeText.className = "type";


        if (number % 2 === 0) {

            typeText.textContent = "EVEN";

        } else {

            typeText.textContent = "ODD";

        }


        let removeButton = document.createElement("button");

        removeButton.className = "action-btn";

        removeButton.textContent = "Remove";


        removeButton.onclick = function() {

            removeNumber(index);

        };


        let editButton = document.createElement("button");

        editButton.className = "action-btn";

        editButton.textContent = "Edit";


        editButton.onclick = function() {

            editNumber(index);

        };


        row.appendChild(numberText);

        row.appendChild(typeText);

        row.appendChild(removeButton);

        row.appendChild(editButton);


        // Add row to list

        list.appendChild(row);

    });
}



function removeNumber(index) {

    numbers.splice(index, 1);

    displayNumbers();

    displayResult();
}


function editNumber(index) {

    let newNumber = prompt(
        "Enter the new positive number:",
        numbers[index]
    );


    if (newNumber === null) {

        return;
    }


    newNumber = Number(newNumber);


    if (isNaN(newNumber) || newNumber <= 0) {

        alert("Please enter a valid positive number.");

        return;
    }


    numbers[index] = newNumber;


    displayNumbers();

    displayResult();
}

function clearEntry() {

    let input = document.getElementById("numberInput");

    input.value = "";

    input.focus();
}


function clearItems() {

    numbers = [];

    showTotal = false;

    showHighestLowest = false;


    document.getElementById("numberList").innerHTML = "";

    document.getElementById("result").innerHTML = "";

    document.getElementById("sortSelect").value = "";
}


function getTotal() {

    if (numbers.length === 0) {

        alert("There are no inserted numbers.");

        return;
    }


    showTotal = true;

    displayResult();
}


function getHighestLowest() {

    if (numbers.length === 0) {

        alert("There are no inserted numbers.");

        return;
    }


    showHighestLowest = true;

    displayResult();
}

function displayResult() {

    let result = document.getElementById("result");

    result.innerHTML = "";


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


function sortNumbers() {

    let sortType =
        document.getElementById("sortSelect").value;


    if (sortType === "") {

        return;
    }


    if (numbers.length === 0) {

        alert("There are no inserted numbers.");

        return;
    }


    if (sortType === "ascending") {

        numbers.sort(function(a, b) {

            return a - b;

        });
    }


    if (sortType === "descending") {

        numbers.sort(function(a, b) {

            return b - a;

        });
    }


    displayNumbers();

    displayResult();
}


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


document
    .getElementById("numberInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            insertNumber();

        }

    });