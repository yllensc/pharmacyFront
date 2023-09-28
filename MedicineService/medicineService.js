
let medicineGlobal = [];

document.addEventListener('DOMContentLoaded', function () {
    const medicineForm = document.getElementById('medicineForm');
    const tableMedicines = document.querySelector('.body-tableMedicines');
    const createButton = document.getElementById('createButton');
    const updateButton = document.getElementById('updateButton');
    const deleteButton = document.getElementById('deleteButton');

//get
const urlMedicine = "http://localhost:5223/api/pharmacy/Medicine";
const urlProvider = "http://localhost:5223/api/pharmacy/Provider";
async function fetchMedicines() {
    try {
        const response = await fetch(`${urlMedicine}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            medicineGlobal = await response.json();
            console.log(medicineGlobal);
            showMedicines(medicineGlobal);
        } else {
            console.error('Error al obtener la lista de medicamentos:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error al realizar la solicitud GET:', error);
        return [];
    }
}

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
        console.log(createdMedicine);
    } else {
        console.error('Error al crear el medicamento:', response);
        return null;
    }
}

//funcion que debería ir en el inicio(?)
fetchMedicines();
    //eventos
    function showMedicines(medicines) {
        medicines.forEach((medicine) => {
          let rowHTML = `
                <tr>
                  <th scope="row">${medicine.id}</th>
                  <td class="namemedicine" data-medicine-id=${medicine.id}>${medicine.name}</td>
                  <td class="pricemedicine" data-medicine-price=${medicine.id}>${medicine.price}</td>
                  <td class="stockmedicine" data-medicine-stock=${medicine.id}>${medicine.stock}</td>
                  <td class="providermedicine" data-medicine-provider=${medicine.id}>${medicine.providerId}</td>
                  <td><button class="editButtonmedicine" data-id-edit="${medicine.id}">Editar</button></td>
                  <td><button class="delButtonmedicine" data-id-del="${medicine.id}">Eliminar</button></td>
                </tr>`;
                tableMedicines.insertAdjacentHTML("afterbegin", rowHTML);
        });
    }

    function fillSelectWithMedicines(providers) {
        const selectProvider = document.getElementById("providerId");
        providers.forEach((provider) => {
            const option = document.createElement("option");
            option.value = provider.id; 
            option.textContent = provider.name; 
            selectProvider.appendChild(option);
        });
    }

    fillSelectWithMedicines(providersGlobal);
    
    medicineForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);
        const providerId = parseInt(document.getElementById('providerId').value);
        
        if (name && !isNaN(price) && !isNaN(stock) && !isNaN(providerId)) {
            const medicine = {
                name,
                price,
                stock,
                providerId
            };
            await createMedicine(medicine);
            fetchMedicines();

        }
    });

    const editMedicineBtn = document.querySelectorAll(".editButtonmedicine");
    editMedicineBtn.forEach((medicineBtn) => {
    medicineBtn.addEventListener("click", function (event) {
      const row = medicineBtn.closest("tr");
      const nameCell = row.querySelector(".namemedicine");
      const idMedicine = nameCell.getAttribute("data-medicine-id");
      event.preventDefault();
        const name = nameCell;
        const price = parseFloat(document.getElementById('priceEdit').value);
        const stock = parseInt(document.getElementById('stockEdit').value);
        const providerId = parseInt(document.getElementById('providerIdEdit').value);
        if (name && !isNaN(price) && !isNaN(stock) && !isNaN(providerId)) {
            const medicine = {
                name,
                price,
                stock,
                providerId
            };
        }

    });
  });
  
  const delmedicineBtns = document.querySelectorAll(".delButtonRoute");
  delmedicineBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", function() {
      debugger
      const routeId = this.getAttribute("data-id-del");
      deleteData(routeId, "routes");
    });
  });
});
