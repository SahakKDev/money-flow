import state, { resetState, setStateTimer } from './state.js';
import { accounts } from './account.js';
import {
  setTimer,
  updateCurrentBalanceDate,
  updateUI,
  updateWelcomeMessage,
} from './ui-actions.js';

const mainDocument = document.querySelector('main');

const loginUserInput = document.querySelector('.login-form__user');
const loginUserPin = document.querySelector('.login-form__pin');

const closeAccountUserInput = document.querySelector(
  '.close-account__input-user',
);
const closeAccountPinInput = document.querySelector(
  '.close-account__input-pin',
);

export function loginAccount(e) {
  e.preventDefault();
  setStateTimer();

  const currentAccount = accounts.find(
    (acc) =>
      acc.username === loginUserInput.value && acc.pin === +loginUserPin.value,
  );

  if (currentAccount) {
    state.currentAccount = currentAccount;
    mainDocument.classList.remove('hidden');
    updateUI();
    updateWelcomeMessage();
    mainDocument.classList.remove('hidden');
    updateCurrentBalanceDate();
    setTimer();
  } else {
    logoutAccount();
  }

  loginUserInput.value = '';
  loginUserPin.value = '';
  loginUserPin.blur();
}

export function logoutAccount() {
  resetState();
  mainDocument.classList.add('hidden');
  updateWelcomeMessage();
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
    logoutAccount();

    const currentAccountIndex = accounts.findIndex(
      (acc) => acc.username === username,
    );

    accounts.splice(currentAccountIndex, 1);
  }

  closeAccountUserInput.value = '';
  closeAccountPinInput.value = '';
  closeAccountPinInput.blur();
}
