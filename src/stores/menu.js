// Track which pages we can see (Iff a user can't see the page, he gets booted)
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    items: [],
  }),
  actions: {
    setItems(items) {
      this.items = items;
    },
  },
});
