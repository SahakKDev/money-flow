import {
  calcDisplayBalance,
  calcDisplaySummary,
  displayMovements,
} from './movements.js';
import state from './state.js';

const welcomeLabel = document.querySelector('.welcome-message');
const currentBalanceDateLabel = document.querySelector('.balance-info__date');

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
