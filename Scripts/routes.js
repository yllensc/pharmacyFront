/* Routes LocalHost */

// USER
export const login = "http://localhost:5223/api/pharmacy/User/token";

// PURCHASED
const purchase = "http://localhost:5223/api/pharmacy/Purchase";
export const getPurchase = purchase;
export const postManyPurchases = purchase + "/range";
export const end3 = purchase + "/medicinesPurchased";
export const end13 = purchase + "/providersWithoutPurchases";

// PROVIDER
const provider = "http://localhost:5223/api/pharmacy/Provider";
export const getProviders = provider + "/onlyProviders";
export const end16 = provider + "/gain2023";
export const end24 = provider + "/moreQuantityMedicines";
export const end28 = provider + "/totalProviders";
export const end35 = provider + "/aleast5medicines";

// SALES
const sale = "http://localhost:5223/api/pharmacy/Sale";
export const getSales = sale;
export const postManySales = sale + "/range";
export const end4 = sale + "/recipes";
export const end5 = sale + "/totalSaleOneMedicine";
export const end8 = sale + "/gainSales";
export const end9 = sale + "/unsoldMedicines2023";
export const end12 = sale + "/patientsByMedicine";
export const end14 = sale + "/month";
export const end15 = sale + "/lessSoldMedicine";
export const end17 = sale + "/average";
export const end21 = sale + "/unsoldMedicines";
export const end22 = sale + "/patientMoreSpent";
export const end25 = sale + "/patientsByMedicine2023";
export const end33 = sale + "/patientTotalSpent";
export const end36 = sale + "/totalMedicinesQuarter";

//MEDICINES
const medicine = "http://localhost:5223/api/pharmacy/Medicine";
export const getMedicines = medicine;
export const end1 = medicine + "/underStock";
export const end2 = medicine + "/GetProvidersInfoWithMedicines";
export const end6 = medicine + "/ExpiresUnder";
export const end26 = medicine + "/salesIn";
export const end38 = medicine + "/getRange";
export const end10 = medicine + "/moreExpensive";

//EMPLOYEES
const employee = "http://localhost:5223/api/pharmacy/Employee";
export const getEmployees = employee;
export const end18 = employee + "/";
export const end20 = employee + "/moreThan";
export const end23 = employee + "/noSalesIn";
export const end27 = employee + "/lessThan";
export const end32 = employee + "/mostDistinctMedicinesSoldIn";
export const end37 = employee + "/noSalesInMonth/";

//PATIENTS
export const getPatients = "http://localhost:5223/api/pharmacy/Patient/";
export const end30 = "http://localhost:5223/api/pharmacy/Patient/patientsWithNoSalesIn2023";

//PROVIDERS
export const end7 = "http://localhost:5223/api/pharmacy/Provider/getProvidersWithCantMedicines";
export const end11 = "http://localhost:5223/api/pharmacy/Provider/getProvidersWithCantTotalMedicines";
export const end29 = "http://localhost:5223/api/pharmacy/Provider/providersWithMedicinesUnder";
/* Routes HTML */
export const indexRoute = "../Modules/index.js";
