function enterEditMode() {
  const table = document.getElementById("table");
  for (tr of table.children) {
    for (let i = 1; i < tr.children.length; i++) {
      const td = tr.children[i];
      const text = td.innerText;
      const input = document.createElement("input");
      input.value = text;
      td.innerHTML = "";
      td.appendChild(input);
    }
  }
  const editModeButton = document.getElementById("editModeButton");
  editModeButton.innerText = "Save & leave edit mode";
  editModeButton.onclick = saveEditMode;
}
function saveEditMode() {
  leaveEditMode();
}

function leaveEditMode() {
  for (tr of table.children) {
    for (let i = 1; i < tr.children.length; i++) {
      const td = tr.children[i];
      const input = td.children[0];
      const text = input.value;
      input.remove();
      td.innerText = text;
    }
  }
  const editModeButton = document.getElementById("editModeButton");
  editModeButton.innerText = "Enter edit mode";
  editModeButton.onclick = enterEditMode;
}
