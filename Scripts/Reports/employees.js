/*
37.Empleados que no realizaron ventas en abril de 2023 (Con el id de empleado se busca si ha hecho ventas)
18.Cantidad de ventas realizadas por cada empleado en 2023
*/
import {
  getEmployees,
  end18,
  end20,
  end23,
  end27,
  end32,
  end37,
} from "../../Scripts/routes.js";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const $inputYear = document.getElementById("year");
const $dateEmployee = document.getElementById("employeeName");

const $allSales = document.getElementById("allSales");
const $allTableEnd20 = document.getElementById("table20");
const $tableEnd20 = document.getElementById("infoEndpoint20");
const $inputSale = document.getElementById("sales");

const $allTableEnd23 = document.getElementById("table23");
const $tableEnd23 = document.getElementById("infoEndpoint23");
const $yearSale = document.getElementById("yearSale");

const $allTableEnd27 = document.getElementById("table27");
const $tableEnd27 = document.getElementById("infoEndpoint27");
const $yearSale27 = document.getElementById("yearSale27");
const $inputSale27 = document.getElementById("inputSale27");

const $allTableEnd37 = document.getElementById("table37");
const $tableEnd37 = document.getElementById("infoEndpoint37");
const $yearSale37 = document.getElementById("yearSale37");
const $monthSelect = document.getElementById("monthSelect");

document.addEventListener("DOMContentLoaded", function () {
  $allTableEnd20.style.display = "none";
  $allTableEnd23.style.display = "none";
  $allTableEnd27.style.display = "none";
  $allTableEnd37.style.display = "none";
});

$inputYear.addEventListener("input", (e) => {
  let select = e.target.value;
  if (select > 0 && select != "") {
    employeeData(select);
  }
});

$inputSale.addEventListener("input", (e) => {
  let select = e.target.value;
  if (select > 0 && select != "") {
    loadSales(select);
  }
  $allTableEnd20.style.display = "none";
});

$yearSale.addEventListener("input", (e) => {
  let select = e.target.value;
  if (select > 0 && select != "") {
    loadSalesPerYear(select);
  }
  $allTableEnd23.style.display = "none";
});

$yearSale27.addEventListener("input", (e) => {
  let select = e.target.value;
  if (select > 0 && select != "") {
    loadAnySalesPerYear($inputSale27.value, select);
  }
  $allTableEnd27.style.display = "none";
});

$inputSale27.addEventListener("input", (e) => {
  let select = e.target.value;
  if (select > 0 && select != "") {
    loadAnySalesPerYear(select, $yearSale27.value);
  }
  $allTableEnd27.style.display = "none";
});

$yearSale37.addEventListener("input", (e) => {
  let select = e.target.value;
  if (select > 0 && select != "") {
    notSales($monthSelect.value, select);
  }
  $allTableEnd37.style.display = "none";
});

$monthSelect.addEventListener("change", (e) => {
  let select = e.target.value;
  if (select > 0 && select != "") {
    notSales(select, $yearSale37.value);
  }
  $allTableEnd37.style.display = "none";
});

async function employeeData(year) {
  try {
    const response = await fetch(end32 + `${year}`, options);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    if (response.status == 200) {
      const result = await response.json();
      $dateEmployee.innerHTML = `Employee ${result.name} sold ${result.cantTypesMedicines} different types of medicines in ${result.cantSales} amount of sales`;
    } else {
      $dateEmployee.innerHTML = "No sales this year";
    }
  } catch (error) {
    console.error(error);
  }
}

/* 20
  {
    "id": 1,
    "name": "Empleado 1"
  },
  {
    "id": 3,
    "name": "Empleado 3"
  }
]
 */

async function loadSales(numSales) {
  try {
    const response = await fetch(end20 + `${numSales}Sales`, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    $tableEnd20.innerHTML = " ";
    console.log(result);
    if (result != "") {
      $allSales.style.display = "none";

      result.forEach((employee) => {
        const { id, name } = employee;

        let html = `<tr>
                                <td>${id}</td>
                                <td>${name}</td>
                            </tr>`;

        $tableEnd20.insertAdjacentHTML("beforeend", html);
      });

      $allTableEnd20.style.display = "inline-table";
    } else {
      $allTableEnd20.style.display = "none";
      $allSales.style.display = "flex";
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadSalesPerYear(year) {
  try {
    const response = await fetch(end23 + `${year}`, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    $tableEnd23.innerHTML = " ";
    console.log(result);
    if (result != "") {
      result.forEach((employee) => {
        const { id, name } = employee;

        let html = `<tr>
                                <td>${id}</td>
                                <td>${name}</td>
                            </tr>`;

        $tableEnd23.insertAdjacentHTML("beforeend", html);
      });

      $allTableEnd23.style.display = "inline-table";
    } else {
      $allTableEnd23.style.display = "none";
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadAnySalesPerYear(numSales, year) {
  try {
    const response = await fetch(end27 + `${numSales}Sales${year}`, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    $tableEnd27.innerHTML = " ";
    console.log(result);
    if (result != "") {
      result.forEach((employee) => {
        const { id, name } = employee;

        let html = `<tr>
                                <td>${id}</td>
                                <td>${name}</td>
                            </tr>`;

        $tableEnd27.insertAdjacentHTML("beforeend", html);
      });

      $allTableEnd27.style.display = "inline-table";
    } else {
      $allTableEnd27.style.display = "none";
    }
  } catch (error) {
    console.error(error);
  }
}

async function notSales(month, year) {
  try {
    const response = await fetch(end37 + `${month}/InYear/${year}`, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    $tableEnd37.innerHTML = " ";
    console.log(result);
    if (result != "") {
      result.forEach((employee) => {
        const { id, name } = employee;

        let html = `<tr>
                                <td>${id}</td>
                                <td>${name}</td>
                            </tr>`;

        $tableEnd37.insertAdjacentHTML("beforeend", html);
      });

      $allTableEnd37.style.display = "inline-table";
    } else {
      $allTableEnd37.style.display = "none";
    }
  } catch (error) {
    console.error(error);
  }
}
