<script>
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {usePartner} from "@/hooks/partner";

import Paginator from "primevue/paginator";
import PartnersTable from "@/components/tables/PartnersTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {PartnersTable, Paginator},
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadPartners} = usePartner();
      await loadPartners({page: 1});
    } catch (e) {
      console.error(e);
    }

    next();
  },
  setup() {
    const store = useStore();
    const {partners, loadPartners} = usePartner();

    const first = ref(0);

    const load = async () => {
      await loadPartners({page: ((first.value / (partners.value?.data?.pagination?.per_page ?? 1)) + 1)});
    };

    watch(first, async () => await load());

    return {partners, first};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div v-if="!partners?.data?.data" class="flex justify-content-center align-items-center center-text-screen">
      <span class="color-black-40">
        Здесь пока ничего нет
      </span>
    </div>

    <div v-if="Array.isArray(partners?.data?.data) ? partners.data.data.length : false" class="grid">
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