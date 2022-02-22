import { createSlice } from '@reduxjs/toolkit';

import { dispatch, getState } from '../store';

const MyBagSlice = createSlice({
    name: "bagVisible",
    initialState: { value: false, bagActive: false },
    reducers: {
        handleChangeMyBagState: (state) => {
            state.value = !state.value
        },
        deactivateMyBagComponent: ( state ) => {
            state.bagActive = false
        },
        activateMyBagComponent: ( state ) => {
            state.bagActive = true
        },
    }
});

const { reducer, actions } = MyBagSlice;

class MyBagContext {

    private static INSTANCE: MyBagContext;

    constructor() {
        this.changeMyBagState = this.changeMyBagState.bind(this);
        this.deactivateMyBagComponent = this.deactivateMyBagComponent.bind(this);
        this.activateMyBagComponent = this.activateMyBagComponent.bind(this);
    }

    public static getInstance() {
        if( !MyBagContext.INSTANCE ){
            MyBagContext.INSTANCE = new MyBagContext();
        }

        return MyBagContext.INSTANCE;
    }

    changeMyBagState() {
        dispatch( actions.handleChangeMyBagState() );
        
        const { value } = getState().myBag;

        return value;
    }

    deactivateMyBagComponent() {
        dispatch( actions.deactivateMyBagComponent() );
    }

    activateMyBagComponent() {
        dispatch( actions.activateMyBagComponent() );
    }

    
}

export const myBagContext = MyBagContext.getInstance();

export default reducer;

