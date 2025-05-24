import { createSlice } from "@reduxjs/toolkit";

const getLanguageFromLocalStorage = () => {
    const language = localStorage.getItem("language");
    return language ? JSON.parse(language) : "english";
};

const languageSlice = createSlice({
    name: "language",
    initialState: getLanguageFromLocalStorage(),
    reducers: {
        setLanguage: (state, action) => {
            state = action.payload;
            localStorage.setItem("language", JSON.stringify(state));
            return state;
        },
    },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;