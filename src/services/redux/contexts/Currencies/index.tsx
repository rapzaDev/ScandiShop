import { createSlice } from '@reduxjs/toolkit';

const CurrenciesSlice = createSlice({
    name: "currencies",
    initialState: { 
        USD: true, 
        GBP: false,
        AUD: false,
        JPY: false,
        RUB: false
    },
    reducers: {
        setUSDCurrency: (state) => {
            state.USD = true
            state.GBP = false
            state.AUD = false
            state.JPY = false
            state.RUB = false
        },
        setGBPCurrency: (state) => {
            state.USD = false
            state.GBP = true
            state.AUD = false
            state.JPY = false
            state.RUB = false
        },
        setAUDCurrency: (state) => {
            state.USD = false
            state.GBP = false
            state.AUD = true
            state.JPY = false
            state.RUB = false
        },
        setJPYCurrency: (state) => {
            state.USD = false
            state.GBP = false
            state.AUD = false
            state.JPY = true
            state.RUB = false
        },
        setRUBCurrency: (state) => {
            state.USD = false
            state.GBP = false
            state.AUD = false
            state.JPY = false
            state.RUB = true
        },

    }
});

export default CurrenciesSlice;