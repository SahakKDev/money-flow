import { logoutAccount } from './auth.js';
import {
  calcDisplayBalance,
  calcDisplaySummary,
  displayMovements,
} from './movements.js';
import state from './state.js';

const welcomeLabel = document.querySelector('.welcome-message');
const currentBalanceDateLabel = document.querySelector('.balance-info__date');
const timeLabel = document.querySelector('.timer-label');

export function updateUI() {
  displayMovements();
  calcDisplayBalance();
  calcDisplaySummary();
}

export function updateWelcomeMessage() {
  const { currentAccount } = state;
  if (!currentAccount) {
    welcomeLabel.textContent = 'Log in to get started';
    return;
  }

  const { owner } = currentAccount;

  const accOwnerName = owner.split(' ')[0];
  welcomeLabel.textContent = `Welcome back, ${accOwnerName}`;
}

export function updateCurrentBalanceDate() {
  const { currentAccount } = state;

  const date = new Intl.DateTimeFormat(currentAccount.locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  currentBalanceDateLabel.textContent = date;
}

export function setTimer() {
  let min = String(Math.trunc(state.timer / 60)).padStart(2, 0);
  let sec = String(state.timer % 60).padStart(2, 0);
  timeLabel.textContent = `${min}:${sec}`;

  state.timerId = setInterval(() => {
    state.timer--;
    min = String(Math.trunc(state.timer / 60)).padStart(2, 0);
    sec = String(state.timer % 60).padStart(2, 0);
    timeLabel.textContent = `${min}:${sec}`;

    if (state.timer === 0) {
      logoutAccount();
    }
  }, 1000);
}

export function stopTimer() {}
