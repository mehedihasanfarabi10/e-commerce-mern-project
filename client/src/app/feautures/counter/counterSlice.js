
import {createSlice} from "@reduxjs/toolkit";

const initialState = {count:0}

const counterSlice = createSlice({
    name: "counter",
    initialState: initialState,
    reducers: {
        increment: (state,action)=>{
            state.count = state.count +1 //state.count +=1
        },
        decrement: (state,action)=>{
            state.count = state.count -1 //state.count -=1
        },
        reset: (state,action)=>{
            state.count = 0 //state.count= 0
        },
        incrementByAmount: (state,action)=>{
            state.count = state.count + action.payload // state value + given value => 0 + given(4) ==4
        },
    },
})

export const {increment,decrement,reset,incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer