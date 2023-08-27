<script>
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";
import {useFlat} from "@/hooks/flat";

import Button from "primevue/button";
import VendorJuridicalPersonForm from "@/components/forms/VendorJuridicalPersonForm";
import VendorIndividualPersonForm from "@/components/forms/VendorIndividualPersonForm.vue";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal";
import Breadcrumb from "@/components/Breadcrumb";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {VendorJuridicalPersonForm, VendorIndividualPersonForm, SelectPhoneModal, Breadcrumb, Button},
  setup() {
    const store = useStore();
    const route = useRoute();

    const formVendorTypes = {
      'ul': 'VendorJuridicalPersonForm',
      'ip': 'VendorIndividualPersonForm'
    }

    const vendor = computed(() => store.getters.getCurrentVendor);
    const countries = computed(() => store.getters.getCountriesList);
    const selectCountry = computed(() => store.getters.getSelectCountry);

    const formData = reactive({
      inn: '', email: '',
      phone: '', type: '', postcode: '',
      region: '', city: '', street: '',
      house: '', building: '', corps: '',
      floor: '', postcode_fact: '', region_fact: '',
      city_fact: '', street_fact: '', house_fact: '',
      building_fact: '', corps_fact: '', floor_fact: '',
      room_fact: '', account: '', corr_account: '',
      bic: '', bank: '', payment_details: '',
      data: {
        short_name: '', full_name: '', legal_form: '', kpp: '', ogrn: '', ogrn_date: '', ogrn_place: '',
        reg_date: '', oktmo: '', org_name: '', snils: '', ogrnip_date: '', ogrnip_place: '', ogrnip: '',
        first_name: '', last_name: '', patronymic: '',
      }
    });

    const file = ref(false);

    const breadcrumbs = ref([]);
    const visible = ref(false);

    const changeVisible = () => {
      visible.value = !visible.value;
    };

    const loadVendor = async () => {
      await store.dispatch('fetchVendor', route.params.id);
      await store.dispatch('fetchCountries');

      const label = vendor.value.type === 'ul' ?
          vendor.value.data.full_name :
          vendor.value.data.org_name;

      breadcrumbs.value = [
        {label: 'Обслуживающие компании', router: {name: 'vendors-list'}},
        {label: label}
      ];
    };

    const updateVendor = async () => {
      await store.dispatch('fetchUpdateVendor', {
        id: route.params.id,
        form: useFlat(formData)
      });
    };

    const updateForm = (form) => {
      useCreateReactiveCopy(formData, form);
    };

    onMounted(async () => {
      await loadVendor();
      useCreateReactiveCopy(formData, vendor.value);
    });

    return {
      vendor,
      breadcrumbs,
      visible,
      changeVisible,
      countries,
      selectCountry,
      formData,
      updateForm,
      updateVendor,
      formVendorTypes
    };
  }
});
</script>

<template>
  <SelectPhoneModal :countries="countries" :visible="visible" @toggleCloseModal="changeVisible"/>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <Button @click="updateVendor" label="Сохранить реквизиты" class="btn-primary font-light"/>
    </div>
  </section>

  <template v-if="vendor?.type === 'ul'">
    <VendorJuridicalPersonForm
        :form="vendor"
        @formChange="updateForm"
        @changeVisible="changeVisible"
    />
  </template>

  <template v-if="vendor?.type === 'ip'">
    <VendorIndividualPersonForm
        :form="vendor"
        @formChange="updateForm"
        @changeVisible="changeVisible"
    />
  </template>
</template>

<style scoped>

</style>