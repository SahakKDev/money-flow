'use strict';

import { account1 } from './account.js';
import { loginAccount } from './actions.js';
import { calcDisplayBalance, calcDisplaySummary } from './calculations.js';
import { getCurrencySign } from './helper.js';
import { displayMovements } from './movements.js';
import state from './state.js';

//TODO
// document.querySelector('main').classList.remove('hidden');
/* ************************* */

const movementsContainer = document.querySelector('.movements');
const balanceLabel = document.querySelector('.balance-money');
const incomesLabel = document.querySelector('.incomes');
const outflowsLabel = document.querySelector('.outflows');
const interestLabel = document.querySelector('.interest');
const btnLogin = document.querySelector('.btn-login');

/* **********************
  STATE
 ********************* */
const { currentAccount } = state;



/* **********************
  EVENT LISTENERS
 ********************* */
btnLogin.addEventListener('click', loginAccount);
