import {
  getEmployees,
  getMedicines,
  getPatients,
  postManySales,
} from "../../Scripts/routes.js";
const optionsGet = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

//SELECTORES DOM - Sale
const $saleForm = document.getElementById("saleForm");
const $employeesSelect = document.getElementById("employee");
const $medicinesSelect = document.getElementById("medicine");
const $patientsSelect = document.getElementById("patient");
const $total = document.getElementById("total");
const $medicineQuantities = document.getElementById("medicineQuantities");

const selectedMedicine = {};

document.addEventListener("DOMContentLoaded", function () {
  fillEmployeeSelect();
  fillPatientSelect();
  fillMedicineSelect();
});
const medicines = await fillMedicineSelect();
var saleTotal = 0;

// Funciones
async function fillEmployeeSelect() {
  try {
    const response = await fetch(getEmployees, optionsGet);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    result.forEach((employee) => {
      if (employee.positionName === "Seller") {
        const option = document.createElement("option");
        option.value = employee.id;
        option.text = employee.name;
        $employeesSelect.appendChild(option);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function fillPatientSelect() {
  try {
    const response = await fetch(getPatients, optionsGet);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    result.forEach((patient) => {
      const option = document.createElement("option");
      option.value = patient.id;
      option.text = patient.name;
      $patientsSelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

async function fillMedicineSelect() {
  try {
    const response = await fetch(getMedicines, optionsGet);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    result.forEach((medicine) => {
      if (medicine.stock > 0) {
        const option = document.createElement("option");
        option.value = medicine.id;
        option.textContent = medicine.name;
        $medicinesSelect.appendChild(option);
      }
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

function calculateTotal() {
  const selectedMedicines = Object.values(selectedMedicine);
  let total = 0;

  selectedMedicines.forEach((medicine) => {
    total += medicine.price * medicine.quantity;
  });

  return total;
}

function updateMedicineQuantities() {
  $medicineQuantities.innerHTML = "";
  for (const medicineId in selectedMedicine) {
    if (selectedMedicine.hasOwnProperty(medicineId)) {
      const medicine = selectedMedicine[medicineId];

      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${medicine.name}</td>
                <td>
                <input type="number" class="form-control" name="quantity" min="1" value="${medicine.quantity}">
                </td>
                <td>
                <button type="button" class="btn btn-danger btn-sm" data-medicine-id="${medicine.id}">Delete</button>
                </td>
                `;

      // Agrega el evento para actualizar la quantity cuando cambia
      row
        .querySelector("[name='quantity']")
        .addEventListener("change", (event) => {
          medicine.quantity = parseInt(event.target.value);
          saleTotal = calculateTotal();
          $total.value = saleTotal.toFixed(2);
        });

      // Agrega el evento para eliminar el medicine
      row.querySelector("button").addEventListener("click", (event) => {
        const medicineId = parseInt(
          event.target.getAttribute("data-medicine-id")
        );
        delete selectedMedicine[medicineId];
        updateMedicineQuantities();
      });

      $medicineQuantities.appendChild(row);
      saleTotal = calculateTotal();
      $total.value = saleTotal.toFixed(2);
    }
  }
}

$medicinesSelect.addEventListener("change", () => {
  const medicineId = parseInt($medicinesSelect.value);
  if (medicineId && !selectedMedicine[medicineId]) {
    const selectedMedicines = medicines.find(
      (medicine) => medicine.id === medicineId
    );

    if (selectedMedicines) {
      selectedMedicine[medicineId] = {
        id: medicineId,
        name: selectedMedicines.name,
        quantity: 1,
        price: selectedMedicines.price,
      };
      medicinePrice.textContent = `Price: $${selectedMedicines.price.toFixed(
        2
      )}`;
      updateMedicineQuantities();
    }
  }
});

$saleForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  var patientId = $patientsSelect.value;
  var employeeId = $employeesSelect.value;
  const medicinesList = [];

  for (const medicineId in selectedMedicine) {
    if (selectedMedicine.hasOwnProperty(medicineId)) {
      const medicine = selectedMedicine[medicineId];
      const medicineItem = {
        MedicineId: parseInt(medicineId),
        SaleQuantity: medicine.quantity,
        Price: medicine.price,
      };
      medicinesList.push(medicineItem);
    }
  }
  const saleData = {
    PatientId: parseInt(patientId),
    EmployeeId: parseInt(employeeId),
    Prescription: true,
    DatePrescription: "2023-02-02",
    MedicinesList: medicinesList,
  };
  console.log(saleData);
  await createSale(saleData);
});

async function createSale(sale) {
  console.log(JSON.stringify(sale));
  const response = await fetch(postManySales, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sale),
  });
  if (response.ok) {
    const createdMedicine = await response.text();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text:createdMedicine,
    })
    console.log(createdMedicine);
  } else {
    console.error("Error al crear el medicamento:", response);
    return null;
  }
}
