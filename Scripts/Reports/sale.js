import { end10, end8, end14, end9, getSales } from "../routes.js";
const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };


document.addEventListener("DOMContentLoaded", function () {

    loadTable();
  });
  

async function loadTable() {
    const tableSalesBody = document.querySelector("#tableSalesBody");
    try {
      const response = await fetch(getSales, options);
  
      if (!response.ok) {
        throw new Error(`Failed. State: ${response.status}`);
      }
      const result = await response.json();
      const columns = [
        "medicineId",
        "patientId",
        "employeeId",
        "saleQuantity",
        "prescription",
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
  };