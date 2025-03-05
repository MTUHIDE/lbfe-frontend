<script>
/* eslint-disable */
export default {
name: "ProgressBlock",
  props: {
    blockName: String,
    done: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
        isCompleted: this.done // TODO - Set this value dynamically
    }
  }
}
</script>

<template>
    <li :class="[isCompleted ? 'progtrckr-done' : 'progtrckr-todo']">{{ blockName }}</li>
</template>

<style lang="scss" scoped>
li {
    display: table-cell;
    text-align: center;
    line-height: 3em;
    white-space: nowrap;
}
ol.progtrckr[data-progtrckr-steps="2"] li { width: 49%; }
ol.progtrckr[data-progtrckr-steps="3"] li { width: 33%; }
ol.progtrckr[data-progtrckr-steps="4"] li { width: 24%; }
ol.progtrckr[data-progtrckr-steps="5"] li { width: 19%; }
ol.progtrckr[data-progtrckr-steps="6"] li { width: 16%; }
ol.progtrckr[data-progtrckr-steps="7"] li { width: 14%; }
ol.progtrckr[data-progtrckr-steps="8"] li { width: 12%; }
ol.progtrckr[data-progtrckr-steps="9"] li { width: 11%; }

li.progtrckr-done {
                color: black;
                border-bottom: 4px solid #d31534;
}
li.progtrckr-todo {
                color: silver;
                border-bottom: 4px solid silver;
}

li:after {
                content: "\00a0\00a0";
}
li:before {
    position: relative;
    bottom: -2.5em;
    float: left;
    left: 50%;
    line-height: 1em;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
}
li.progtrckr-done:before {
    content: "\2713";
    color: white;
    background-color: #d31534;
    height: 1.2em;
    width: 1.2em;
    line-height: 1.2em;
    border: none;
    border-radius: 1.2em;
}
li.progtrckr-todo:before {
    content: "\039F";
    color: silver;
    background-color: white;
    font-size: 1.5em;
    bottom: -1.6em;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;    
}


@media (max-width: 880px) {
    li:after {
        display: none;
    }
    li:before {
        display: none;
    }
    li.progtrckr-todo {
        color: rgba(0,0,0,0) !important;
        text-indent: -9999px;
    }
    li.progtrckr-done {
        color: rgba(0,0,0,0) !important;
        text-indent: -9999px;
    }
}
</style>
