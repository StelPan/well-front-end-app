<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import MainCard from "@/components/cards/MainCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {InputText, Button, MainCard, Breadcrumb, ButtonSuccess},
  setup() {
    const store = useStore();
    const route = useRoute();
    const errors = useError();

    const form = reactive({name_ru: ''});

    const breadcrumbs = ref([]);
    const isCreated = ref(false);

    const createPartnerCategory = async () => {
      try {
        await store.dispatch('fetchCreatePartnerCategory', form);
        isCreated.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    onMounted(async () => {
      breadcrumbs.value = [
        {label: 'Партнеры', router: {name: 'partners-categories'}},
        {label: 'Создание категории'}
      ];
    });

    return {form, breadcrumbs, createPartnerCategory, errors: errors.errors, isCreated};
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <div class="flex">
        <ButtonSuccess v-if="isCreated" label="Категория создана" />

        <Button
            v-else
            @click="createPartnerCategory"
            label="Сохранить изменения"
            class="btn-primary font-light ml-2"
        />
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid col-12 md:col-4">
      <MainCard title="Наименование категории">
        <div class="grid">
          <div class="col-12">
            <span class="p-float-label w-full">
              <InputText v-model="form.name_ru" id="last_name" class="w-full" :class="{'p-invalid': errors.name_ru}"/>
              <label for="last_name">Наименование категории *</label>
            </span>

            <span v-if="errors.name_ru" class="text-xs color-error">
              {{ errors.name_ru[0] }}
            </span>
          </div>
        </div>
      </MainCard>
    </div>
  </section>
</template>