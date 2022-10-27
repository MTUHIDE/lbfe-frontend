<script>
/* eslint-disable */
export default {
  name: "ButtonBlock",
  props: {
    buttonText: String,
    to: String
  },
};
</script>

<template>
<div>
  <b-button class="btn-default" block variant="primary" value="to">{{buttonText}}</b-button>
</div>
</template>

<style lang="scss" scoped>
.btn-default {
  color: var(--nb-text-color);
  background-color: var(--nb-color);
  border-color: var(--nb-color-hover);
}

.btn-default:hover {
  color: var(--nb-text-color-hover);
  background-color: var(--nb-color-hover);
  border-color: var(--nb-color-active);
}

.btn-default:focus {
  box-shadow: 0 0 0 0.2rem rgb(255 65 83 / 50%) !important;
}

.btn-default:active {
  color: var(--nb-text-color-active);
  background-color: var(--nb-color-active);
  border-color: var(--nb-color-active);
}
</style>
