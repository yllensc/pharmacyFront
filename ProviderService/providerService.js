let providersGlobal = [];


document.addEventListener('DOMContentLoaded', function () {
    const medicineForm = document.getElementById('medicineForm');
    const tableProviders = document.querySelector('.body-tableProviders');
    console.log(tableProviders);
    const urlProvider = "http://localhost:5223/api/pharmacy/Provider";
    async function fetchProviders() {
        try {
            const response = await fetch(`${urlProvider}/getProviders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const prueba = await response.json();
                providersGlobal = prueba;
                console.log(providersGlobal);
                showProviders(providersGlobal);
            } else {
                console.error('Error al obtener la lista de proveedores:', response.statusText);
                return [];
            }
        } catch (error) {
            console.error('Error al realizar la solicitud GET:', error);
            return [];
        }
    }
    async function createProvider(Provider) {
        const response = await fetch(`${urlProvider}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Provider),
        });
    
        if (response.ok) {
            const createdProvider = await response.text();
            console.log(createdProvider);
        } else {
            console.error('Error al crear el medicamento:', response);
            return null;
        }
    }

//funcion que debería ir en el inicio(?)
//funcion que debería ir en el inicio(?)
fetchProviders();
    //eventos
    function showProviders(Providers) {
        Providers.forEach((provider) => {
          let rowHTML = `
                <tr>
                  <th scope="row">${provider.id}</th>
                  <td class="nameprovider" data-provider-id=${provider.id}>${provider.name}</td>
                  <td class="idenNumberprovider" data-provider-idenNumber=${provider.id}>${provider.idenNumber}</td>
                  <td class="emailprovider" data-provider-email=${provider.id}>${provider.email}</td>
                  <td class="addressprovider" data-provider-address=${provider.id}>${provider.address}</td>
                  <td><button class="editButtonprovider" data-id-edit="${provider.id}">Editar</button></td>
                  <td><button class="delButtonprovider" data-id-del="${provider.id}">Eliminar</button></td>
                </tr>`;
                tableProviders.insertAdjacentHTML("afterbegin", rowHTML);
        });
    }


        function fillSelectWithMedicines(providers) {
            const selectProvider = document.getElementById("providerId");
        
            // Recorre la lista de medicamentos y crea opciones para el select
            providers.forEach((provider) => {
                const option = document.createElement("option");
                option.value = provider.id; 
                option.textContent = provider.name; 
                selectProvider.appendChild(option);
            });
        }

    //ProviderForm.addEventListener('submit', async function (event) {
    //    event.preventDefault();
    //    const name = document.getElementById('name').value;
    //    const price = parseFloat(document.getElementById('price').value);
    //    const stock = parseInt(document.getElementById('stock').value);
    //    const providerId = parseInt(document.getElementById('providerId').value);
    //    
    //    if (name && !isNaN(price) && !isNaN(stock) && !isNaN(providerId)) {
    //        const Provider = {
    //            name,
    //            price,
    //            stock,
    //            providerId
    //        };
    //        await createProvider(Provider);
    //        fetchProviders();
//
    //    }
    //});
});

