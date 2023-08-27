<script>
import {defineComponent, ref, watch} from "vue";

import InputText from "primevue/inputtext";
import Editor from "primevue/editor";
import FileUpload from "@/components/FileUpload";
import MainCard from "@/components/cards/MainCard";

export default defineComponent({
  components: {InputText, Editor, FileUpload, MainCard},
  props: {
    formData: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    }
  },
  setup(props, {emit}) {
    const form = ref(props.formData);

    watch(form, () => emit('changeForData', form));

    return {form};
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Сведения о здании">
          <div class="grid mb-3">
            <div class="col-12 md:col-6">
              <div class="w-full">
                <span class="p-float-label w-full">
                  <InputText
                      v-model="form.name_ru"
                      :class="{'p-invalid': errors?.name_ru}"
                      id="checking_account"
                      class="w-full"
                  />
                  <label for="checking_account">Название здания</label>
                </span>
                  <span v-if="errors?.name_ru" class="text-xs color-error">
                  {{ errors.name_ru[0] }}
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="w-full">
              <span class="p-float-label w-full">
                <InputText
                    v-model="form.address_ru"
                    :class="{'p-invalid': errors?.address_ru}"
                    id="checking_account"
                    class="w-full"
                />
                <label for="checking_account">Адрес</label>
              </span>
                <span v-if="errors?.address_ru" class="text-xs color-error">
                {{ errors.address_ru[0] }}
              </span>
              </div>
            </div>
          </div>
          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="w-full">
                <span class="p-float-label w-full">
                  <InputText
                      v-model="form.lat"
                      :class="{'p-invalid': errors?.lat}"
                      id="checking_account"
                      class="w-full"
                  />
                  <label for="checking_account">Широта</label>
                </span>
                <span v-if="errors?.lat" class="text-xs color-error">
                  {{ errors.lat[0] }}
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="w-full">
              <span class="p-float-label w-full">
                <InputText
                    v-model="form.lon"
                    :class="{'p-invalid': errors?.lon}"
                    id="checking_account"
                    class="w-full"
                />
                <label for="checking_account">Долгота</label>
              </span>
                <span v-if="errors?.lon" class="text-xs color-error">
                {{ errors.lon[0] }}
              </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Описание">
          <Editor v-model="form.description_ru" class="w-full"></Editor>
          <span v-if="errors?.description_ru" class="text-xs color-error">
            {{ errors.description_ru[0] }}
          </span>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Изображения">
          <FileUpload title="Добавить изображение" />
        </MainCard>
      </div>
    </div>
  </section>
</template>


<style scoped>

</style>