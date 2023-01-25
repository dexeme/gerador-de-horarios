const updateTable = (subjects) => {
  let table = document.getElementById("data-output");
  table.innerHTML = "";
  for (let subject of subjects) {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${subject.value}</td>
      <td>${subject.name}</td>
      <td>${subject.times}</td>
      `;
    let btn = document.createElement("BUTTON");
    btn.innerHTML = "Delete";
    btn.classList.add("delete-btn");
    btn.addEventListener("click", function () {
      deleteSubject(subject.id);
      row.remove();
    });
    row.appendChild(btn);
    table.appendChild(row);
  }
};

const getSubjects = () => {
  let subjects = JSON.parse(localStorage.getItem("subjects"));
  if (subjects === null) {
    subjects = [];
  }
  return subjects;
};

let subjects = [];
const AddNewSubject = () => {
  const subject = {
    id: Date.now(),
    value: document.getElementById("valueInput").value,
    name: document.getElementById("name").value,
    times: document.getElementById("times").value,
  };
  if (subject.value === "" || subject.name === "") {
    alert("Preencha todos os campos!");
    return;
  }
  subjects.push(subject);
  console.log(subject);
  localStorage.setItem("subjects", JSON.stringify(subjects));
  updateTable(subjects);
  var days = [
    "Monday-input",
    "Tuesday-input",
    "Wednesday-input",
    "Thursday-input",
    "Friday-input",
  ];
  days.forEach(function (day) {
    var select = document.getElementById(day);
    select.innerHTML = "";
    subjects.forEach(function (sub) {
      var option = document.createElement("option");
      option.value = sub.name;
      option.text = sub.name;
      select.add(option);
    });
  });
  document.forms[0].reset();
  document.forms[1].reset();
};

document.addEventListener("DOMContentLoaded", () => {
  subjects = getSubjects();
  updateTable(subjects);
  document.getElementById("btn").addEventListener("click", AddNewSubject);
  document.getElementById("btn2").addEventListener("click", console.log("cu"));
  document.getElementById("btn3").addEventListener("click", localStorage.clear);
});

const deleteSubject = (id) => {
  subjects = subjects.filter((subject) => subject.id !== id);
  localStorage.setItem("subjects", JSON.stringify(subjects));
  updateTable(subjects);
};

const addSubjectsToTable = (tableId) => {
  var monday = document.getElementById("Monday-input").value;
  var tuesday = document.getElementById("Tuesday-input").value;
  var wednesday = document.getElementById("Wednesday-input").value;
  var thursday = document.getElementById("Thursday-input").value;
  var friday = document.getElementById("Friday-input").value;

  var scheduleTable = document.getElementById(tableId);
  var newRow = scheduleTable.insertRow();

  if (scheduleTable.rows.length > 5) {
    // Verify if the table has the limit of 4 rows
    alert("You can only add 4 subjects");
    return;
  }
  // Verify if has empty fields
  if (
    monday == "" ||
    tuesday == "" ||
    wednesday == "" ||
    thursday == "" ||
    friday == ""
  ) {
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
  btn.addEventListener("click", function () {
    newRow.remove();
  });
  newRow.appendChild(btn);
  mondayCell.innerHTML = monday;
  tuesdayCell.innerHTML = tuesday;
  wednesdayCell.innerHTML = wednesday;
  thursdayCell.innerHTML = thursday;
  fridayCell.innerHTML = friday;
};

// Função para salvar os dados da tabela no armazenamento local
var tablesData = {
  "schedule-table-sextoAno": {
    id: "schedule-table-sextoAno",
    data: [],
  },
  "schedule-table-setimoAno": {
    id: "schedule-table-setimoAno",
    data: [],
  },
  "schedule-table-oitavoAno": {
    id: "schedule-table-oitavoAno",
    data: [],
  },
  "schedule-table-nonoAno": {
    id: "schedule-table-nonoAno",
    data: [],
  },
};

// Função para salvar os dados da tabela no armazenamento local
function saveTableData(tableId) {
  var table = document.getElementById(tableId);
  var rows = table.rows;
  var data = [];
  for (var i = 1; i < rows.length; i++) {
    var cells = rows[i].cells;
    data[i - 1] = {};
    for (var j = 0; j < cells.length; j++) {
      data[i - 1][j] = cells[j].innerHTML;
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
      var row = table.insertRow(i + 1);
      for (var j = 0; j < 5; j++) {
        var cell = row.insertCell(j);
        cell.innerHTML = data[i][j];
      }
    }
  }
}

const dragStart = (event) => {
  event.preventDefault();
  event.dataTransfer.setData("text", event.target.id);
};

const dragOver = (event) => {
  event.preventDefault();
};

const drop = (event) => {
  event.preventDefault();
  const discipline = document.createElement("div");
  discipline.innerHTML = event.dataTransfer.getData("text");
  event.target.appendChild(discipline);
};

const gerarTabela = (tableId) => {
  const table = document.getElementById(tableId);

  if (table.rows.length > 1 && table.rows[0].cells.length > 0) return;

  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const hours = ["8:00", "8:45", "9:30", "10:15", "11:00"];

  // Create 6 rows
  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    // Create 6 cells in each row
    for (let j = 0; j < 6; j++) {
      const cell = row.insertCell();
      if (j === 0) {
        cell.setAttribute("draggable", "false");
      } else {
        cell.setAttribute("ondragover", "dragOver(event)");
        cell.setAttribute("ondrop", "drop(event)");
      }

      if (i === 0 && j > 0) {
        cell.innerHTML = days[j - 1]; //put the day in the first row
      }
      if (j === 0 && i > 0) {
        cell.innerHTML = hours[i - 1]; //put the hour in the first col
      }
    }
  }
};
``;

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
  // obtém a célula alvo
  var targetCell = document.getElementById("target-cell");
  // limpa a célula alvo
  targetCell.innerHTML = "";
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
  subjectDiv.innerHTML = subject.name + " " + subject.value;
  subjectDiv.setAttribute("draggable", true);
  subjectDiv.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text", subject.name);
  });
  var targetCell = document.getElementById("target-cell");
  subjectDiv.addEventListener("dragend", function (event) {
    if (subject.value > 1) {
      event.preventDefault();

      console.log("bigger than zero");

      subject.value = subject.value - 1;

      subjectDiv.innerHTML = subject.name + " " + subject.value;

      localStorage.setItem("subjects", JSON.stringify(subjects));

      console.log(subject.value);

      targetCell.innerHTML = "";

      targetCell.appendChild(createSubjectElement(subject));
    } else {
      console.log("less than zero");
      subject.value = 0;
      subjectDiv.innerHTML = subject.name + " " + subject.value;

      subjectDiv.style.backgroundColor = "lightgray";
      subjectDiv.style.border = "1px solid gray";
      subjectDiv.style.cursor = "not-allowed";
      subjectDiv.setAttribute("draggable", false);
      localStorage.setItem("subjects", JSON.stringify(subjects));

      updateTable(subject);
      console.log(subject.value);

      targetCell.innerHTML = "";

      targetCell.appendChild(createSubjectElement(subject));
    }
  });
  return subjectDiv;
}

const addSubjectToTable = (event) => {
  event.preventDefault();
  let id = event.dataTransfer.getData("text");
  let subject = subjects.find((subject) => subject.id === id);

  localStorage.setItem("subjects", JSON.stringify(subjects));
  updateTable(subject);
};

function updateValues() {
  // obtém todos os elementos da tabela
  const tableElements = document.querySelectorAll("#tableId .subject-square");

  // para cada elemento
  for (const element of tableElements) {
    // encontra a disciplina correspondente
    const subject = subjects.find((subject) => subject.id === element.id);

    // conta quantas vezes a disciplina aparece na tabela
    let count = 0;
    for (const el of tableElements) {
      if (el.id === subject.id) {
        count++;
      }
    }

    // atualiza o "value" da disciplina
    console.log(subject.name, subject.value, count);
    subject.value = count;
  }
}

// função para atualizar a tabela
function updateSubjectValue(subjects) {
  // obtém a tabela
  var table = document.getElementById("table");

  // percorre cada célula da tabela
  for (var i = 0; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++) {
      var cell = table.rows[i].cells[j];
      var subject = cell.querySelector(".subject-square");
      if (subject) {
        var subjectName = subject.innerHTML;
        let subject = subjects.find((subject) => subject.name === subjectName);
        subject.value = subject.value - 1;
      }
    }
  }
  localStorage.setItem("subjects", JSON.stringify(subjects));
  displaySubjects();
}

const decrementValue = (id) => {
  console.log("decrementValue called with id:", id);
  let subject = subjects.find((subject) => subject.id === id);
  subject.value--;
  localStorage.setItem("subjects", JSON.stringify(subjects));
  updateTable(subjects);
};
