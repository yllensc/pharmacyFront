import {end7} from "../../Scripts/routes.js";
const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
};

//SELECTORES DOM 
const $contEnd7 = document.getElementById("infoEnd7");

//AddEventListener 
document.addEventListener("DOMContentLoaded", function () {
   loadProviderMedicines();
});

//Funciones

async function loadProviderMedicines()
{
    try
    {
        const response = await fetch(end7,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        $contEnd7.innerHTML = " ";

        result.forEach(provider =>
        {
            const {id,name, medicinesList, totalPurchaseCant} =provider;

            if(medicinesList != "")
            {
                let html = `<div class="card inicio-card" style="width: 18rem;">
                            <div class="card-body text-center" style="padding: 5px;">
                            <img src="https://cdn-icons-png.flaticon.com/128/2982/2982693.png" alt="provider.png" style="width: 75px; ">
                            <p class="card-subtitle mb-2 text-center">
                            <b>${name}</b></p>
                            <p class="card-subtitle mb-2 text-center">
                            <b>Purchased quantity:</b> ${totalPurchaseCant}</p>
                            
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#medicine${id}" >Medicines</button><br>
                            </div>
                        </div>`;
                $contEnd7.insertAdjacentHTML('beforeend',html);

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
                                                <th scope="col">Quantity purchased</th>
                                            </tr>
                                            </thead>
                                            <tbody id="infoEndpoint7ID${id}">
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
                $contEnd7.insertAdjacentHTML('beforeend',modal);
                medicinesList.forEach((medicines,index)=> 
                {
                   const {name, purchaseCant} = medicines;
                    let html = `<tr>
                                <th scope="row">${index+1}</th>
                                <td>${name}</td>
                                <td>${purchaseCant}</td>
                            </tr>`;

                    document.getElementById(`infoEndpoint7ID${id}`).insertAdjacentHTML('beforeend',html);
                });

            }else{
                let html = `<div class="card inicio-card" style="width: 18rem;">
                            <div class="card-body text-center" style="padding: 5px;">
                            <img src="https://cdn-icons-png.flaticon.com/128/2982/2982693.png" alt="provider.png" style="width: 75px; ">
                            <p class="card-subtitle mb-2 text-center">
                            <b>${name}</b></p>
                            <p class="card-subtitle mb-2 text-center">
                            <b>Purchased quantity:</b> ${totalPurchaseCant}</p>
                            <p class="card-subtitle mb-2 text-center">There are no purchases👻</p>

                            </div>
                        </div>`;
                $contEnd7.insertAdjacentHTML('beforeend',html);
            }
        });


    }catch(error)
    {
        console.error(error);
    }
}