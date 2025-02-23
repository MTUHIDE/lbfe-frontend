import { defineStore } from 'pinia';
import { PublicClientApplication } from '@azure/msal-browser';

/*
    security - iff the user is not logged in, he gets booted

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
    msalConfig: {},
    msalInstance: null,
    token: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setMsalConfig(config) {
      this.msalConfig = config;
      this.msalInstance = new PublicClientApplication(config);
    },
    initializeMsal() {
      if (!this.msalInstance && this.msalConfig) {
        this.msalInstance = new PublicClientApplication(this.msalConfig);
      }
    },
    setAccessToken(token) {
      this.token = token;
    },
    async login() {
      try {
        const loginResponse = await this.msalInstance.loginPopup({
          scopes: ['user.read']
        });
        this.setUser(loginResponse.account);
      } catch (error) {
        console.error('Login failed', error);
      }
    },
    async logout() {
      try {
        await this.msalInstance.logoutPopup();
        this.setUser(null);
      } catch (error) {
        console.error('Logout failed', error);
      }
    },
    isAuthenticated() {
      return this.user !== null;
    },
    async acquireTokenSilent() {
      try {
        const tokenResponse = await this.msalInstance.acquireTokenSilent({
          scopes: ['user.read']
        });
        return tokenResponse.accessToken;
      } catch (error) {
        console.error('Token acquisition failed', error);
        throw error;
      }
    },
    async getUserMSData() {
      try {
        const token = await this.acquireTokenSilent();
        const response = await fetch("https://graph.microsoft.com/beta/me", {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        return await response.json();
      } catch (error) {
        console.error('Fetching user data failed', error);
        throw error;
      }
    }
  },
}); 