import { handleUnauthorizedResponse, getTokenFromCookies } from "./UtilService/AuthenticationToken.js"

document.addEventListener('DOMContentLoaded', function () {
    handleUnauthorizedResponse();
    const patientForm = document.getElementById('patientForm');
    const patientFormEdit = document.getElementById('patientFormEdit');
    const tablePatients = document.querySelector('.body-tablePatients');

    const urlPatient = "http://localhost:5223/api/pharmacy/Patient";
    
    async function fetchPatients() {
        try {
            const response = await fetch(`${urlPatient}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getTokenFromCookies()}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data;
                
            } else {
                console.error('Error al obtener la lista de pacientes:', response.statusText);
                return [];
            }
        } catch (error) {
            console.error('Error al realizar la solicitud GET:', error);
            return [];
        }
    }
    //Función para crear un paciente
    async function createPatient(patient) {
        const response = await fetch(`${urlPatient}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getTokenFromCookies()}`,
            },
            body: JSON.stringify(patient),
        });
    
        if (response.ok) {
            const createdPatient = await response.text();
            return createdPatient;
        } else {
            console.error('Error al crear el paciente:', response);
            return null;
        }
    }
// Función para actualizar un paciente
async function updatePatient(patient) {
    const response = await fetch(`${urlPatient}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokenFromCookies()}`,
        },
        body: JSON.stringify(patient),
    });

    if (response.ok) {
        const updatePatient = await response.text();
        return updatePatient;
    } else {
        console.error('Error al editar el paciente:', response);
        return null;
    }
}
// Función para eliminar un paciente
async function deletePatient(patientId) {
    const response = await fetch(`${urlPatient}/${patientId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokenFromCookies()}`,
        },
        body: JSON.stringify(patientId),
    });

    if (response.ok) {
        const deletePatient = await response.text();
        return deletePatient;
    } else {
        console.error('Error al eliminar el paciente:', response);
        return null;
    }
}
// Función para mostrar la lista de pacientees
async function showPatientsList() {
    const patients = await fetchPatients();
    showPatients(patients);
}

    // Función para mostrar los pacientees en la tabla
    function showPatients(patients) {
        tablePatients.innerHTML = "";
        patients.forEach((patient) => {
          let rowHTML = `
                <tr>
                  <th scope="row">${patient.id}</th>
                  <td class="namepatient" data-patient-id=${patient.id}>${patient.name}</td>
                  <td class="idenNumberpatient" data-patient-idenNumber=${patient.id}>${patient.idenNumber}</td>
                  <td class="phoneNumberpatient" data-patient-phoneNumber=${patient.id}>${patient.phoneNumber}</td>
                  <td class="addresspatient" data-patient-address=${patient.id}>${patient.address}</td>
                  <td><button class="editButtonpatient" data-bs-toggle="modal" data-bs-target="#editPatientModal" data-id-edit="${patient.id}">Editar</button></td>
                  <td><button class="delButtonpatient" data-id-del="${patient.id}">Eliminar</button></td>
                </tr>`;
                tablePatients.insertAdjacentHTML("afterbegin", rowHTML);
        });
    }

     // Evento para enviar el formulario de creación
     patientForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const idenNumber = document.getElementById('idenNumber').value;
        const name = document.getElementById('namePatient').value;
        const phoneNumber = document.getElementById('phoneNumberPatient').value;
        const address = document.getElementById('addressPatient').value;
        const patient = {
            idenNumber,
            name,
            phoneNumber,
            address
        };
        await createPatient(patient);
        patientForm.reset();
        await showPatientsList();
    });
    // Evento para abrir el modal de edición
    tablePatients.addEventListener("click", async function (event) {
        if (event.target.classList.contains("editButtonpatient")) {
            const row = event.target.closest("tr");
            const name = row.querySelector(".namepatient").textContent;
            const phoneNumberpatient = row.querySelector(".phoneNumberpatient").textContent;
            const address = row.querySelector(".addresspatient").textContent;
            const patientIdUpdate = row.querySelector(".delButtonpatient").getAttribute("data-id-del");
            // Rellenar los campos del modal con los datos
            document.getElementById('namePatientEdit').value = name;
            document.getElementById('phoneNumberPatientEdit').value = phoneNumberpatient;
            document.getElementById('addressPatientEdit').value = address;
            document.getElementById('patientFormEdit').setAttribute('data-patient-id', patientIdUpdate);
        }
        else if (event.target.classList.contains("delButtonpatient")) {
            const row = event.target.closest("tr");
            const patientId = row.querySelector(".delButtonpatient").getAttribute("data-id-del");
            await deletePatient(patientId);
            row.remove();
        }
    });
    // Evento para enviar el formulario de edición
    patientFormEdit.addEventListener('submit', async function (event) {
        event.preventDefault();
        const patientId = patientFormEdit.getAttribute('data-patient-id');
        const name = document.getElementById('namePatientEdit').value;
        const phoneNumber = document.getElementById('phoneNumberPatientEdit').value;
        const address = document.getElementById('addressPatientEdit').value;
        const editedpatient = {
            id: patientId,
            name,
            phoneNumber,
            address
        };
        console.log(editedpatient);
        const success = await updatePatient(editedpatient);

        if (success) {
            patientFormEdit.reset();
        } else {
            console.error('Error al actualizar el paciente.');
        }
    });

    // Inicializar la lista de pacientes al cargar la página
    showPatientsList();

});

