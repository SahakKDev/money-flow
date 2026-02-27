import { accounts } from './account.js';
import { calcDisplayBalance, calcDisplaySummary } from './calculations.js';
import { displayMovements } from './movements.js';
import state from './state.js';

const mainDocument = document.querySelector('main');
const welcomeLabel = document.querySelector('.welcome-message');

const loginUserInput = document.querySelector('.login-form__user');
const loginUserPin = document.querySelector('.login-form__pin');

const requestLoanInput = document.querySelector('.request-loan__input');

const closeAccountUserInput = document.querySelector(
  '.close-account__input-user',
);
const closeAccountPinInput = document.querySelector(
  '.close-account__input-pin',
);

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
    updateWelcomeMessage(currentAccount.owner);
    mainDocument.classList.remove('hidden');
  } else {
    mainDocument.classList.add('hidden');
    updateWelcomeMessage()
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

export function requestLoan(e) {
  e.preventDefault();
  const { currentAccount } = state;

  const amount = +requestLoanInput.value;

  const incomes = currentAccount.movements.filter((mov) => mov > 0);

  if (
    Number.isFinite(amount) &&
    amount > 0 &&
    incomes.some((income) => amount * 0.1 <= income)
  ) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  }

  requestLoanInput.value = '';
  requestLoanInput.blur();
}

export function closeAccount(e) {
  e.preventDefault();

  const {
    currentAccount: { username, pin },
  } = state;

  if (
    closeAccountUserInput.value === username &&
    +closeAccountPinInput.value === pin
  ) {
    mainDocument.classList.add('hidden');
    state.currentAccount = null;
    updateWelcomeMessage();
  }

  closeAccountUserInput.value = '';
  closeAccountPinInput.value = '';
  closeAccountPinInput.blur();

  const currentAccountIndex = accounts.findIndex(
    (acc) => acc.username === username,
  );

  accounts.splice(currentAccountIndex, 1);
}

//TODO remove export
export function updateUI(currentAccount) {
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
}
//TODO remove export
export function updateWelcomeMessage(owner) {
  if (!owner) {
    welcomeLabel.textContent = 'Log in to get started';
    return
  }

  const accOwnerName = owner.split(' ')[0];

  welcomeLabel.textContent = `Welcome back, ${accOwnerName}`;
}
