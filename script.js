
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

const getSubjects = () => { 
  let subjects = JSON.parse(localStorage.getItem('subjects')); 
  if (subjects === null) { 
      subjects = []; 
  }
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

const dragStart = (event) => {
  event.dataTransfer.setData("text", event.target.id);
}

const dragOver = (event) => {
  event.preventDefault();
}

const drop = (event) => {
  event.preventDefault();
  const discipline = document.createElement("div");
  discipline.innerHTML = event.dataTransfer.getData("text");
  event.target.appendChild(discipline);
};

const gerarTabela = (tableId) => {
  const table = document.getElementById(tableId);

  if(table.rows.length > 1 && table.rows[0].cells.length > 0) return;

  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const hours = ['8:00', '8:45', '9:30', '10:15', '11:00'];
  
  // Create 6 rows
  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    // Create 6 cells in each row
    for (let j = 0; j < 6; j++) {
      const cell = row.insertCell();
      cell.setAttribute("ondragover", "dragOver(event)");
      cell.setAttribute("ondrop", "drop(event)");
      if (i === 0 && j > 0) {
        cell.innerHTML = days[j-1]; //put the day in the first row
      }
      if (j === 0 && i > 0) {
        cell.innerHTML = hours[i-1]; //put the hour in the first col
      }
    }
  }
};

// função para exibir as disciplinas armazenadas no local storage
function displaySubjects() {
  // obtém os subjects do local storage
  var subjects = JSON.parse(localStorage.getItem("subjects"));

  // cria um elemento div para conter os quadrados
  var container = document.createElement("div");
  container.id = "subjects-container";

  // para cada subject, cria um elemento div e o adiciona ao container
  for (var i = 0; i < subjects.length; i++) {
      var subject = subjects[i];
      var subjectDiv = createSubjectElement(subject);
      container.appendChild(subjectDiv);
  }

  // adiciona o container à tela
  document.body.appendChild(container);
}

// função para adicionar uma disciplina à célula alvo
// função para adicionar uma disciplina à célula alvo
function addSubject(subjectName) {
  var existingSubject = targetCell.querySelector(".subject-square");
  if (!existingSubject) {
      targetCell.appendChild(createSubjectElement(subjectName));
  }
  if (existingSubject) {
      existingSubject.innerHTML = subjectName;
  }
}
  

// função para criar um elemento de disciplina
function createSubjectElement(subject) {
  var subjectDiv = document.createElement("div");
  subjectDiv.classList.add("subject-square");
  subjectDiv.innerHTML = subject.name;
  subjectDiv.setAttribute("draggable", true);
  subjectDiv.addEventListener("dragstart", function(event) {
      event.dataTransfer.setData("text", subject.name);
  });
  return subjectDiv;
}



// seleciona a célula alvo e adiciona eventos de drag drop
var targetCell = document.getElementById("target-cell"); 
  targetCell.addEventListener("drop", function(event) {
  event.preventDefault();
  var existingSubject = targetCell.querySelector(".subject-square");
  if (existingSubject) {
    targetCell.removeChild(existingSubject);
  }
  var subjectName = event.dataTransfer.getData("text");
  addSubject(subjectName);
});


