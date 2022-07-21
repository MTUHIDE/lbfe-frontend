<script>

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: false },
    text: { type: String, required: true },
    floatDir: { type: String, required: false}
  },
}


</script>

<template>
    <transition name="fade">
        <router-link type="button" class="btn btn-sm link" :to="to" :style="{ float: floatDir}" value="link">
          <span>
            <i class="icon" :class="icon" />
            <span class ="linkText">{{text}}</span>
          </span>
        </router-link>
    </transition>
</template>

<style scoped>

@media only screen and (max-width: 660px) {
  .linkText {
    display: none;
  }
}

.link {
  display: -inline-flexbox;
  align-items: left;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.1em;
  padding: 0.4em;
  border-radius: 0.25em;
  height:35px;

  color:  var(--nb-text-color);
  text-decoration: none;
  text-align: center;

  transition: all 0.3s ease-in-out;
}

.link:hover {
  /* background-color: var(--nb-color-hover); */
  color: var(--nb-text-color-hover);
}

.link.active {
  background-color: var(--nb-color-active);
  color: var(--nb-text-color-active);
}

.link .icon {
  flex-shrink: 0;
  width: 25px;
}

.link:after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 0%;
  content: '';
  background: var(--nb-text-color);
  height: 3px;
  transition: 0.3s;
}

.link:hover:after {
  width: 100%;
  background: var(--nb-text-color-hover);
}
</style>
