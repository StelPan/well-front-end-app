<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";
import Button from "primevue/button";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Breadcrumb, MainCard, Dropdown, InputText, Editor, Button},
  setup() {
    const store = useStore();
    const route = useRoute();

    const categories = computed(() => store.getters.getListServiceCategories);
    const service = computed(() => store.getters.getCurrentService);
    const banks = computed(() => store.getters.getListBanks);

    const breadcrumbs = ref([]);

    const loadService = async () => {
      await store.dispatch('fetchService', route.params.id);
    };

    const loadBanks = async () => {
      await store.dispatch('fetchBanks');
    };

    const loadServiceCategories = async () => {
      await store.dispatch('fetchServiceCategories');
    };

    onMounted(async () => {
      await loadServiceCategories();
      await loadService();
      await loadBanks();

      breadcrumbs.value = [
        {label: 'Услуги', router: {name: 'services-list'}},
        {label: service.value.name_ru}
      ];
    });

    return {service, categories, banks, breadcrumbs};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <Button label="Сохранить изменения" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4">
        <MainCard title="Наименование услуги">
          <div class="flex flex-column gap-3">
            <span class="p-float-label mb-3 w-full">
              <InputText id="last_name" class="w-full"/>
              <label for="last_name">Введите наименование</label>
            </span>

            <Dropdown
                :options="[]"
                optionLabel="name"
                placeholder="Тип услуги"
                class="w-full"
            />

            <Dropdown
                :options="[]"
                optionLabel="name"
                placeholder="Категория услуги"
                class="w-full"
            />
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Стоимость услуги">
          <div class="flex flex-column gap-3">
            <span class="p-float-label mb-3 w-full">
              <InputText id="last_name" class="w-full"/>
              <label for="last_name">Укажите стоимость, Р</label>
            </span>

            <Dropdown
                :options="[]"
                optionLabel="name"
                placeholder="Тип стоимости"
                class="w-full"
            />
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Реквизиты и эквайринг">
          <div class="flex flex-column gap-3">
            <Dropdown
                :options="[]"
                optionLabel="name"
                placeholder="Банк"
                class="w-full"
            />

            <Dropdown
                :options="[]"
                optionLabel="name"
                placeholder="Идентификатор эквайринга"
                class="w-full"
            />
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Описание услуги">
      <Editor class="w-full"></Editor>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Изображения">
      <div class="grid">
        <div class="col-12 md:col-2">

        </div>

        <div class="col-12">
          <Button label="Добавить изображение" class="btn-primary font-light"/>
        </div>
      </div>
    </MainCard>
  </section>
</template>