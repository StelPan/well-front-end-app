<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

import {useError} from "@/hooks/useErrors";
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

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    InputText, Checkbox, Button,
    MainCard, Breadcrumb, ImageCard,
    Dropdown, FileUpload, ConfirmationModal,
    ButtonSuccess
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const breadcrumb = ref([]);

    const form = reactive({
      name_ru: '',
      name_en: '',
      name_ch: '',
      acquiring_id: '',
      quick_access: '',
    });

    const icon = ref(false);
    const banner = ref(false);
    const selectBank = ref();
    const isUpdated = ref(false);

    const visible = computed(() => store.getters.getConfirmationDestroyServiceCategoryModal);
    const category = computed(() => store.getters.getCurrentServiceCategory);
    const acquiring = computed(() => store.getters.getListAcquiring);
    const banks = computed(() => store.getters.getListBanks);

    const changeVisibleModal = () => {
      store.dispatch('changeStateModal', {
        type: 'confirmationDestroyServiceCategoryModal',
        bool: !visible.value
      });
    };

    const onSelectFiles = ({files, originalEvent}) => {
      banner.value = files;
    };

    const loadServiceCategory = async () => {
      await store.dispatch('fetchServiceCategory', route.params.id);
    };

    const loadBanks = async () => {
      await store.dispatch('fetchBanks');
    };

    const loadAcquiring = async () => {
      await store.dispatch('fetchAcquiring', selectBank.value);
    };

    const updateServiceCategory = async () => {
      const body = new FormData();

      const data = {
        ...form,
        quick_access: Number(form.quick_access)
      };

      for (let key in data) {
        body.set(key, data[key]);
      }

      if (banner.value) {
        body.append('banner', banner.value);
      }

      await store.dispatch('fetchUpdateServiceCategory', {
        id: route.params.id,
        body,
      });

      isUpdated.value = true;
    };

    const destroyServiceCategory = async () => {
      await store.dispatch('fetchDestroyServiceCategory', route.params.id);
      await router.push({name: 'services'});
    };

    watch(selectBank, async () => await loadAcquiring());

    watch([form, banner, icon], () => isUpdated.value = false);

    onMounted(async () => {
      await loadServiceCategory();
      await loadBanks();

      useCreateReactiveCopy(form, category.value, {quick_access: (q) => !!q});
      breadcrumb.value = [
        {label: 'Услуги', router: {name: 'services'}},
        {label: category.value.name_ru}
      ];
    });

    return {
      category,
      breadcrumb,
      form,
      selectBank,
      acquiring,
      banks,
      onSelectFiles,
      updateServiceCategory,
      changeVisibleModal,
      destroyServiceCategory,
      banner,
      visible,
      isUpdated
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
        <Button label="Удалить" @click="destroyServiceCategory"  class="btn-primary font-light ml-3 w-12"/>
      </div>
    </template>
  </ConfirmationModal>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumb" separator="/"/>
      <div class="flex">
        <ButtonSuccess v-if="isUpdated" label="Изменения сохранены"></ButtonSuccess>
        <Button @click="updateServiceCategory" label="Сохранить изменения" class="ml-2 btn-primary font-light" />
      </div>
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-5">
        <div class="mb-2">
          <MainCard title="Наименование категории">
          <span class="p-float-label w-full">
            <InputText v-model="form.name_ru" id="patronymic" class="w-full"/>
            <label for="patronymic">Введите наименование категории *</label>
          </span>
          </MainCard>
        </div>

        <div class="mb-2">
          <MainCard title="Изображения иконки">
          <span class="p-float-label w-full">
            <InputText v-model="form.name_ru" id="patronymic" class="w-full"/>
            <label for="patronymic">Введите наименование категории *</label>
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
          <MainCard title="Изображения категории">
            <div class="grid col-12 md:col-6">
              <div class="mb-2">
                <ImageCard
                    v-if="category.banner && !banner"
                    :src="category.banner ?? ''"
                    :handle="() => category.banner"
                />

                <ImageCard
                    v-if="banner"
                    :src="banner.objectURL"
                    :handle="() => banner"
                />
              </div>

              <FileUpload
                  @selected="onSelectFiles"
                  :multiple="false"
              />
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