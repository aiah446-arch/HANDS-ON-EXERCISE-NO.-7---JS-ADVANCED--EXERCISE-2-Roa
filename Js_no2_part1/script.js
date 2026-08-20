const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const tblRecords = document.getElementById("tblRecords");

const btnSave = document.getElementById("btnSave");
const sortField = document.getElementById("sortField");
const sortOrder = document.getElementById("sortOrder");

let arrRecords = new Array();

const tblTHsLabels = [
    "First Name",
    "Middle Name",
    "Last Name",
    "Age",
    "Action"
];


// LOAD RECORDS FROM LOCAL STORAGE
let savedRecords = localStorage.getItem("arrRecords");

if (savedRecords != null) {

    arrRecords = JSON.parse(savedRecords);

}


// DISPLAY INITIAL STATUS
if (arrRecords.length == 0) {

    document.getElementById("status").style.display = "inline";

    document.getElementById("status").innerHTML = "No Records...";

} else {

    document.getElementById("status").style.display = "none";

    iterateRecords();

}

// INSERT / UPDATE
btnInsertUpdate.addEventListener("click", () => {

    const inputTxt = document.getElementsByTagName("input");

    // INSERT
    if (btnInsertUpdate.value == "insert") {

        // Check empty inputs

        for (const txt of inputTxt) {

            if (txt.value.trim() == "") {

                alert("Please complete all the text inputs!");

                return;
            }

        }


        // Create record

        let infoRecord = {

            fname: inputTxt[0].value,

            mname: inputTxt[1].value,

            lname: inputTxt[2].value,

            age: parseInt(inputTxt[3].value)

        };


        // Add record

        arrRecords.push(infoRecord);


        // Clear inputs

        for (const txt of inputTxt) {

            txt.value = "";

        }


        // Display records

        iterateRecords();


        console.log(inputTxt);

        console.log(infoRecord);

        console.log(arrRecords);


    }
    // UPDATE
    else {

        // Check empty inputs

        for (const txt of inputTxt) {

            if (txt.value.trim() == "") {

                alert("Please complete all the text inputs!");

                return;
            }

        }


        // Get index

        let index = parseInt(btnInsertUpdate.value);


        // Update record

        arrRecords[index].fname =
            inputTxt[0].value;

        arrRecords[index].mname =
            inputTxt[1].value;

        arrRecords[index].lname =
            inputTxt[2].value;

        arrRecords[index].age =
            parseInt(inputTxt[3].value);


        // Display records

        iterateRecords();


        // Clear inputs

        for (const txt of inputTxt) {

            txt.value = "";

        }


        // Change button back to Insert

        btnInsertUpdate.innerHTML = "Insert";

        btnInsertUpdate.value = "insert";

    }

});

// CLEAR INPUTS
btnClear.addEventListener("click", () => {

    const inputTxt =
        document.getElementsByTagName("input");


    for (const txt of inputTxt) {

        txt.value = "";

    }


    btnInsertUpdate.innerHTML = "Insert";

    btnInsertUpdate.value = "insert";

});

// CLEAR ALL RECORDS
btnClearItems.addEventListener("click", () => {

    arrRecords = [];


    while (tblRecords.hasChildNodes()) {

        tblRecords.removeChild(
            tblRecords.firstChild
        );

    }


    document.getElementById("status").style.display = "inline";

    document.getElementById("status").innerHTML =
        "No Records...";


    btnInsertUpdate.innerHTML = "Insert";

    btnInsertUpdate.value = "insert";


    // Remove from Local Storage

    localStorage.removeItem("arrRecords");

});

// DISPLAY RECORDS
function iterateRecords() {

    // Clears the existing table

    while (tblRecords.hasChildNodes()) {

        tblRecords.removeChild(
            tblRecords.firstChild
        );

    }



    if (!(arrRecords.length == 0)) {

        document.getElementById("status").style.display =
            "none";

        // TABLE HEADER
        const tblHeaderRow =
            document.createElement("tr");

        const tblHeader =
            document.createElement("thead");


        tblHeaderRow.style.borderTop =
            "1px solid black";

        tblHeaderRow.style.borderBottom =
            "1px solid black";


        // headers

        for (let i = 0; i < 5; i++) {

            const tblTHs =
                document.createElement("th");


            tblTHs.style.padding = "5px";


            if (i != 4) {

                tblTHs.style.borderRight =
                    "1px solid black";

            }


            tblTHs.innerHTML =
                tblTHsLabels[i];


            tblHeaderRow.appendChild(tblTHs);

        }


        tblHeader.appendChild(tblHeaderRow);

        tblRecords.appendChild(tblHeader);

        // TABLE BODY
       
        const tblBody =
            document.createElement("tbody");


        arrRecords.forEach((rec, i) => {

            const tblRow =
                document.createElement("tr");


            const tbdataFname =
                document.createElement("td");

            const tbdataMname =
                document.createElement("td");

            const tbdataLname =
                document.createElement("td");

            const tbdataAge =
                document.createElement("td");

            const tbdataActionBtn =
                document.createElement("td");


            const btnDelete =
                document.createElement("button");

            const btnUpdate =
                document.createElement("button");

            // CELL STYLING
            tbdataFname.style.borderRight =
                "1px solid black";

            tbdataFname.style.padding =
                "10px";


            tbdataMname.style.borderRight =
                "1px solid black";

            tbdataMname.style.padding =
                "10px";


            tbdataLname.style.borderRight =
                "1px solid black";

            tbdataLname.style.padding =
                "10px";


            tbdataAge.style.borderRight =
                "1px solid black";

            tbdataAge.style.padding =
                "10px";


            tbdataActionBtn.style.padding =
                "10px";


            tblRow.style.borderBottom =
                "1px solid black";

            // PUT DATA INTO CELLS
            tbdataFname.innerHTML =
                rec.fname;

            tbdataMname.innerHTML =
                rec.mname;

            tbdataLname.innerHTML =
                rec.lname;

            tbdataAge.innerHTML =
                rec.age;

            // DELETE BUTTON
            btnDelete.innerHTML =
                "Delete";


            btnDelete.setAttribute(
                "onclick",
                `deleteData(${i})`
            );


            btnDelete.style.marginRight =
                "5px";

            // EDIT BUTTON
            btnUpdate.innerHTML =
                "Edit";


            btnUpdate.setAttribute(
                "value",
                "update"
            );


            btnUpdate.setAttribute(
                "onclick",
                `updateData(${i})`
            );


            btnUpdate.style.marginRight =
                "5px";


          
            // BUTTONS
            tbdataActionBtn.appendChild(
                btnDelete
            );

            tbdataActionBtn.appendChild(
                btnUpdate
            );

            tblRow.appendChild(
                tbdataFname
            );

            tblRow.appendChild(
                tbdataMname
            );

            tblRow.appendChild(
                tbdataLname
            );

            tblRow.appendChild(
                tbdataAge
            );

            tblRow.appendChild(
                tbdataActionBtn
            );


            tblBody.appendChild(tblRow);

        });
        tblRecords.appendChild(tblBody);
    }

    else {

        document.getElementById("status").style.display =
            "inline";

        document.getElementById("status").innerHTML =
            "No Records...";

    }

}

// DELETE
function deleteData(i) {

    arrRecords.splice(i, 1);

    iterateRecords();

}

// EDIT
function updateData(i) {

    const inputTxt =
        document.getElementsByTagName("input");


    inputTxt[0].value =
        arrRecords[i].fname;

    inputTxt[1].value =
        arrRecords[i].mname;

    inputTxt[2].value =
        arrRecords[i].lname;

    inputTxt[3].value =
        arrRecords[i].age;


    btnInsertUpdate.innerHTML =
        "Update";


    btnInsertUpdate.value =
        `${i}`;

}

// SORT RECORDS
function sortRecords() {

    let field =
        sortField.value;

    let order =
        sortOrder.value;


  

    if (field == "" || order == "") {

        return;

    }

    // Sort
    arrRecords.sort((a, b) => {

        let valueA = a[field];

        let valueB = b[field];

        // AGE
        if (field == "age") {

            if (order == "asc") {

                return valueA - valueB;

            } else {

                return valueB - valueA;

            }

        }

        // NAMES
        valueA =
            valueA.toLowerCase();

        valueB =
            valueB.toLowerCase();


        if (order == "asc") {

            return valueA.localeCompare(valueB);

        } else {

            return valueB.localeCompare(valueA);

        }

    });

    iterateRecords();

}


// SORT 
sortField.addEventListener(
    "change",
    sortRecords
);

sortOrder.addEventListener(
    "change",
    sortRecords
);

// SAVE TO LOCAL STORAGE
btnSave.addEventListener("click", () => {

    localStorage.setItem(
        "arrRecords",
        JSON.stringify(arrRecords)
    );


    alert(
        "Records saved to Local Storage!"
    );

});