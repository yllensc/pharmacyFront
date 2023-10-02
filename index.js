import { end10, end8, end14, end9, getSales } from "./Scripts/routes.js";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  loadSelects();
  loadFirstData();
  loadSecondData();
  loadThirdData(9);
  loadFourthData();
  loadTable();
});

async function loadFirstData() {
  const firtsData = document.querySelector("#firts-data");

  try {
    const response = await fetch(end10, options);

    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }

    const result = await response.json();
    firtsData.innerHTML = `
    <div class="text-end pb-2">
    <span class="badge bg-success rounded-3 fw-semibold">Most Value</span>
      </div>
        <div class="head">
          <div>
            <h2 class="fs-1">$${result[0].price}</h2>
            <p class="fs-3">${result[0].name}</p>
          </div>
        </div>
        <span class="label fs-4"><i class="bx bx-trending-up icon"></i> Stock: ${result[0].stock}</span>
        <span class="label fs-5">Provider: ${result[0].providerName}</span>`;
  } catch (error) {
    console.error(error);
  }
}

async function loadSecondData() {
  const secondData = document.querySelector("#second-data");

  try {
    const response = await fetch(end8, options);

    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }

    const result = await response.json();
    secondData.innerHTML = `
    <div class="text-end pb-2">
    <span class="badge bg-success rounded-3 fw-semibold">Earned in Sales</span>
      </div>
        <div class="head">
          <div>
            <h2 class="fs-1">$${result.totalSales.toFixed(2)}</h2>
            <p class="fs-3">This is our profit until today</p>
          </div>
        </div>`;
  } catch (error) {
    console.error(error);
  }
}

async function loadThirdData(value) {
  try {
    const response = await fetch(end14 + `?month=${value}`, options);

    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }

    const result = await response.json();
    document.querySelector(
      "#label1"
    ).textContent = `This month ${result.length} medications have been sold`;
  } catch (error) {
    console.error(error);
  }
}

async function loadFourthData() {
  const fourthData = document.querySelector("#fourth-data");

  try {
    const response = await fetch(end9, options);

    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }

    const result = await response.json();
    fourthData.innerHTML = `
      <div class="text-end pb-2">
      <span class="badge bg-danger rounded-3 fw-semibold">Unsold Medicine</span>
      </div>
        <div class="head">
          <div>
            <h2 class="fs-1">$${result[0].price}</h2>
            <p class="fs-2">${result[0].name}</p>
          </div>
        </div>
        <span class="label fs-3"><i class="bx bx-trending-down icon"></i> Stock: ${result[0].stock}</span>`;
  } catch (error) {
    console.error(error);
  }
}

async function loadTable() {
  const tableSalesBody = document.querySelector("#tableSalesBody");
  try {
    const response = await fetch(getSales, options);

    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    const columns = [
      "saleId",
      "employeeName",
      "patientName",
      "medicineName",
      "quantity",
      "prescription"
    ];
    result.forEach((rowData) => {
      const row = document.createElement("tr");
      columns.forEach((column) => {
        const cell = document.createElement("td");
        cell.textContent = rowData[column];
        if (rowData[column] === true) {
          cell.innerHTML = `<span class="badge bg-success rounded-3 fw-semibold">YES</span>`;
        } else if (rowData[column] === false) {
          cell.innerHTML = `<span class="badge bg-info rounded-3 fw-semibold">NO</span>`;
        }
        row.appendChild(cell);
      });
      tableSalesBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

function loadSelects() {
  const months = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    Jule: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };
  const monthSelect = document.getElementById("monthSelect");
  monthSelect.addEventListener("change", function () {
    loadThirdData(monthSelect.value);
    console.log(monthSelect.value);
  });

  for (const monthName in months) {
    const option = document.createElement("option");
    option.value = months[monthName];
    option.textContent = monthName;
    monthSelect.appendChild(option);
  }
}

//verificación de roles para la vista en el index
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === "Roles") {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Obtén el rol almacenado en las cookies
const userRoles = getCookie("Roles");
const employeeLink = document.querySelector('a[href="./Modules/Main/employee.html"]');
if (userRoles && userRoles.includes("Employee")) {
  employeeLink.style.display = "none";
}


// Datos para el gráfico (puedes personalizar estos datos según tus necesidades)
// const options = {
//     chart: {
//         type: 'bar', // Tipo de gráfico (por ejemplo, 'line', 'bar', 'pie', etc.)
//     },
//     series: [{
//         name: 'Ventas',
//         data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
//     }],
//     xaxis: {
//         categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
//     },
// };

// // Crear una instancia de ApexCharts y renderizar el gráfico en el contenedor
// const chart = new ApexCharts(document.querySelector('#chart'), options);
// chart.render();


