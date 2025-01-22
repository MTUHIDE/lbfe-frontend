import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    app: null,
  }),
  actions: {
    setApp(app) {
      this.app = app;
    },
  },
});