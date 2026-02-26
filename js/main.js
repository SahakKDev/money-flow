'use strict';

import { account1 } from './account.js';
import { getCurrencySign } from './helper.js';

//TODO
document.querySelector('main').classList.remove('hidden');
/* ************************* */

const movementsContainer = document.querySelector('.movements');
const balanceLabel = document.querySelector('.balance-money');
const incomesLabel = document.querySelector('.incomes');
const outflowsLabel = document.querySelector('.outflows');
const interestLabel = document.querySelector('.interest');

/* **********************
  STATE
 ********************* */

let currentAccount = account1;

function displayMovements(account) {
  movementsContainer.innerHTML = '';
  const { movements, currency } = account;

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    movementsContainer.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="movement__row">
          <p class="movement-type movement__${type}">${i + 1} ${type}</p>
          <p class="movement-date">20/02/2027</p>
          <p class="movement-money">${mov}${getCurrencySign(currency)}</p>
        </div>
      `,
    );
  });
}
displayMovements(currentAccount);

function calcDisplayBalance(account) {
  const { movements, currency } = account;
  const balance = movements.reduce((acc, cur) => acc + cur, 0);

  balanceLabel.textContent = `${balance.toFixed(2)}${getCurrencySign(currency)}`;
}
calcDisplayBalance(currentAccount);

function calcDisplaySummary(account) {
  const { movements, currency, interestRate } = account;
  const currencySign = getCurrencySign(currency);

  const deposits = movements.filter((mov) => mov > 0);
  const incomes = deposits.reduce((acc, cur) => acc + cur, 0).toFixed(2);

  const outflows = Math.abs(
    movements.filter((mov) => mov < 0).reduce((acc, cur) => acc + cur, 0),
  ).toFixed(2);

  const interest = deposits
    .map((dep) => {
      const interest = (dep * interestRate) / 100;

      return interest >= 1 ? interest : 0;
    })
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  incomesLabel.textContent = `${incomes}${currencySign}`;
  outflowsLabel.textContent = `${outflows}${currencySign}`;
  interestLabel.textContent = `${interest}${currencySign}`;
}
calcDisplaySummary(currentAccount);
