<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";

import Paginator from "primevue/paginator";
import PartnerCategoriesTable from "@/components/tables/PartnerCategoriesTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {PartnerCategoriesTable, Paginator},
  setup() {
    const store = useStore();

    const categories = computed(() => store.getters.getListPartners);
    const first = ref(0);

    const loadPartnerCategories = async () => {
      await store.dispatch('fetchPartnerCategories', {
        page: ((first.value / (categories.value?.data?.pagination?.per_page ?? 1)) + 1)
      });
    };

    onMounted(async () => {
      await loadPartnerCategories();
    });

    return {categories, first};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <PartnerCategoriesTable :categories="categories?.data?.data ?? []" />

        <Paginator
            v-model:first="first"
            :rows="categories?.data?.pagination?.per_page ?? 0"
            :totalRecords="categories?.data?.pagination?.total ?? 0"
            class="justify-content-start"
        ></Paginator>
      </div>
    </div>
  </section>
</template>