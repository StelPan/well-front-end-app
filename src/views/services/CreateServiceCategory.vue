<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";
import MainCard from "@/components/cards/MainCard";
import Breadcrumb from "@/components/Breadcrumb";
import ImageCard from "@/components/cards/ImageCard";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {InputText, Checkbox, Button, MainCard, Breadcrumb, ImageCard, Dropdown, FileUpload},
  setup() {
    const store = useStore();
    const route = useRoute();

    const breadcrumb = ref([]);

    const form = reactive({
      name_ru: '',
      name_en: '',
      name_ch: '',
      acquiring: ''
    });

    const icon = ref();
    const banner = ref();
    const selectBank = ref();

    const banks = computed(() => store.getters.getListBanks);
    const acquiring = computed(() => store.getters.getListAcquiring);

    const loadBanks = async () => {
      await store.dispatch('fetchBanks');
    };

    const loadAcquiring = async () => {
      await store.dispatch('fetchAcquiring', selectBank.value);
    };

    watch(selectBank, async () => await loadAcquiring());

    onMounted(async () => {
      await loadBanks();

      breadcrumb.value = [
        {label: 'Услуги', router: {name: 'services'}},
        {label: 'Создание категории'}
      ];
    });

    return {breadcrumb, form, selectBank, acquiring, banks};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumb" separator="/"/>
      <Button label="Сохранить изменения" class="btn-primary font-light" />
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid h-max">
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
                v-model="form.acquiring"
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
        <MainCard title="Изображения категории" :styles="{'h-full': true}">
          <div class="grid col-12 md:col-6">
<!--            <div class="mb-2">-->
<!--              <ImageCard :src="category.banner ?? ''" :handle="() => category.banner" />-->
<!--            </div>-->
            <Button label="Изменить изображение" class="btn-primary font-light w-full" />
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>