import { login } from "../Scripts/routes.js";
const index = "../index.html";

console.log(login);

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("form-signin");
  const inputUser = document.getElementById("inputUser");
  const inputPassword = document.getElementById("inputPassword");
  const buttonLogin = document.getElementById("buttonLogin");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));

    var user = {
      userName: data.inputUser,
      Password: data.inputPassword,
    };

    var Dates = JSON.stringify(user);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: Dates,
    };

    fetch(login, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed. State: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (result.isAuthenticated === true) {
          document.cookie = "token=" + encodeURIComponent(result.token);
          document.cookie =
            "refreshToken=" + encodeURIComponent(result.refreshToken);
          document.cookie =
            "isAuthenticated=" + encodeURIComponent(result.isAuthenticated);
          document.cookie = "userName=" + encodeURIComponent(result.userName);
          window.location.assign("../index.html");
        }

        if (
          result.message ===
          `User does not exist with userName ${result.userName}.`
        ) {
          alert("El usuario No Existe");
        }

        if (
          result.message ===
          `Credenciales incorrectas para el usuario ${result.userName}.`
        ) {
          alert("La clave es Incorrecta");
        }

        console.log("Resultado:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
