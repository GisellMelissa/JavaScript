class LoanRequest {

    constructor(name, surname, email, phone, installments, loan) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.installments = installments;
        this.loan = loan;
    }

    validateAmount(amount) {
        if (amount <= 10000000 && amount >= 3000000) {
            return true;
        }
        return false;
    }

    calculateLoan(amount, loanOptionSelected) {
        let monthlyLoan = 0;
        monthlyLoan = amount / loanOptionSelected.quantity * loanOptionSelected.percent;
        monthlyLoan = toCountryCost('es-CO', monthlyLoan);
        monthlyLoan = monthlyLoan.split(',')[0];
        return monthlyLoan;
    }

    getOptionSelected(option) {
        const loanOptions = [{
                option: 1,
                text: "12 Cuotas",
                percent: 1.02,
                quantity: 12
            },
            {
                option: 2,
                text: "24 Cuotas",
                percent: 1.12,
                quantity: 24
            },
            {
                option: 3,
                text: "36 Cuotas",
                percent: 1.24,
                quantity: 36
            },
            {
                option: 4,
                text: "48 Cuotas",
                percent: 1.32,
                quantity: 48
            },
        ];
        return loanOptions.find((items) => {
            return items.option == option;
        });
    }

    keepFill() {
        this.temporalyInformation = {
            name: this.name.value,
            surname: this.surname.value,
            email: this.email.value,
            phone: this.phone.value,
            installments: this.installments.value,
            loan: this.loan.value
        }
        localStorage.setItem("form", JSON.stringify(this.temporalyInformation));
    }

}


function toCountryCost(country, value) {
    return new Intl.NumberFormat(country).format(value);
}

function showMessage(message, success) {
    const resultado = document.getElementById("resultado");
    if (success) {
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
const loanRequest = new LoanRequest(fname, lname, email, phone, installments, loan);

// Obteniendo valores temporales
if (localStorage.getItem("form")) {
    const temporalyInfo = JSON.parse(localStorage.getItem("form"));
    loanRequest.name.value = temporalyInfo.name;
    loanRequest.surname.value = temporalyInfo.surname;
    loanRequest.email.value = temporalyInfo.email;
    loanRequest.phone.value = temporalyInfo.phone;
    loanRequest.installments.value = temporalyInfo.installments;
    loanRequest.loan.value = temporalyInfo.loan;

}

// Evento para enviar formulario
document.querySelector(".button").addEventListener("click", function (e) {
    e.preventDefault();
    const isValidAmount = loanRequest.validateAmount(loanRequest.loan.value);
    if (!isValidAmount) {
        return showMessage("El monto que ingresaste no es válido", false);
    }
    const option = loanRequest.installments.options[loanRequest.installments.selectedIndex].value;
    const loanSelected = loanRequest.getOptionSelected(option);
    const loanAmount = loanRequest.calculateLoan(loanRequest.loan.value, loanSelected);
    finalMessage = loanRequest.name.value + " " + loanRequest.surname.value + ", el valor de sus cuotas sería de: $" + loanAmount;
    return showMessage(finalMessage, true);
});

//Evento para validar Correo
loanRequest.email.addEventListener("keydown", function (e) {
    const expRegular = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    if (this.value.length < 5) {
        this.classList.remove(["success", "failed"]);
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

document.getElementById("form").addEventListener("keypress", () => loanRequest.keepFill());
