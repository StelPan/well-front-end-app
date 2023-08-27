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

    const categories = computed(() => store.getters.getListPartnerCategories);
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
    <div v-if="!categories?.data?.data" class="flex justify-content-center align-items-center center-text-screen">
      <span class="color-black-40">
        Здесь пока ничего нет
      </span>
    </div>

    <div v-if="Array.isArray(categories?.data?.data) ? categories.data.data.length : false" class="grid">
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