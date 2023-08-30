<script>
import {computed, defineComponent, reactive, watch, ref, onMounted} from "vue";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import MainCard from "@/components/cards/MainCard";
import Breadcrumb from "@/components/Breadcrumb";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {InputText, MainCard, Breadcrumb, ButtonSuccess, Button},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('fetchBuilding', to.params.id);
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const store = useStore();
    const errors = useError();

    const building = computed(() => store.getters.getCurrentBuilding);

    const breadcrumbs = ref([]);

    const isCreated = ref(false);

    const form = reactive({
      name_ru: '',
    });

    const createSegment = async () => {
      try {
        await store.dispatch('fetchCreateSegment', form);
        isCreated.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    watch(form, () => isCreated.value = false);

    onMounted(() => {
      breadcrumbs.value = [
        {label: 'Структура', router: {name: 'buildings'}},
        {label: building.value.name_ru, router: {name: 'building-edit', params: {id: building.value.id}}},
        {label: 'Создание сегмента'}
      ];
    })

    return {form, breadcrumbs, isCreated, createSegment};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator=" /" />
      <div class="flex">
        <ButtonSuccess v-if="isCreated" label="Сегмент создан" />
        <Button @click="createSegment" label="Создать сегмент" class="btn-primary font-light ml-2" />
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4">
        <MainCard title="Название сегмента">
          <InputText
              v-model="form.name_ru"
              placeholder="Название сегмента"
              class="w-full"
          />
        </MainCard>
      </div>
    </div>
  </section>
</template>