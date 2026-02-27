import { getCurrencySign } from './helper.js';

const movementsContainer = document.querySelector('.movements');

export function displayMovements(account) {
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