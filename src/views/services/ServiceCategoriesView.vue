<script>
import {defineComponent, computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import Button from "primevue/button";
import DataView from "primevue/dataview";
import ServiceCategoriesTable from "@/components/tables/ServiceCategoriesTable.vue";

export default defineComponent({
  layout: { name: 'AdminLayout' },
  components: {Button, DataView, ServiceCategoriesTable},
  setup() {
    const store = useStore();
    const router = useRouter();

    const categories = computed(() => store.getters.getListServiceCategories);

    const updateVisibleCategory = async ({category, quick_access}) => {
      try {

        await store.dispatch('fetchUpdateServiceCategory', {
          id: category.id,
          body: {
            name_ru: category.name_ru,
            quick_access: Number(quick_access),
          }
        });
      } catch (e) {
        console.error(e);
      }
    }

    onMounted(async () => {
      await store.dispatch('fetchServiceCategories');
    });

    return {categories, updateVisibleCategory};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <ServiceCategoriesTable
            @toggleChangeView="updateVisibleCategory"
            :categories="categories?.data?.data ?? []"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>