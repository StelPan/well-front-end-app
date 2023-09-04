<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";

import TokenService from "@/services/token";

export default defineComponent({

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const path = computed(() => route.path);

    const authenticate = async () => {
      try {
        if (!TokenService.getAccessToken()) {
          if (path.value === '/') {
            await router.push('/login');
            return;
          }
        }

        await store.dispatch('fetchProfile');
        await store.dispatch('fetchUpdateAuth', true);
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(async () => {
      try {
        await authenticate();
      } catch (e) {}

      if (path.value === '/') {
        await router.push({name: 'users'});
      }
    });

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
