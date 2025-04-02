import { createPinia } from 'pinia'
import Vue from 'vue'

const pinia = createPinia()
Vue.use(pinia)

// stores/app.js
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
})

// stores/menu.js
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    items: [],
  }),
  actions: {
    setItems(items) {
      this.items = items
    },
  },
})

// stores/security.js
import { defineStore } from 'pinia'

export const useSecurityStore = defineStore('security', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user
    },
  },
})
