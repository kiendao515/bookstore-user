import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for the CartItem and CartState
interface CartItem {
    id: string;
    type: string;
    quantity: number;
    price: number;
    image: string;
    name: string;
}

interface CartState {
    isCartOpen: boolean;
    items: CartItem[];
}

interface CartItemIdentifier {
    id: string;
    type: string;
}

// Define the initial state with the type CartState
const initialState: CartState = {
    isCartOpen: false,
    items: [], // Ensure items is always an array
};

// Create the cart slice with TypeScript
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incrementCartItemQuantity: (state, action: PayloadAction<CartItemIdentifier>) => {
            const { id, type } = action.payload;
            const item = state.items.find((item) => item.id === id && item.type === type);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementCartItemQuantity: (state, action: PayloadAction<CartItemIdentifier>) => {
            const { id, type } = action.payload;
            const item = state.items.find((item) => item.id === id && item.type === type);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        // Set the entire cart (replace existing items)
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload || []; // Safeguard for undefined payload
        },

        // Add an item to the cart or update the quantity of an existing item   
        addToCart: (state, action: PayloadAction<CartItem>) => {
            // Ensure items is defined and is an array before working with it
            if (!state.items) {
                state.items = []; // Reinitialize items array if it's undefined
            }

            const { id, type, quantity, price, image, name } = action.payload;

            // Find if the item already exists in the cart
            const itemIndex = state.items.findIndex(item => item.id === id && item.type === type);

            if (itemIndex !== -1) {
                // If item exists, update the quantity
                state.items[itemIndex].quantity += quantity;
            } else {
                // If item doesn't exist, add new item
                state.items.push({ id, type, quantity, price, image, name });
            }
        },
        removeItemFromCart: (state, action: PayloadAction<{ id: string; type: string }>) => {
            state.items = state.items.filter(item => !(item.id === action.payload.id && item.type === action.payload.type));
        },
        // Clear all items from the cart
        clearCart: (state) => {
            state.items = []; // Reset to an empty array
        },
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        openCart: (state) => {
            state.isCartOpen = true;
        },
        closeCart: (state) => {
            state.isCartOpen = false;
        }
    },
});

// Export the actions and the reducer
export const { setCart, addToCart, clearCart, removeItemFromCart, incrementCartItemQuantity, decrementCartItemQuantity, toggleCart, openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
