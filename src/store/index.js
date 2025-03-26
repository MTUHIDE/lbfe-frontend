//TODO: We will be using Pinia over Vuex. Vue has officially switched support to Pinia

/* eslint-disable */ 
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    app: null,
  }),
  actions: {
    setApp(app) {
      this.app = app
    },
  },
});