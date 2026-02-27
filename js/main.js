'use strict';

import { closeAccount, loginAccount } from './auth.js';
import { requestLoan, transferMoney } from './transfers.js';
import { sortMovements } from './movements.js';

const btnLogin = document.querySelector('.btn-login');
const btnTransferMoney = document.querySelector('.btn-transfer-money');
const btnRequestLoan = document.querySelector('.btn-request-loan');
const btnCloseAccount = document.querySelector('.btn-close-account');
const btnSort = document.querySelector('.btn-sort');

btnLogin.addEventListener('click', loginAccount);
btnTransferMoney.addEventListener('click', transferMoney);
btnRequestLoan.addEventListener('click', requestLoan);
btnCloseAccount.addEventListener('click', closeAccount);
btnSort.addEventListener('click', sortMovements);
