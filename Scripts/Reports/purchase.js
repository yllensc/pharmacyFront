import {end13,getProviders,end3 } from "../../Scripts/routes.js";
const purchaseHtml =  "../../Scripts/Reports/sale.js";
const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
};

console.log(end13);

document.addEventListener("DOMContentLoaded", function () {
    loadProvidersWithoutPurchases();
    loadProvider();
});

//SELECTORES DOM
const $tablaEnd13 = document.getElementById('infoEndpoint13');
const $selectOptions = document.getElementById("selectProvider");


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
            const {name} = provider;
            
            let html = `<option value="${name}">${name}</option>`;

            $selectOptions.insertAdjacentHTML('beforeend',html);
        });
    }catch(error)
    {
        console.error(error);
    }
}

async function loadMedicinesByProvider(id)
{
    const $medicinesByprovider = document.getElementById("medicinesbyProvider");

    try
    {
        const response = await fetch(end3,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        result.forEach((medicine) => {
            const {name,price,stock} = medicine;
            
            let html = `<div class="card" style="width: 18rem;">
                        <img src="https://cdn-icons-png.flaticon.com/512/918/918330.png" class="card-img-top" alt="drug">
                        <div class="card-body">
                        <p class="card-text">
                        <b>Name:</b> ${name} 
                        <b>Price:</b> ${price}
                        <b>Stock:</b> ${stock}
                        </p>
                        </div>
                    </div>`;

            $medicinesByprovider.insertAdjacentHTML('beforeend',html);
        });
    }catch(error)
    {
        console.error(error);
    }
}
$selectOptions.addEventListener('change', ()=>
{
    const nameValue =  $selectOptions.value;
    console.log(nameValue);

    loadMedicinesByProvider(nameValue)
});

