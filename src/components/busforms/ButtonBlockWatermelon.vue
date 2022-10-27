<template>
<div>
  <div class="d-grid gap-2">
    <button class="btn-watermelon btn btn-primary" value="login">{{buttonBlockText}}</button>
</div>

</div>
</template>

<script>
export default {
  name: "ButtonBlock",
  props: {
    buttonBlockText: String
  },
};
</script>

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
