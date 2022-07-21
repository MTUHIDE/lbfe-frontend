<template>
  <div class="login">
    <LoginCard />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginCard from '../components/login/LoginCard.vue';
export default {
  name: 'Login',
  components: {
    LoginCard,
  },
};
</script>