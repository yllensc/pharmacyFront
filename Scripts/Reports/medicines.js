import {end1, end2 } from "../../Scripts/routes.js";

const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
};

//SELECTORES DEL DOM
const $allAboveStockEnd1 = document.getElementById('allAboveStock');
const $allTableEnd1 = document.getElementById("table1");
const $tableEnd1 = document.getElementById("infoEndpoint1");
const $selectorStock = document.getElementById("stock");

const $contEnd2 = document.getElementById("infoEnd2");
//AddEventListener - Medicine
document.addEventListener("DOMContentLoaded", function () {
    $allTableEnd1.style.display = "none";
    $allAboveStockEnd1.style.display = "none";
    loadInfoProviders();
});

$selectorStock.addEventListener('input', (e)=>{
    let select = e.target.value;
    if(select != '50' && select>0 && select != ""){
        loadUnderStock(select);
    }
});
//Funciones

async function loadUnderStock(stock)
{
    try
    {
        const response = await fetch(end1+`${stock}`,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        if(result != "")
        {
            $allAboveStockEnd1.style.display = 'none';

            result.forEach((provider,index) => {
                const {name,stock,providerName } = provider;
                
                let html = `<tr>
                                <th scope="row">${index+1}</th>
                                <td>${name}</td>
                                <td>${stock}</td>
                                <td>${providerName}</td>
                            </tr>`;

                $tableEnd1.insertAdjacentHTML('beforeend',html);
            });

            $allTableEnd1.style.display = 'inline-table';
        }else
        {
            $allTableEnd1.style.display = 'none';
            $allAboveStockEnd1.style.display = 'flex';
        }
    }catch(error)
    {
        console.error(error);
    }
}

async function loadInfoProviders()
{
    try
    {
        const response = await fetch(end2,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        if(result != "")
        {

            result.forEach((provider) => {
                const {medicinesList,idenNumber,name,email, address, id } = provider;
                
                let html = `<div class="card inicio-card" style="width: 18rem;">
                            <div class="card-body text-center" style="padding: 5px;">
                            <img src="https://cdn-icons-png.flaticon.com/128/2982/2982693.png" alt="provider.png" style="width: 75px; ">
                            <p class="card-subtitle mb-2 text-center">
                            <b>${name}</b></p>
                            <p class="card-subtitle mb-2 text-start">
                            <b>Identifacion number:</b>${idenNumber} </p>
                            <p class="card-subtitle mb-2 text-start">
                            <b>Email:</b>${email} </p>
                            <p class="card-subtitle mb-2 text-start">
                            <b>Address:</b>${address} </p>
                            <button class="btn btn-primary" id="medicine${id}">Medicines</button><br>
                            </div>
                        </div>`;

                $contEnd2.insertAdjacentHTML('beforeend',html);
            });

            
        }else
        {
           $contEnd2.innerHTML= `<p class="card-text">There is nothing here 👻</p>`;
        }
    }catch(error)
    {
        console.error(error);
    }
}