import {createSlice} from "@reduxjs/toolkit";
import {IJobState} from "../job/job-store";


export interface ThemeState {
    theme : boolean
}

export const ThemeStore = createSlice({
    name: 'ThemeStore',
    initialState: {
        theme: false
    } ,
    reducers: {
        changeTheme: (state) => {
            state.theme = !state.theme;
        },
    },
})
export const {changeTheme} = ThemeStore.actions
export default ThemeStore.reducer;