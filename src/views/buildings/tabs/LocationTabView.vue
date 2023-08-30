<script>
import {defineComponent, ref, watch} from "vue";
import {useRouter, useRoute} from "vue-router";

import Editor from "primevue/editor";
import Button from "primevue/button";
import MainCard from "@/components/cards/MainCard";
import FileUpload from "@/components/FileUpload";
import BuilderLocationsTable from "@/components/tables/BuilderLocationsTable.vue";

export default defineComponent({
  components: {Editor, MainCard, FileUpload, Button, BuilderLocationsTable},
  props: {
    formData: {
      type: Object,
      required: true,
    },
    locationTypes: {
      type: Array,
      required: false,
    },
    locationPoints: {
      type: Array,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    }
  },
  setup(props, {emit}) {
    const form = ref(props.formData);
    const route = useRoute();
    const router = useRouter();

    //
    form.value.locations = [{
      name: 'cnasdsad',
      address: 'Кемерово 1',
      type: {id: 1, label: 'Метро'},
      lat: '55.656',
      lon: '54.456'
    }];

    const toPointsEdit = async () => {
      try {
        await router.push({name: 'building-locations-points-edit', params: {id: route.params.id}})
      } catch (e) {
        console.error(e);
      }
    };

    const toPointCreate = async () => {
      await router.push({name: 'building-locations-points-create', params: {id: route.params.id}});
    };

    watch(form, () => emit('changeFormData', form));

    return {form, toPointsEdit, toPointCreate};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Описание расположения">
          <div class="grid">
            <div class="col-12">
              <Editor v-model="form.location_ru" class="w-full"></Editor>
              <span v-if="errors?.location_ru" class="text-xs color-error">
                {{ errors.location_ru[0] }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <template v-if="locationPoints ?? []">
    <section class="py-2 mb-3">
      <div class="flex justify-content-between">
        <span class="text-3xl font-bold">Ближайшие точки на карте</span>
        <div class="flex">
          <Button @click="toPointsEdit" label="Редактировать" class="btn-black-20-outlined"/>
          <Button @click="toPointCreate" label="Добавить точку" class="btn-primary ml-2"/>
        </div>
      </div>
    </section>
    <section class="py-2 mb-3">
      <BuilderLocationsTable :location-types="locationTypes" :locations="locationPoints"/>
    </section>
  </template>
</template>

<style scoped>

</style>