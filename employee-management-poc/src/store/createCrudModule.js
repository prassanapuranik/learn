const createCrudModule = (storageKey, seed = []) => ({
  namespaced: true,
  state: () => ({
    items: JSON.parse(localStorage.getItem(storageKey) || 'null') || seed
  }),
  mutations: {
    add(state, payload) {
      state.items.push(payload);
      localStorage.setItem(storageKey, JSON.stringify(state.items));
    },
    update(state, payload) {
      const index = state.items.findIndex((item) => item.id === payload.id);
      if (index >= 0) {
        state.items.splice(index, 1, payload);
        localStorage.setItem(storageKey, JSON.stringify(state.items));
      }
    },
    remove(state, id) {
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(state.items));
    }
  },
  getters: {
    all: (state) => state.items
  }
});

export default createCrudModule;
