<script>
import {defineComponent, computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import Button from "primevue/button";
import DataView from "primevue/dataview";

export default defineComponent({
  layout: { name: 'AdminLayout' },
  components: {Button, DataView},
  setup() {
    const store = useStore();
    const router = useRouter();

    const services = computed(() => store.getters.getListServices);

    onMounted(async () => {
      await store.dispatch('fetchServices');
    });

    return {services};
  }
});

</script>

<template>
  <section class="py-2 mb-3">
    <DataView>
      <template #list="slotProps">

      </template>
    </DataView>
  </section>
</template>

<style scoped>

</style>