import { end13 } from "../../Scripts/routes.js";
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
});



async function loadProvidersWithoutPurchases(){
    const $tablaEnd13 = document.getElementById('infoEndpoint13');

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