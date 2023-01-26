// ======= CREATES THE SCHEDULE TABLE ======= //

function onCellDrop(event) {
  event.preventDefault();

  console.log(event.target.innerHTML);

  var subjectNameToBeTransfer = event.dataTransfer.getData("name");
  var subjectValueToBeTransfer = event.dataTransfer.getData("value");

  console.log("Nome da materia", subjectNameToBeTransfer);
  console.log("Valor da materia", subjectValueToBeTransfer);

  if (event.target.innerHTML === "" && subjectValueToBeTransfer > 0) {
    console.log("A célula está vazia");

    decrementValue(subjectNameToBeTransfer);
    event.target.innerHTML = subjectNameToBeTransfer;
    event.target.style.backgroundColor = "lightgray";
    event.target.style.border = "1px solid gray";
    event.target.style.cursor = "not-allowed";
    event.target.setAttribute("draggable", false);
    updateAllSubjectSquares();
  } else if (event.target.innerHTML === "" && subjectValueToBeTransfer <= 0) {
    console.log("A matéria não tem mais créditos");
  } else if (event.target.innerHTML !== "" && subjectValueToBeTransfer > 0) {
    var subjectNameTarget = event.target.innerHTML;
    var subjectValueTarget = event.target.getAttribute("value");
    console.log("Nome da materia", subjectNameTarget);
    console.log("Valor da materia", subjectValueTarget);

    console.log("A célula não está vazia");
    decrementValue(subjectNameToBeTransfer);
    incrementValue(subjectNameTarget);

    var subjectInCell = event.dataTransfer.getData("name");
    event.target.innerHTML = subjectNameToBeTransfer;

    console.log("Materia na celula", subjectInCell);

    localStorage.setItem("subjects", JSON.stringify(subjects));
    updateAllSubjectSquares();
  } else if (event.target.innerHTML !== "" && subjectValueToBeTransfer <= 0) {
    console.log("A matéria não tem mais créditos");
  }
}

function onDragOver(event) {
  event.preventDefault();
  console.log("cuuu");
}

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
      if (j === 0 || i === 0) {
        cell.setAttribute("draggable", "false");
      } else {
        cell.setAttribute("ondragover", "onDragOver(event)");
        cell.setAttribute("ondrop", "onCellDrop(event)");
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

// ======= SAVES TABLE DATA ======= //
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

// ======= LOADS TABLE DATA ======= //
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
