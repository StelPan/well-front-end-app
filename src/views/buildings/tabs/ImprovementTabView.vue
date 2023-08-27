<script>
import {defineComponent, ref, watch} from "vue";

import Editor from "primevue/editor";
import MainCard from "@/components/cards/MainCard";
import FileUpload from "@/components/FileUpload";

export default defineComponent({
  components: {Editor, MainCard, FileUpload},
  props: {
    formData: {
      type: Object,
      required: true,
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
        <MainCard title="Описание">
          <div class="grid">
            <div class="col-12">
              <Editor v-model="form.improvement_ru" class="w-full"></Editor>
              <span v-if="errors?.improvement_ru" class="text-xs color-error">
                {{ errors.improvement_ru[0] }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Изображения">
          <FileUpload title="Добавить изображение"></FileUpload>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>