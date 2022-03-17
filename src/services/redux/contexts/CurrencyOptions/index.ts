import { createSlice } from '@reduxjs/toolkit';

const CurrencyOptionsSlice = createSlice({
  name: 'currencyEnabled',
  initialState: { value: false, currencyOptionsActive: false },
  reducers: {
    handleChangeMyCurrencyOptionsState: (state) => {
      state.value = !state.value;
    },
    deactivateCurrencyOptionsComponent: (state) => {
      state.currencyOptionsActive = false;
    },
    activateCurrencyOptionsComponent: (state) => {
      state.currencyOptionsActive = true;
    },
  },
});

export default CurrencyOptionsSlice;
