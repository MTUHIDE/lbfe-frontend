<script>
import ButtonBlock from "./ButtonBlockWatermelon.vue";

export default {
  name: "LoginCard",
  components: {
    ButtonBlock,
  },
};
</script>

<template>
  <div>
    <div class="center">
      <div class="login-form">
        <div id="disabledWrapper">
          <form id="loginForm" action="" method="post">
            <!-- <b-form-group has-error> -->
            <!-- <img alt="LBFE logo" src="/../../../../images/LBFE_LOGOH_red_upmichigan.png" /> -->
            <img
              alt="LBFE logo"
              src="../../images/LBFE_LOGOH_red_upmichigan.png"
            />
            <br />
            <h2 class="text-center">Welcome to Little Brothers!</h2>
            <h4 class="text-center">Login to get started</h4>
            <br />

            <label for="username" class="form-label"
              ><strong>Username</strong></label
            >
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Username"
            />
            <div class="invalid-feedback"></div>

            <div class="form-group has-error">
              <label for="password" class="form-label"
                ><strong>Password</strong></label
              >
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
              />
              <div class="invalid-feedback"></div>
            </div>
            <ButtonBlock class="mt-3 mb-3" buttonBlockText="Log in" />
            <!-- <button to="/driver" class="btn btn-primary my-2"></button>
            <button to="/calendar" class="btn btn-primary mt-2"></button> -->
            <router-link class="btn btn-primary mt-2" to="/driver/calendar"
              >Go to Driver site</router-link
            >
            <router-link class="btn btn-primary mt-2" to="/calendar"
              >Go to Admin site</router-link
            >
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

.btn-watermelon {
  color: #fff;
  background-color: #ff3b3f;
  border-color: #ff3b3f;
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
