<script>
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import MainCard from "@/components/cards/MainCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import breadcrumb from "@/components/Breadcrumb.vue";

export default defineComponent({
  computed: {
    breadcrumb() {
      return breadcrumb
    }
  },
  layout: {name: 'AdminLayout'},
  components: {InputText, Button, MainCard, Breadcrumb},
  setup() {
    const store = useStore();
    const route = useRoute();

    const category = computed(() => store.getters.getCurrentPartnerCategory);

    const form = reactive({name_ru: ''});

    const breadcrumbs = ref([]);

    const loadPartnerCategory = async () => {
      await store.dispatch('fetchPartnerCategory', route.params.id);
    };

    const updatePartnerCategory = async () => {
      await store.dispatch('fetchUpdatePartnerCategory', {
        id: route.params.id,
        body: form,
      })
    };

    onMounted(async () => {
      await loadPartnerCategory();

      breadcrumbs.value = [
        {label: 'Партнеры', router: {name: 'partners-categories'}},
        {label: category.value.name_ru}
      ];

      form.name_ru = category.value.name_ru;
    });

    return {category, form, breadcrumbs, updatePartnerCategory};
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />

      <Button
          @click="updatePartnerCategory"
          label="Сохранить изменения"
          class="btn-primary font-light"
      />
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid col-12 md:col-4">
      <MainCard title="Наименование категории">
        <div class="grid">
          <div class="col-12">
          <span class="p-float-label w-full">
            <InputText v-model="form.name_ru" id="last_name" class="w-full"/>
            <label for="last_name">Наименование категории *</label>
          </span>
          </div>
        </div>
      </MainCard>
    </div>
  </section>
</template>

<style scoped>

</style>