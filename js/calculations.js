import { getCurrencySign } from './helper.js';

const balanceLabel = document.querySelector('.balance-money');
const incomesLabel = document.querySelector('.incomes');
const outflowsLabel = document.querySelector('.outflows');
const interestLabel = document.querySelector('.interest');

export function calcDisplayBalance(account) {
  const { movements, currency } = account;
  const balance = movements.reduce((acc, cur) => acc + cur, 0);

  balanceLabel.textContent = `${balance.toFixed(2)}${getCurrencySign(currency)}`;
}

export function calcDisplaySummary(account) {
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
