function enterEditMode() {
  const table = document.getElementById("table");
  for (tr of table.children) {
    for (let i = 2; i < tr.children.length; i++) {
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
  document.getElementById("leaveEditModeButton").style.display = "inline-block";
}

async function saveEditMode() {
  const saveRequests = [];
  for (tr of table.children) {
    const id = parseInt(tr.children[1].innerText);
    const body = {
      id: id,
    };
    for (let i = 2; i < tr.children.length; i++) {
      const td = tr.children[i];
      const input = td.children[0];
      const text = input.value;
      const propName = ["name", "stock", "price"][i - 2];
      body[propName] = text;
      input.remove();
      td.innerText = text;
    }
    saveRequests.push(
      fetch("/decoration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    );
  }
  const editModeButton = document.getElementById("editModeButton");
  editModeButton.innerText = "Enter edit mode";
  editModeButton.onclick = enterEditMode;
  await Promise.allSettled(saveRequests);
  document.getElementById("leaveEditModeButton").style.display = "none";
}

async function deleteItem(id) {
  await fetch("/decoration", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  const table = document.getElementById("table");
  for (tr of table.children) {
    if (tr.children[1].innerText == id) tr.remove();
  }
}
