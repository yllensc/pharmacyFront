import { getMedicines, getProviders, postManyPurchases } from "../routes.js";
import { handleUnauthorizedResponse } from "./UtilService/AuthenticationToken.js"

const optionsGet = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

//SELECTORES DOM - Purchase
const $purchaseForm = document.getElementById("purchaseForm");
const $medicinesSelect = document.getElementById("medicine");
const $providerSelect = document.getElementById("provider");
const $total = document.getElementById("total");
const $medicineQuantities = document.getElementById("medicineQuantities");

let selectedMedicine = {};

document.addEventListener("DOMContentLoaded", function () {
  handleUnauthorizedResponse();
  fillProviderSelect();
});
const medicines = await fillMedicineSelect();
var purchaseTotal = 0;

// Funciones

async function fillProviderSelect() {
  try {
    const response = await fetch(getProviders, optionsGet);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    result.forEach((provider) => {
      const option = document.createElement("option");
      option.value = provider.id;
      option.text = provider.name;
      $providerSelect.appendChild(option);
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
    $medicinesSelect.innerHTML = "";
    result.forEach((medicine) => {
      if (medicine.stock > 0 && medicine.providerId == $providerSelect.value) {
        const option = document.createElement("option");
        option.value = medicine.id;
        option.textContent = medicine.name;
        $medicinesSelect.appendChild(option);
      }
    });
    // Adjuntar el evento "change" después de llenar el selector
    updateMedicineQuantities();
    return result;
  } catch (error) {
    console.error(error);
  }
}

$providerSelect.addEventListener("change", () => {
  fillMedicineSelect();
  $total.value = 0;
  selectedMedicine = {};
  updateMedicineQuantities();
});

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
                <input type="number" class="form-control" name="price" min="1" value="${medicine.price}">
                </td>
                <td>
                <input type="date" class="form-control" name="expiration">
                </td>
                <td>
                <button type="button" class="btn btn-danger btn-sm" data-medicine-id="${medicine.id}">Delete</button>
                </td>
                `;

      medicine.price = parseFloat(row.querySelector("[name='price']").value);
      // Agrega el evento para actualizar la quantity cuando cambia
      row
        .querySelector("[name='quantity']")
        .addEventListener("change", (event) => {
          medicine.quantity = parseInt(event.target.value);
          purchaseTotal = calculateTotal();
          $total.value = purchaseTotal.toFixed(2);
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
      purchaseTotal = calculateTotal();
      $total.value = purchaseTotal.toFixed(2);
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
        price: parseFloat(selectedMedicines.price), // Tomar el precio del input
      };
      updateMedicineQuantities();
    }
  }
});

$purchaseForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  var providerId = $providerSelect.value;
  const medicinesList = [];

  for (const medicineId in selectedMedicine) {
    if (selectedMedicine.hasOwnProperty(medicineId)) {
      const medicine = selectedMedicine[medicineId];
      const medicineItem = {
        MedicineId: parseInt(medicineId),
        CantPurchased: medicine.quantity,
        PricePurchase: parseFloat(medicine.price), // Tomar el precio del input
      };
      console.log(medicineItem, medicine, medicine.price);
      medicinesList.push(medicineItem);
    }
  }
  const purchaseData = {
    ProviderId: parseInt(providerId),
    MedicinesList: medicinesList,
  };
  console.log(purchaseData);
  await createPurchase(purchaseData);
});

async function createPurchase(purchase) {
  console.log(JSON.stringify(purchase));
  const response = await fetch(postManyPurchases, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${getTokenFromCookies()}`,
    },
    body: JSON.stringify(purchase),
  });
  if (response.ok) {
    const createdMedicine = await response.text();
    alert(createdMedicine);
    console.log(createdMedicine);
  } else {
    console.error("Error al crear el compra:", response);
    alert(`Error al crear el compra - Error: ${response.status}: ${response.statusText}`);
    return null;
  }
}
