import { createSlice } from "@reduxjs/toolkit";

const getThemeFromLocalStorage = () => {
    const theme = localStorage.getItem("theme");
    return theme ? JSON.parse(theme) : "dark";
};

const themeSlice = createSlice({
    name: "user",
    initialState: getThemeFromLocalStorage(),
    reducers: {
        setTheme: (state, action) => {
            state = action.payload;
            localStorage.setItem("theme", JSON.stringify(state));
            return state;
        },
    },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;