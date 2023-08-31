<script>
import {defineComponent, ref} from "vue";

import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Editor from "primevue/editor";
import FileUpload from "@/components/FileUpload.vue";
import MainCard from "@/components/cards/MainCard.vue";

export default defineComponent({
  components: {InputText, Checkbox, Editor, FileUpload, MainCard},
  props: {
    formData: {
      type: Object,
      required: true,
    },
    inclusions: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const form = ref(props.formData);

    const touchInclusionEvent = ({id}) => {
      // const inclusion = form.value.inclusions.find(inclusion => inclusion.id === id);
      // inclusion.include = !inclusion.include;
    };

    return {form, touchInclusionEvent};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4">
        <MainCard title="Название категории">
          <span class="p-float-label w-full">
            <InputText
                id="name"
                class="w-full"
                v-model="form.name_ru"
            />
            <label for="name">Название *</label>
          </span>
        </MainCard>
      </div>
      <div class="col-12 md:col-8">
        <MainCard title="Основные данные">
          <div class="grid">
            <div class="col-12 md:col-6">
              <span class="p-float-label w-full">
                <InputText
                    id="area"
                    class="w-full mb-2"
                    v-model="form.area"
                    :disabled="formData.area_missing"
                />
                <label for="area">Площадь, м *</label>
              </span>

              <Checkbox
                  :binary="true"
                  v-model="form.area_missing"
              />
              <label class="ml-2">Площадь отсутствует</label>
            </div>
            <div class="col-12 md:col-6">
              <span class="p-float-label w-full">
                <InputText
                    v-model="form.capacity"
                    id="area"
                    class="w-full mb-2"
                    :disabled="form.capacity_missing"
                />
                <label for="area">Вместимость, чел.</label>
              </span>

              <div class="flex justify-content-between">
                <div>
                  <Checkbox
                      v-model="form.capacity_missing"
                      :binary="true"
                  />
                  <label class="ml-2">Вместимость отсутствует</label>
                </div>
                <div>
                  <Checkbox
                      v-model="form.has_guests"
                      :binary="true"
                  />
                  <label class="ml-2">Учет гостей</label>
                </div>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-6">
        <MainCard title="Описание разовых платежей">
          <Editor/>
        </MainCard>
      </div>
      <div class="col-12 md:col-6">
        <MainCard title="Условия заселения">
          <Editor/>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <span class="text-3xl font-bold">Наличие в категории</span>
  </section>

  <section class="py-2 mb-3">
    <div class="grid border-round-xl">
      <div class="col-12 md:col-4 p-0" v-for="(inclusion, i) in formData.inclusions" :key="i">
        <div class="bg-white m-1 p-2">
          <Checkbox
              v-model="inclusion.include"
              :name="`inclusion_${i}`"
              :binary="true"
          />
          <label class="ml-3 font-bold" :for="`inclusion_${i}`">
            {{ inclusion.name_ru }}
          </label>
        </div>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Описание категории">
      <Editor v-model="formData.description_ru"></Editor>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Изображения">
      <FileUpload title="Добавить изображение"/>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <div class="flex justify-content-end">
      <span class="color-error cursor-pointer">
        Удалить категорию
      </span>
    </div>
  </section>
</template>

<style scoped>

</style>