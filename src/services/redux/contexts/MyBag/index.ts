import { createSlice } from '@reduxjs/toolkit';

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

export default MyBagSlice;