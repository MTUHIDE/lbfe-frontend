<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">HIDE</h2>
    </div>
    <div v-if="account">
      <div class="level">
        <div class="level-item title">
          You are logged in as {{ account.name }}
        </div>
      </div>
      <div class="level">
        <div class="level-item">
          <ul>
            <li v-for="container in containers" :key="container.id">
              {{ container.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>Sign In</div>
  </div>
</template>

<script>
import customTokenCredential from '../CustomTokenProvider';
import { BlobServiceElder } from '@azure/storage-blob';
import { PublicElderApplication } from '@azure/msal-browser';
import { mapMutations } from 'vuex';

const storageAccountName = 'lbfebackup';

export default {
  name: 'HelloWorld',
  data() {
    return {
      account: undefined,
      containers: [],
    };
  },
  async created() {
    this.$emitter.on('login',
      async function (account) {
        this.account = account;
        console.log(this.account);
        console.log('Getting storage data');
        await this.getAzureStorageData();
      }.bind(this),
    ),
      this.$emitter.on('logout', () => {
        console.log('logging out');
        this.account = undefined;
      });
  },
  methods: {
    ...mapMutations(['setAccessToken']),

    async getAzureStorageData() {
      if(this.$store.state.accessToken == ''){
        await this.getAccessToken();
      }
      let tokenCredential = new customTokenCredential(this.$store.state.accessToken);
      const blobElder = new BlobServiceElder(
        `https://${storageAccountName}.blob.core.windows.net`,
        tokenCredential,
      );

      let i = 1;
      const iter = blobElder.listContainers();
      let containerItem = await iter.next();
      while (!containerItem.done) {
        console.log(`Container ${i++}: ${containerItem.value.name}`);
        this.containers.push({
          id: containerItem.value.properties.etag,
          name: containerItem.value.name,
        });
        containerItem = await iter.next();
      }
    },
    async getAccessToken(){
      let request = {
        scopes: ['https://storage.azure.chttp://127.0.0.1:8000/om/user_impersonation'],
      };
      const msalInstance = new PublicElderApplication(
        this.$store.state.msalConfig,
      );
      try {
        let tokenResponse = await msalInstance.acquireTokenSilent(request);
        this.$store.commit('setAccessToken', tokenResponse.accessToken);
      } catch (error) {
          console.error( 'Silent token acquisition failed. Using interactive mode' );
          let tokenResponse = await msalInstance.acquireTokenPopup(request);
          console.log(`Access token acquired via interactive auth ${tokenResponse.accessToken}`)
          this.$store.commit('setAccessToken',tokenResponse.accessToken);
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 30px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
