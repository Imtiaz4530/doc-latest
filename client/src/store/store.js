import { createStore, action } from "easy-peasy";

const store = createStore({
  user: null,
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  clearUser: action((state) => {
    state.user = null;
  }),
});

export default store;
