<script>
import ProgressBlock from "./ProgressBlock.vue";

/* eslint-disable */
export default {
    
name: "ProgressBar",
  components: {
    ProgressBlock
  }
}
</script>

<template>
<div id="stickyProg">
    <ol class="progtrckr" data-progtrckr-steps="7">
        <ProgressBlock done="true" block-name="Picked up"/>
        <ProgressBlock done="true" block-name="Dropped off"/>
        <ProgressBlock block-name="Hello world"/>
        <ProgressBlock block-name="Other"/>
        <ProgressBlock block-name="Arrived"/>
    </ol>
</div>
</template>

<style lang="scss" scoped>
ol.progtrckr {
    display: table;
    list-style-type: none;
    margin: 0;
    padding: 0;
    table-layout: fixed;
    width: 100%;
    margin-bottom: 1%;
}
ol.progtrckr[data-progtrckr-steps="2"] li { width: 49%; }
ol.progtrckr[data-progtrckr-steps="3"] li { width: 33%; }
ol.progtrckr[data-progtrckr-steps="4"] li { width: 24%; }
ol.progtrckr[data-progtrckr-steps="5"] li { width: 19%; }
ol.progtrckr[data-progtrckr-steps="6"] li { width: 16%; }
ol.progtrckr[data-progtrckr-steps="7"] li { width: 14%; }
ol.progtrckr[data-progtrckr-steps="8"] li { width: 12%; }
ol.progtrckr[data-progtrckr-steps="9"] li { width: 11%; }


@media (min-width: 880px) {
    .progtrckr {
        background-color: white;
    }
}
</style>
