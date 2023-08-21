<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Breadcrumb from "@/components/Breadcrumb";
import MainCard from "@/components/cards/MainCard";
import ButtonSuccess from "@/components/buttons/ButtonSuccess.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {ButtonSuccess, Breadcrumb, MainCard, InputText, Button},
  setup() {
    const store = useStore();
    const route = useRoute();

    const bank = computed(() => store.getters.getCurrentBank);

    const isCreated = ref(false);
    const breadcrumbs = ref([]);
    const formData = reactive({
      identifier: "",
      userName: "",
      password: ""
    });

    const toggleCreateAcquiringHandler = async () => {
      await store.dispatch('fetchCreateAcquiring', {
        bankId: route.params.id,
        body: formData
      });

      formData.identifier = formData.password = formData.userName = '';
    };

    watch(formData, () => isCreated.value = false);

    onMounted(async () => {
      await store.dispatch('fetchBank', Number(route.params.id));
      breadcrumbs.value = [
        {label: 'Обслуживающие компании', router: {name: 'vendors-list'}},
        {label: bank.value.name}
      ]
    });

    return {bank, breadcrumbs, formData, toggleCreateAcquiringHandler, isCreated};
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <ButtonSuccess v-if="isCreated" label="Счет был создал" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="col-12 md:col-8">
      <MainCard>
        <div class="grid">
          <div class="col-12 mb-2">
            <span class="p-float-label w-full">
              <InputText v-model="formData.identifier" id="identifier" class="w-full"/>
              <label for="identifier">Идентификатор (любая фраза) *</label>
            </span>
          </div>
          <div class="col-12">
            <div class="grid">
              <div class="col-12 md:col-6">
                <span class="p-float-label w-full">
                  <InputText v-model="formData.userName" id="userName" class="w-full"/>
                  <label for="userName">Логин *</label>
                </span>
              </div>
              <div class="col-12 md:col-6">
                <span class="p-float-label w-full">
                  <InputText v-model="formData.password" id="password" type="password" class="w-full"/>
                  <label for="password">Пароль *</label>
                </span>
              </div>
            </div>
          </div>
          <div class="col-12">
            <Button
                @click="toggleCreateAcquiringHandler"
                class="btn-primary font-light"
                label="Добавить счет"
                size="large"
            />
          </div>
        </div>
      </MainCard>
    </div>
  </section>
</template>

<style scoped>

</style>