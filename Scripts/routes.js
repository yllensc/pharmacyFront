/* Routes LocalHost */ 

// USER
export const login = "http://localhost:5223/api/pharmacy/User/token";

// PURCHASED
export const getProviders = "http://localhost:5223/api/pharmacy/Provider/onlyProviders";

export const end3 = "http://localhost:5223/api/pharmacy/Purchase/medicinesPurchased";
export const end13 = "http://localhost:5223/api/pharmacy/Purchase/providersWithoutPurchases";

// PROVIDER
export const end16 = "http://localhost:5223/api/pharmacy/Provider/gain2023";
export const end24 = "http://localhost:5223/api/pharmacy/Provider/moreQuantityMedicines";
export const end28 = "http://localhost:5223/api/pharmacy/Provider/totalProviders";
export const end35 = "http://localhost:5223/api/pharmacy/Provider/aleast5medicines";

// SALES
export const getSales = "http://localhost:5223/api/pharmacy/Sale";
export const postManySales = "http://localhost:5223/api/pharmacy/Sale/range";
export const end4 = "http://localhost:5223/api/pharmacy/Sale/recipes";
export const end5 = "http://localhost:5223/api/pharmacy/Sale/totalSaleOneMedicine";
export const end8 = "http://localhost:5223/api/pharmacy/Sale/gainSales";
export const end9 = "http://localhost:5223/api/pharmacy/Sale/unsoldMedicines2023";
export const end21 = "http://localhost:5223/api/pharmacy/Sale/unsoldMedicines";
export const end15 = "http://localhost:5223/api/pharmacy/Sale/lessSoldMedicine";
export const end14 = "http://localhost:5223/api/pharmacy/Sale/month";
export const end25 = "http://localhost:5223/api/pharmacy/Sale/patientsByMedicine2023";
export const end12 = "http://localhost:5223/api/pharmacy/Sale/patientsByMedicine";
export const end33 = "http://localhost:5223/api/pharmacy/Sale/patientTotalSpent";
export const end36 = "http://localhost:5223/api/pharmacy/Sale/totalMedicinesQuarter";

export const end10 = "http://localhost:5223/api/pharmacy/Medicine/moreExpensive";
export const end22 = "http://localhost:5223/api/pharmacy/Sale/patientMoreSpent";
export const end30 = "http://localhost:5223/api/pharmacy/Patient/patientsWithNoSalesIn2023";

//MEDICINES
export const getMedicines = "http://localhost:5223/api/pharmacy/Medicine/";
export const end1 = "http://localhost:5223/api/pharmacy/Medicine/underStock";
export const end2 = "http://localhost:5223/api/pharmacy/Medicine/GetProvidersInfoWithMedicines";
export const end6 = "http://localhost:5223/api/pharmacy/Medicine/ExpiresUnder";
export const end26 = "http://localhost:5223/api/pharmacy/Medicine/salesIn";
export const end38 = "http://localhost:5223/api/pharmacy/Medicine/getRange";



//EMPLOYEES
export const getEmployees = "http://localhost:5223/api/pharmacy/Employee/";


//PATIENTS
export const getPatients = "http://localhost:5223/api/pharmacy/Patient/";

/* Routes HTML */
export const indexRoute = "../Modules/index.js"; 
