const movementsContainer = document.querySelector('.movements');

export function displayMovements(account) {
  movementsContainer.innerHTML = '';
  const { movements, movementsDates, locale } = account;

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = movementsDates[i];

    movementsContainer.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="movement__row">
          <p class="movement-type movement__${type}">${i + 1} ${type}</p>
          <p class="movement-date">${new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            day: '2-digit',
            month: '2-digit',
          }).format(new Date(date))}
          </p>
          <p class="movement-money">${mov}$</p>
        </div>
      `,
    );
  });
}
