import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface BookFavoriteState {
    userId: string;
    bookIds: string[];
}

// Define the initial state using the type
const initialState: BookFavoriteState = {
    userId: "",
    bookIds: [],
};

// Define the type for the payload of setBookFavorite action
interface SetBookFavoritePayload {
    userId: string;
    bookIds: string[];
}

// Create the slice
const userSlice = createSlice({
    name: 'bookFavorite',
    initialState,
    reducers: {
        setBookFavorite: (state, action: PayloadAction<SetBookFavoritePayload>) => {
            state.userId = action.payload.userId;
            state.bookIds = action.payload.bookIds;
        }
    },
});

// Export the actions
export const { setBookFavorite } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
