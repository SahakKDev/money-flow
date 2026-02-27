'use strict';

import { account1 } from './account.js';
import {
  closeAccount,
  loginAccount,
  requestLoan,
  transferMoney,
  updateUI,
  updateWelcomeMessage,
} from './actions.js';
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
const btnRequestLoan = document.querySelector('.btn-request-loan');
const btnCloseAccount = document.querySelector('.btn-close-account');

/* **********************
  STATE
 ********************* */
const { currentAccount } = state;

//TODO
updateUI(currentAccount);
updateWelcomeMessage(currentAccount.owner);
/* ************************* */

/* **********************
  EVENT LISTENERS
 ********************* */

btnLogin.addEventListener('click', loginAccount);
btnTransferMoney.addEventListener('click', transferMoney);
btnRequestLoan.addEventListener('click', requestLoan);
btnCloseAccount.addEventListener('click', closeAccount);
