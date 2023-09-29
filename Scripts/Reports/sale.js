import {getMedicines,end5,end8} from "../../Scripts/routes.js";
const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
}; 

//SELECTORES DOM - Sale
const $selectOptionsMedicine = document.getElementById("selectMedicine");
const $contEnd5 = document.getElementById("totalMedicines");
const $contEnd8 = document.getElementById('totalSales');

//AddEventListener - Sale
document.addEventListener("DOMContentLoaded", function () {
    loadMedicine();
    loadTotalAllSales();
});
$selectOptionsMedicine.addEventListener('change', ()=>
{
    const idValue =  $selectOptionsMedicine.value;
    if(idValue != "0")
    {
        loadTotalMedicines(idValue);
        return
    }
    $contEnd5.innerHTML=" ";
    return 
});

//FUNCIONES
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

async function loadTotalAllSales()
{
    try
    {
        const response = await fetch(end8,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        $contEnd8.innerHTML = "";
        
        if(result.totalSales != null){
            let html = ` <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  </p>
            <p class="card-text fs-3 text-center"> ${result.totalSales} </p>`;

            $contEnd8.insertAdjacentHTML('beforeend',html);
        }else{
            $contEnd8.innerHTML = `<p class="card-text"> <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  </p>
            <p class="card-text fs-3 text-center">${result.totalSales}😿  </p>`;
        }
       
    }catch(error)
    {
        console.error(error);
    }
}
