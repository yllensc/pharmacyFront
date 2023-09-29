import {end28,end35,end16,end24,end13,getProviders,end3 } from "../../Scripts/routes.js";

import {getMedicines,end5} from "../../Scripts/routes.js";
const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
}; 
//SELECTORES DOM
const $tableModal = document.getElementById('tableModal');
const $titleModal = document.getElementById('exampleModalLabel');
const $contEnd28 = document.getElementById('totalProviders');
const $contEnd35 = document.getElementById('providerAleast5medicines');
const $contEnd24 = document.getElementById('providerMoreMedicines');

const $tableEnd16 = document.getElementById('infoEndpoint16');

const $tablaEnd13 = document.getElementById('infoEndpoint13');
const $medicinesByprovider = document.getElementById("medicinesbyProvider");
const $selectOptionsProvider = document.getElementById("selectProvider");

//SELECTORES DOM - Sale
const $selectOptionsMedicine = document.getElementById("selectMedicine");
const $contEnd5 = document.getElementById("totalMedicines");
//AddEventListener - Sale
$selectOptionsMedicine.addEventListener('change', ()=>
{
    const idValue =  $selectOptionsMedicine.value;
    console.log(idValue);

    loadTotalMedicines(idValue);
});

//AddEventListener
document.addEventListener("DOMContentLoaded", function () {
    loadTotalProviderPurchased();
    loadAleast5medicines();
    loadMoreMedicinesByProvider();
    loadGainByProvider();
    loadProvidersWithoutPurchases();
    loadProvider();

    //sale
    loadMedicine();
});
$selectOptionsProvider.addEventListener('change', ()=>
{
    const idValue =  $selectOptionsProvider.value;
    console.log(idValue);

    loadMedicinesByProvider(idValue)
});

async function loadMoreMedicinesByProvider()
{
    try
    {
        const response = await fetch(end24,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        $contEnd24.innerHTML = "";
        if(result != "")
        {
            let plus ="";
            if(result.length>1){plus=`<div class="text-center">
            <p class="card-text"><b>Providers with the most medications purchased ⭐⭐⭐</b></p>
          </div>`;}
            else{plus=`<div class=" text-center">
            <p class="card-text"> <b>Provider with the most medications purchased ⭐⭐⭐</b></p>
          </div>`; }
            
            result.forEach((medicine) => {
                const {name,moreQuantity} = medicine;
                
                let html = `<div class="card-block inicio-card">
                            <img src="../../img/proveedor.png" class="card-img-top" alt="provider">
                            ${plus}
                            <div class="card-body">
                            <p class="card-text"> <b>Name:</b> ${name}   </p>
                            <p class="card-text"> <b>Quantity of medications:</b> ${moreQuantity} </p>
                            </div>
                        </div>`;

                $contEnd24.insertAdjacentHTML('beforeend',html);
            });
        }else
        {
            $contEnd24.innerHTML = `<div class="card-block inicio-card">
                                <img src="https://cdn-icons-png.flaticon.com/128/639/639375.png" class="card-img-top" alt="provider">
                                <p class="card-text"> <b>There aren't provider with the most medications purchased 👻</b></p>
                                <div class="card-body">
                                <p class="card-text">  Purchased some medicines 😉 </p>
                                </div>
                            </div>`;
        }
    }catch(error)
    {
        console.error(error);
    }
}

async function loadTotalProviderPurchased()
{
    try
    {
        const response = await fetch(end28,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        $contEnd28.innerHTML = "";
        if(result != "")
        {
            const {totalProviders,providersList} = result;
            
            let html = `
                        <div class="card-block inicio-card">
                        <div class="card-body">
                        <button data-bs-toggle="modal" data-bs-target="#modalProviders" class="btnImga" ><img src="../../img/inventario-disponible.png" class="card-img-top" alt="provider"></button>
                        <div class="text-center"> <p class="card-text"><b>Active Providers 2023 🟢</b></p></div><br>
                        <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  </p>
                        <p class="card-text fs-3 text-center"> ${totalProviders} </p>

                        </div>
                    </div>`;
            $contEnd28.insertAdjacentHTML('beforeend',html);
            $titleModal.innerHTML= "Active Providers";
            $tableModal.innerHTML = "";

            let table = `<thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody id="providersNames">
                        </tbody>`;
            $tableModal.insertAdjacentHTML('beforeend',table);
            const $modalEn28 = document.getElementById('providersNames');
            
            providersList.forEach(provider => 
            {
                let htmlModal = `<tr>
                                <th scope="row">🟢</th>
                                <td>
                                    <img src="https://cdn-icons-png.flaticon.com/128/2982/2982693.png" alt="provider.png" style="width: 75px;">
                                </td>
                                <td>${provider}</td>
                                </tr>`;
                $modalEn28.insertAdjacentHTML('beforeend',htmlModal);
                
            });

        }else
        {
            $contEnd28.innerHTML = `
                                    <div class="card-block inicio-card">
                                    <img src="../../img/no-disponible.png" class="card-img-top" alt="provider">
                                    <div class="text-center"> <p class="card-text"><b>Active Providers 2023 🟢</b></p></div>
                                    <div class="card-body">
                                    <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  0😿 </p>
                                    <p class="card-text"> <b>Call suppliers!!! ☎️</p>
                                    </div>
                                    </div>`;
            
        }
    }catch(error)
    {
        console.error(error);
    }
}

async function loadAleast5medicines()
{
    try
    {
        const response = await fetch(end35,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        $contEnd35.innerHTML = "";
        if(result != "")
        {            
            let html = `
                        <div class="card-block inicio-card">
                        <div class="card-body">
                        <button data-bs-toggle="modal" data-bs-target="#modalProviders" class="btnImga" ><img src="../../img/medicamentos.png" class="card-img-top" alt="provider"></button>
                        <div class="text-center"> <p class="card-text"><b>Providers with at least 5 medicines 2023💊</b></p></div>
                        <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  </p>
                        <p class="card-text fs-3 text-center"> ${result.length} </p>

                        </div>
                    </div>`;
            $contEnd35.insertAdjacentHTML('beforeend',html);
            $titleModal.innerHTML= "Providers with at least 5 medications supplied";
            $tableModal.innerHTML = "";

            let table = `<thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody id="providersNames">
                        </tbody>`;
            $tableModal.insertAdjacentHTML('beforeend',table);
            
            const $modalEn35 = document.getElementById('providersNames');

            result.forEach(provider => 
            {
                let htmlModal = `<tr>
                                <td>
                                    <img src="https://cdn-icons-png.flaticon.com/128/2982/2982693.png" alt="provider.png" style="width: 75px;">
                                </td>
                                <td>${provider.name}</td>
                                </tr>`;
                $modalEn35.insertAdjacentHTML('beforeend',htmlModal);
                
            });

        }else
        {
            $contEnd35.innerHTML = `
                                    <div class="card-block inicio-card">
                                    <img src="../../img/no-hay-resultados.png" class="card-img-top" alt="provider">
                                    <div class="text-center"> <p class="card-text"><b>Providers with at least 5 medicines 2023💊</b></p></div>
                                    <div class="card-body">
                                    <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  0😿 </p>
                                    <p class="card-text"> <b>Call suppliers!!! ☎️</p>
                                    </div>
                                    </div>`;
            
        }
    }catch(error)
    {
        console.error(error);
    }
}

async function loadGainByProvider()
{
    try
    {
        const response = await fetch(end16,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        result.forEach((provider, index) => {
            const {idenNumber,name,totalGain2023} = provider;
            let html = ` <tr>
                            <th scope="row">${index+1}</th>
                            <td>${idenNumber}</td>
                            <td>${name}</td>
                            <td>${totalGain2023}</td>
                        </tr>`;
            $tableEnd16.insertAdjacentHTML('beforeend',html);
        });
    }catch(error)
    {
        console.error(error);
    }
}
async function loadProvidersWithoutPurchases(){
    try
    {
        const response = await fetch(end13,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        result.forEach((provider, index) => {
            const {idenNumber,name,email} = provider;
            let html = ` <tr>
                            <th scope="row">${index+1}</th>
                            <td>${idenNumber}</td>
                            <td>${name}</td>
                            <td>${email}</td>
                        </tr>`;
            $tablaEnd13.insertAdjacentHTML('beforeend',html);
        });
    }catch(error)
    {
        console.error(error);
    }
}

async function loadProvider(){
    try
    {
        const response = await fetch(getProviders,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        result.forEach((provider) => {
            const {id,name} = provider;
            
            let html = `<option value="${id}">${name}</option>`;

            $selectOptionsProvider.insertAdjacentHTML('beforeend',html);
        });
    }catch(error)
    {
        console.error(error);
    }
}

async function loadMedicinesByProvider(id)
{
    try
    {
        const response = await fetch(end3+`/${id}`,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        $medicinesByprovider.innerHTML = "";
        if(result != "")
        {
            result.forEach((medicine) => {
                const {name,price,stock} = medicine;
                
                let html = `<div class="card-block" style="width: 12rem;">
                            <img src="https://cdn-icons-png.flaticon.com/512/918/918330.png" class="card-img-top" alt="drug">
                            <div class="card-body">
                            <p class="card-text"> <b>Name:</b> ${name}   </p>
                            <p class="card-text"> <b>Price:</b> ${price} </p>
                            <p class="card-text"> <b>Stock:</b> ${stock} </p>
                            </div>
                        </div>`;

                $medicinesByprovider.insertAdjacentHTML('beforeend',html);
            });
        }else
        {
            $medicinesByprovider.innerHTML = `<p class="card-text">There is nothing here 👻</p>`;
        }
    }catch(error)
    {
        console.error(error);
    }
}


//Sales fucntion
async function loadMedicine(){
    try
    {
        const response = await fetch(getMedicines,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        result.forEach((medicine) => {
            const {id,name} = medicine;
            
            let html = `<option value="${id}">${name}</option>`;

            $selectOptionsMedicine.insertAdjacentHTML('beforeend',html);
        });
    }catch(error)
    {
        console.error(error);
    }
}

async function loadTotalMedicines(id)
{
    try
    {
        const response = await fetch(end5+`/${id}`,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        $contEnd5.innerHTML = "";
        if(result.totalSales !=0)
        {
                
                let html = ` <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  </p>
                            <p class="card-text fs-3 text-center"> ${result.totalSales} </p>`;

                $contEnd5.insertAdjacentHTML('beforeend',html);
        }else
        {
            $contEnd5.innerHTML = `<p class="card-text"> <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  </p>
            <p class="card-text fs-3 text-center">${result.totalSales}😿  </p>`;
        }
    }catch(error)
    {
        console.error(error);
    }
}





