import { createSlice } from '@reduxjs/toolkit';

import { dispatch, getState } from '../store';

const MyBagSlice = createSlice({
    name: "bagVisible",
    initialState: { value: false },
    reducers: {
        handleChangeMyBagState: (state) => {
            state.value = !state.value
        }
    }
});

const { reducer, actions } = MyBagSlice;

class MyBagContext {

    private static INSTANCE: MyBagContext;

    constructor() {
        this.changeMyBagState = this.changeMyBagState.bind(this);
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
    
}

export const myBagContext = MyBagContext.getInstance();

export default reducer;

