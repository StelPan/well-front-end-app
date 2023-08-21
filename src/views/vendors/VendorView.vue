<script>
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import Button from "primevue/button"
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";

import Breadcrumb from "@/components/Breadcrumb";
import MainCard from "@/components/cards/MainCard";
import InputNumberPhone from "@/components/inputs/InputNumberPhone";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Breadcrumb, Button, Dropdown, Calendar, InputText, MainCard, InputNumberPhone, SelectPhoneModal},
  setup() {
    const store = useStore();
    const route = useRoute();

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
    }

    onMounted(async () => {
      await loadVendor();
      useCreateReactiveCopy(formData, vendor.value);
    });

    return {vendor, breadcrumbs, visible, changeVisible, countries, selectCountry, formData};
  }
});
</script>

<template>
  <SelectPhoneModal :countries="countries" :visible="visible" @toggleCloseModal="changeVisible"/>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <Button label="Сохранить реквизиты" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Основные регистрационные сведения">
          <div class="grid mb-4">
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                  <InputText id="last_name" class="w-full"/>
                  <label for="last_name">Полное наименование  *</label>
                </span>
                <span class="p-float-label w-full">
                  <InputText id="first_name" class="w-full"/>
                  <label for="first_name">Краткое наименование *</label>
                </span>

                <Dropdown :options="[]" optionLabel="name" placeholder="Организационно-правовая форма *"
                          class="w-full"/>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <span class="p-float-label w-full">
                    <InputText id="snils" class="w-full"/>
                    <label for="snils">ИНН *</label>
                </span>

                <span class="p-float-label w-full">
                    <InputText id="snils" class="w-full"/>
                    <label for="snils">ОГРН *</label>
                </span>

                <Calendar placeholder="Дата присвоения ОГРН (после 2002 года) *" showIcon class="w-full"/>
              </div>
            </div>

            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <Calendar placeholder="Дата регистрации организации (до 2002 года) *" showIcon class="w-full"/>

                <span class="p-float-label w-full">
                  <InputText id="oktmo" class="w-full"/>
                  <label for="oktmo">КПП</label>
                </span>

                <span class="p-float-label w-full">
                    <InputText id="snils" class="w-full"/>
                    <label for="snils">ОКТМО *</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>

    <div class="grid m-0 mb-2">
      <div class="col-12">
        <MainCard title="Юридический адрес">
          <div class="grid">
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                  <span class="p-float-label w-full">
                      <InputText v-model="formData.postcode" id="postcode" class="w-full"/>
                      <label for="postcode">Индекс</label>
                  </span>

                <span class="p-float-label w-full">
                      <InputText v-model="formData.region" id="region" class="w-full"/>
                      <label for="region">Регион</label>
                  </span>

                <span class="p-float-label w-full">
                      <InputText v-model="formData.city" id="city" class="w-full"/>
                      <label for="city">Город</label>
                  </span>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                  <InputText v-model="formData.street" id="street" class="w-full"/>
                  <label for="street">Улица *</label>
              </span>
                <span class="p-float-label w-full">
                  <InputText v-model="formData.house" id="house" class="w-full"/>
                  <label for="house">Дом *</label>
              </span>
                <span class="p-float-label w-full">
                  <InputText v-model="formData.building" id="street" class="w-full"/>
                  <label for="street">Номер здания, строение и т.д...</label>
              </span>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                    <InputText v-model="formData.corps" id="frame" class="w-full"/>
                    <label for="frame">Корпус</label>
                </span>
                <span class="p-float-label w-full">
                  <InputText v-model="formData.floor" id="floor" class="w-full"/>
                  <label for="floor">Этаж</label>
                </span>
                <span class="p-float-label w-full">
                  <InputText v-model="formData.floor" id="number_office" class="w-full"/>
                  <label for="number_office">Номер офиса</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>

    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Фактический адрес">
          <div class="grid">
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                  <span class="p-float-label w-full">
                      <InputText v-model="formData.postcode_fact" id="postcode" class="w-full"/>
                      <label for="postcode">Индекс</label>
                  </span>

                <span class="p-float-label w-full">
                      <InputText v-model="formData.region_fact" id="region" class="w-full"/>
                      <label for="region">Регион</label>
                  </span>

                <span class="p-float-label w-full">
                      <InputText v-model="formData.city_fact" id="city" class="w-full"/>
                      <label for="city">Город</label>
                  </span>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                  <InputText v-model="formData.street_fact" id="street" class="w-full"/>
                  <label for="street">Улица *</label>
              </span>
                <span class="p-float-label w-full">
                  <InputText v-model="formData.house_fact" id="house" class="w-full"/>
                  <label for="house">Дом *</label>
              </span>
                <span class="p-float-label w-full">
                  <InputText v-model="formData.building_fact" id="street" class="w-full"/>
                  <label for="street">Номер здания, строение и т.д...</label>
              </span>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                    <InputText v-model="formData.corps_fact" id="frame" class="w-full"/>
                    <label for="frame">Корпус</label>
                </span>
                <span class="p-float-label w-full">
                  <InputText v-model="formData.floor_fact" id="floor" class="w-full"/>
                  <label for="floor">Этаж</label>
                </span>
                <span class="p-float-label w-full">
                  <InputText v-model="formData.floor_fact" id="number_office" class="w-full"/>
                  <label for="number_office">Номер офиса</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>

    <div class="grid mb-2">
      <div class="col-12 md:col-8">
        <MainCard title="Банковские реквизиты">
          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="grid gap-4 m-0 flex-column">
                  <span class="p-float-label w-full">
                      <InputText id="checking_account" class="w-full"/>
                      <label for="checking_account">Расчетный счет *</label>
                  </span>
                <span class="p-float-label w-full">
                        <InputText id="bik" class="w-full"/>
                        <label for="bik">БИК *</label>
                  </span>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="grid gap-4 m-0 flex-column">
                  <span class="p-float-label w-full">
                      <InputText id="correspondent_account" class="w-full"/>
                      <label for="correspondent_account">Корр. счет *</label>
                  </span>
                <span class="p-float-label w-full">
                        <InputText id="bik" class="w-full"/>
                        <label for="bik">БИК *</label>
                  </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>

      <div class="col-12 md:col-4">
        <MainCard title="Контактные данные">
          <div class="grid">
            <div class="col-12">
              <div class="grid gap-4 m-0 flex-column">
                <InputNumberPhone
                    :country="selectCountry?.name"
                    :phone-code="selectCountry?.phone_code ? selectCountry.phone_code : '+7'"
                    @toggleChangePhoneCode="changeVisible"
                />
                <span class="p-float-label w-full">
                  <InputText id="email" class="w-full"/>
                  <label for="email">Электронная почта (для уведомлений бенефициару) *</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>