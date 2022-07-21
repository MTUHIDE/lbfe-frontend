import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      accessToken:"" // place to store our authToken ??
    };
  },
  mutations :{
    setAccessToken(token){
      accessToken = token;
    }
  }
});

export default store;
