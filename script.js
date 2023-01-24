
const updateTable = (subjects) => { 
    for (let subject of subjects) { 
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${subject.value}</td>
        <td>${subject.name}</td>
        <td>${subject.times}</td>
        `;
        document.getElementById('data-output').appendChild(row); // Add row to table
    }
}

const updateSelectedOptions = (subjects) => {
    var days = ["Monday-input", "Tuesday-input", "Wednesday-input", "Thursday-input", "Friday-input"];
    days.forEach(function(day) {
        var select = document.getElementById(day);
        select.innerHTML = "";
        subjects.forEach(function(sub){
            var option = document.createElement("option");
            option.value = sub.name;
            option.text = sub.name;
            select.add(option);
        });
    });
}


const getSubjects = () => { 
    let subjects = JSON.parse(localStorage.getItem('subjects')); 
    if (subjects === null) { 
        subjects = []; 
    }
    updateSelectedOptions(subjects);
    return subjects;
}

let subjects = [];
const AddNewSubject = () => {
    const subject = {
        id: Date.now(),
        value: document.getElementById("valueInput").value,
        name: document.getElementById("name").value,
        times: document.getElementById("times").value,
    }
    if (subject.value === '' || subject.name === '') {
        alert('Preencha todos os campos!');
        return;
    }
    subjects.push(subject);
    console.log(subject);
    localStorage.setItem('subjects', JSON.stringify(subjects));
    updateTable(subjects);
    updateSelectedOptions(subjects);
    var days = ["Monday-input", "Tuesday-input", "Wednesday-input", "Thursday-input", "Friday-input"];
    days.forEach(function(day) {
        var select = document.getElementById(day);
        select.innerHTML = "";
        subjects.forEach(function(sub){
            var option = document.createElement("option");
            option.value = sub.name;
            option.text = sub.name;
            select.add(option);
        });
    });
    document.forms[0].reset();
    document.forms[1].reset();
}

document.addEventListener('DOMContentLoaded', () => {
    subjects = getSubjects();
    updateTable(subjects);
    document.getElementById('btn').addEventListener('click', AddNewSubject);
    document.getElementById('btn2').addEventListener('click', console.log('cu'));
    document.getElementById('btn3').addEventListener('click', localStorage.clear);
});



const removeExpense = (id) => { 
    subjects = subjects.filter((subject) => subject.id !== id);
    updateTable(subjects); 
    updateSelectedOptions(subjects); 
}


const addSubjectsToTable = (tableId) => {
    var monday = document.getElementById("Monday-input").value;
    var tuesday = document.getElementById("Tuesday-input").value;
    var wednesday = document.getElementById("Wednesday-input").value;
    var thursday = document.getElementById("Thursday-input").value;
    var friday = document.getElementById("Friday-input").value;


    var scheduleTable = document.getElementById(tableId);
    var newRow = scheduleTable.insertRow();

      if (scheduleTable.rows.length > 5) { // Verify if the table has the limit of 4 rows
          alert("You can only add 4 subjects");
          return;
      }
      // Verify if has empty fields
      if (monday == "" || tuesday == "" || wednesday == "" || thursday == "" || friday == "") {
          alert("Please fill all the fields");
          return;
      }


  var mondayCell = newRow.insertCell(0);
  var tuesdayCell = newRow.insertCell(1);
  var wednesdayCell = newRow.insertCell(2);
  var thursdayCell = newRow.insertCell(3);
  var fridayCell = newRow.insertCell(4);
  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Delete";
  btn.addEventListener("click", function() {
  newRow.remove();
  });
  newRow.appendChild(btn);
  mondayCell.innerHTML = monday;
  tuesdayCell.innerHTML = tuesday;
  wednesdayCell.innerHTML = wednesday;
  thursdayCell.innerHTML = thursday;
  fridayCell.innerHTML = friday;
  
  }



// Função para salvar os dados da tabela no armazenamento local
var tablesData = {
    "schedule-table-sextoAno": {
      id: "schedule-table-sextoAno",
      data: []
    },
    "schedule-table-setimoAno": {
      id: "schedule-table-setimoAno",
      data: []
    },
    "schedule-table-oitavoAno": {
      id: "schedule-table-oitavoAno",
      data: []
    },
    "schedule-table-nonoAno": {
      id: "schedule-table-nonoAno",
      data: []
    }
  }
  
  // Função para salvar os dados da tabela no armazenamento local
  function saveTableData(tableId) {
    var table = document.getElementById(tableId);
    var rows = table.rows;
    var data = [];
    for (var i = 1; i < rows.length; i++) {
      var cells = rows[i].cells;
      data[i-1] = {};
      for (var j = 0; j < cells.length; j++) {
        data[i-1][j] = cells[j].innerHTML;
      }
    }
    tablesData[tableId].data = data;
    localStorage.setItem("tablesData", JSON.stringify(tablesData));
  }
  
  // Função para recuperar os dados da tabela do armazenamento local
  function loadTableData(tableId) {
    var tablesData = JSON.parse(localStorage.getItem("tablesData"));
    var data = tablesData[tableId].data;
    if (data !== null) {
      var table = document.getElementById(tableId);
      for (var i = 0; i < data.length; i++) {
        var row = table.insertRow(i+1);
        for (var j = 0; j < 5; j++) {
          var cell = row.insertCell(j);
          cell.innerHTML = data[i][j];
        }
      }
    }
}
  
// Toda a vez que eu mudar de aba, salvo os dados da tabela
window.onblur = function() {
    saveTableData("schedule-table-sextoAno");
    saveTableData("schedule-table-setimoAno");
    saveTableData("schedule-table-oitavoAno");
    saveTableData("schedule-table-nonoAno");
}

// Quando eu carregar a página, carrego os dados da tabela
window.onload = function() {
    loadTableData("schedule-table-sextoAno");
    loadTableData("schedule-table-setimoAno");
    loadTableData("schedule-table-oitavoAno");
    loadTableData("schedule-table-nonoAno");
}

