<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";
import {usePartnerCategory} from "@/hooks/partner-category";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import MainCard from "@/components/cards/MainCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {InputText, Button, MainCard, Breadcrumb, ButtonSuccess},
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadPartnerCategory} = usePartnerCategory();
      await loadPartnerCategory(to.params.id);
    } catch (e) {
      console.error(e);
    }

    next();
  },
  setup() {
    const {category, form, updatePartnerCategory: update, v$} = usePartnerCategory();
    const route = useRoute();

    form.value = {...category.value};

    const breadcrumbs = ref([]);
    const isUpdated = ref(false);

    const updatePartnerCategory = async () => {
      try {
        await update(route.params.id, form.value);
        isUpdated.value = true;
      } catch (e) {
        console.error(e);
      }
    };

    watch(form, () => isUpdated.value = false);

    onMounted( () => {
      breadcrumbs.value = [
        {label: 'Партнеры', router: {name: 'partners-categories'}},
        {label: category.value.name_ru}
      ];

      form.name_ru = category.value.name_ru;
    });

    return {category, form, breadcrumbs, updatePartnerCategory, isUpdated, v$};
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <div class="flex">
        <ButtonSuccess v-if="isUpdated" label="Изменения сохранены"/>

        <Button
            @click="updatePartnerCategory"
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
              <InputText
                  v-model="form.name_ru"
                  id="last_name"
                  class="w-full"
                  :class="{'p-invalid': v$.name_ru.$errors.length}"
              />
              <label for="last_name">Наименование категории *</label>
            </span>

            <span v-if="v$.name_ru.$errors.length" class="text-xs color-error">
              {{ v$.name_ru.$errors[0].$message }}
            </span>
          </div>
        </div>
      </MainCard>
    </div>
  </section>
</template>