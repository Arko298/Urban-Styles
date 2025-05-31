import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import cartSliceReducer from "./features/cart/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import collectionSliceReducer from "./features/collection/collectionSlice"







const store= configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        cart: cartSliceReducer,
        collection: collectionSliceReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

setupListeners(store.dispatch);
export default store;