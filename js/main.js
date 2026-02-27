'use strict';

import { account1 } from './account.js';
import { loginAccount, transferMoney, updateUI } from './actions.js';
import { calcDisplayBalance, calcDisplaySummary } from './calculations.js';
import { displayMovements } from './movements.js';
import state from './state.js';

//TODO
document.querySelector('main').classList.remove('hidden');
/* ************************* */

const movementsContainer = document.querySelector('.movements');
const balanceLabel = document.querySelector('.balance-money');
const incomesLabel = document.querySelector('.incomes');
const outflowsLabel = document.querySelector('.outflows');
const interestLabel = document.querySelector('.interest');

const btnLogin = document.querySelector('.btn-login');
const btnTransferMoney = document.querySelector('.btn-transfer-money');

/* **********************
  STATE
 ********************* */
const { currentAccount } = state;

//TODO
updateUI(currentAccount);
/* ************************* */

/* **********************
  EVENT LISTENERS
 ********************* */

btnLogin.addEventListener('click', loginAccount);
btnTransferMoney.addEventListener('click', transferMoney);
