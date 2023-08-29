<script>
import {defineComponent, ref, watch} from "vue";

import Editor from "primevue/editor";
import MainCard from "@/components/cards/MainCard";
import FileUpload from "@/components/FileUpload";
import BuilderAttractionPointsTable from "@/components/tables/BuilderAttractionPointsTable";

export default defineComponent({
  components: {Editor, MainCard, FileUpload, BuilderAttractionPointsTable},
  props: {
    formData: {
      type: Object,
      required: true,
    },
    locationTypes: {
      type: Array,
      required: false,
    },
    errors: {
      type: Object,
      required: true,
    }
  },
  setup(props, {emit}) {
    const form = ref(props.formData);

    watch(form, () => emit('changeFormData', form));

    return {form};
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
              <Editor v-model="form.attraction_ru" class="w-full"></Editor>
              <span v-if="errors?.attraction_ru" class="text-xs color-error">
                {{ errors.attraction_ru[0] }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <template v-if="form?.attraction_points">
    <section class="py-2 mb-3">
      <div class="flex justify-content-between">
        <span class="text-3xl font-bold">Ближайшие точки на карте</span>
        <div class="flex">
          <Button label="Редактировать" class="btn-black-20-outlined"/>
          <Button label="Добавить точку" class="btn-primary ml-2"/>
        </div>
      </div>
    </section>
    <section class="py-2 mb-3">
      <BuilderAttractionPointsTable :location-types="locationTypes" :points="form.attraction_points"/>
    </section>
  </template>
</template>

<style scoped>

</style>