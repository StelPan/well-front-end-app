<script>
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";

import Paginator from "primevue/paginator";
import VendorsTable from "@/components/tables/VendorsTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {VendorsTable, Paginator},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('fetchVendors', {page: 1});
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const store = useStore();

    const vendors = computed(() => store.getters.getListVendors);

    const first = ref(0);

    const findVendors = async () => {
      await store.dispatch('fetchVendors', {
        page: ((first.value / (reviews.value?.data?.pagination?.per_page ?? 1)) + 1)
      });

      window.scrollTo(0, 0);
    }

    watch((first), async (index) => {
      await findVendors();
    });

    return {vendors, first};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid gap-2">
      <div class="col-12">
        <VendorsTable :vendors="vendors?.data?.data ?? []"/>

        <Paginator
            v-model:first="first"
            :rows="vendors?.data?.pagination?.per_page ?? 0"
            :totalRecords="vendors?.data?.pagination?.total ?? 0"
            class="justify-content-start"
        ></Paginator>
      </div>
    </div>
  </section>
</template>