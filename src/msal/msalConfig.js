const msalConfig = {
    auth: {
        clientId: "bc5e02b6-197a-437f-ba1d-486f676df696",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:8000/",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
}
module.exports = msalConfig;

