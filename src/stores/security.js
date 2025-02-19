import { defineStore } from 'pinia';

/*
    security - iff a user is authenticated, this object will not be null

    State gets refreshed a lot, so we can leverage it to check out authentication.
     -> If the user is authorized via the MSAL returned values, then everything
    should function normally, the user will have active menu items they can see and 
    the only thing we will need to do is request a job title from MSAL in order to 
    know what sort of permissions the person has. Otherwise, if MSAL fails, the 
    consequent will be that the state fails to load any data, meaning that the user 
    will not have anything within the "menu" or "security" state objects.
*/  

export const useSecurityStore = defineStore('security', {
  state: () => ({
    user: null,
    msalConfig: null,
    msalInstance: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setMsalConfig(msalConfig) {
      this.msalConfig = msalConfig;
    },
    setMsalInstance(msalInstance) {
      this.msalInstance = msalInstance;
    }
  },
});
