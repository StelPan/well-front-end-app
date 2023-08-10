<script>
import {defineComponent, onMounted, computed, ref} from "vue";
import {useStore} from "vuex";
import {useRouter, useRoute} from "vue-router";
export default defineComponent({
  layout: {
    name: 'AdminLayout',
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(async () => {
      await store.dispatch('fetchUser', route.params.id);
    });

    const user = computed(() => store.getters.getCurrentUser);

    return { user };
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">

    </div>
  </section>
</template>
