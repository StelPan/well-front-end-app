<script>
import {computed, defineComponent, onMounted, reactive, ref, unref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {useServiceCategory} from "@/hooks/service-category";

import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import FileUpload from "@/components/FileUpload";
import MainCard from "@/components/cards/MainCard";
import Breadcrumb from "@/components/Breadcrumb";
import ImageCard from "@/components/cards/ImageCard";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import ButtonFileUpload from "@/components/buttons/ButtonFileUpload";
import {useBanks} from "@/hooks/banks";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    InputText, Checkbox, Button,
    MainCard, Breadcrumb, ImageCard,
    Dropdown, FileUpload, ConfirmationModal,
    ButtonSuccess, ButtonFileUpload
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadServiceCategory} = useServiceCategory();
      const {loadBanks} = useBanks();

      await loadServiceCategory(to.params.id);
      await loadBanks();
    } catch (e) {
      console.error(e);
    }

    next();
  },
  setup() {
    const {
      category, form, updateServiceCategory,
      selectIconFile, selectBannerFile,
      isUpdate, v$,
      icon, banner,
      files, vf$
    } = useServiceCategory();

    const {selectBank, banks, loadAcquiring, acquiring} = useBanks();

    form.value = unref(Object.assign({
      ...category.value,
      acquiring_id: category.value?.acquiring?.id ?? ''
    }));

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const breadcrumb = ref([
      {label: 'Услуги', router: {name: 'services'}},
      {label: category.value.name_ru}
    ]);

    const visible = computed(() => store.getters.getConfirmationDestroyServiceCategoryModal);

    const changeVisibleModal = () => {
      store.dispatch('changeStateModal', {
        type: 'confirmationDestroyServiceCategoryModal',
        bool: !visible.value
      });
    };

    const destroyServiceCategory = async () => {
      await store.dispatch('fetchDestroyServiceCategory', route.params.id);
      await router.push({name: 'services'});
    };

    watch(selectBank, async () => await loadAcquiring());

    return {
      files,
      selectIconFile,
      selectBannerFile,
      icon,
      banner,
      category,
      breadcrumb,
      form,
      selectBank,
      acquiring,
      banks,
      updateServiceCategory,
      changeVisibleModal,
      destroyServiceCategory,
      visible,
      isUpdate,
      v$
    };
  }
});
</script>

<template>
  <ConfirmationModal :visible="visible">
    <template #header>
      Удалить категорию
    </template>

    <template #default>
      <span>Вы уверены,  что хотите удалить категорию? Это действие будет невозможно отменить</span>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Отменить" @click="changeVisibleModal" class="btn-primary-outlined font-light w-12"/>
        <Button label="Удалить" @click="destroyServiceCategory" class="btn-primary font-light ml-3 w-12"/>
      </div>
    </template>
  </ConfirmationModal>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumb" separator="/"/>
      <div class="flex">
        <ButtonSuccess v-if="isUpdate" label="Изменения сохранены"></ButtonSuccess>
        <Button v-else @click="updateServiceCategory" label="Сохранить изменения" class="ml-2 btn-primary font-light"/>
      </div>
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-5">
        <div class="mb-2">
          <MainCard title="Наименование категории">
            <span class="p-float-label w-full">
              <InputText
                  v-model="form.name_ru"
                  :class="{'p-invalid': v$.name_ru.$errors.length}"
                  id="patronymic"
                  class="w-full"
              />
              <label for="patronymic">Введите наименование категории *</label>
            </span>
            <span v-if="v$.name_ru.$errors.length" class="text-xs color-error">
              {{ v$.name_ru.$errors[0].$message }}
            </span>
          </MainCard>
        </div>

        <div class="mb-2">
          <MainCard title="Изображения иконки">
            <div class="flex">
              <img
                  v-if="files.icon"
                  :src="files.icon.objectURL"
                  class="mr-2 h-2rem w-2rem"
                  alt=""
              >

              <img
                  v-else-if="category.icon"
                  :src="category.icon"
                  class="mr-2 h-2rem w-2rem"
                  alt=""
              >

              <ButtonFileUpload
                  @chooseFiles="selectIconFile"
                  :clear-files-after-select="true"
                  :label="(category.icon || files.icon) ? 'Изменить изображение' : 'Добавить изображение'"
              />
            </div>
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
          <MainCard title="Изображения категории">
            <div class="grid">
              <div class="flex flex-column col-12 md:col-6">
                <div class="mb-2">
                  <img v-if="files.banner" :src="files.banner.objectURL" alt="" class="w-full mb-2 w-5rem">
                  <img v-else-if="category.banner" :src="category.banner" alt="" class="w-full mb-2 w-5rem">
                </div>

                <ButtonFileUpload
                    @chooseFiles="selectBannerFile"
                    :clear-files-after-select="true"
                    :label="(category.banner || files.banner) ? 'Изменить изображение' : 'Добавить изображение'"
                />
              </div>
            </div>
          </MainCard>
        </div>

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
  </section>

  <section class="py-2 mb-3">
    <div class="flex justify-content-end">
      <span @click="changeVisibleModal" class="cursor-pointer color-error underline">Удалить категорию</span>
    </div>
  </section>
</template>