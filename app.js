import {indexMain} from "./Modules/index.js"; 
import {sidebar} from "./Modules/sidebar.js"; 
import {navbar} from "./Modules/navbar.js"; 

const main = document.querySelector("main");
const sidebarHtml = document.querySelector("#sidebar");
const navbarHtml = document.querySelector("#navbar");

document.addEventListener("DOMContentLoaded", function () {
    navbarHtml.innerHTML = navbar;
    sidebarHtml.innerHTML = sidebar;
})

// Datos para el gráfico (puedes personalizar estos datos según tus necesidades)
const options = {
    chart: {
        type: 'bar', // Tipo de gráfico (por ejemplo, 'line', 'bar', 'pie', etc.)
    },
    series: [{
        name: 'Ventas',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    }],
    xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
    },
};

// Crear una instancia de ApexCharts y renderizar el gráfico en el contenedor
const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();
