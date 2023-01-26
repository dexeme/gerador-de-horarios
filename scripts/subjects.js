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
  document.getElementById("btn2").addEventListener("click", console.log("cu"));
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

      updateSubjectsTable(subject);
      console.log(subject.value);

      targetCell.innerHTML = "";

      targetCell.appendChild(createSubjectElement(subject));
    }
  });
  return subjectDiv;
}

// ======= DECREMENT -1 OF SUBJECT VALUE ======= //
const decrementValue = (id) => {
  console.log("decrementValue called with id:", id);
  let subject = subjects.find((subject) => subject.id === id);
  subject.value--;
  localStorage.setItem("subjects", JSON.stringify(subjects));
  updateSubjectsTable(subjects);
};
