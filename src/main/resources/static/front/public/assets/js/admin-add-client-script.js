// Function to fetch countries
export async function fetchCountries(selectedCountry) {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Error fetching countries.');
        }
        const data = await response.json();
        const countrySelect = document.getElementById('country');

        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2;
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });

        if (selectedCountry) {
            countrySelect.value = selectedCountry;
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Function to fetch currencies
export async function fetchCurrencies(selectedCurrency) {
    try {
        const response = await fetch('https://openexchangerates.org/api/currencies.json');
        if (!response.ok) {
            throw new Error('Error fetching currencies.');
        }
        const data = await response.json();
        const currencySelect = document.getElementById('currency');

        Object.entries(data).forEach(([code, name]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${name} (${code})`;
            currencySelect.appendChild(option);
        });

        if (selectedCurrency) {
            currencySelect.value = selectedCurrency;
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Function to initialize the form (similar to $(document).ready)
export function initializeForm() {
    const selectedCountry = document.getElementById('selectedCountry').value;
    const selectedCurrency = document.getElementById('selectedCurrency').value;

    fetchCountries(selectedCountry);
    fetchCurrencies(selectedCurrency);
}

// Call the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeForm);
