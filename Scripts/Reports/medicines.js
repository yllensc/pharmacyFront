import { end1, end2, end10, end26, end38, end, getMedicines, end6 } from "../../Scripts/routes.js";
import { handleUnauthorizedResponse, getTokenFromCookies } from "../Main/UtilService/AuthenticationToken.js"

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${getTokenFromCookies()}`,
  },
};

//SELECTORES DEL DOM
const $allAboveStockEnd1 = document.getElementById("allAboveStock");
const $allTableEnd1 = document.getElementById("table1");
const $tableEnd1 = document.getElementById("infoEndpoint1");
const $inputStock = document.getElementById("stock");

const $contEnd2 = document.getElementById("infoEnd2");

const $contEnd10 = document.getElementById("infoEnd10");

const $contEnd26 = document.getElementById("infoEnd26");
const $inputYearMedicine = document.getElementById("yearMedicine");

const $inputStock38 = document.getElementById("stockEnd38");
const $inputPrice38 = document.getElementById("priceEnd38");
const $tableEnd38 = document.getElementById("infoEndpoint38");
const $allTableEnd38 = document.getElementById("tableEnd38");
const $textEnp38 = document.getElementById("textEnp38");

const $selectOptionsMedicine = document.getElementById("selectMedicine");
const $contEnd = document.getElementById("infoEnd");

const $contEnp6 = document.getElementById("infoEndpoint6");


//AddEventListener - Medicine
document.addEventListener("DOMContentLoaded", function () {
  handleUnauthorizedResponse();
  $allTableEnd1.style.display = "none";
  $allAboveStockEnd1.style.display = "none";
  loadInfoProviders();
  loadMoreExpensive();
  $allTableEnd38.style.display = "none";
  $textEnp38.style.display = "none";
  loadMedicine();
});

$inputStock.addEventListener("input", (e) => {
  let select = e.target.value;
  if (select > 0 && select != "") {
    loadUnderStock(select);
  }
  $allTableEnd1.style.display = "none";
});

$inputYearMedicine.addEventListener("input", (e) => {
  let select = e.target.value;
  if (select != "0" && select >= 2022 && select != "") {
    loadMedicinesMonth(select);
  }
});

$inputStock38.addEventListener("input", (e) => {
  let selectS = e.target.value;
  let selectP = $inputPrice38.value;
  if (selectS != "" && selectP != "") {
    if (selectS > 0 && selectP > 0) {
      loadParametersMedicine(selectP, selectS);
    }
  }
  $allTableEnd38.style.display = "none";
});
$inputPrice38.addEventListener("input", (e) => {
  let selectP = e.target.value;
  let selectS = $inputStock38.value;
  if (selectS != "" && selectP != "") {
    if (selectS > 0 && selectP > 0) {
      loadParametersMedicine(selectP, selectS);
    }
  }
  $allTableEnd38.style.display = "none";
});

$selectOptionsMedicine.addEventListener("change", () => {
  const idValue = $selectOptionsMedicine.value;
  if (idValue != "0") {
    loadBatchOfmedicines(idValue);
    return;
  }
  $contEnd.innerHTML = " ";
});
//Funciones
async function loadMedicine() {
  try {
    const response = await fetch(getMedicines, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    result.forEach((medicine) => {
      const { id, name } = medicine;

      let html = `<option value="${id}">${name}</option>`;

      $selectOptionsMedicine.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadUnderStock(stock) {
  try {
    const response = await fetch(end1 + `${stock}`, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    $tableEnd1.innerHTML = " ";
    if (result != "") {
      $allAboveStockEnd1.style.display = "none";

      result.forEach((provider, index) => {
        const { name, stock, providerName } = provider;

        let html = `<tr>
                                <th scope="row">${index + 1}</th>
                                <td>${name}</td>
                                <td>${stock}</td>
                                <td>${providerName}</td>
                            </tr>`;

        $tableEnd1.insertAdjacentHTML("beforeend", html);
      });

      $allTableEnd1.style.display = "inline-table";
    } else {
      $allTableEnd1.style.display = "none";
      $allAboveStockEnd1.style.display = "flex";
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadInfoProviders() {
  try {
    const response = await fetch(end2, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    if (result != "") {
      result.forEach((provider) => {
        const { medicinesList, idenNumber, name, email, address, id } =
          provider;

        if(medicinesList != ""){
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
          $contEnd2.insertAdjacentHTML("beforeend", html);

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
          $contEnd2.insertAdjacentHTML("beforeend", modal);

          medicinesList.forEach((medicines, index) => {
            const { name, stock, price } = medicines;
            let html = `<tr>
                                  <th scope="row">${index + 1}</th>
                                  <td>${name}</td>
                                  <td>${stock}</td>
                                  <td>${price}</td>
                              </tr>`;

            document.getElementById(`infoEndpoint1ID${id}`).insertAdjacentHTML("beforeend", html);
          });
        }else{
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
                              <p class="card-text">There are no associated medications👻</p>
                              </div>
                          </div>`;
          $contEnd2.insertAdjacentHTML("beforeend", html);
        }
        
      });
    } else {
      $contEnd2.innerHTML = `<p class="card-text">There is nothing here 👻</p>`;
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadMoreExpensive() {
  try {
    const response = await fetch(end10, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    $contEnd10.innerHTML = "";

    if (result != "") {
      let html = ` <p class="card-text fs-5 text-center"> <b><br>${result[0].name}</b> </p>
            <p class="card-text fs-5 text-center"> <b>Price:</b><br>${result[0].price} </p>`;

      $contEnd10.insertAdjacentHTML("beforeend", html);
    } else {
      $contEnd10.innerHTML = `<p class="card-text"> <p class="card-text fs-3 text-center"> <b>TOTAL:</b>  </p>
            <p class="card-text fs-3 text-center">There isn't medicines😿  </p>`;
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadMedicinesMonth(year) {
  try {
    const response = await fetch(end26 + `${year}`, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    $contEnd26.innerHTML = " ";
    for (const month in result) {
      if (result[month] != "") {
        let modal = `<!-- Modal -->
                                <div class="modal fade" id="medicines${month}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Sales Quantity: ${month}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                        <h3 class="text-center" >List Medicines</h3>
                                        <table class="table" id="table12">
                                            <thead>
                                            <tr>
                                                <th scope="col">N°</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Quantity Sold</th>
                                            </tr>
                                            </thead>
                                            <tbody id="${month}">
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
        $contEnd26.insertAdjacentHTML("beforeend", modal);
        let total = 0;
        result[month].forEach((medicines, index) => {
          const { medicineName, quantitySold } = medicines;
          total += quantitySold;

          let html = `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${medicineName}</td>
                            <td>${quantitySold}</td>
                        </tr>`;

          document
            .getElementById(`${month}`)
            .insertAdjacentHTML("beforeend", html);
        });

        let html = `<div class="card inicio-card" style="width: 18rem;">
                        <div class="card-body text-center" style="padding: 5px;">
                        <p class="card-text fs-5 text-center">
                        <b>${month.toUpperCase()}</b></p>
                        <p class="card-text fs-5 text-center" >Total</p>
                        <p id="ID${month}" class="card-subtitle mb-2 text-center"><!-- Se agrega dinámicamente --> </p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#medicines${month}" >Medicines</button><br>
                        </div>
                    </div>`;
        $contEnd26.insertAdjacentHTML("beforeend", html);
        document.getElementById(`ID${month}`).innerHTML = total;
      } else {
        let html = `<div class="card inicio-card" style="width: 18rem;">
                            <div class="card-body text-center" style="padding: 5px;">
                            <p class="card-text fs-5 text-center">
                            <b>${month.toUpperCase()}</b></p>
                            <p class="card-text fs-5 text-center" >Total</p>
                            <p class="card-subtitle mb-2 text-center"> 0😿 </p> 
                            <p class="card-subtitle mb-2 text-center"> There were no sales</p> 
                            </div>
                        </div>`;
        $contEnd26.insertAdjacentHTML("beforeend", html);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadParametersMedicine(price, stock) {
  try {
    const response = await fetch(end38 + `Price${price}Stock${stock}`, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    $tableEnd38.innerHTML = " ";
    console.log(result);
    if (result != "") {
      $textEnp38.style.display = "none";

      result.forEach((provider, index) => {
        const { name, stock, providerName, price } = provider;

        let html = `<tr>
                                <th scope="row">${index + 1}</th>
                                <td>${name}</td>
                                <td>${stock}</td>
                                <td>${price}</td>
                                <td>${providerName}</td>
                            </tr>`;

        $tableEnd38.insertAdjacentHTML("beforeend", html);
      });

      $allTableEnd38.style.display = "inline-table";
    } else {
      $allTableEnd38.style.display = "none";
      $textEnp38.style.display = "flex";
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadBatchOfmedicines(id)
{
  try {
    console.log(id)
    const response = await fetch(end, options);
    if (!response.ok) {
      throw new Error(`Failed. State: ${response.status}`);
    }
    const result = await response.json();
    $contEnd.innerHTML = "";
    var found = false;
    if (result != "") {
      result.forEach(medicine =>{
        if(medicine.id == id)
        {
          found = true;
          const {listBatch} = medicine;

          listBatch.forEach(batch => {
            const {expirationDate, stockLote} = batch;
            let html = `<div class="card inicio-card" style="width: 18rem;">
                            <div class="card-body text-center" style="padding: 5px;">
                            <img src="https://cdn-icons-png.flaticon.com/128/9188/9188976.png" style="width: 75px; ">
                            <p class="card-subtitle mb-2 text-center">
                            <b>Expire Date</b>${expirationDate.substring(0,9)}</p>
                            <p class="card-subtitle mb-2 text-center">
                            <b>Stock Lote:</b> ${stockLote}</p>
                            
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#medicine${id}" >Medicines</button><br>
                            </div>
                        </div>`;
                $contEnd.insertAdjacentHTML('beforeend',html);
          });
          
          return
        }
      });

      if(!found){
        let html = `<p class="card-subtitle mb-2 text-center">There are no purchases👻</p>`;
        $contEnd.insertAdjacentHTML('beforeend',html);

      }
    }
  } catch (error) {
    console.error(error);
  }
}
