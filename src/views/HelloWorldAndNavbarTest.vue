<template>
    <HeaderBar />
    <HelloWorld />
</template>

<script>
import HeaderBar from './header-bar';
import HelloWorld from './HelloWorld';
import store from '../js/store';

export default {
  name: 'HelloWorldAndNavbarTest',
  store,
  components: { HeaderBar, HelloWorld },
};
</script>
