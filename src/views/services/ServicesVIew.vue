<script>
import {defineComponent, computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import Button from "primevue/button";

export default defineComponent({
  components: {Button},
  setup() {
    const store = useStore();
    const router = useRouter();

    const services = computed(() => store.getters.getListServices);

    return {services};
  }
});

</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Услуги</h1>

      <Button label="Создать услугу" class="btn-primary font-light ml-3 w-12" />
    </div>
  </section>
</template>

<style scoped>

</style>