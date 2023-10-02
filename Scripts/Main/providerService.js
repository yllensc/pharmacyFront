import { fetchProviders, urlProvider } from '../Main/UtilService/utilCRUDfetch.js';
import { handleUnauthorizedResponse, getTokenFromCookies } from "./UtilService/AuthenticationToken.js"


document.addEventListener('DOMContentLoaded', function () {
    handleUnauthorizedResponse();
    const providerForm = document.getElementById('providerForm');
    const providerFormEdit = document.getElementById('providerFormEdit');
    const tableProviders = document.querySelector('.body-tableProviders');
    
    //Función para crear un proveedor
    async function createProvider(Provider) {
        const response = await fetch(`${urlProvider}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getTokenFromCookies()}`,
            },
            body: JSON.stringify(Provider),
        });
    
        if (response.ok) {
            const createdProvider = await response.text();
            return createdProvider;
        } else {
            console.error('Error al crear el proveedor:', response);
            alert(`Error al crear el proveedor - Error: ${response.status}: ${response.statusText}`);

            return null;
        }
    }
// Función para actualizar un proveedor
async function updateProvider(provider) {
    const response = await fetch(`${urlProvider}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokenFromCookies()}`,
        },
        body: JSON.stringify(provider),
    });

    if (response.ok) {
        const updateProvider = await response.text();
        return updateProvider;
    } else {
        console.error('Error al editar el proveedor:', response);
        alert(`Error al editar el proveedor - Error: ${response.status}: ${response.statusText}`);
        return null;
    }
}
// Función para eliminar un proveedor
async function deleteProvider(providerId) {
    const response = await fetch(`${urlProvider}/${providerId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokenFromCookies()}`,
        },
        body: JSON.stringify(providerId),
    });

    if (response.ok) {
        const deleteProvider = await response.text();
        return deleteProvider;
    } else {
        console.error('Error al eliminar el proveedor:', response);
        alert(`Error al eliminar el proveedor - Error: ${response.status}: ${response.statusText}`);
        return null;
    }
}
// Función para mostrar la lista de proveedores
async function showProvidersList() {
    const providers = await fetchProviders();
    showProviders(providers);
}

    // Función para mostrar los proveedores en la tabla
    function showProviders(Providers) {
        tableProviders.innerHTML = "";
        Providers.forEach((provider) => {
          let rowHTML = `
                <tr>
                  <th scope="row">${provider.id}</th>
                  <td class="nameprovider" data-provider-id=${provider.id}>${provider.name}</td>
                  <td class="idenNumberprovider" data-provider-idenNumber=${provider.id}>${provider.idenNumber}</td>
                  <td class="emailprovider" data-provider-email=${provider.id}>${provider.email}</td>
                  <td class="addressprovider" data-provider-address=${provider.id}>${provider.address}</td>
                  <td><button class="editButtonprovider" data-bs-toggle="modal" data-bs-target="#editProviderModal" data-id-edit="${provider.id}">Editar</button></td>
                  <td><button class="delButtonprovider" data-id-del="${provider.id}">Eliminar</button></td>
                </tr>`;
                tableProviders.insertAdjacentHTML("afterbegin", rowHTML);
        });
    }

     // Evento para enviar el formulario de creación
     providerForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const idenNumber = document.getElementById('idenNumber').value;
        const name = document.getElementById('nameProvider').value;
        const email = document.getElementById('emailProvider').value;
        const address = document.getElementById('addressProvider').value;
        const provider = {
            idenNumber,
            name,
            email,
            address
        };
        await createProvider(provider);
        providerForm.reset();
        await showProvidersList();
    });
    // Evento para abrir el modal de edición
    tableProviders.addEventListener("click", async function (event) {
        if (event.target.classList.contains("editButtonprovider")) {
            const row = event.target.closest("tr");
            const name = row.querySelector(".nameprovider").textContent;
            const emailProvider = row.querySelector(".emailprovider").textContent;
            const address = row.querySelector(".addressprovider").textContent;
            const providerIdUpdate = row.querySelector(".delButtonprovider").getAttribute("data-id-del");
            // Rellenar los campos del modal con los datos
            document.getElementById('nameProviderEdit').value = name;
            document.getElementById('emailProviderEdit').value = emailProvider;
            document.getElementById('addressProviderEdit').value = address;
            document.getElementById('providerFormEdit').setAttribute('data-provider-id', providerIdUpdate);
        }
        else if (event.target.classList.contains("delButtonprovider")) {
            const row = event.target.closest("tr");
            const providerId = row.querySelector(".delButtonprovider").getAttribute("data-id-del");
            await deleteProvider(providerId);
            row.remove();
        }
    });
    // Evento para enviar el formulario de edición
    providerFormEdit.addEventListener('submit', async function (event) {
        event.preventDefault();
        const providerId = providerFormEdit.getAttribute('data-provider-id');
        const name = document.getElementById('nameProviderEdit').value;
        const email = document.getElementById('emailProviderEdit').value;
        const address = document.getElementById('addressProviderEdit').value;
        const editedProvider = {
            id: providerId,
            name,
            email,
            address
        };
        console.log(editedProvider);
        const success = await updateProvider(editedProvider);

        if (success) {
            providerFormEdit.reset();
        } else {
            console.error('Error al actualizar el proveedor.');
        }
    });

    // Inicializar la lista de proveedores al cargar la página
    showProvidersList();

});

