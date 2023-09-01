<script>
import {computed, defineComponent, reactive, ref, watch} from "vue";
import {useStore} from "vuex";

import {useVuelidate} from '@vuelidate/core';
import {required, email, helpers} from '@vuelidate/validators';

import Breadcrumb from "@/components/Breadcrumb";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import MainCard from "@/components/cards/MainCard";
import InputNumberPhone from "@/components/inputs/InputNumberPhone";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal";

export default defineComponent({
  components: {
    Breadcrumb, Button, Dropdown, Calendar, InputText, MainCard, InputNumberPhone, SelectPhoneModal, Checkbox
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    }
  },
  setup(props, {emit}) {
    const store = useStore();

    const selectCountry = computed(() => store.getters.getSelectCountry);

    const legalForms = ref([{label: 'ООО'}, {label: 'ИП'}]);

    const formData = ref(props.form);

    const requiredMessage = 'Поле обязательно для заполнения';
    const rules = {
      inn: {required: helpers.withMessage(requiredMessage, required)},
      data: {
        full_name: {required: helpers.withMessage(requiredMessage, required)},
        oktmo: {required: helpers.withMessage(requiredMessage, required)},
        kpp: {required: helpers.withMessage(requiredMessage, required)},
        ogrn_place: {required: helpers.withMessage(requiredMessage, required)},
        ogrn: {required: helpers.withMessage(requiredMessage, required)},
      },
      postcode: {required: helpers.withMessage(requiredMessage, required)},
      region: {required: helpers.withMessage(requiredMessage, required)},
      region_fact: {required: helpers.withMessage(requiredMessage, required)},
      city: {required: helpers.withMessage(requiredMessage, required)},
      city_fact: {required: helpers.withMessage(requiredMessage, required)},
      street: {required: helpers.withMessage(requiredMessage, required)},
      street_fact: {required: helpers.withMessage(requiredMessage, required)},
      house_fact: {required: helpers.withMessage(requiredMessage, required)},
    };

    const v$ = useVuelidate(rules, formData);

    const isMatch = computed(() => {
      return (formData.value.postcode === formData.value.postcode_fact) &&
          (formData.value.building === formData.value.building_fact) &&
          (formData.value.city === formData.value.city_fact) &&
          (formData.value.corps === formData.value.corps_fact) &&
          (formData.value.floor === formData.value.floor_fact) &&
          (formData.value.region === formData.value.region_fact) &&
          (formData.value.room === formData.value.room_fact) &&
          (formData.value.street === formData.value.street_fact);
    });

    const mergeAddresses = () => {
      formData.value.postcode_fact = formData.value.postcode
      formData.value.building_fact = formData.value.building
      formData.value.city_fact = formData.value.city
      formData.value.corps_fact = formData.value.corps
      formData.value.floor_fact = formData.value.floor
      formData.value.region_fact = formData.value.region
      formData.value.room_fact = formData.value.room
      formData.value.street_fact = formData.value.street
    }

    watch(formData, () => {
      emit('formChange', formData.value);
    });

    const changeVisible = (data) => {
      emit('changeVisible', data);
    }

    return {formData, changeVisible, selectCountry, legalForms, mergeAddresses, isMatch};
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
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.last_name"
                        :class="{'p-invalid': errors?.last_name}"
                        id="last_name"
                        class="w-full"
                    />
                    <label for="last_name">Фамилия *</label>
                  </span>
                  <span v-if="errors?.last_name" class="text-xs color-error">
                    {{ errors.last_name[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.first_name"
                        :class="{'p-invalid': errors?.first_name}"
                        id="first_name"
                        class="w-full"
                    />
                    <label for="first_name">Имя  *</label>
                  </span>
                  <span v-if="errors?.first_name" class="text-xs color-error">
                    {{ errors.first_name[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.patronymic"
                       :class="{'p-invalid': errors?.patronymic}"
                        id="patronymic"
                        class="w-full"
                    />
                    <label for="patronymic">Отчество  *</label>
                  </span>
                  <span v-if="errors?.patronymic" class="text-xs color-error">
                    {{ errors.patronymic[0] }}
                  </span>
                </div>
                <div class="w-full">
                <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.org_name"
                        :class="{'p-invalid': errors?.org_name}"
                        id="last_name"
                        class="w-full"
                    />
                    <label for="last_name">Полное наименование  *</label>
                  </span>
                  <span v-if="errors?.org_name" class="text-xs color-error">
                    {{ errors.org_name[0] }}
                  </span>
                  </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.short_name"
                       :class="{'p-invalid': errors?.short_name}"
                        id="first_name"
                        class="w-full"
                    />
                    <label for="first_name">Краткое наименование *</label>
                  </span>
                  <span v-if="errors?.short_name" class="text-xs color-error">
                    {{ errors.short_name[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <Dropdown
                      v-model="formData.data.legal_form"
                      :class="{'p-invalid': errors?.legal_form}"
                      :options="legalForms"
                      optionLabel="label"
                      optionValue="label"
                      placeholder="Организационно-правовая форма *"
                      class="w-full"/>
                  <span v-if="errors?.legal_form" class="text-xs color-error">
                    {{ errors.legal_form[0] }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.inn"
                          :class="{'p-invalid': errors?.inn}"
                          id="inn"
                          class="w-full"
                      />
                      <label for="inn">ИНН *</label>
                  </span>
                  <span v-if="errors?.inn" class="text-xs color-error">
                    {{ errors.inn[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.data.ogrnip"
                          :class="{'p-invalid': errors?.ogrnip}"
                          id="ogrnip"
                          class="w-full"
                      />
                      <label for="ogrnip">ОГРН *</label>
                  </span>
                  <span v-if="errors?.ogrnip" class="text-xs color-error">
                    {{ errors.ogrnip[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.ogrnip_place"
                        :class="{'p-invalid': errors?.ogrnip_place}"
                        id="ogrn"
                        class="w-full"
                    />
                    <label for="ogrn">ОГРН PLACE *</label>
                  </span>
                  <span v-if="errors?.ogrnip_place" class="text-xs color-error">
                    {{ errors.ogrnip_place[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <Calendar
                      v-model="formData.data.ogrnip_date"
                      :class="{'p-invalid': errors?.ogrnip_date}"
                      placeholder="Дата присвоения ОГРН (после 2002 года) *"
                      showIcon
                      class="w-full"
                  />
                  <span v-if="errors?.ogrnip_date" class="text-xs color-error">
                    {{ errors.ogrnip_date[0] }}
                  </span>
                </div>
              </div>
            </div>

            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.kpp"
                        :class="{'p-invalid': errors?.kpp}"
                        id="kpp"
                        class="w-full"
                    />
                    <label for="kpp">КПП</label>
                  </span>
                  <span v-if="errors?.kpp" class="text-xs color-error">
                    {{ errors.kpp[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.data.oktmo"
                          :class="{'p-invalid': errors?.oktmo}"
                          id="oktmo"
                          class="w-full"
                      />
                      <label for="oktmo">ОКТМО *</label>
                  </span>
                  <span v-if="errors?.oktmo" class="text-xs color-error">
                    {{ errors.oktmo[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.data.snils"
                          :class="{'p-invalid': errors?.snils}"
                          id="snils"
                          class="w-full"
                      />
                      <label for="snils">СНИЛС *</label>
                  </span>
                  <span v-if="errors?.snils" class="text-xs color-error">
                    {{ errors.snils[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <Calendar
                      v-model="formData.data.reg_date"
                      :class="{'p-invalid': errors?.reg_date}"
                      placeholder="Дата регистрации организации (до 2002 года) *"
                      showIcon
                      class="w-full"
                  />
                  <span v-if="errors?.reg_date" class="text-xs color-error">
                    {{ errors.reg_date[0] }}
                  </span>
                </div>
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
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.postcode"
                        :class="{'p-invalid': errors?.postcode}"
                        id="postcode"
                        class="w-full"
                    />
                    <label for="postcode">Индекс</label>
                  </span>
                  <span v-if="errors?.postcode" class="text-xs color-error">
                    {{ errors.postcode[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.region"
                        :class="{'p-invalid': errors?.region}"
                        id="region"
                        class="w-full"
                    />
                    <label for="region">Регион</label>
                  </span>
                  <span v-if="errors?.region" class="text-xs color-error">
                    {{ errors.region[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.city"
                        :class="{'p-invalid': errors?.city}"
                        id="city"
                        class="w-full"
                    />
                    <label for="city">Город</label>
                  </span>
                  <span v-if="errors?.city" class="text-xs color-error">
                    {{ errors.city[0] }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.street"
                        :class="{'p-invalid': errors?.street}"
                        id="street"
                        class="w-full"
                    />
                    <label for="street">Улица *</label>
                 </span>
                  <span v-if="errors?.street" class="text-xs color-error">
                    {{ errors.street[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.house"
                        :class="{'p-invalid': errors?.house}"
                        id="house"
                        class="w-full"
                    />
                    <label for="house">Дом *</label>
                 </span>
                  <span v-if="errors?.house" class="text-xs color-error">
                    {{ errors.house[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.building"
                        :class="{'p-invalid': errors?.building}"
                        id="street"
                        class="w-full"
                    />
                    <label for="street">Номер здания, строение и т.д...</label>
                  </span>
                  <span v-if="errors?.building" class="text-xs color-error">
                    {{ errors.building[0] }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.corps"
                        :class="{'p-invalid': errors?.corps}"
                          id="frame"
                          class="w-full"
                      />
                      <label for="frame">Корпус</label>
                  </span>
                  <span v-if="errors?.corps" class="text-xs color-error">
                    {{ errors.corps[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.floor"
                        :class="{'p-invalid': errors?.floor}"
                        id="floor"
                        class="w-full"
                    />
                    <label for="floor">Этаж</label>
                  </span>
                  <span v-if="errors?.floor" class="text-xs color-error">
                    {{ errors.floor[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.floor"
                        :class="{'p-invalid': errors?.floor}"
                        id="number_office"
                        class="w-full"
                    />
                    <label for="number_office">Номер офиса</label>
                  </span>
                  <span v-if="errors?.floor" class="text-xs color-error">
                    {{ errors.floor[0] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>

    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Фактический адрес">
          <template v-slot:title-action>
            <div class="flex align-items-center">
              <Checkbox
                  @click="mergeAddresses"
                  :model-value="isMatch"
                  :binary="true"
                  name="match-address"
                  class="mr-2"
              />
              <label for="match-address">Совпадает с юридическим адресом</label>
            </div>
          </template>

          <div class="grid">
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.postcode_fact"
                          :class="{'p-invalid': errors?.postcode_fact}"
                          id="postcode"
                          class="w-full"
                      />
                      <label for="postcode">Индекс</label>
                  </span>
                  <span v-if="errors?.postcode_fact" class="text-xs color-error">
                    {{ errors.postcode_fact[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.region_fact"
                          :class="{'p-invalid': errors?.region_fact}"
                          id="region"
                          class="w-full"
                      />
                      <label for="region">Регион</label>
                  </span>
                  <span v-if="errors?.region_fact" class="text-xs color-error">
                    {{ errors.region_fact[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.city_fact"
                          :class="{'p-invalid': errors?.city_fact}"
                          id="city"
                          class="w-full"
                      />
                      <label for="city">Город</label>
                  </span>
                  <span v-if="errors?.city_fact" class="text-xs color-error">
                    {{ errors.city_fact[0] }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.street_fact"
                        :class="{'p-invalid': errors?.street_fact}"
                        id="street"
                        class="w-full"
                    />
                    <label for="street">Улица *</label>
                  </span>
                  <span v-if="errors?.street_fact" class="text-xs color-error">
                    {{ errors.street_fact[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.house_fact"
                        :class="{'p-invalid': errors?.house_fact}"
                        id="house"
                        class="w-full"
                    />
                    <label for="house">Дом *</label>
                  </span>
                  <span v-if="errors?.house_fact" class="text-xs color-error">
                    {{ errors.house_fact[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.building_fact"
                        :class="{'p-invalid': errors?.building_fact}"
                        id="street"
                        class="w-full"
                    />
                    <label for="street">Номер здания, строение и т.д...</label>
                  </span>
                  <span v-if="errors?.building_fact" class="text-xs color-error">
                    {{ errors.building_fact[0] }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.corps_fact"
                        :class="{'p-invalid': errors?.corps_fact}"
                        id="frame"
                        class="w-full"
                    />
                    <label for="frame">Корпус</label>
                  </span>
                  <span v-if="errors?.corps_fact" class="text-xs color-error">
                    {{ errors.corps_fact[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.floor_fact"
                        :class="{'p-invalid': errors?.floor_fact}"
                        id="floor"
                        class="w-full"
                    />
                    <label for="floor">Этаж</label>
                  </span>
                  <span v-if="errors?.floor_fact" class="text-xs color-error">
                    {{ errors.floor_fact[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.floor_fact"
                        :class="{'p-invalid': errors?.floor_fact}"
                        id="number_office"
                        class="w-full"
                    />
                    <label for="number_office">Номер офиса</label>
                  </span>
                  <span v-if="errors?.floor_fact" class="text-xs color-error">
                    {{ errors.floor_fact[0] }}
                  </span>
                </div>
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
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.account"
                        :class="{'p-invalid': errors?.account}"
                        id="checking_account"
                        class="w-full"
                    />
                    <label for="checking_account">Расчетный счет *</label>
                  </span>
                  <span v-if="errors?.account" class="text-xs color-error">
                    {{ errors.account[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.bic"
                        :class="{'p-invalid': errors?.bic}"
                        id="bik"
                        class="w-full"
                    />
                    <label for="bik">БИК *</label>
                  </span>
                  <span v-if="errors?.bic" class="text-xs color-error">
                    {{ errors.bic[0] }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.bank"
                        :class="{'p-invalid': errors?.bank}"
                        id="bik"
                        class="w-full"
                    />
                    <label for="bik">Наименования банка *</label>
                </span>
                <span v-if="errors?.bank" class="text-xs color-error">
                  {{ errors.bank[0] }}
                </span>
                <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.corr_account"
                        :class="{'p-invalid': errors?.corr_account}"
                        id="correspondent_account"
                        class="w-full"
                    />
                    <label for="correspondent_account">Корр. счет *</label>
                </span>
                <span v-if="errors?.corr_account" class="text-xs color-error">
                  {{ errors.corr_account[0] }}
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
                <div>
                  <InputNumberPhone
                      v-model="formData.phone"
                      :country="selectCountry?.name"
                      :classes="{'p-invalid': errors?.phone}"
                      :phone-code="selectCountry?.phone_code ? selectCountry.phone_code : '+7'"
                      @toggleChangePhoneCode="changeVisible"
                  />
                  <span v-if="errors?.phone" class="text-xs color-error">
                    {{ errors.phone[0] }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.email"
                        :class="{'p-invalid': errors?.email}"
                        id="email"
                        class="w-full"
                    />
                    <label for="email">Электронная почта (для уведомлений бенефициару) *</label>
                  </span>
                  <span v-if="errors?.email" class="text-xs color-error">
                   {{ errors.email[0] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>