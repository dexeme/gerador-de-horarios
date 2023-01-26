// ======= DRAG AND DROP EVENTS ======= //

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
