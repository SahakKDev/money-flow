import { accounts } from './account.js';
import { calcDisplayBalance, calcDisplaySummary } from './calculations.js';
import { displayMovements } from './movements.js';
import state from './state.js';

const loginUserInput = document.querySelector('.login-form__user');
const loginUserPin = document.querySelector('.login-form__pin');
const mainDocument = document.querySelector('main');
const welcomeLabel = document.querySelector('.welcome-message');

const transferAccountUsernameInput = document.querySelector(
  '.transfer-money__input-transfer-to',
);
const transferAccountAmountInput = document.querySelector(
  '.transfer-money__input-transfer-amount',
);

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

export function transferMoney(e) {
  e.preventDefault();

  const transferAccount = accounts.find(
    (acc) => acc.username === transferAccountUsernameInput.value,
  );

  const transferAmount = +transferAccountAmountInput.value;

  if (
    transferAccount &&
    transferAccount !== state.currentAccount &&
    Number.isFinite(transferAmount) &&
    transferAmount > 0 &&
    transferAmount <= state.currentAccount.balance
  ) {
    const newDate = new Date().toISOString();

    transferAccount.movements.push(transferAmount);
    transferAccount.movementsDates.push(newDate);
    state.currentAccount.movements.push(-transferAmount);
    state.currentAccount.movementsDates.push(newDate);

    updateUI(state.currentAccount);
  }

  transferAccountUsernameInput.value = '';
  transferAccountAmountInput.value = '';
  transferAccountAmountInput.blur();
}

//TODO remove export
export function updateUI(currentAccount) {
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);

  const accOwnerName = currentAccount.owner.split(' ')[0];

  welcomeLabel.textContent = `Welcome back, ${accOwnerName}`;
}
