<script>
import {defineComponent} from "vue";

import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Editor from "primevue/editor";
import FileUpload from "@/components/FileUpload.vue";
import MainCard from "@/components/cards/MainCard.vue";

export default defineComponent({
  components: {InputText, Checkbox, Editor, FileUpload, MainCard}
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
                />
                <label for="area">Площадь, м *</label>
              </span>

              <Checkbox
                  binary
              />
              <label class="ml-2">Площадь отсутствует</label>
            </div>
            <div class="col-12 md:col-6">
              <span class="p-float-label w-full">
                <InputText
                    id="area"
                    class="w-full mb-2"
                />
                <label for="area">Вместимость, чел.</label>
              </span>

              <div class="flex justify-content-between">
                <div>
                  <Checkbox
                      binary
                  />
                  <label class="ml-2">Вместимость отсутствует</label>
                </div>
                <div>
                  <Checkbox
                      binary
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
          <Editor />
        </MainCard>
      </div>
      <div class="col-12 md:col-6">
        <MainCard title="Условия заселения">
          <Editor />
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <span class="text-3xl font-bold">Наличие в категории</span>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Описание категории">
      <Editor></Editor>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Изображения">
      <FileUpload title="Добавить изображение" />
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