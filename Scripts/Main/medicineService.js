
const urlMedicine = "http://localhost:5223/api/pharmacy/Medicine"
document.addEventListener('DOMContentLoaded', function () {
    const medicineForm = document.getElementById('medicineForm');
    const medicineTable = document.getElementById('medicineTable').getElementsByTagName('tbody')[0];
    const createButton = document.getElementById('createButton');
    const updateButton = document.getElementById('updateButton');
    const deleteButton = document.getElementById('deleteButton');
    
//get
async function getDataMedicine(){
        const response = await fetch(urlMedicine);
        const result = await response.json();
        console.log(result);

}
async function fetchMedicines() {
    try {
        const response = await fetch(`${urlMedicine}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const medicines = await response.json();
            console.log(medicines);
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

        }
    });

});