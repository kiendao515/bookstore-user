import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface TogglePopUpState {
    toggleCart: boolean;
    toggleFindBook: boolean;
    toggleFindBookSuccess: boolean;
    toggleAuth: boolean;
    toggleNotification: boolean;
    toggleLevelInfo: boolean;
    toggleMenu: boolean;
}

// Define the initial state using the type
const initialState: TogglePopUpState = {
    toggleCart: false,
    toggleFindBook: false,
    toggleFindBookSuccess: false,
    toggleAuth: false,
    toggleNotification: false,
    toggleLevelInfo: false,
    toggleMenu: false
};

interface ISetToggleByKey {
    key: keyof TogglePopUpState;
    value: boolean;
}

const togglePopUpSlice = createSlice({
    name: 'togglePopUp',
    initialState,
    reducers: {
        setMutiToggle: (state, action: PayloadAction<TogglePopUpState>) => {
            state = action.payload;
        },

        setToggleByKey: (state, action: PayloadAction<ISetToggleByKey>) => {
            const { key, value } = action.payload;
            Object.keys(state).forEach((k) => {
                state[k as keyof TogglePopUpState] = k === key ? value : false;
            });
        },
        toggleOffAll: (state) => {
            state.toggleCart = false;
            state.toggleFindBook = false;
            state.toggleFindBookSuccess = false;
            state.toggleAuth = false;
            state.toggleNotification = false;
            state.toggleLevelInfo = false;
            state.toggleMenu = false;
        },

    },
});

export const selectAnyToggleActive = (state: RootState): boolean => {
    const { toggleCart, toggleFindBook, toggleFindBookSuccess, toggleAuth, toggleNotification, toggleLevelInfo, toggleMenu } = state.togglePopUp;
    return toggleCart || toggleFindBook || toggleFindBookSuccess || toggleAuth || toggleNotification || toggleLevelInfo || toggleMenu;
};

// Export the actions
export const { setMutiToggle, setToggleByKey, toggleOffAll } = togglePopUpSlice.actions;

// Export the reducer
export default togglePopUpSlice.reducer;
