import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: JSON.parse(localStorage.getItem("favorites")) || [],
    reducers: {
        addFavorite: (state, action) => {
            const exists = state.find(
                (doc) => String(doc.id) === String(action.payload?.id)
            );
            if (!exists && action.payload) {
                state.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state));
            }
        },
        removeFavorite: (state, action) => {
            const targetId =
                typeof action.payload === "object" && action.payload !== null
                    ? action.payload.id
                    : action.payload;
            const updated = state.filter((doc) => String(doc.id) !== String(targetId));
            localStorage.setItem("favorites", JSON.stringify(updated));
            return updated;
        },
    },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
