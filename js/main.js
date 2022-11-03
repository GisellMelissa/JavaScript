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
        const newOptions = [{
            option: 5,
            text: "60 Cuotas",
            percent: 1.40,
            quantity: 60
        }, ...loanOptions];
        return newOptions.find((items) => {
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

async function currencyExchange(from, to) {
    const response = await fetch('https://api.currencyapi.com/v3/latest?apikey=LCSMPu0q4wv7AM87TJWebnwyr5HcII9hns2I55hj&currencies=' + from + '%2C'+ to, {
        method: 'GET',
        redirect: 'follow'
    });
    const responseData = await response.json();
    console.table(responseData)
    return responseData.data.COP.value;
}

function showMessage(message, success) {
    const iconStatus = success ? 'success' : 'error';
    Swal.fire({
        position: 'center',
        icon: iconStatus,
        text: message,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        color: "#000000",
        backdrop: "rgba(90, 64, 152, 0.3)",
    }).then((onDestroy) => {
        if(onDestroy.isConfirmed) {
            Swal.fire({position: 'center', icon: 'info', text: 'Perfecto. En el transcurso del día uno de nuestros asesores te contactará', color: "#000000", backdrop: "rgba(90, 64, 152, 0.3)"});
        } else {
            Swal.fire({position: 'center', icon: 'info', text: 'Estaremos atentos a cualquier duda', color: "#000000", backdrop: "rgba(90, 64, 152, 0.3)"});
        }
    });
}

// Obteniendo elementos del DOM
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const installments = document.getElementById("installments");
const loan = document.getElementById("loan");
const loanRequest = new LoanRequest(fname, lname, email, phone, installments, loan);

// Obteniendo valores temporales aplicando desestructuración
if (localStorage.getItem("form")) {
    const {name, surname, email, phone, installments, loan} = JSON.parse(localStorage.getItem("form"));
    loanRequest.name.value = name;
    loanRequest.surname.value = surname;
    loanRequest.email.value = email;
    loanRequest.phone.value = phone;
    loanRequest.installments.value = installments;
    loanRequest.loan.value = loan;
}

// Evento para enviar formulario
document.querySelector("#button").addEventListener("click", async function (e) {
    e.preventDefault();
    const isValidAmount = loanRequest.validateAmount(loanRequest.loan.value);
    if (!isValidAmount) {
        return showMessage("El monto que ingresaste no es válido", false);
    }
    const option = loanRequest.installments.options[loanRequest.installments.selectedIndex].value;
    const loanSelected = loanRequest.getOptionSelected(option);
    const loanAmount = loanRequest.calculateLoan(loanRequest.loan.value, loanSelected);
    const {name, surname} = loanRequest;
    const currencyCoptoUsd = await currencyExchange('USD','COP');
    const priceInUsd = loanAmount / Math.round(currencyCoptoUsd) * 1000;
    finalMessage = name.value + " " + surname.value + ", el valor de tus cuotas mensuales sería de: $" + loanAmount + "COP ó $" + toCountryCost('USD', priceInUsd) + "USD. ¿Deseas ampliar la información?";
    return showMessage(finalMessage, true);
});

//Evento para validar Correo
loanRequest.email.addEventListener("keydown", function (e) {
    const expRegular = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    if (this.value.length < 5) {
        this.classList.remove(["success", "failed"]);
        return;
    }
    const logMessage = (expRegular.test(this.value)) ? "Correo Válido" : "Correo Inválido";
    if (expRegular.test(this.value)) {
        console.log(logMessage);
        this.classList.add("success");
        this.classList.remove("failed");
    } else {
        console.log(logMessage);
        this.classList.remove("success");
        this.classList.add("failed");
    }
});

document.getElementById("form").addEventListener("keypress", () => loanRequest.keepFill());
