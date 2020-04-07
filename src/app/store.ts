import { configureStore } from "@reduxjs/toolkit";

import scaleReducer from "./rootReducer";

const store = configureStore({
  reducer: scaleReducer,
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export default store;
