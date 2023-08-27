<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  setup() {
    const APP_NAME = ref(process.env.VUE_APP_NAME);
    return {APP_NAME};
  }
});
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | ${APP_NAME}` : `${APP_NAME}` }}</template>
  </metainfo>

  <router-view/>
</template>

<style lang="scss">
nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
