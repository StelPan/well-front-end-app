<script>
import {computed, defineComponent, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import Breadcrumb from "@/components/Breadcrumb";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import MainCard from "@/components/cards/MainCard";
import InputNumberPhone from "@/components/inputs/InputNumberPhone";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal";

export default defineComponent({
  components: {Breadcrumb, Button, Dropdown, Calendar, InputText, MainCard, InputNumberPhone, SelectPhoneModal},
  props: {
    form: {
      type: Object,
      required: true,
    }
  },
  setup(props, {emit}) {
    const store = useStore();

    const selectCountry = computed(() => store.getters.getSelectCountry);

    const legalForms = ref([{label: 'ООО'}, {label: 'ИП'}]);

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

    watch(() => props.form, (value) => {
      useCreateReactiveCopy(formData, value);
    });

    watch(formData, () => {
      emit('formChange', formData);
    });

    const changeVisible = (data) => {
      emit('changeVisible', data);
    }

    return {formData, changeVisible, selectCountry, legalForms};
  }
});
</script>

<template>
  <section className="py-2 mb-3">
    <div className="grid mb-2">
      <div className="col-12">
        <MainCard title="Основные регистрационные сведения">
          <div className="grid mb-4">
            <div className="col-12 md:col-4">
              <div className="grid gap-4 m-0 flex-column">
                <span className="p-float-label w-full">
                  <InputText v-model="formData.data.full_name" id="last_name" class="w-full"/>
                  <label htmlFor="last_name">Полное наименование  *</label>
                </span>
                <span className="p-float-label w-full">
                  <InputText v-model="formData.data.short_name" id="first_name" class="w-full"/>
                  <label htmlFor="first_name">Краткое наименование *</label>
                </span>

                <Dropdown
                    v-model="formData.data.legal_form"
                    :options="legalForms"
                    optionLabel="label"
                    optionValue="label"
                    placeholder="Организационно-правовая форма *"
                    class="w-full"/>
              </div>
            </div>
            <div className="col-12 md:col-4">
              <div className="grid m-0 gap-4">
                <span className="p-float-label w-full">
                    <InputText v-model="formData.inn" id="snils" class="w-full"/>
                    <label htmlFor="snils">ИНН *</label>
                </span>

                <span className="p-float-label w-full">
                    <InputText v-model="formData.data.ogrn" id="ogrn" class="w-full"/>
                    <label htmlFor="ogrn">ОГРН *</label>
                </span>

                <Calendar
                    v-model="formData.data.ogrn_date"
                    placeholder="Дата присвоения ОГРН (после 2002 года) *"
                    showIcon
                    class="w-full"
                />
              </div>
            </div>

            <div className="col-12 md:col-4">
              <div className="grid m-0 gap-4">
                <Calendar v-model="formData.data.reg_date" placeholder="Дата регистрации организации (до 2002 года) *"
                          showIcon class="w-full"/>

                <span className="p-float-label w-full">
                  <InputText v-model="formData.data.kpp" id="kpp" class="w-full"/>
                  <label htmlFor="kpp">КПП</label>
                </span>

                <span className="p-float-label w-full">
                    <InputText v-model="formData.data.oktmo" id="oktmo" class="w-full"/>
                    <label htmlFor="oktmo">ОКТМО *</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>

    <div className="grid m-0 mb-2">
      <div className="col-12">
        <MainCard title="Юридический адрес">
          <div className="grid">
            <div className="col-12 md:col-4">
              <div className="grid gap-4 m-0 flex-column">
                  <span className="p-float-label w-full">
                      <InputText v-model="formData.postcode" id="postcode" class="w-full"/>
                      <label htmlFor="postcode">Индекс</label>
                  </span>

                <span className="p-float-label w-full">
                      <InputText v-model="formData.region" id="region" class="w-full"/>
                      <label htmlFor="region">Регион</label>
                  </span>

                <span className="p-float-label w-full">
                      <InputText v-model="formData.city" id="city" class="w-full"/>
                      <label htmlFor="city">Город</label>
                  </span>
              </div>
            </div>
            <div className="col-12 md:col-4">
              <div className="grid gap-4 m-0 flex-column">
                <span className="p-float-label w-full">
                  <InputText v-model="formData.street" id="street" class="w-full"/>
                  <label htmlFor="street">Улица *</label>
              </span>
                <span className="p-float-label w-full">
                  <InputText v-model="formData.house" id="house" class="w-full"/>
                  <label htmlFor="house">Дом *</label>
              </span>
                <span className="p-float-label w-full">
                  <InputText v-model="formData.building" id="street" class="w-full"/>
                  <label htmlFor="street">Номер здания, строение и т.д...</label>
              </span>
              </div>
            </div>
            <div className="col-12 md:col-4">
              <div className="grid gap-4 m-0 flex-column">
                <span className="p-float-label w-full">
                    <InputText v-model="formData.corps" id="frame" class="w-full"/>
                    <label htmlFor="frame">Корпус</label>
                </span>
                <span className="p-float-label w-full">
                  <InputText v-model="formData.floor" id="floor" class="w-full"/>
                  <label htmlFor="floor">Этаж</label>
                </span>
                <span className="p-float-label w-full">
                  <InputText v-model="formData.floor" id="number_office" class="w-full"/>
                  <label htmlFor="number_office">Номер офиса</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>

    <div className="grid mb-2">
      <div className="col-12">
        <MainCard title="Фактический адрес">
          <div className="grid">
            <div className="col-12 md:col-4">
              <div className="grid gap-4 m-0 flex-column">
                  <span className="p-float-label w-full">
                      <InputText v-model="formData.postcode_fact" id="postcode" class="w-full"/>
                      <label htmlFor="postcode">Индекс</label>
                  </span>

                <span className="p-float-label w-full">
                      <InputText v-model="formData.region_fact" id="region" class="w-full"/>
                      <label htmlFor="region">Регион</label>
                  </span>

                <span className="p-float-label w-full">
                      <InputText v-model="formData.city_fact" id="city" class="w-full"/>
                      <label htmlFor="city">Город</label>
                  </span>
              </div>
            </div>
            <div className="col-12 md:col-4">
              <div className="grid gap-4 m-0 flex-column">
                <span className="p-float-label w-full">
                  <InputText v-model="formData.street_fact" id="street" class="w-full"/>
                  <label htmlFor="street">Улица *</label>
              </span>
                <span className="p-float-label w-full">
                  <InputText v-model="formData.house_fact" id="house" class="w-full"/>
                  <label htmlFor="house">Дом *</label>
              </span>
                <span className="p-float-label w-full">
                  <InputText v-model="formData.building_fact" id="street" class="w-full"/>
                  <label htmlFor="street">Номер здания, строение и т.д...</label>
              </span>
              </div>
            </div>
            <div className="col-12 md:col-4">
              <div className="grid gap-4 m-0 flex-column">
                <span className="p-float-label w-full">
                    <InputText v-model="formData.corps_fact" id="frame" class="w-full"/>
                    <label htmlFor="frame">Корпус</label>
                </span>
                <span className="p-float-label w-full">
                  <InputText v-model="formData.floor_fact" id="floor" class="w-full"/>
                  <label htmlFor="floor">Этаж</label>
                </span>
                <span className="p-float-label w-full">
                  <InputText v-model="formData.floor_fact" id="number_office" class="w-full"/>
                  <label htmlFor="number_office">Номер офиса</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>

    <div className="grid mb-2">
      <div className="col-12 md:col-8">
        <MainCard title="Банковские реквизиты">
          <div className="grid">
            <div className="col-12 md:col-6">
              <div className="grid gap-4 m-0 flex-column">
                  <span className="p-float-label w-full">
                      <InputText v-model="formData.account" id="checking_account" class="w-full"/>
                      <label htmlFor="checking_account">Расчетный счет *</label>
                  </span>
                <span className="p-float-label w-full">
                        <InputText v-model="formData.bic" id="bik" class="w-full"/>
                        <label htmlFor="bik">БИК *</label>
                  </span>
              </div>
            </div>
            <div className="col-12 md:col-6">
              <div className="grid gap-4 m-0 flex-column">
                <span className="p-float-label w-full">
                        <InputText v-model="formData.bank" id="bik" class="w-full"/>
                        <label htmlFor="bik">Наименования банка *</label>
                  </span>
                <span className="p-float-label w-full">
                      <InputText v-model="formData.corr_account" id="correspondent_account" class="w-full"/>
                      <label htmlFor="correspondent_account">Корр. счет *</label>
                  </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>

      <div className="col-12 md:col-4">
        <MainCard title="Контактные данные">
          <div className="grid">
            <div className="col-12">
              <div className="grid gap-4 m-0 flex-column">
                <InputNumberPhone
                    v-model="formData.phone"
                    :country="selectCountry?.name"
                    :phone-code="selectCountry?.phone_code ? selectCountry.phone_code : '+7'"
                    @toggleChangePhoneCode="changeVisible"
                />
                <span className="p-float-label w-full">
                  <InputText v-model="formData.email" id="email" class="w-full"/>
                  <label htmlFor="email">Электронная почта (для уведомлений бенефициару) *</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>

      <div className="col-12">
        <MainCard title="Банковские реквизиты">
          <div className="flex justify-content-start">
            <Button class="btn-primary">Загрузить реквизиты</Button>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>