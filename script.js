var selectedRow = null;

// Show Alerts

function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields

function clearFields() {
  document.querySelector("#firstname").value = "";
  document.querySelector("#lastname").value = "";
  document.querySelector("#email").value = "";
}

// Add Data

document.querySelector("#student-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get Values
  const firstName = document.querySelector("#firstname").value;
  const lastName = document.querySelector("#lastname").value;
  const email = document.querySelector("#email").value;

  // Validate
  if (firstName == "" || lastName == "" || email == "") {
    showAlert("Please fill All the Fields", "danger");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#student-list");
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">delete</a>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Stuednt Added", "success");
    }
    else{
        selectedRow.children[0].textContent = firstName;
        selectedRow.children[1].textContent = lastName;
        selectedRow.children[2].textContent = email;
        selectedRow = null;

        showAlert("Student Data Updated", "info")
    }
    clearFields();
  }
});

// Edit Data

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstname").value = selectedRow.children[0].textContent;
        document.querySelector("#lastname").value = selectedRow.children[1].textContent;
        document.querySelector("#email").value = selectedRow.children[2].textContent;
    }
})

// Delete Data

document.querySelector("#student-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Student Data Deleted", "danger");
  }
});
