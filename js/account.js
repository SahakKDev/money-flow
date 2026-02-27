class Account {
  constructor(
    owner,
    movements,
    movementsDates,
    locale,
    interestRate,
    pin,
  ) {
    this.owner = owner;
    this.movements = movements;
    this.movementsDates = movementsDates;
    this.locale = locale;
    this.interestRate = interestRate;
    this.pin = pin;
  }
}

const account1 = new Account(
  'Jonas Schmedtmann',
  [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  [
    '2025-01-14T08:23:41.372Z',
    '2025-03-27T14:55:09.104Z',
    '2025-05-09T02:11:37.889Z',
    '2025-07-22T19:48:52.563Z',
    '2025-09-03T06:34:15.047Z',
    '2025-11-18T21:07:29.915Z',
    '2025-12-30T11:59:03.228Z',
    '2026-02-05T04:16:44.731Z',
  ],
  'pt-PT',
  1.2,
  1111,
);

const account2 = new Account(
  'Jessica Davis',
  [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  [
    '2025-02-05T04:16:44.731Z',
    '2025-04-16T17:29:58.390Z',
    '2025-06-28T09:03:12.652Z',
    '2025-08-11T23:41:26.178Z',
    '2025-10-24T12:18:39.804Z',
    '2025-11-07T07:52:10.269Z',
    '2026-02-19T15:26:57.943Z',
    '2026-02-23T15:26:57.943Z',
  ],
  'en-US',
  1.5,
  2222,
);

const accounts = [account1, account2];

function computeUsernames() {
  accounts.forEach((acc) => {
    const { owner } = acc;
    acc.username = owner
      .split(' ')
      .map((n) => n[0].toLowerCase())
      .join('');
  });
}
computeUsernames();

export { account1, account2, accounts };
