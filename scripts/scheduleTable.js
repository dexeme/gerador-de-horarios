// ======= CREATES THE SCHEDULE TABLE ======= //

function onCellDrop(event) {
  event.preventDefault();

  var subjectNameToBeTransfer = event.dataTransfer.getData("name");
  var subjectValueToBeTransfer = event.dataTransfer.getData("value");

  if (event.target.innerHTML === "" && subjectValueToBeTransfer > 0) {
    decrementValue(subjectNameToBeTransfer);
    event.target.innerHTML = subjectNameToBeTransfer;
    event.target.style.backgroundColor = "lightgray";
    event.target.style.border = "1px solid gray";
    event.target.style.cursor = "not-allowed";
    event.target.setAttribute("draggable", false);
    updateAllSubjectSquares();
  } else if (event.target.innerHTML === "" && subjectValueToBeTransfer <= 0) {
  } else if (event.target.innerHTML !== "" && subjectValueToBeTransfer > 0) {
    var subjectNameTarget = event.target.innerHTML;

    decrementValue(subjectNameToBeTransfer);
    incrementValue(subjectNameTarget);

    event.target.innerHTML = subjectNameToBeTransfer;

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
      var cell = row.insertCell();
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
function saveTable(nome, tableId) {
  var table = document.getElementById(tableId);
  var tableData = [];
  for (var i = 1; i < table.rows.length; i++) {
    var row = table.rows[i];
    var rowData = [];
    for (var j = 0; j < row.cells.length; j++) {
      rowData.push(row.cells[j].innerHTML);
    }
    tableData.push(rowData);
  }
  tablesData[tableId].data = tableData;
  localStorage.setItem("tablesData", JSON.stringify(tablesData));

  localStorage.setItem(nome, table.outerHTML);
  console.log('salvou')

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

function saveCellsData(tableId) {
  var table = document.getElementById(tableId);
  localStorage.setItem("tableSextoAno", JSON.stringify(table));
  console.log(table);
}
