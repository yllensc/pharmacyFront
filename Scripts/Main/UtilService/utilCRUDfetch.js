import { getTokenFromCookies } from "./AuthenticationToken.js"
//urls
export const urlProvider = "http://localhost:5223/api/pharmacy/Provider";
export const urlMedicine = "http://localhost:5223/api/pharmacy/Medicine";

//get Providers
export async function fetchProviders() {
    try {
        const response = await fetch(`${urlProvider}/getProviders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getTokenFromCookies()}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
            
        } else {
            console.error('Error al obtener la lista de proveedores:', response.statusText);
            alert(`Error al obtener la lista de proveedores - Error: ${response.status}: ${response.statusText}`);

            return [];
        }
    } catch (error) {
        console.error('Error al realizar la solicitud GET:', error);
        alert(`Error al realizar la solicitud GET - Error: ${error}`);

        return [];
    }
}

//get Medicines
export async function fetchMedicines() {
    try {
        const response = await fetch(`${urlMedicine}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getTokenFromCookies()}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error al obtener la lista de medicamentos:', response.statusText);
            alert(`Error al obtener la lista de medicamentos - Error: ${response.status}: ${response.statusText}`);

            return [];
        }
    } catch (error) {
        console.error('Error al realizar la solicitud GET:', error);
        return [];
    }
}
