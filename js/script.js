const inputBill = document.getElementById("bill-input");
const buttons = document.querySelectorAll(".btn-tip");
const inputCustomTip = document.getElementById("custom-tip-input");
const peopleError = document.getElementById("people-error");
const inputPeople = document.getElementById("people-input");
const tipAmountResult = document.getElementById("tip-amount-result");
const totalAmountResult = document.getElementById("total-amount-result");
const btnReset = document.getElementById("reset-button");

let bill = 0;
let people = 0;
let tipPercentage = 0;

function toggleResetButton() {
  if (
    inputBill.value !== "" ||
    inputPeople.value !== "" ||
    inputCustomTip.value !== "" ||
    tipPercentage > 0
  ) {
    btnReset.disabled = false;
  } else {
    btnReset.disabled = true;
  }
}

function handleBillInput() {
  bill = parseFloat(inputBill.value);

  toggleResetButton();
  calculateTip();
}

function handlePeopleInput() {
  people = parseFloat(inputPeople.value);

  if (people === 0) {
    inputPeople.blur(); // tira o foco do input
    inputPeople.parentElement.classList.add("error-message");
    peopleError.classList.add("error-message");
  } else {
    inputPeople.parentElement.classList.remove("error-message");
    peopleError.classList.remove("error-message");
  }

  toggleResetButton();
  calculateTip();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // remover a classes dos botões que tinha
    buttons.forEach((btn) => btn.classList.remove("selected"));

    button.classList.add("selected");

    tipPercentage = parseFloat(button.dataset.percentage);

    inputCustomTip.value = "";

    toggleResetButton();
    calculateTip();
  });
});

function handleCustomTipInput() {
  buttons.forEach((btn) => btn.classList.remove("selected"));

  tipPercentage = parseFloat(inputCustomTip.value);

  // se apagar o que digitou garante que fica 0
  if (isNaN(tipPercentage)) {
    tipPercentage = 0;
  }

  toggleResetButton();
  calculateTip();
}

function calculateTip() {
  if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
    tipAmountResult.innerText = "0.00";
    totalAmountResult.innerText = "0.00";
    return;
  }

  const totalTip = bill * (tipPercentage / 100);

  // calcula quanto de gorjeta cada pessoa vai pagar
  const tipPerPerson = totalTip / people;

  // calcula o total por pessoa (conta dividida + gorjeta dividida)
  const totalPerPerson = bill / people + tipPerPerson;

  tipAmountResult.innerText = tipPerPerson.toFixed(2);
  totalAmountResult.innerText = totalPerPerson.toFixed(2);
}

btnReset.addEventListener("click", () => {
  bill = 0;
  people = 0;
  tipPercentage = 0;

  inputBill.value = "";
  inputPeople.value = "";
  inputCustomTip.value = "";

  tipAmountResult.innerText = "0.00";
  totalAmountResult.innerText = "0.00";

  // remove o erro visual se caso estiver ativo
  inputPeople.parentElement.classList.remove("error-message");
  peopleError.classList.remove("error-message");

  // remove o botão selecionado
  buttons.forEach((btn) => btn.classList.remove("selected"));

  // Na última linha do clique do btnReset:
  btnReset.disabled = true;
});

inputBill.addEventListener("input", handleBillInput);
inputPeople.addEventListener("input", handlePeopleInput);
inputCustomTip.addEventListener("input", handleCustomTipInput);
