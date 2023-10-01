import {getMedicines,end5,end8,end9, end21} from "../../Scripts/routes.js";
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

const $tableModal = document.getElementById('tableModal');
const $titleModal = document.getElementById('exampleModalLabel');

const $btnUnsold2023 = document.getElementById('btnUnsold');
const $btnUnsoldNever = document.getElementById('btnUnsoldN');

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
$btnUnsold2023.addEventListener('click', ()=>{
    const titleModal = "Unsold medicines in 2023 🤨🤨";

    loadUnsold(end9,titleModal);
}
);
//$btnUnsold2023.addEventListener('click', loadUnsoldNever());

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


async function loadUnsold(enpoint, titlemodal)
{
    try
    {
        const response = await fetch(enpoint,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();

        if(result != "")
        {
            $titleModal.innerHTML= titlemodal;
            $tableModal.innerHTML = "";
            let table = `<thead>
                            <th scope="row">N°</th>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>

                            </tr>
                        </thead>
                        <tbody id="listMedicines">
                        </tbody>`;
            $tableModal.insertAdjacentHTML('beforeend',table);
            const $modal= document.getElementById('listMedicines');

            result.forEach((medicine, index)=>{
               const {name, price, stock} = medicine;
                let htmlModal =  `<tr>
                                    <th scope="row">${index+1}</th>
                                    <td>
                                        <img src="https://cdn-icons-png.flaticon.com/128/10915/10915194.png" alt="provider.png" style="width: 75px;">
                                    </td>
                                    <td>${name}</td>
                                    <td>${price}</td>
                                    <td>${stock}</td>

                                    </tr>`;
                $modal.insertAdjacentHTML('beforeend',htmlModal);

            });
        }else
        {
            Swal.fire({
                title: 'Yupii',
                text: 'All medicines have been sold in 2023!',
                imageUrl: 'https://cdn-icons-png.flaticon.com/128/1786/1786650.png',
                imageAlt: 'Dedido arriba',
                timer: 2500
              });
        }

    }catch(error)
    {
        console.error(error);
    }
}
