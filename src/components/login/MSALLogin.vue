<script lang="js">
import msalConfig from '../../js/msal/msalConfig';
import * as Msal from 'msal'; 
import store from '../../store/index';
export default {
    name: 'MSALLogin',
    data() {

        // Load config
        let client = new Msal.UserAgentApplication(msalConfig);
        let request = {
            scopes: ['user.read']
        };

        // Silently acquire user token
        async function getTokenSilent() {
            return await client.acquireTokenSilent(request);
        }

        // Pass in token to get user data from MS Graph API
        async function getUserMSData() {
            let token = await getTokenSilent();
            let payload = await fetch("https://graph.microsoft.com/beta/me", {
                headers: {
                    'Authorization': 'Bearer ' + token.accessToken
                }
            })
            let json = await payload.json();
            return json;
        }

        // Store token somewhere..
        function storeToken(token) {
            store.setAccessToken = token;
        }

        // Figure out what ta heck to do with da token
        async function evalUserPermission(userMSData) {

            // Manually move the page for now....
            switch (userMSData.jobTitle) {
                case null: // TODO change ot admin once token evaluation is established...
                    window.location.href = 'http://localhost:8000/calendar'
                    break;
                case 'driver':
                    window.location.href = 'http://localhost:8000/driver' 
                    break;
                default: 
                    // Invalid credentials page go here lol
                    break;
            }
        }

        //--------------------------------------------------------------
        // Driver code => Run our authorization
        async function runMSALGetToken() {
            storeToken(request); // keep the response for other pages to access....
            // let loginResponse = await client.loginPopup(request);
            let response = await getUserMSData();

            evalUserPermission(response);
        }
        return {
            runMSALGetToken
        }
    }
};

</script>
  
<template>
    <div class="d-grid gap-2">
        <button
            type="button"
            id="SignIn"
            class="btn-watermelon btn btn-primary"
            v-on:click="runMSALGetToken"
            buttonBlockText="Sign In"
        >Log In</button>
    </div>
</template>


<style lang="scss" scoped>
.btn-watermelon {
  color: #fff;
  background-color: #FF3B3F;
  border-color: #FF3B3F;
}

.btn-watermelon:hover {
    color: #fff;
    background-color: #c93033;
    border-color: #c93033;
}

.btn-watermelon:focus {
  box-shadow: 0 0 0 0.2rem rgb(255 65 83 / 50%) !important;
}

.btn-watermelon:active {
  background-color: #c93033 !important;
  border-color: #c93033 !important;
}
</style>
