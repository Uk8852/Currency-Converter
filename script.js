const fromamountelement = document.querySelector('.amount');
const convertedamountelement = document.querySelector('.convertedamount');
const fromcurrencyelement = document.querySelector('.fromcurrency');
const tocurrencyelement = document.querySelector('.tocurrency');
const resultelement = document.querySelector('.result');
const converter = document.querySelector('.converter');

//ARREY TO POPULATE THE SELECT TAGS WITH THESE COUNTRIES
const countries = [
    { code: "USD", name: "United state Dollar" },
    { code: "INR", name: "Indian Rupee" }
];

//showing countries from array to select tag

// yaha hum for each loop ka use kar rahe hai jis se const countries ka sara value fromcurrencyelement and tocurrencyelement me aa jaye
countries.forEach(country => {
    //yaha hum option1 naam ka ek element create kiye hai hum      
    const option1 = document.createElement('option');
    option1.value = country.code;
    option1.textContent = `${country.code} (${country.name})`;
    fromcurrencyelement.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = country.code;
    option2.textContent = `${country.code} (${country.name})`;
    tocurrencyelement.appendChild(option2);

    // iss process ke through hum default value ko set kar sakte hai
    fromcurrencyelement.value = "USD";
    tocurrencyelement.value = "INR";
});

//funcntion to get exchange using api
const getexchangerate = async () => {
    const amount = parseFloat(fromamountelement.value);
    const fromcurrency = fromcurrencyelement.value;
    const tocurrency = tocurrencyelement.value;
    resultelement.textContent = "Fetching Exchange Rates...";

    try{
        //fetch data from api
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`);
        const data = await response.json();
        const conversionrate = data.rates[tocurrency];
        const convertedamount = (amount * conversionrate).toFixed(2);

        convertedamountelement.value = convertedamount;
        resultelement.textContent = `${amount} ${fromcurrency} ${convertedamount} ${tocurrency}`
    }

    catch(error) {
        converter.innerHTML = `<h1>Error while fetching exchange rates!!</h1>`;
    }
}

//fetching exchange rate when user inputs the amount
fromamountelement.addEventListener('input', getexchangerate);

//fetching exchange rate when user change currency
fromcurrencyelement.addEventListener('change', getexchangerate);
tocurrencyelement.addEventListener('change', getexchangerate);

window.addEventListener('load', getexchangerate);