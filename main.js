function validateAmount(amount) {
    if (amount <= 8000000 && amount >= 3000000) {
        return true;
    }
    return false;
}

function getOptionSelected(option) {
    const loanOptions = [
        {option: 1, text: "12 Cuotas", percent: 1.02, quantity: 12},
        {option: 2, text: "24 Cuotas", percent: 1.12, quantity: 24},
        {option: 3, text: "36 Cuotas", percent: 1.24, quantity: 36},
        {option: 4, text: "48 Cuotas", percent: 1.32, quantity: 48},
    ];
    return loanOptions.find((items) => {
        return items.option == option;
    });    
}

function calculateLoan(loanData, loanOptionSelected) {
    let monthlyLoan = 0;
    monthlyLoan = loanData.loanApplication / loanOptionSelected.quantity * loanOptionSelected.percent;
    monthlyLoan = toCountryCost('es-CO', monthlyLoan);
    monthlyLoan = monthlyLoan.split(',')[0];
    return monthlyLoan;
}

function toCountryCost(country, value) {
    return new Intl.NumberFormat(country).format(value);
}

function showError(message) {
    document.querySelector(".resultado").innerText = message;
}

// Obteniendo elementos del DOM
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const installments = document.getElementById("installments");
const loan = document.getElementById("loan");

// Evento para enviar formulario
document.querySelector(".button").addEventListener("click", function () {
    console.log(installments.options[installments.selectedIndex].text);
    const isValidAmount = validateAmount(loan.value);
    if (isValidAmount) {
        showError("El monto que usted quiere usar no funca");
    }
});
