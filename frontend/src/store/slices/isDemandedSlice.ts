import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsDemandedState {
    isDemanded: boolean;
}

const initialState: IsDemandedState = {
    isDemanded: false,
}

const isDemandedSlice = createSlice({
    name: 'isDemanded',
    initialState,
    reducers: {
      setIsDemandedReducer: (state, action: PayloadAction<boolean>) => {
        state.isDemanded = action.payload;
      },
    },
});

export const {setIsDemandedReducer} = isDemandedSlice.actions;
export default isDemandedSlice.reducer;