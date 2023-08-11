<script>
import {defineComponent} from "vue";

import Button from "primevue/button";
import StateConstructorTable from "@/components/tables/StateConstructorTable.vue";

export default defineComponent({
  layout: { name: 'AdminLayout' },
  components: {Button, StateConstructorTable},
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1 class="font-normal">Конструктор состояний</h1>

      <div class="flex">
        <Button label="Сохранить изменения" class="btn-primary font-light"/>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <StateConstructorTable :states="[]" />
  </section>
</template>

<style scoped lang="scss">

</style>
