import {getMedicines,end5,end8,end9, end21, end12,end25, end15,end33,end36, end22, end30} from "../../Scripts/routes.js";
const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
}; 

//SELECTORES DOM - Sale
const $selectOptionsMedicine = document.getElementById("selectMedicine");
const $contEnd5 = document.getElementById("totalMedicines");
const $imgEnd5 = document.getElementById("imgEnpoint5");
const $contEnd8 = document.getElementById('totalSales');

const myModal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
});
const $closeMyModal = document.getElementById('closeModal');


const $tableModal = document.getElementById('tableModal');
const $titleModal = document.getElementById('exampleModalLabel');

const $btnUnsold2023 = document.getElementById('btnUnsold');
const $btnUnsoldNever = document.getElementById('btnUnsoldN');

const $selectOptionsMedicine2 = document.getElementById("selectMedicine2");
const $tableEnd12 = document.getElementById("infoEndpoint12");
const $allTableEnd12 = document.getElementById("table12");
const $contEnd12 = document.getElementById("unsoldMedicine");

const $btn2023End25 = document.getElementById("p2023");
const $btnAllEnd25 = document.getElementById("pAll");

const $allEnp15 = document.getElementById("enpoint15");
const $contEnd15 = document.getElementById("lessSoldMedicines");

const $tableEnd33= document.getElementById("infoEndpoint33");

const $selectOptionsQuarter = document.getElementById("selectQuarter");
const $totalQuarter = document.getElementById("totalQuarter");
const $totalQuarterMedicine = document.getElementById("totalQuarterMed");

const $contEnd22 = document.getElementById("patientMoreSpent");

const $allTableEnd30 = document.getElementById("table30");
const $tableEnd30 = document.getElementById("infoEndpoint30");
const $allPatientPurchased = document.getElementById("allPatientPurchased");

//AddEventListener - Sale
document.addEventListener("DOMContentLoaded", function () {
    loadMedicine();
    loadTotalAllSales();
    loadLessMedicine();
    loadSpentByPatient();
    $allTableEnd12.style.display = "none";
    $allEnp15.style.display = "none";
    loadPatientMoreSpent();
    $allPatientPurchased.style.display="none";
    loadPatientsWithoutPurchases();


});
$selectOptionsMedicine.addEventListener('change', ()=>
{
    const idValue =  $selectOptionsMedicine.value;
    if(idValue != "0")
    {
        loadTotalMedicines(idValue);
        return
    }
    $imgEnd5.style.display = "inline-table";

    $contEnd5.innerHTML=" ";
});

$btnUnsold2023.addEventListener('click', ()=>{
    const titleModal = "Unsold medicines in 2023 🤨🤨";
    loadUnsold(end9,titleModal);
});
$btnUnsoldNever.addEventListener('click', ()=>{
  const titleModal = "Unsold medicines never 💀💀";
  loadUnsold(end21,titleModal);
});
$closeMyModal.addEventListener('click', () => {
  myModal.hide();
});

$selectOptionsMedicine2.addEventListener('change', ()=>
{
    $allTableEnd12.style.display = "none";
    $contEnd12.innerHTML=" ";
    $tableEnd12.innerHTML=" ";
});

$btn2023End25.addEventListener("click", ()=>{
    const idValue =  $selectOptionsMedicine2.value;
    $allTableEnd12.style.display = "none";

    if(idValue != "0")
    {
        $contEnd12.innerHTML=" ";
        $tableEnd12.innerHTML=" ";
        loadPatients(idValue,end25);
        return
    }

});
$btnAllEnd25.addEventListener("click", ()=>{
    const idValue =  $selectOptionsMedicine2.value;
    if(idValue != "0")
    {
        $contEnd12.innerHTML=" ";
        $tableEnd12.innerHTML=" ";
        loadPatients(idValue,end12);
        return
    }
    $allTableEnd12.style.display = "none";

});
$selectOptionsQuarter.addEventListener('change', ()=>{
    const idValue =  $selectOptionsQuarter.value;
    if(idValue == "0")
    {
        $totalQuarter.innerHTML=" ";
        $totalQuarterMedicine.innerHTML=" ";
        return;
    }
    loadTotalMedicineQuarter(idValue)
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
            $selectOptionsMedicine2.insertAdjacentHTML('beforeend',html);

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
                $imgEnd5.style.display = "none";
                let html = ` <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  </p>
                            <p class="card-text fs-3 text-center"> ${result.totalSales} units</p>`;

                $contEnd5.insertAdjacentHTML('beforeend',html);
        }else
        {
            $contEnd5.innerHTML = `<p class="card-text"> <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  </p>
            <p class="card-text fs-3 text-center">${result.totalSales} units 😿  </p>`;
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
                            <tr>
                            <th scope="row">N°</th>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>

                            </tr>
                        </thead>
                        <tbody id="listMedicines">
                        </tbody>`;
            $tableModal.insertAdjacentHTML('beforeend',table);
            const $modaLMed= document.getElementById('listMedicines');

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
                $modaLMed.insertAdjacentHTML('beforeend',htmlModal);
               
                myModal.show();

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

async function loadPatients(id, endp)
{
    try
    {
        const response = await fetch(endp+`/${id}`,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        if(result != "")
        {
                
            result.forEach((patient,index) => {
                const {name,idenNumber,phoneNumber } = patient;
                
                let html = `<tr>
                                <th scope="row">${index+1}</th>
                                <td>${idenNumber}</td>
                                <td>${name}</td>
                                <td>${phoneNumber}</td>
                            </tr>`;

                $tableEnd12.insertAdjacentHTML('beforeend',html);
            });

            $allTableEnd12.style.display = 'inline-table';
        }else
        {
            $allTableEnd12.style.display = 'none';
            $contEnd12.innerHTML = `<p class="card-text">There is nothing here 👻</p>`;

        }
    }catch(error)
    {
        console.error(error);
    }
}
async function loadLessMedicine()
{
    try
    {
        const response = await fetch(end15,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        if(result != "" )
        {
            $allEnp15.style.display = "flex";
           /* if(result.length ==1)
            {} //Falta el else, si la cantidad es mayor a 1*/

            let html = ` <p class="card-text fs-3 text-center text-danger"> ${result[0].idMedicine} </p>
                        <p class="card-text fs-5 text-center" style="margin-top:0; margin-bottom:0;"> ${result[0].totalQuantity} units sold </p>`;

            $contEnd15.insertAdjacentHTML('beforeend',html);
                
        }else
        {
            $allEnp15.style.display = 'none';
        }
    }catch(error)
    {
        console.error(error);
    }
}

async function loadSpentByPatient()
{
    try
    {
        const response = await fetch(end33,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        if(result != "")
        {
                
            result.forEach((patient,index) => {
                const {name,idenNumber,totalSpent } = patient;
                
                let html = `<tr>
                                <th scope="row">${index+1}</th>
                                <td>${idenNumber}</td>
                                <td>${name}</td>
                                <td>${totalSpent}</td>
                            </tr>`;

                $tableEnd33.insertAdjacentHTML('beforeend',html);
            });

        }else
        {
            $tableEnd33.innerHTML = `<p class="card-text">There is nothing here 👻</p>`;

        }
    }catch(error)
    {
        console.error(error);
    }
}

async function loadTotalMedicineQuarter(id)
{
    try
    {
        console.log(end36+`/${id}`);
        const response = await fetch(end36+`/${id}`,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();

        $totalQuarterMedicine.innerHTML = "";
        if(result != "")
        {
            $totalQuarter.innerHTML = `<p class="card-text fs-3 text-center"> <b>TOTAL:</b> ${result.total} units </p>`;

            result.listMedicines.forEach((medicine) => {
                const {nameMedicine,totalQuantity} = medicine;
                
                let html = `<div class="card-block" style="width: 15rem;">
                            <img src="https://cdn-icons-png.flaticon.com/512/918/918330.png" class="card-img-top" alt="drug">
                            <div class="card-body">
                            <p class="card-text"> <b>Name:</b> ${nameMedicine}   </p>
                            <p class="card-text"> <b>Total sold:</b> ${totalQuantity} </p>
                            </div>
                        </div>`;

                $totalQuarterMedicine.insertAdjacentHTML('beforeend',html);
            });
        }else
        {
            $totalQuarter.innerHTML = `<p class="card-text fs-3 text-center"> <b>TOTAL:</b> O units 😿</p>`;
            $totalQuarterMedicine.innerHTML = `<p class="card-text">There is nothing here 👻</p>`;
        }
    }catch(error)
    {
        console.error(error);
    }
}

async function loadPatientMoreSpent()
{
    try
    {
        const response = await fetch(end22,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        $contEnd22.innerHTML = "";
        
        let html = ` <p class="card-text fs-3 text-center"> <b>${result[0].name} 🎉</b>  </p>
                    <p class="card-text fs-4 text-center"> <b>Total spent:</b>  </p>
                    <p class="card-text fs-3 text-center"> ${result[0].totalSpent} </p>`;

        $contEnd22.insertAdjacentHTML('beforeend',html);
       //Faltaría mostrar si varios pacientes gastaron lo mismo...
       
    }catch(error)
    {
        console.error(error);
    }
}


async function loadPatientsWithoutPurchases()
{
    try
    {
        console.log(end30)
        const response = await fetch(end30,options);
        if(!response.ok)
        {
            throw new Error(`Failed. State: ${response.status}`);
        } 
        const result = await response.json();
        if(result == "")
        {
                
            result.forEach((patient,index) => {
                const {name,idenNumber,phoneNumber } = patient;
                
                let html = `<tr>
                                <th scope="row">${index+1}</th>
                                <td>${idenNumber}</td>
                                <td>${name}</td>
                                <td>${phoneNumber}</td>
                            </tr>`;

                $tableEnd30.insertAdjacentHTML('beforeend',html);
            });

            $allTableEnd30.style.display = 'inline-table';
        }else
        {
            $allTableEnd30.style.display = 'none';
            $allPatientPurchased.style.display = 'flex';
        }
    }catch(error)
    {
        console.error(error);
    }
}