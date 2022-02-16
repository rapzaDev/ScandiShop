import { createSlice } from '@reduxjs/toolkit';

import { dispatch, getState } from '../store';

const CurrencyOptionsSlice = createSlice({
    name: "currencyEnabled",
    initialState: { value: false },
    reducers: {
        handleChangeMyCurrencyOptionsState: (state) => {
            state.value = !state.value
        }
    }
});

const { reducer, actions } = CurrencyOptionsSlice;

class CurrencyOptionsContext {

    private static INSTANCE: CurrencyOptionsContext;

    constructor() {
        this.changeMyCurrencyOptionsState = this.changeMyCurrencyOptionsState.bind(this);
    }

    public static getInstance() {
        if( !CurrencyOptionsContext.INSTANCE ){
            CurrencyOptionsContext.INSTANCE = new CurrencyOptionsContext();
        }

        return CurrencyOptionsContext.INSTANCE;
    }

    changeMyCurrencyOptionsState() {
        dispatch( actions.handleChangeMyCurrencyOptionsState() );
        
        const { value } = getState().currencyOptions;

        return value;
    }
    
}

export const currencyOptionsContext = CurrencyOptionsContext.getInstance();

export default reducer;

