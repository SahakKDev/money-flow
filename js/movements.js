import state from './state.js';

const movementsContainer = document.querySelector('.movements');
const balanceLabel = document.querySelector('.balance-money');
const incomesLabel = document.querySelector('.incomes');
const outflowsLabel = document.querySelector('.outflows');
const interestLabel = document.querySelector('.interest');

export function displayMovements(sort = false) {
  movementsContainer.innerHTML = '';
  const { movements, movementsDates, locale } = state.currentAccount;

  const combinedDateMovs = movements.map((movement, i) => ({
    movement,
    movementDate: movementsDates[i],
  }));

  const updatedMoves = sort
    ? combinedDateMovs.slice().sort((a, b) => a.movement - b.movement)
    : combinedDateMovs;

  updatedMoves.forEach(({ movement, movementDate }, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    let date;
    const currentDate = new Date(movementDate);
    const now = new Date();

    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);

    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (now - currentDate < ONE_DAY) {
      date = 'today';
    } else if (now - currentDate < 2 * ONE_DAY) {
      date = 'yesterday';
    } else if (
      now - currentDate < 8 * ONE_DAY &&
      now.getDate() - currentDate.getDate() !== 8
    ) {
      date = `${now.getDate() - currentDate.getDate()} days ago`;
    } else {
      date = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        day: '2-digit',
        month: '2-digit',
      }).format(currentDate);
    }

    movementsContainer.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="movement__row">
          <p class="movement-type movement__${type}">${i + 1} ${type}</p>
          <p class="movement-date">${date}
          </p>
          <p class="movement-money">${movement.toFixed(2)}$</p>
        </div>
      `,
    );
  });
}

export function sortMovements(e) {
  e.preventDefault();

  displayMovements(!state.sortMovements);

  state.sortMovements = !state.sortMovements;
}

export function calcDisplayBalance() {
  const { currentAccount } = state;

  const balance = currentAccount.movements.reduce((acc, cur) => acc + cur, 0);
  currentAccount.balance = balance;

  balanceLabel.textContent = `${balance.toFixed(2)}$`;
}

export function calcDisplaySummary() {
  const { movements, interestRate } = state.currentAccount;

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
