import {end1, end2, end10 } from "../../Scripts/routes.js";

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

const $contEnd10 = document.getElementById("infoEnd10");

//AddEventListener - Medicine
document.addEventListener("DOMContentLoaded", function () {
    $allTableEnd1.style.display = "none";
    $allAboveStockEnd1.style.display = "none";
    loadInfoProviders();
    loadMoreExpensive();
});

$selectorStock.addEventListener('input', (e)=>{
    let select = e.target.value;
    if(select != '0' && select>0 && select != ""){
        loadUnderStock(select);
    }
    $allTableEnd1.style.display = 'none';
});
//Funciones

async function loadUnderStock(stock)
{
    try
    {
        console.log(stock);
        const response = await fetch(end1+`${stock}`,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        $tableEnd1.innerHTML   = " ";
        console.log(result)
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
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#medicine${id}" >Medicines</button><br>
                            </div>
                        </div>`;
                $contEnd2.insertAdjacentHTML('beforeend',html);

                let modal = ` <!-- Modal -->
                                <div class="modal fade" id="medicine${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Provider: ${name}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                        <h3 class="text-center" >List Medicines</h3>
                                        <table class="table" id="table12">
                                            <thead>
                                            <tr>
                                                <th scope="col">N°</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Stock</th>
                                                <th scope="col">Price</th>
                                            </tr>
                                            </thead>
                                            <tbody id="infoEndpoint1ID${id}">
                                            <!--Se agrega dinámicamente-->
                                            </tbody>
                                        </table>
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <!-- Modal -->`;
                $contEnd2.insertAdjacentHTML('beforeend',modal);

                medicinesList.forEach((medicines,index)=> 
                {
                   const {name, stock, price} = medicines;
                    let html = `<tr>
                                <th scope="row">${index+1}</th>
                                <td>${name}</td>
                                <td>${price}</td>
                                <td>${stock}</td>
                            </tr>`;

                    document.getElementById(`infoEndpoint1ID${id}`).insertAdjacentHTML('beforeend',html);
                });

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

async function loadMoreExpensive()
{
    try
    {
        const response = await fetch(end10,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        $contEnd10.innerHTML = "";
        
        if(result != ""){
            let html = ` <p class="card-text fs-5 text-center"> <b><br>${result[0].name}</b> </p>
            <p class="card-text fs-5 text-center"> <b>Price:</b><br>${result[0].price} </p>`;


            $contEnd10.insertAdjacentHTML('beforeend',html);
        }else{
            $contEnd10.innerHTML = `<p class="card-text"> <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  </p>
            <p class="card-text fs-3 text-center">There isn't medicines😿  </p>`;
        }
       
    }catch(error)
    {
        console.error(error);
    }
}