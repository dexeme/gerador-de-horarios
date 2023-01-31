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
  console.log("SegurandoObjeto");
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
        cell.innerHTML = ".";
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


function gerarMateriasDisponiveis(celulas){
  
  subjects = JSON.parse(localStorage.getItem("subjects"));

  for (let i = 0; i < celulas.length; i++) {
    var celula = celulas[i];
    if (celula.innerHTML != "") {
      for (let j = 0; j < subjects.length; j++) {
        
        if (celula.innerHTML === subjects[j].name) {
          subjects[j].value--;
        }
      }
    }
  }
  console.log('passou por aqui', subjects)
  return subjects;
}
function getCelulasImportantes(nome) {
  var tabela = document.getElementById(nome);
  var celulas = tabela.getElementsByTagName('td');
  var celulasImportantes = [];
  for (let i = 0; i < celulas.length; i++){
    if (celulas[i].innerHTML === ""){
      celulasImportantes.push(celulas[i].innerHTML);
    }
  }
  return celulasImportantes;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function assignCells(){
  
  var subRef1 =  {
    "MAT": 4,
    "POR": 4,
    "CIE": 3,
    "GEO": 3,
    "HIS": 3,
    "ING": 3,
    "EDF": 3,
    "ART": 2,
  }
  
  var subRef2 = {
    "MAT": 4,
    "POR": 4,
    "CIE": 3,
    "GEO": 3,
    "HIS": 3,
    "ING": 3,
    "EDF": 3,
    "ART": 2,
  }
  
  var subRef3 = {
    "MAT": 4,
    "POR": 4,
    "CIE": 3,
    "GEO": 3,
    "HIS": 3,
    "ING": 3,
    "EDF": 3,
    "ART": 2,
  }
  
  var subRef4 = {
    "MAT": 4,
    "POR": 4,
    "CIE": 3,
    "GEO": 3,
    "HIS": 3,
    "ING": 3,
    "EDF": 3,
    "ART": 2,
  }
  
  var classRef = {
    "Sexto Ano": getCelulasImportantes('sexto-ano'),
    "Setimo Ano": getCelulasImportantes('setimo-ano'),
    "Oitavo Ano": getCelulasImportantes('oitavo-ano'),
    "Nono Ano": getCelulasImportantes('nono-ano'),
  }
  
  function decrementFixedSubjects () {
    for (cell in classRef['Sexto Ano']) {
      if (cell != '') subRef1[cell] -= 1
    }
    for (cell in classRef['Setimo Ano']) {
      if (cell != '') subRef2[cell] -= 1
    }
    for (cell in classRef['Oitavo Ano']) {
      if (cell != '') subRef3[cell] -= 1
    }
    for (cell in classRef['Nono Ano']) {
      if (cell != '') subRef4[cell] -= 1
    }
  }

  function getFixedSubjects(celula){
    let fixedSubjects = [classRef["Sexto Ano"][celula], classRef["Setimo Ano"][celula], classRef["Oitavo Ano"][celula], classRef["Nono Ano"][celula]];
    return fixedSubjects;
  }


  function generateAvailableSubjects(subRef, fixedSubjects, year){
    var availableSubjects = [];
    for (let sub in subRef){
      for (let i = 0; i < subRef[sub]; i++){
        if (sub != fixedSubjects[year] && subRef[sub] > 0) {
          availableSubjects.push(sub);

        }
      }
    }

    return availableSubjects;
  }

  function getAvailableSubjects(fixedSubjects){
    var avlbSubRef = {
      'Sexto Ano' : generateAvailableSubjects(subRef1, fixedSubjects, 0),
      'Setimo Ano' : generateAvailableSubjects(subRef2, fixedSubjects, 1),
      'Oitavo Ano' : generateAvailableSubjects(subRef3, fixedSubjects, 2),
      'Nono Ano' : generateAvailableSubjects(subRef4, fixedSubjects, 3),
    }
    return avlbSubRef;
  }

  function generateNthCellOfEachTable(availableSubjects, fixedSubjects){
    var chosenSubjects = fixedSubjects.slice();
    var chosenSubjectsSet = new Set(chosenSubjects);
    var counter = 0;
    while(chosenSubjectsSet.size != 4){
      chosenSubjectsSet.clear();
      var i = 0;
      var randomSubject;
      for (year in classRef) {
        if (fixedSubjects[i] === '') {
          randomSubject = availableSubjects[year][getRandomNumber(0, availableSubjects[year].length - 1)];
          chosenSubjects[i] = randomSubject;
          
          chosenSubjectsSet.add(randomSubject);
          i++;}
        }

        i = 0;  
        counter++;
      if (counter > 1000) {
        console.log('Não foi possível gerar as matérias')
        return null;
      }
    }

    return chosenSubjects;
  }
        

  function decrementSubjectCount (listOfSubjects, fixedSubjects) {
    if (fixedSubjects[0] == '') subRef1[listOfSubjects[0]] -= 1
    if (fixedSubjects[1] == '') subRef2[listOfSubjects[1]] -= 1
    if (fixedSubjects[2] == '') subRef3[listOfSubjects[2]] -= 1
    if (fixedSubjects[3] == '') subRef4[listOfSubjects[3]] -= 1
  }

  function assignSubjectsToCells(chosenSubjects, cell) {
    classRef['Sexto Ano'][cell] = chosenSubjects[0];
    classRef['Setimo Ano'][cell] = chosenSubjects[1];
    classRef['Oitavo Ano'][cell] = chosenSubjects[2];
    classRef['Nono Ano'][cell] = chosenSubjects[3];
    }
  decrementFixedSubjects();
  for (cell = 0; cell <25; cell++) {
    var fixedSubjects = getFixedSubjects(cell);
    var availableSubjects = getAvailableSubjects(fixedSubjects);
    var chosenSubjects = generateNthCellOfEachTable(availableSubjects, fixedSubjects);
    console.log(chosenSubjects);
    if (chosenSubjects === null){
      return null;}
      else {
    decrementSubjectCount(chosenSubjects, fixedSubjects);
    assignSubjectsToCells(chosenSubjects, cell);}
  }
  return classRef 
}


// Retorna toda a informação necessária para preencher a tabela
function generateTableData() {
  cls_ref = null;
  while (cls_ref == null){
    cls_ref = assignCells();
  }
  console.log(cls_ref);
  return cls_ref;
}


function atribuirCorNaCelula(materia){
  if (materia == 'ART') return 'rgb(234, 186, 107)';
  if (materia == 'MAT') return 'rgb(58, 175, 185)';
  if (materia == 'POR') return 'rgb(239, 188, 213)';
  if (materia == 'HIS') return 'rgb(150, 112, 91)';
  if (materia == 'GEO') return 'rgb(132, 169, 140)';
  if (materia == 'ING') return 'rgb(223, 253, 255)';
  if (materia == 'EDF') return 'rgb(190, 183, 223)';
  if (materia == 'CIE') return 'rgb(120, 192, 145)';



}


function getCelulasComMaterias(celulas) {
  var celulasImportantes = [];
  for (let i = 7; i < 12; i++){
    celulasImportantes.push(celulas[i]);
  }
  for (let i = 13; i < 18; i++){
    celulasImportantes.push(celulas[i]);
  }
  for (let i = 19; i < 24; i++){
    celulasImportantes.push(celulas[i]);
  }
  for (let i = 25; i < 30; i++){
    celulasImportantes.push(celulas[i]);
  }
  for (let i = 31; i < 36; i++){
    celulasImportantes.push(celulas[i]);
  }
  return celulasImportantes;
}

function ondragstart2(event, index) {

  var cellIndex = event.target.cellIndex+index;
  var tableId = event.target.parentNode.parentNode.parentNode.parentNode.id;
  
  event.dataTransfer.setData('cellIndex', cellIndex);
  event.dataTransfer.setData('name', event.target.innerHTML);
  event.dataTransfer.setData('table', tableId);
 


}

function renderizarMensagemNoRetangulo(mensagem, cor) {
  var retangulo = document.getElementById('rect');
  retangulo.innerHTML = mensagem;
  retangulo.style.color = cor;

  setTimeout(function() {
    retangulo.innerHTML = '';
  }, 4000);

}

function onCellDrop2(event) {
  event.preventDefault();
  var materiaAlvo = event.target.innerHTML;
  var materiaAlvoIndex = event.target.cellIndex;
  var materiaAlvoTable = event.target.parentNode.parentNode.parentNode.parentNode.id;
  var materiaAlvoRow = event.target.parentNode.rowIndex;

  var materiaArrastada = event.dataTransfer.getData('name');
  var materiaArrastadaIndex = event.dataTransfer.getData('cellIndex');


  var cellTable1 = getCelulasComMaterias(document.getElementById('sexto-ano').getElementsByTagName('td'));  
  var cellTable2 = getCelulasComMaterias(document.getElementById('setimo-ano').getElementsByTagName('td'));
  var cellTable3 = getCelulasComMaterias(document.getElementById('oitavo-ano').getElementsByTagName('td'));
  var cellTable4 = getCelulasComMaterias(document.getElementById('nono-ano').getElementsByTagName('td'));

  var cellTable = [cellTable1, cellTable2, cellTable3, cellTable4];

    if (materiaAlvoTable == 'sexto-ano') {
    cellTable.splice(cellTable.indexOf(cellTable1), 1);
  }
  if (materiaAlvoTable == 'setimo-ano') {
    cellTable.splice(cellTable.indexOf(cellTable2), 1);
  }
  if (materiaAlvoTable == 'oitavo-ano') {
    cellTable.splice(cellTable.indexOf(cellTable3), 1);
  }
  if (materiaAlvoTable == 'nono-ano') {
    cellTable.splice(cellTable.indexOf(cellTable4), 1);
  }
  
materiaAlvoIndex = materiaAlvoIndex + (materiaAlvoRow-1)*5;
 if (materiaArrastada != cellTable[0][materiaAlvoIndex-1].innerHTML && materiaArrastada != cellTable[1][materiaAlvoIndex-1].innerHTML 
  && materiaArrastada != cellTable[2][materiaAlvoIndex-1].innerHTML && materiaAlvo != cellTable[0][materiaArrastadaIndex-1].innerHTML 
  && materiaAlvo != cellTable[1][materiaArrastadaIndex-1].innerHTML && materiaAlvo != cellTable[2][materiaArrastadaIndex-1].innerHTML){
    
    
    renderizarMensagemNoRetangulo('TROCA DE MATERIA REALIZADA!', 'green');
    celulasEscolhidas = getCelulasComMaterias(document.getElementById(materiaAlvoTable).getElementsByTagName('td'));
    
    event.target.innerHTML = materiaArrastada;
    celulasEscolhidas[materiaArrastadaIndex-1].innerHTML = materiaAlvo;

    // cor da celula
    event.target.style.backgroundColor = atribuirCorNaCelula(materiaArrastada);
    celulasEscolhidas[materiaArrastadaIndex-1].style.backgroundColor = atribuirCorNaCelula(materiaAlvo);

    event.dataTransfer.setData('name', event.target.innerHTML);
    
  
 } else {
  renderizarMensagemNoRetangulo('CHOQUE DE HORÁRIOS!', 'red')


 }


      



}


  

function atribuirCelulasNaTabela() {
  clearTable();
  var dict = generateTableData();


  var cellTable1 = document.getElementById('sexto-ano').getElementsByTagName('td');
  var cellTable2 = document.getElementById('setimo-ano').getElementsByTagName('td');
  var cellTable3 = document.getElementById('oitavo-ano').getElementsByTagName('td');
  var cellTable4 = document.getElementById('nono-ano').getElementsByTagName('td');

  var todasCelulas = [cellTable1, cellTable2, cellTable3, cellTable4];
  var year = ['Sexto Ano', 'Setimo Ano', 'Oitavo Ano', 'Nono Ano']

for (var j =0; j <4; j++){
  for (var i = 7; i < 12; i++){
    todasCelulas[j][i].innerHTML = dict[year[j]][i-7]
    todasCelulas[j][i].setAttribute("draggable", "true")
    todasCelulas[j][i].setAttribute("ondrop", "onCellDrop2(event)");
    todasCelulas[j][i].setAttribute("ondragstart", "ondragstart2(event, 0)");
    todasCelulas[j][i].style.backgroundColor = atribuirCorNaCelula(dict[year[j]][i-7])
  }
  for (var i = 13; i < 18; i++){
    todasCelulas[j][i].innerHTML = dict[year[j]][i-8]
    todasCelulas[j][i].setAttribute("draggable", "true")
    todasCelulas[j][i].setAttribute("ondrop", "onCellDrop2(event)");
    todasCelulas[j][i].setAttribute("ondragstart", "ondragstart2(event, 5)");
    todasCelulas[j][i].style.backgroundColor = atribuirCorNaCelula(dict[year[j]][i-8])
  }
  for (var i = 19; i < 24; i++){
    todasCelulas[j][i].innerHTML = dict[year[j]][i-9]
    todasCelulas[j][i].setAttribute("draggable", "true")
    todasCelulas[j][i].setAttribute("ondrop", "onCellDrop2(event)");
    todasCelulas[j][i].setAttribute("ondragstart", "ondragstart2(event, 10)");
    todasCelulas[j][i].style.backgroundColor = atribuirCorNaCelula(dict[year[j]][i-9])
  }
  for (var i = 25; i < 30; i++){
    todasCelulas[j][i].innerHTML = dict[year[j]][i-10]
    todasCelulas[j][i].setAttribute("draggable", "true")
    todasCelulas[j][i].setAttribute("ondrop", "onCellDrop2(event)");
    todasCelulas[j][i].setAttribute("ondragstart", "ondragstart2(event, 15)");
    todasCelulas[j][i].style.backgroundColor = atribuirCorNaCelula(dict[year[j]][i-10])
  }
  for (var i = 31; i < 36; i++){
    todasCelulas[j][i].innerHTML = dict[year[j]][i-11]  
    todasCelulas[j][i].setAttribute("draggable", "true");
    todasCelulas[j][i].setAttribute("ondrop", "onCellDrop2(event)");
    todasCelulas[j][i].setAttribute("ondragstart", "ondragstart2(event, 20)");
    todasCelulas[j][i].style.backgroundColor = atribuirCorNaCelula(dict[year[j]][i-11])
  }
}}


function clearTable() {
  var cellTable1 = getCelulasComMaterias(document.getElementById('sexto-ano').getElementsByTagName('td'));
  var cellTable2 = getCelulasComMaterias(document.getElementById('setimo-ano').getElementsByTagName('td'));
  var cellTable3 = getCelulasComMaterias(document.getElementById('oitavo-ano').getElementsByTagName('td'));
  var cellTable4 = getCelulasComMaterias(document.getElementById('nono-ano').getElementsByTagName('td'));


  var todasCelulas = [cellTable1, cellTable2, cellTable3, cellTable4];

  for (var i = 0; i < todasCelulas.length; i++) {
    for (var j = 0; j < todasCelulas[i].length; j++) {
      todasCelulas[i][j].innerHTML = '';
      todasCelulas[i][j].style.backgroundColor = 'white';
    }
  }
}

