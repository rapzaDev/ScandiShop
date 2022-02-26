import { createSlice } from '@reduxjs/toolkit';

const CategorySlice = createSlice({
    name: "categories",
    initialState: { all: true, clothes: false, tech: false },
    reducers: {
        setAllCategory: (state) => {
            state.all = true
            state.clothes = false
            state.tech = false
        },
        setClothesCategory: (state) => {
            state.all = false
            state.clothes = true
            state.tech = false
        },
        setTechCategory: (state) => {
            state.all = false
            state.clothes = false
            state.tech = true
        },

    }
});

export default CategorySlice;