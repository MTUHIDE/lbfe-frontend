<script>
// @ is an alias to /src
import ButtonBlock from "../busforms/ButtonBlock.vue";
import MSALLogin from "./MSALLogin.vue";

export default {
  name: "LoginCard",
  components: {
    ButtonBlock,
    MSALLogin,
  },
};
</script>

<template>
  <div id="login">
    <div class="center">
      <div class="login-form">
        <div id="disabledWrapper">
          <form id="loginForm" action="" method="post">
            <img alt="LBFE logo" src="../../images/LBFE_LOGOH_red_upmichigan.png" />
            <br />
              <h2 class="text-center">Welcome to Little Brothers!</h2>
              <h4 class="text-center">Login to get started</h4>
            <br />
            <MSALLogin />
            <router-link class="btn btn-primary mt-2" to="/driver">Go to Driver site</router-link>
            <router-link class="btn btn-primary mt-2" to="/calendar">Go to Admin site</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  padding-top: 0;
}

.login-form {
  width: 340px;
  margin: 50px auto;
}

/* Align MTU logo to center */
.login-form img {
  display: block;
  width: 70%;
  height: auto;

  margin-left: auto;
  margin-right: auto;
  background: #f7f7f7;
  float: center;
}
.login-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control,
.btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

label {
  margin-bottom: 0.1em;
  float: left;
}

.disabled {
  pointer-events: none;
  background-color: #bbb;
  opacity: 0.5;
  margin-bottom: -200px;
}
.disabledWrapper {
  position: relative;
  cursor: not-allowed;
}

.invalid-feedback {
  display: block !important;
}
</style>
