import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
        status: 'idle',
        error: null,
    },

     reducers : {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.items.push({ ...item, quantity: 1 });
            }

            cartSlice.caseReducers.calculateTotals(state);
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId);

            cartSlice.caseReducers.calculateTotals(state);
        },

        clearCart : (state) => {
            state.items =[];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },

        increaseQuantity: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.items.find((item) => item.id === itemId);
            if (existingItem) {
                existingItem.quantity += 1;
            }

            cartSlice.caseReducers.calculateTotals(state);
        },

        decreaseQuantity: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.items.find((item) => item.id === itemId);
            if(existingItem) {
                if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
            else {
                state.items = state.items.filter((item) => item.id !== itemId);
            }

            cartSlice.caseReducers.calculateTotals(state);
            }
        },

        calculateTotals: (state) => {
            const totals = state.items.reduce(
                (acc, item) => {
                    acc.totalQuantity += item.quantity;
                    acc.totalPrice += item.price * item.quantity;
                    return acc;
                },
                { totalQuantity: 0, totalPrice: 0 }
            );

            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase('cart/fetchCart/pending', (state) => {
                state.status = 'loading';
            })
            .addCase('cart/fetchCart/fulfilled', (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase('cart/fetchCart/rejected', (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase('cart/addToCart/fulfilled', (state, action) => {
                state.items = action.payload;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase('cart/removeFromCart/fulfilled', (state, action) => {
                state.items = action.payload;
                cartSlice.caseReducers.calculateTotals(state);
            });
    }
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
