const balanceLabel = document.querySelector('.balance-money');
const incomesLabel = document.querySelector('.incomes');
const outflowsLabel = document.querySelector('.outflows');
const interestLabel = document.querySelector('.interest');

export function calcDisplayBalance(account) {
  const { movements } = account;
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  account.balance = balance;

  balanceLabel.textContent = `${balance.toFixed(2)}$`;
}

export function calcDisplaySummary(account) {
  const { movements, interestRate } = account;

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

  incomesLabel.textContent = `${incomes}$`;
  outflowsLabel.textContent = `${outflows}$`;
  interestLabel.textContent = `${interest}$`;
}
