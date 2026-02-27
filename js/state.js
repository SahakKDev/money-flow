import { account1 } from './account.js';

export const initialState = {
  currentAccount: account1,
  sortMovements: false,
};

export default {
  ...initialState,
};
