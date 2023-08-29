<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import InputText from "primevue/inputtext";
import MainCard from "@/components/cards/MainCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default defineComponent({
  components: {InputText, MainCard, Breadcrumb},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      await store.dispatch()
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
    })

    const segment = computed(() => store.getters.getListSegments);

    const building = {name_ru: 'WELL 1'};
    const breadcrumbs = ref([]);

    onMounted(() => {
      breadcrumbs.value = [
        {label: 'Структура', router: {name: 'buildings'}},
        {label: building.name_ru, router: {name: 'building-edit', params: {id: 2}}},
        {label: "Апартаменты"}
      ];
    });

    return {form, breadcrumbs, segment}
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />

      <Button label="Сохранить изменения" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Название сегмента">

    </MainCard>
  </section>
</template>

<style scoped>

</style>