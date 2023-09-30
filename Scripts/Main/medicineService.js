import { fetchProviders, fetchMedicines, urlMedicine } from '../Main/UtilService/utilCRUDfetch.js';

document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const medicineForm = document.getElementById('medicineForm');
    const tableMedicines = document.querySelector('.body-tableMedicines');
    const medicineFormEdit = document.getElementById('medicineFormEdit');
    const selectProvider = document.getElementById("providerId");
    // Función para crear un medicamento
    async function createMedicine(medicine) {
        const response = await fetch(`${urlMedicine}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicine),
        });
    
        if (response.ok) {
            const createdMedicine = await response.text();
            return createdMedicine;
        } else {
            console.error('Error al crear el medicamento:', response);
            return null;
        }
    }
    // Función para actualizar un medicamento
    async function updateMedicine(medicine) {
        const response = await fetch(`${urlMedicine}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicine),
        });
    
        if (response.ok) {
            const updateMedicine = await response.text();
            return updateMedicine;
        } else {
            console.error('Error al editar el medicamento:', response);
            return null;
        }
    }
    // Función para eliminar un medicamento
    async function deleteMedicine(medicineId) {
        const response = await fetch(`${urlMedicine}/${medicineId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicineId),
        });
    
        if (response.ok) {
            const deleteMedicine = await response.text();
            return deleteMedicine;
        } else {
            console.error('Error al eliminar el medicamento:', response);
            return null;
        }
    }
    // Función para mostrar la lista de medicamentos
    async function showMedicinesList() {
        const medicines = await fetchMedicines();
        showMedicines(medicines);
    }
    // Función para mostrar los medicamentos en la tabla
    function showMedicines(medicines) {
        tableMedicines.innerHTML = "";
        medicines.forEach((medicine) => {
            let rowHTML = `
                <tr>
                    <th scope="row">${medicine.id}</th>
                    <td class="namemedicine" data-medicine-id=${medicine.id}>${medicine.name}</td>
                    <td class="pricemedicine" data-medicine-price=${medicine.id}>${medicine.price}</td>
                    <td class="stockmedicine" data-medicine-stock=${medicine.id}>${medicine.stock}</td>
                    <td class="providermedicine" data-medicine-provider=${medicine.id}>${medicine.providerId}</td>
                    <td><button class="editButtonmedicine" data-bs-toggle="modal" data-bs-target="#editMedicineModal" data-id-edit="${medicine.id}">Editar</button></td>
                    <td><button class="delButtonmedicine" data-id-del="${medicine.id}">Eliminar</button></td>
                </tr>`;
            tableMedicines.insertAdjacentHTML("afterbegin", rowHTML);
        });
    }
    // Función para llenar el select de proveedores
    function fillSelectWithMedicines(providers, selectProvider) {
        providers.forEach((provider) => {
            const option = document.createElement("option");
            option.value = provider.id;
            option.textContent = provider.name;
            selectProvider.appendChild(option);
        });
    }
    // Función para mostrar la lista de proveedores
    async function showProvidersList(selectElement) {
        const providers = await fetchProviders();
        fillSelectWithMedicines(providers, selectElement);
    }
    // Evento para enviar el formulario de creación de medicamento
    medicineForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;
        const providerId = document.getElementById('providerId').value;
        const medicine = {
            name,
            price,
            stock,
            providerId,
        };
        await createMedicine(medicine);
        medicineForm.reset();
        await showMedicinesList();
    });
    // Evento para abrir el modal de edición
    tableMedicines.addEventListener("click", async function (event) {
        if (event.target.classList.contains("editButtonmedicine")) {
            const row = event.target.closest("tr");
            const name = row.querySelector(".namemedicine").textContent;
            const price = row.querySelector(".pricemedicine").textContent;
            const stock = row.querySelector(".stockmedicine").textContent;
            const medicineIdUpdate = row.querySelector(".delButtonmedicine").getAttribute("data-id-del");
            // Rellenar los campos del modal con los datos
            document.getElementById('nameEdit').value = name;
            document.getElementById('priceEdit').value = price;
            document.getElementById('stockEdit').value = stock;
            document.getElementById('medicineFormEdit').setAttribute('data-medicine-id', medicineIdUpdate);
        }
        else if (event.target.classList.contains("delButtonmedicine")) {
            const row = event.target.closest("tr");
            const medicineId = row.querySelector(".delButtonmedicine").getAttribute("data-id-del");
            await deleteMedicine(medicineId);
            row.remove();
        }
    });
    // Evento para enviar el formulario de edición de medicamento
    medicineFormEdit.addEventListener('submit', async function (event) {
        event.preventDefault();
        const medicineId = medicineFormEdit.getAttribute('data-medicine-id');
        const price = parseFloat(document.getElementById('priceEdit').value);
        const stock = parseInt(document.getElementById('stockEdit').value);
        const editedMedicine = {
            id: medicineId,
            price,
            stock,
        };
        const success = await updateMedicine(editedMedicine);

        if (success) {
            medicineFormEdit.reset();
        } else {
            console.error('Error al actualizar el medicamento.');
        }
    });

    // Inicializar la lista de medicamentos al cargar la página
    showMedicinesList();
    // Inicializar la lista de proveedores al cargar la página
    showProvidersList(selectProvider);
});
