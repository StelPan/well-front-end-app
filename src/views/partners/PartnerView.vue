<script>
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import MainCard from "@/components/cards/MainCard";
import Breadcrumb from "@/components/Breadcrumb";


export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, InputText, MainCard, Dropdown, Breadcrumb, Editor},
  setup() {
    const store = useStore();
    const route = useRoute();

    const partner = computed(() => store.getters.getCurrentPartner);
    const partnerCategories = computed(() => store.getters.getListPartnerCategories);

    const form = reactive({
      name: '',
      photos: [],
      promo_type: '',
      partner_category_id: '',
      description_ru: '',
      description_en: '',
      description_ch: ''
    });

    const promoTypes = ref([{label: 'QR код'}, {label: 'Промокод'}]);
    const breadcrumbs = ref([]);

    const loadPartner = async () => {
      await store.dispatch('fetchPartner', route.params.id);
    };

    const loadPartnerCategories = async () => {
      await store.dispatch('fetchPartnerCategories');
    };

    onMounted(async () => {
      await loadPartner();
      await loadPartnerCategories();

      useCreateReactiveCopy(form, partner.value.data);
      breadcrumbs.value = [
        {label: 'Партнеры', router: {name: 'partners-list'}},
        {label: partner.value.data.name}
      ];
    });

    return {partner, form, partnerCategories, promoTypes, breadcrumbs};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />

      <div class="flex">
        <Button label="Отклонить" class="btn-error-outlined font-light" />
        <Button label="Сохранить изменения" class="btn-primary font-light ml-3" />
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4">
        <MainCard title="Название партнера">
            <span class="p-float-label mb-3 w-full">
              <InputText id="name" class="w-full" v-model="form.name"/>
              <label for="name">Название</label>
            </span>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Идентификатор партнера">
          <Dropdown
              v-model="form.promo_type"
              :options="promoTypes"
              optionLabel="label"
              option-value="label"
              placeholder="Идентификатор"
              class="w-full"/>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Категория партнера">
          <Dropdown
              v-model="form.partner_category_id"
              :options="partnerCategories?.data?.data"
              optionLabel="name_ru"
              option-value="id"
              placeholder="Категории"
              class="w-full"/>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Описание предложения">
      <div class="grid">
        <div class="col-12">
          <Editor v-model="form.description_ru" class="w-full"></Editor>
        </div>
      </div>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Изображения">
      <div class="grid">
        <div v-for="(image, i) in form.photos" :key="i" class="col-12 md:col-2">
          <img :src="image.preview_url" class="w-full border-round" alt="">
        </div>
      </div>
    </MainCard>
  </section>
</template>

<style scoped>

</style>