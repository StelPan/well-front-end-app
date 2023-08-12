<script>
import {computed, defineComponent, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import Button from "primevue/button";
import VendorsTable from "@/components/tables/VendorsTable";

export default defineComponent({
  layout: {name: "AdminLayout"},
  components: {Button, VendorsTable},
  setup() {
    const store = useStore();
    const router = useRouter();

    const vendors = computed(() => store.getters.getListVendors);
    console.log(vendors);

    onMounted(async () => {
      await store.dispatch('fetchVendors');
    });

    return {vendors};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Обслуживающие компании</h1>
      <Button label="Добавить реквизиты" class="btn-primary font-light" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <VendorsTable :vendors="vendors?.data?.data ?? []" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>