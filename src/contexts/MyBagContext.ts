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

interface MyBagContextType {
    myBagContextState: boolean;
}

class MyBagContext {

    state:MyBagContextType = {
        myBagContextState: false,
        
    }

    private static INSTANCE: MyBagContext;

    constructor() {
        this.getMyBagState = this.getMyBagState.bind(this);
    }

    public static getInstance() {
        if( !MyBagContext.INSTANCE ){
            MyBagContext.INSTANCE = new MyBagContext();
        }

        return MyBagContext.INSTANCE;
    }

    getMyBagState() {
        dispatch( actions.handleChangeMyBagState() );
        
        const { value } = getState().myBag;

        this.state.myBagContextState = value;

        console.log('getMyBagState MyBagContext.ts:', this.state.myBagContextState);

        return value;
    }
    
}

export const myBagContext = MyBagContext.getInstance();

// export const myBagContext = new MyBagContext();
// export const myBagContext = <MyBagContext />;

export default reducer;

