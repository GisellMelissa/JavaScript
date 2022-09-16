function toCountryCost(country, value) {
    return new Intl.NumberFormat(country).format(value);
}

alert("Hola, somos MasterLoans, una empresa que te facilita préstamos si deseas emprender. ¡Queremos ser parte de tu proceso!")

const nombre = prompt("Ingresa tu nombre si deseas asesoramiento: ");
console.log(nombre);

alert("¡Bienvenido " + nombre + "!");

const loanOptions = [
    {option: 1, text: "12 Cuotas", percent: 1.02, quantity: 12},
    {option: 2, text: "24 Cuotas", percent: 1.12, quantity: 24},
    {option: 3, text: "36 Cuotas", percent: 1.24, quantity: 36},
    {option: 4, text: "48 Cuotas", percent: 1.32, quantity: 48},
];

function listOptions (arrayOptions){
    let textOptions = "Elige la cantidad de cuotas: ";
    let counter = 0;
    for (option of arrayOptions) {
        counter++;
        textOptions = textOptions + "\n " + counter + ") " + option.text;        
    }
    return textOptions;
}

function getLoanApplication(){
    let loanApplication = prompt("Simula tu crédito para emprender. ¿Cuál es la cantidad de dinero que deseas solicitar? (Ingresa el monto sin signos)");

    if (loanApplication <= 8000000 || loanApplication >= 3000000) {
        loanInstallments = prompt(listOptions(loanOptions));

    } else {
        alert("Prueba con otro monto. En AliPress solo realizamos prestamos de 3'000.000 a 8'000.000 millones COP");
    }
    while (loanApplication < 3000000 || loanApplication > 8000000) {
        loanApplication = prompt("Ingresa un valor entre $3000000 a $8000000");
    }

    return {loanApplication, loanInstallments};
}

let loanData = getLoanApplication();
while (loanData.loanInstallments < 1 || loanData.loanInstallments > 4){
    alert("Por favor introduzca un número de cuota válido.")
    loanData = getLoanApplication();
}
let monthlyLoan = 0;

const loanOptionSelected = loanOptions.find((items) => {
    return items.option == loanData.loanInstallments;
});

monthlyLoan = loanData.loanApplication / loanOptionSelected.quantity * loanOptionSelected.percent;
monthlyLoan = toCountryCost('es-CO', monthlyLoan);
monthlyLoan = monthlyLoan.split(',')[0];

alert("Tus cuotas mensuales serían de " + monthlyLoan);

let endCounseling = prompt("¿Deseas continuar con el proceso? (Escribe solo Si o No): ");

if (endCounseling.toUpperCase() == "SI" || endCounseling.toUpperCase() == "SÍ") {
    alert("¡Perfecto! Deja tus datos en el siguiente formulario y en breve nos comunicaremos contigo");
} else {
    alert("Estamos para ti cuando lo desees. Vuelve pronto")
}