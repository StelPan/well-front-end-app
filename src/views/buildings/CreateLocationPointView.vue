<script>
import {computed, defineComponent, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";
import {useRoute} from "vue-router";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import ButtonSuccess from "@/components/buttons/ButtonSuccess.vue";
import MainCard from "@/components/cards/MainCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";


export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {InputText, MainCard, Breadcrumb, Button, Dropdown, ButtonSuccess},
  async beforeRouteEnter(to, from, next) {
    const store = useStore();
    await store.dispatch('fetchTypeLocations');
    next();
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const errors = useError();

    const locationTypes = computed(() => store.getters.getListTypeLocations);

    const form = reactive({
      name_ru: '',
      address_ru: '',
      lat: '',
      lon: '',
      point_type_id: ''
    });

    const isCreated = ref(false);

    const createPoint = async () => {
      try {
        await store.dispatch('fetchCreateBuildingLocationPoint', {
          id: route.params.id,
          body: form,
        });

        isCreated.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    }

    watch(form, () => {
      isCreated.value = false;
      errors.setErrors();
    });

    const breadcrumb = ref([
      {label: 'Структура', router: {name: 'buildings'}},
      {label: 'Создание точки'}
    ]);

    return {breadcrumb, locationTypes, isCreated, createPoint, form, errors: errors.errors};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumb" separator="/" />
      <ButtonSuccess v-if="isCreated" label="Точка создана" />
      <Button v-if="!isCreated" @click="createPoint" label="Создать точку" class="btn-primary font-light" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-8">
        <MainCard title="Сведения">
          <div class="grid">
            <div class="col-6">
              <div class="w-full mb-3">
                <InputText
                    v-model="form.name_ru"
                    :class="{'p-invalid': errors.name_ru}"
                    class="w-full"
                    placeholder="Название точки"
                />
                <span v-if="errors.name_ru" class="text-xs color-error">
                  {{ errors.name_ru[0] }}
                </span>
              </div>
              <div class="w-full">
                <InputText
                    v-model="form.lat"
                    :class="{'p-invalid': errors.lat}"
                    class="w-full"
                    placeholder="Широта"
                />
                <span v-if="errors.lat" class="text-xs color-error">
                  {{ errors.name_ru[0] }}
                </span>
              </div>
            </div>
            <div class="col-6">
              <div class="w-full mb-3">
                <InputText
                    v-model="form.address_ru"
                    :class="{'p-invalid': errors.address_ru}"
                    class="w-full"
                    placeholder="Адрес точки"
                />
                <span v-if="errors.address_ru" class="text-xs color-error">
                  {{ errors.address_ru[0] }}
                </span>
              </div>
              <div class="w-full">
                <InputText
                    v-model="form.lon"
                    :class="{'p-invalid': errors.lon}"
                    class="w-full"
                    placeholder="Долгота"
                />
                <span v-if="errors.lon" class="text-xs color-error">
                  {{ errors.lon[0] }}
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Выберите тип точки">
          <Dropdown
              v-model="form.point_type_id"
              :options="locationTypes"
              optionLabel="name_ru"
              optionValue="id"
              placeholder="Тип точки"
              class="w-full"
          />
          <span v-if="errors.point_type_id" class="text-xs color-error">
            {{ errors.point_type_id[0] }}
          </span>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>