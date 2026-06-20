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

function handleBillInput() {
  bill = parseFloat(inputBill.value);
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
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // remover a classes dos botões que tinha
    buttons.forEach((btn) => btn.classList.remove("selected"));

    button.classList.add("selected");

    tipPercentage = parseFloat(button.dataset.percentage);

    inputCustomTip.value = "";
  });
});

function handleCustomTipInput() {
  buttons.forEach((btn) => btn.classList.remove("selected"));

  tipPercentage = parseFloat(inputCustomTip.value);

  // se apagar o que digitou garante que fica 0
  if (isNaN(tipPercentage)) {
    tipPercentage = 0;
  }
}

inputBill.addEventListener("input", handleBillInput);
inputPeople.addEventListener("input", handlePeopleInput);
inputCustomTip.addEventListener("input", handleCustomTipInput);
