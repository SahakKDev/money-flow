import { accounts } from './account.js';
import { calcDisplayBalance, calcDisplaySummary } from './calculations.js';
import { displayMovements } from './movements.js';
import state from './state.js';

const loginUserInput = document.querySelector('.login-form__user');
const loginUserPin = document.querySelector('.login-form__pin');
const mainDocument = document.querySelector('main');

export function loginAccount(e) {
  e.preventDefault();

  const currentAccount = accounts.find(
    (acc) =>
      acc.username === loginUserInput.value && acc.pin === +loginUserPin.value,
  );

  if (currentAccount) {
    state.currentAccount = currentAccount;
    mainDocument.classList.remove('hidden');
    updateUI(currentAccount);
  }

  loginUserInput.value = '';
  loginUserPin.value = '';
  loginUserPin.blur();
}

function updateUI(currentAccount) {
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
}
