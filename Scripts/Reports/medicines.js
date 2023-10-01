import {end1 } from "../../Scripts/routes.js";

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
//AddEventListener - Medicine
document.addEventListener("DOMContentLoaded", function () {
    $allTableEnd1.style.display = "none";
    $allAboveStockEnd1.style.display = "none";
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