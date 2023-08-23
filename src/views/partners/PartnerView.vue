<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import {useError} from "@/hooks/useErrors";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import MainCard from "@/components/cards/MainCard";
import Breadcrumb from "@/components/Breadcrumb";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";


export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {ButtonSuccess, Button, InputText, MainCard, Dropdown, Breadcrumb, Editor},
  setup() {
    const store = useStore();
    const route = useRoute();
    const errors = useError();

    const partner = computed(() => store.getters.getCurrentPartner);
    const partnerCategories = computed(() => store.getters.getListPartnerCategories);

    const form = reactive({
      name: '',
      promo_type: '',
      partner_category_id: '',
      description_ru: '',
      description_en: '',
      description_ch: ''
    });

    const photos = ref([]);

    const promoTypes = ref([
      {label: 'QR-code', promo: 'QR-code'},
      {label: 'Промокод', promo: 'promocode'}
    ]);

    const breadcrumbs = ref([]);
    const isUpdate = ref(false);

    const loadPartner = async () => {
      await store.dispatch('fetchPartner', route.params.id);
    };

    const loadPartnerCategories = async () => {
      await store.dispatch('fetchPartnerCategories');
    };

    const updatePartner = async () => {
      try {
        await store.dispatch('fetchUpdatePartner', {
          id: route.params.id,
          body: form
        });
        isUpdate.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    watch(form, () => isUpdate.value = false);

    watch(form, () => errors.clearErrors());

    onMounted(async () => {
      await loadPartner();
      await loadPartnerCategories();

      useCreateReactiveCopy(form, partner.value.data);
      photos.value = partner.value.data.photos;

      breadcrumbs.value = [
        {label: 'Партнеры', router: {name: 'partners-list'}},
        {label: partner.value.data.name}
      ];
    });

    return {
      partner,
      form,
      partnerCategories,
      promoTypes,
      breadcrumbs,
      updatePartner,
      isUpdate,
      photos,
      errors: errors.errors
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <div class="flex">
        <Button label="Отклонить" class="btn-error-outlined font-light"/>
        <Button
            v-if="!isUpdate"
            @click="updatePartner"
            label="Сохранить изменения"
            class="btn-primary font-light ml-3"
        />

        <ButtonSuccess class="ml-3" v-if="isUpdate" label="Изменения сохранены"/>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4">
        <MainCard title="Название партнера">
            <span class="p-float-label mb-3 w-full">
              <InputText id="name" class="w-full" :class="{'p-invalid': errors.name }" v-model="form.name"/>
              <label for="name">Название</label>
            </span>
          <span v-if="errors.name" class="color-error">{{ errors.name[0] }}</span>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Идентификатор партнера">
          <Dropdown
              v-model="form.promo_type"
              :options="promoTypes"
              optionLabel="label"
              option-value="promo"
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
        <div v-for="(image, i) in photos" :key="i" class="col-12 md:col-2">
          <img :src="image.preview_url" class="w-full border-round" alt="">
        </div>
      </div>
    </MainCard>
  </section>
</template>

<style scoped>

</style>