import { createSlice } from '@reduxjs/toolkit';

import { dispatch, getState } from '../store';

const CurrencyOptionsSlice = createSlice({
    name: "currencyEnabled",
    initialState: { value: false, currencyOptionsActive: false },
    reducers: {
        handleChangeMyCurrencyOptionsState: (state) => {
            state.value = !state.value
        },
        deactivateCurrencyOptionsComponent: ( state ) => {
            state.currencyOptionsActive = false
        },
        activateCurrencyOptionsComponent: ( state ) => {
            state.currencyOptionsActive = true
        },
    }
});

const { reducer, actions } = CurrencyOptionsSlice;

class CurrencyOptionsContext {

    private static INSTANCE: CurrencyOptionsContext;

    constructor() {
        this.changeMyCurrencyOptionsState = this.changeMyCurrencyOptionsState.bind(this);
        this.deactivateCurrencyOptionsComponent = this.deactivateCurrencyOptionsComponent.bind(this);
        this.activateCurrencyOptionsComponent = this.activateCurrencyOptionsComponent.bind(this);
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

    deactivateCurrencyOptionsComponent(  ) {
        dispatch( actions.deactivateCurrencyOptionsComponent() );
    }

    activateCurrencyOptionsComponent(  ) {
        dispatch( actions.activateCurrencyOptionsComponent() );
    }
    
}

export const currencyOptionsContext = CurrencyOptionsContext.getInstance();

export default reducer;

