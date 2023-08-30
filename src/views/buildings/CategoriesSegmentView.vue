<script>
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Paginator from "primevue/paginator";
import MainCard from "@/components/cards/MainCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import BuildingCategoriesTable from "@/components/tables/BuildingCategoriesTable.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {InputText, MainCard, Breadcrumb, Button, ButtonSuccess, BuildingCategoriesTable},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('fetchBuilding', to.params.id);
      await store.dispatch('fetchBuildingSegment', to.params.segment);
      await store.dispatch('loadCategoriesByFilter', store.getters.getCurrentBuildingSegment.id);
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const form = ref({
      name_ru: ''
    });

    const isUpdated = ref(false);

    const building = computed(() => store.getters.getCurrentBuilding);
    const segment = computed(() => store.getters.getCurrentBuildingSegment);
    const categories = computed(() => store.getters.getListCategories)

    const breadcrumbs = ref([]);

    const updateSegment = async () => {
      await store.dispatch('fetchUpdateSegment', {
        id: route.params.segment,
        body: form,
      });
    };

    onMounted(() => {
      breadcrumbs.value = [
        {label: 'Структура', router: {name: 'buildings'}},
        {label: building.value.name_ru, router: {name: 'building-edit', params: {id: building.id}}},
        {label: "Апартаменты"}
      ];

      form.value.name_ru = segment.value.name_ru;
    });

    watch(form, () => isUpdated.value = false);

    return {form, breadcrumbs, segment, building, updateSegment, isUpdated, categories};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />
      <div class="flex">
        <ButtonSuccess v-if="isUpdated" label="Изменения сохранены" />
        <Button @click="updateSegment" label="Сохранить изменения" class="btn-primary font-light ml-2"/>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-3">
        <MainCard title="Название сегмента">
          <InputText placeholder="Название *" v-model="form.name_ru"></InputText>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <BuildingCategoriesTable
            :categories="categories"
            :builder-id="building.id"
            :segment-id="segment.id"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>