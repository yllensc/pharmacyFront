const urlUsers = "http://localhost:5223/api/pharmacy";
async function fetchUsers() {
  try {
    const response = await fetch(`${urlUsers}/User`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error(
        "Error al obtener la lista de usuarios:",
        response.statusText
      );
      return [];
    }
  } catch (error) {
    console.error("Error al realizar la solicitud GET:", error);
    return [];
  }
}
fetchUsers();

async function fetchEmployees() {
  try {
    const response = await fetch(`${urlUsers}/Employee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error(
        "Error al obtener la lista de empleados:",
        response.statusText
      );
      return [];
    }
  } catch (error) {
    console.error("Error al realizar la solicitud GET:", error);
    return [];
  }
}

async function fetchRoles() {
  try {
    const response = await fetch(`${urlUsers}/User/Roles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error(
        "Error al obtener la lista de empleados:",
        response.statusText
      );
      return [];
    }
  } catch (error) {
    console.error("Error al realizar la solicitud GET:", error);
    return [];
  }
}

//Función para crear un usuario
async function createUser(user) {
  const response = await fetch(`${urlUsers}/User/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const createdUser = await response.text();
    return createdUser;
  } else {
    console.error("Error al crear el usuario:", response);
    return null;
  }
}

//Función para asignar role
async function addRole(user) {
  const response = await fetch(`${urlUsers}/User/addrole`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const createdUser = await response.text();
    return createdUser;
  } else {
    console.error("Error al asignar rol:", response);
    return null;
  }
}

// Función para llenar el select de usuarios
function fillSelectWithUsers(users) {
  const selectUser = document.getElementById("userName");
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.userName;
    option.textContent = user.userName;
    selectUser.appendChild(option);
  });
}
// Función para mostrar la lista de usuarios
async function showUsersList() {
  const users = await fetchUsers();
  fillSelectWithUsers(users);
  showUsers(users);
}
showUsersList();
// Función para llenar el select de roles
function fillSelectWithRoles(roles) {
  const selectRol = document.getElementById("userRole");
  roles.forEach((Rol) => {
    const option = document.createElement("option");
    option.value = Rol.name;
    option.textContent = Rol.name;
    selectRol.appendChild(option);
  });
}
// Función para mostrar la lista de roles
async function showRolesList() {
  const Roles = await fetchRoles();
  fillSelectWithRoles(Roles);
}
showRolesList();

const userForm = document.getElementById("UserForm");
document.getElementById("userRole").addEventListener("change", function () {
  const selectedRole = document.getElementById("userRole").value;
  const divAdditional = document.getElementById("additionalFields");
  const nameEmployee = document.getElementById("employeeName");
  if (selectedRole === "Employee") {
    divAdditional.style.display = "block";
    nameEmployee.required = true;
  } else {
    divAdditional.style.display = "none";
    nameEmployee.required = false;
  }
});

// Evento para enviar el formulario de creación
userForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const userName = document.getElementById("nameUser").value;
  const email = document.getElementById("emailUser").value;
  const password = document.getElementById("passwordUser").value;
  const idenNumber = document.getElementById("idenNumber").value;
  const user = {
    email,
    userName,
    idenNumber,
    password,
  };
  await createUser(user);
  userForm.reset();
});
const RolForm = document.getElementById("RolForm");
// Evento para enviar el formulario de rol
RolForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const userName = document.getElementById("userName").value;
  const Role = document.getElementById("userRole").value;
  const Name = document.getElementById("employeeName").value;
  const position = "seller";
  const user = {
    userName,
    Role,
    Name,
    position,
  };
  await addRole(user);
  RolForm.reset();
});
const tableUsers = document.querySelector(".body-tableEmployees");
function showUsers(users) {
  tableUsers.innerHTML = "";
  users.forEach((user) => {
    let rowHTML = `
                    <tr>
                      <th scope="row">${user.id}</th>
                      <td class="nameuser" data-user-id=${user.id}>${user.userName}</td>
                      <td class="roluser" data-user-rol=${user.id}>${user.rolName}</td>
                    </tr>`;
    tableUsers.insertAdjacentHTML("afterbegin", rowHTML);
  });
}
