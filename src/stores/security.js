// Track the user session (Iff the user is not logged in, he gets booted)
import { defineStore } from 'pinia';

export const useSecurityStore = defineStore('security', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
});
