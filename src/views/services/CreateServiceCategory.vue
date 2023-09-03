<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";
import {useBanks} from "@/hooks/banks";

import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";
import MainCard from "@/components/cards/MainCard";
import Breadcrumb from "@/components/Breadcrumb";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import ButtonFileUpload from "@/components/buttons/ButtonFileUpload";
import {useServiceCategory} from "@/hooks/service-category";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    InputText, Checkbox, Button,
    MainCard, Breadcrumb, Dropdown,
    FileUpload, ButtonFileUpload, ButtonSuccess
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadBanks} = useBanks();
      await loadBanks();
      next();
    } catch (e) {
      console.error(e);
    }

    next();
  },
  setup() {
    const {t} = useI18n();
    const {banks, selectBank, loadAcquiring, acquiring} = useBanks();
    const {
      form,
      v$,
      vf$,
      selectBannerFile,
      selectIconFile,
      createServiceCategory,
      isCreate,
      files
    } = useServiceCategory();

    const breadcrumb = ref([
      {label: t('menu.services'), router: {name: 'services'}},
      {label: t('labels.service-category-creating')}
    ]);

    const create = async () => {
      await createServiceCategory();
    };

    watch(selectBank, async () => await loadAcquiring());

    return {
      breadcrumb, form, selectBank, acquiring, banks, t, files,
      v$, vf$, create, selectIconFile, selectBannerFile, isCreate,
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumb" separator="/"/>
      <ButtonSuccess v-if="isCreate" :label="t('labels.service-category-created')"/>
      <Button v-if="!isCreate" @click="create" :label="t('labels.save-changes')" class="btn-primary font-light"/>
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid h-max">
      <div class="col-12 md:col-5">
        <div class="mb-2">
          <MainCard :title="t('labels.name-category')">
            <span class="p-float-label w-full">
              <InputText
                  :class="{'p-invalid': v$.name_ru.$errors.length}"
                  v-model="form.name_ru"
                  id="name-category"
                  class="w-full"
              />
              <label for="name-category">{{ t('labels.write-name-category') }} *</label>
            </span>
            <span v-if="v$.name_ru.$errors.length" class="text-xs color-error">
              {{ v$.name_ru.$errors[0].$message }}
            </span>
          </MainCard>
        </div>

        <div class="mb-2">
          <MainCard title="Изображения иконки">
            <span class="p-float-label w-full">
              <span class="flex">
                <img v-if="files.icon" :src="files.icon.objectURL" class="mr-2 h-2rem w-2rem" alt="">
                <ButtonFileUpload
                    @chooseFiles="selectIconFile"
                    :label="files.icon ? 'Изменить изображение иконки' : 'Добавить изображение иконки'"
                    :clear-files-after-select="true"
                />
              </span>
            </span>
          </MainCard>
        </div>

        <MainCard title="Реквизиты и эквайринг">
          <div class="flex flex-column gap-3">
            <Dropdown
                v-model="selectBank"
                :options="banks"
                optionLabel="name"
                optionValue="id"
                placeholder="Банк"
                class="w-full"
            />

            <Dropdown
                v-model="form.acquiring_id"
                :options="acquiring"
                optionLabel="identifier"
                optionValue="id"
                placeholder="Идентификатор эквайринга"
                class="w-full"
            />
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-7">
        <div class="mb-2">
          <MainCard title="Изображения категории" :styles="{'h-full': true}">
            <div class="grid">
              <div class="flex flex-column col-12 md:col-6">
                <img v-if="files.banner" :src="files.banner.objectURL" alt="" class="w-full mb-2 w-5rem">
                <span v-if="vf$.banner.$errors.length" class="text-xs color-error mb-2">
                {{ vf$.banner.$errors[0].$message }}
                </span>
                <ButtonFileUpload
                    @chooseFiles="selectBannerFile"
                    :clear-files-after-select="true"
                    :multiple="false"
                    :label="files.banner ? 'Изменить изображение' : 'Добавить изображение'"
                />
              </div>
            </div>
          </MainCard>
        </div>

        <div class="mb-2">
          <MainCard title="Видимость">
            <Checkbox
                v-model="form.quick_access"
                :binary="true"
                name="quick_access"
            />
            <label class="ml-2" for="quick_access">Видимость</label>
          </MainCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>