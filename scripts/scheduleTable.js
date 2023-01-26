// ======= CREATES THE SCHEDULE TABLE ======= //

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
