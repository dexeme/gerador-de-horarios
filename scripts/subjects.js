// ======= UPDATE SUBJECTS TABLE ======= //
const updateSubjectsTable = (subjects) => {
  let table = document.getElementById("data-output");
  table.innerHTML = ""; // Clear the table

  for (let subject of subjects) {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${subject.value}</td>
        <td>${subject.name}</td>
        <td>${subject.times}</td>
        `;
    // Create a delete button for each row
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
// ======= UPDATE THE SUBJECTS VALUES ======= //
function countSubjectOccurrences(subjectName) {
  let count = 0;
  const table = document.getElementById("schedule-table");
  for (let i = 1; i < table.rows.length; i++) {
    for (let j = 1; j < table.rows[i].cells.length; j++) {
      if (table.rows[i].cells[j].innerHTML === subjectName) {
        count++;
      }
    }
  }
  return count;
}

// ======= GET SUBJECTS FROM LOCAL STORAGE ======= //
const getSubjects = () => {
  let subjects = JSON.parse(localStorage.getItem("subjects"));
  if (subjects === null) {
    subjects = [];
  }
  return subjects;
};

// ======= REGISTER A NEW SUBJECT ======= //

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
  localStorage.setItem("subjects", JSON.stringify(subjects));
  updateSubjectsTable(subjects);
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
  updateSubjectsTable(subjects);
  document.getElementById("btn").addEventListener("click", AddNewSubject);
  document
    .getElementById("btn2")
    .addEventListener("click", console.log(subjects));
  document.getElementById("btn3").addEventListener("click", localStorage.clear);
});

const deleteSubject = (id) => {
  subjects = subjects.filter((subject) => subject.id !== id);
  localStorage.setItem("subjects", JSON.stringify(subjects));
  updateSubjectsTable(subjects);
};

function displaySubjects() {
  var subjects = JSON.parse(localStorage.getItem("subjects"));

  var container = document.createElement("div");
  container.id = "subjects-container";

  for (var i = 0; i < subjects.length; i++) {
    var subject = subjects[i];
    var subjectDiv = createSubjectElement(subject);
    container.appendChild(subjectDiv);
  }

  document.body.appendChild(container);
}

// ======= TRANSFORM CURRENT SUBJECTS INTO DRAGABBLE SQUARES ======= //
function createSubjectElement(subject) {
  var subjectDiv = document.createElement("div");
  subjectDiv.classList.add("subject-square");
  subjectDiv.innerHTML = subject.name + " " + subject.value;
  subjectDiv.setAttribute("draggable", true);
  subjectDiv.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("name", subject.name);
    event.dataTransfer.setData("value", subject.value);
  });
  var targetCell = document.getElementById("target-cell");
  subjectDiv.addEventListener("dragend", function (event) {
    targetCell.innerHTML = "";
  });
  return subjectDiv;
}

// ======= DECREMENT -1 OF SUBJECT VALUE ======= //
const decrementValue = (subjectName) => {
  console.log("decrementValue called with name:", subjectName);
  let subject = subjects.find((subject) => subject.name === subjectName);
  subject.value = subject.value - 1;
  console.log("new value for the subject", subjectName, "é" + subject.value);
  // localStorage.setItem("subjects", JSON.stringify(subjects));
  //updateSubjectsTable(subjects);
  return subject.value;
};

const incrementValue = (subjectName) => {
  console.log("incrementValue called with name:", subjectName);
  let subject = subjects.find((subject) => subject.name === subjectName);
  subject.value = subject.value + 1;
  console.log("new value for the subject", subjectName, "é" + subject.value);
  //localStorage.setItem("subjects", JSON.stringify(subjects));
  // updateSubjectsTable(subjects);
  return subject.value;
};

function updateAllSubjectSquares() {
  var subjectSquares = document.getElementsByClassName("subject-square");
  for (var i = 0; i < subjectSquares.length; i++) {
    var subjectSquare = subjectSquares[i];
    // Aqui você pode atualizar cada elemento como desejar
    // Exemplo:
    subjectSquare.innerHTML = subjects[i].name + " " + subjects[i].value;
    if (subjects[i].value == 0) {
      subjectSquare.classList.add("subject-square-disabled");
    } else {
      subjectSquare.classList.remove("subject-square-disabled");
    }
  }
}
