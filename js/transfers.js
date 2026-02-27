import state, { setStateTimer } from './state.js';
import { accounts } from './account.js';
import { setTimer, updateCurrentBalanceDate, updateUI } from './ui-actions.js';

const requestLoanInput = document.querySelector('.request-loan__input');

const transferAccountUsernameInput = document.querySelector(
  '.transfer-money__input-transfer-to',
);
const transferAccountAmountInput = document.querySelector(
  '.transfer-money__input-transfer-amount',
);

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

    updateUI();
    updateCurrentBalanceDate();
    setStateTimer();
    setTimer();
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
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI();
      updateCurrentBalanceDate();
      setStateTimer();
      setTimer();
    }, 2500);
  }

  requestLoanInput.value = '';
  requestLoanInput.blur();
}
