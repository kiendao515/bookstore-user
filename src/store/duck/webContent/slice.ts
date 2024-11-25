import { IImage } from '@/utils/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
export interface IWebContent {
    key: string;
    title: string;
    property: string;
    image: IImage;
    value: string;
}
interface WebContentState {
    contents: IWebContent[];
}

// Define the initial state using the type
const initialState: WebContentState = {
    contents: [],
};

// Define the type for the payload of setBookFavorite action
interface SetWebContentPayload {
    contents: IWebContent[];
}

// Create the slice
const webContentSlice = createSlice({
    name: 'webContent',
    initialState,
    reducers: {
        setWebContents: (state, action: PayloadAction<SetWebContentPayload>) => {
            state.contents = action.payload.contents;
        }
    },
});

// Export the actions
export const { setWebContents } = webContentSlice.actions;

// Export the reducer
export default webContentSlice.reducer;
