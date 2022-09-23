function validateAmount(amount) {
    if (amount <= 10000000 && amount >= 3000000) {
        return true;
    }
    return false;
}

// Escribe,e que hay que hacer
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

function calculateLoan(amount, loanOptionSelected) {
    let monthlyLoan = 0;
    monthlyLoan = amount / loanOptionSelected.quantity * loanOptionSelected.percent;
    monthlyLoan = toCountryCost('es-CO', monthlyLoan);
    monthlyLoan = monthlyLoan.split(',')[0];
    return monthlyLoan;
}

function toCountryCost(country, value) {
    return new Intl.NumberFormat(country).format(value);
}

function showMessage(message, success) {
    const resultado = document.getElementById("resultado");
    if(success) {
        resultado.style.color = "#00b300";
    } else {
        resultado.style.color = "#e00000";
    }
    resultado.innerText = message;
}

// Obteniendo elementos del DOM
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const installments = document.getElementById("installments");
const loan = document.getElementById("loan");

// Evento para enviar formulario
document.querySelector(".button").addEventListener("click", function (e) {
    e.preventDefault();
    const isValidAmount = validateAmount(loan.value);
    if (!isValidAmount) {
        return showMessage("El monto que ingresaste no es válido", false);
    } 
    const option = installments.options[installments.selectedIndex].value;
    const loanSelected = getOptionSelected(option);
    const loanAmount = calculateLoan(loan.value, loanSelected);
    finalMessage = fname.value + " " + lname.value + ", el valor de sus cuotas sería de: $" + loanAmount;
    return showMessage(finalMessage, true);
});

//Evento para validar Correo
email.addEventListener("keydown", function (e) {
    const expRegular = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    if (this.value.length < 5) {
        this.classList.remove(["success","failed"]);        
        return;
    }
    if (expRegular.test(this.value)) {
        console.log("Correo Válido");
        this.classList.add("success");
        this.classList.remove("failed");
    } else {
        console.log("Correo Inválido");
        this.classList.remove("success");
        this.classList.add("failed");
    }
    
});
