<script>
import {computed, defineComponent, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";
import _ from "loadsh";

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

    const formData = ref(props.form);

    watch(formData, () => {
      emit('formChange', formData.value);
    });

    const changeVisible = (data) => {
      emit('changeVisible', data);
    }

    return {formData, changeVisible, selectCountry, legalForms};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Основные регистрационные сведения">
          <div class="grid mb-4">
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                  <InputText v-model="formData.data.full_name" id="last_name" class="w-full"/>
                  <label for="last_name">Полное наименование  *</label>
                </span>
                <span class="p-float-label w-full">
                  <InputText v-model="formData.data.short_name" id="first_name" class="w-full"/>
                  <label for="first_name">Краткое наименование *</label>
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
            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <span class="p-float-label w-full">
                    <InputText v-model="formData.inn" id="snils" class="w-full"/>
                    <label for="snils">ИНН *</label>
                </span>

                <span class="p-float-label w-full">
                    <InputText v-model="formData.data.ogrn" id="ogrn" class="w-full"/>
                    <label for="ogrn">ОГРН *</label>
                </span>

                <Calendar
                    v-model="formData.data.ogrn_date"
                    placeholder="Дата присвоения ОГРН (после 2002 года) *"
                    showIcon
                    class="w-full"
                />
              </div>
            </div>

            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <Calendar v-model="formData.data.reg_date" placeholder="Дата регистрации организации (до 2002 года) *" showIcon class="w-full"/>

                <span class="p-float-label w-full">
                  <InputText v-model="formData.data.kpp" id="kpp" class="w-full"/>
                  <label for="kpp">КПП</label>
                </span>

                <span class="p-float-label w-full">
                    <InputText v-model="formData.data.oktmo" id="oktmo" class="w-full"/>
                    <label for="oktmo">ОКТМО *</label>
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
                      <InputText v-model="formData.account" id="checking_account" class="w-full"/>
                      <label for="checking_account">Расчетный счет *</label>
                  </span>
                <span class="p-float-label w-full">
                        <InputText v-model="formData.bic" id="bik" class="w-full"/>
                        <label for="bik">БИК *</label>
                  </span>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                        <InputText v-model="formData.bank" id="bik" class="w-full"/>
                        <label for="bik">Наименования банка *</label>
                  </span>
                <span class="p-float-label w-full">
                      <InputText v-model="formData.corr_account" id="correspondent_account" class="w-full"/>
                      <label for="correspondent_account">Корр. счет *</label>
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
                    v-model="formData.phone"
                    :country="selectCountry?.name"
                    :phone-code="selectCountry?.phone_code ? selectCountry.phone_code : '+7'"
                    @toggleChangePhoneCode="changeVisible"
                />
                <span class="p-float-label w-full">
                  <InputText v-model="formData.email" id="email" class="w-full"/>
                  <label for="email">Электронная почта (для уведомлений бенефициару) *</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>

      <div class="col-12">
        <MainCard title="Банковские реквизиты">
          <div class="flex justify-content-start">
            <Button class="btn-primary">Загрузить реквизиты</Button>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>