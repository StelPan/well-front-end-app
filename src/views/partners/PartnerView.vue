<script>
import {computed, defineComponent, onMounted, ref, unref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {usePartners} from "@/hooks/partners";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import MainCard from "@/components/cards/MainCard";
import Breadcrumb from "@/components/Breadcrumb";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import ButtonFileUpload from "@/components/buttons/ButtonFileUpload.vue";
import ImageCard from "@/components/cards/ImageCard.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {ButtonSuccess, Button, InputText, MainCard, Dropdown, Breadcrumb, Editor, ButtonFileUpload, ImageCard},
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadPartner} = usePartners();
      await loadPartner(to.params.id);
    } catch (e) {
      console.log(e);
    }

    next();
  },
  setup() {
    const {
      partner,
      form,
      files,
      updatePartner,
      loadFileMemory,
      isUpdate,
      v$,
      destroyFileMemory,
      destroyFile,
      loadPartner
    } = usePartners();

    const store = useStore();

    form.value = unref(partner);

    const partnerCategories = computed(() => store.getters.getListPartnerCategories);

    const promoTypes = ref([
      {label: 'QR-code', promo: 'QR-code'},
      {label: 'Промокод', promo: 'promocode'}
    ]);

    const breadcrumbs = ref([]);

    const loadPartnerCategories = async () => {
      await store.dispatch('fetchPartnerCategories');
    };

    const update = async () => {
      try {
        await updatePartner();
        await loadPartner(partner.value.id);
        files.value = [];
      } catch (e) {
        console.error(e);
      }
    };

    const deleteFile = async (uuid) => {
      await destroyFile(partner.value.id, {uuid});
    }

    watch(form, () => isUpdate.value = false);

    onMounted(async () => {
      await loadPartnerCategories();

      breadcrumbs.value = [
        {label: 'Партнеры', router: {name: 'partners-list'}},
        {label: partner.value.name}
      ];
    });

    return {
      partner, files,
      form,
      partnerCategories,
      promoTypes,
      breadcrumbs,
      update,
      isUpdate,
      destroyFileMemory,
      loadFileMemory,
      deleteFile,
      v$,
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
            @click="update"
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
              <InputText
                  :class="{'p-invalid': v$.name.$errors.length }"
                  id="name"
                  class="w-full"
                  v-model="form.name"
              />
              <label for="name">Название</label>
            </span>
          <span v-if="v$.name.$errors.length" class="color-error">{{ v$.name.$errors[0].$message }}</span>
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
              :class="{'p-invalid': v$.partner_category_id.$errors.length }"
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
          <span v-if="v$.description_ru.$errors.length" class="text-xs color-error">
            {{ v$.description_ru.$errors[0].$message }}
          </span>
        </div>
      </div>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Изображения">
      <div class="grid">
        <div v-for="(image, i) in partner.photos" :key="i" class="col-12 md:col-2">
          <ImageCard :src="image.preview_url" :handle="() => deleteFile(image.uuid)"/>
        </div>

        <template v-if="files.length">
          <div v-for="(file, i) in files" :key="i" class="col-12 md:col-2">
            <ImageCard :src="file.objectURL" :handle="() => destroyFileMemory(file)"/>
          </div>
        </template>


        <div class="col-12">
          <ButtonFileUpload @chooseFiles="loadFileMemory" label="Добавить изображение" :multiple="true"
                            :clear-files-after-select="true"/>
        </div>
      </div>
    </MainCard>
  </section>
</template>

<style scoped>

</style>