<script>
import {defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";
import {useVuelidate} from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'

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

    const form = reactive({name_ru: ''});
    const rules = {name_ru: {required: helpers.withMessage('Поле обязательно для заполнения', required)}};

    const v$ = useVuelidate(rules, form);

    const breadcrumbs = ref([]);
    const isCreated = ref(false);

    const errors = ref(null)
    const createPartnerCategory = async () => {
      try {
        const result = await v$.value.$validate();
        if (!result) {
          return;
        }

        await store.dispatch('fetchCreatePartnerCategory', form);
        isCreated.value = true;
      } catch (e) {
        errors.value = e.response.data.errors;
        // errors.setErrors(e.response.data.errors);
      }
    };

    watch(form, () => errors.value = false);

    onMounted(async () => {
      breadcrumbs.value = [
        {label: 'Партнеры', router: {name: 'partners-categories'}},
        {label: 'Создание категории'}
      ];
    });

    return {form, breadcrumbs, createPartnerCategory, errors, isCreated, v$};
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <div class="flex">
        <ButtonSuccess v-if="isCreated" label="Категория создана"/>

        <Button
            v-else
            @click="createPartnerCategory"
            label="Создать категорию"
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
              <InputText
                  :class="{'p-invalid': v$.name_ru.$errors.length || errors}"
                  v-model="form.name_ru"
                  id="last_name"
                  class="w-full"
              />
              <label for="last_name">Наименование категории *</label>
            </span>

            <span class="text-xs color-error" v-if="v$.name_ru.$errors.length">
              {{ v$.name_ru.$errors[0].$message }}
            </span>

            <span v-if="errors" class="text-xs color-error">
              {{ errors.name_ru[0] }}
            </span>
          </div>
        </div>
      </MainCard>
    </div>
  </section>
</template>