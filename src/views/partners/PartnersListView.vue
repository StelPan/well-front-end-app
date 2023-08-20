<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";

import Paginator from "primevue/paginator";
import PartnersTable from "@/components/tables/PartnersTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {PartnersTable, Paginator},
  setup() {
    const store = useStore();

    const partners = computed(() => store.getters.getListPartners);
    const first = ref(0);

    const loadPartners = async () => {
      await store.dispatch('fetchPartners', {
        page: ((first.value / (partners.value?.data?.pagination?.per_page ?? 1)) + 1)
      });
    };

    onMounted(async () => {
      await loadPartners();
    });

    return {partners, first};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <PartnersTable :partners="partners?.data?.data ?? []" />

        <Paginator
            v-model:first="first"
            :rows="partners?.data?.pagination?.per_page ?? 0"
            :totalRecords="partners?.data?.pagination?.total ?? 0"
            class="justify-content-start"
        ></Paginator>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>