<script>
import {computed, defineComponent, reactive, ref, watch} from "vue";
import {useStore} from "vuex";

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
    formData.value.type = 'ul';

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
                        v-model="formData.full_name"
                        :class="{'p-invalid': errors.full_name.$errors.length}"
                        id="full_name"
                        class="w-full"
                    />
                    <label for="full_name">Полное наименование *</label>
                  </span>
                  <span v-if="errors.full_name.$errors.length" class="text-xs color-error">
                    {{ errors.full_name.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.short_name"
                        :class="{'p-invalid': errors.short_name.$errors.length}"
                        id="first_name"
                        class="w-full"
                    />
                    <label for="first_name">Краткое наименование  *</label>
                  </span>
                  <span v-if="errors.short_name.$errors.length" class="text-xs color-error">
                    {{ errors.short_name.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <Dropdown
                      v-model="formData.legal_form"
                      :class="{'p-invalid': errors.legal_form.$errors.length}"
                      :options="legalForms"
                      optionLabel="label"
                      optionValue="label"
                      placeholder="Организационно-правовая форма *"
                      class="w-full"/>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.inn"
                          :class="{'p-invalid': errors.inn.$errors.length}"
                          id="inn"
                          class="w-full"
                      />
                      <label for="inn">ИНН *</label>
                  </span>
                  <span v-if="errors.inn.$errors.length" class="text-xs color-error">
                    {{ errors.inn.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.ogrn"
                          :class="{'p-invalid': errors.ogrn.$errors.length}"
                          id="ogrnip"
                          class="w-full"
                      />
                      <label for="ogrnip">ОГРН *</label>
                  </span>
                  <span v-if="errors.ogrn.$errors.length" class="text-xs color-error">
                    {{ errors.ogrn.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.ogrn_place"
                        :class="{'p-invalid': errors.ogrn_place.$errors.length}"
                        id="ogrn"
                        class="w-full"
                    />
                    <label for="ogrn">Место присвоения ОГРН *</label>
                  </span>
                  <span v-if="errors.ogrn_place.$errors.length" class="text-xs color-error">
                    {{ errors.ogrn_place.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <Calendar
                      date-format="d.m.yy"
                      v-model="formData.ogrn_date"
                      :class="{'p-invalid': errors.ogrn_date.$errors.length}"
                      placeholder="Дата присвоения ОГРН (после 2002 года) *"
                      showIcon
                      class="w-full"
                  />
                  <span v-if="errors.ogrn_date.$errors.length" class="text-xs color-error">
                    {{ errors.ogrn_date.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>

            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <div class="w-full">
                  <Calendar
                      date-format="d.m.yy"
                      v-model="formData.reg_date"
                      :class="{'p-invalid': errors.reg_date.$errors.length}"
                      placeholder="Дата регистрации организации (до 2002 года) *"
                      showIcon
                      class="w-full"
                  />
                  <span v-if="errors.reg_date.$errors.length" class="text-xs color-error">
                    {{ errors.reg_date.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.kpp"
                        :class="{'p-invalid': errors.kpp.$errors.length}"
                        id="kpp"
                        class="w-full"
                    />
                    <label for="kpp">КПП</label>
                  </span>
                  <span v-if="errors.kpp.$errors.length" class="text-xs color-error">
                    {{ errors.kpp.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.oktmo"
                          :class="{'p-invalid': errors.oktmo.$errors.length}"
                          id="oktmo"
                          class="w-full"
                      />
                      <label for="oktmo">ОКТМО *</label>
                  </span>
                  <span v-if="errors.oktmo.$errors.length" class="text-xs color-error">
                    {{ errors.oktmo.$errors[0].$message }}
                  </span>
                </div>
                <!--                <div class="w-full">-->
                <!--                  <span class="p-float-label w-full">-->
                <!--                      <InputText-->
                <!--                          v-model="formData.snils"-->
                <!--                          :class="{'p-invalid': errors?.snils}"-->
                <!--                          id="snils"-->
                <!--                          class="w-full"-->
                <!--                      />-->
                <!--                      <label for="snils">СНИЛС *</label>-->
                <!--                  </span>-->
                <!--                  <span v-if="errors?.snils" class="text-xs color-error">-->
                <!--                    {{ errors.snils[0] }}-->
                <!--                  </span>-->
                <!--                </div>-->
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
                        :class="{'p-invalid': errors.postcode.$errors.length}"
                        id="postcode"
                        class="w-full"
                    />
                    <label for="postcode">Индекс</label>
                  </span>
                  <span v-if="errors.postcode.$errors.length" class="text-xs color-error">
                    {{ errors.postcode.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.region"
                        :class="{'p-invalid': errors.region.$errors.length}"
                        id="region"
                        class="w-full"
                    />
                    <label for="region">Регион</label>
                  </span>
                  <span v-if="errors.region.$errors.length" class="text-xs color-error">
                    {{ errors.region.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.city"
                        :class="{'p-invalid': errors.city.$errors.length}"
                        id="city"
                        class="w-full"
                    />
                    <label for="city">Город</label>
                  </span>
                  <span v-if="errors.city.$errors.length" class="text-xs color-error">
                    {{ errors.city.$errors[0].$message }}
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
                        :class="{'p-invalid': errors.street.$errors.length}"
                        id="street"
                        class="w-full"
                    />
                    <label for="street">Улица *</label>
                 </span>
                  <span v-if="errors.street.$errors.length" class="text-xs color-error">
                    {{ errors.street.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.house"
                        :class="{'p-invalid': errors.house.$errors.length}"
                        id="house"
                        class="w-full"
                    />
                    <label for="house">Дом *</label>
                 </span>
                  <span v-if="errors.house.$errors.length" class="text-xs color-error">
                    {{ errors.house.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.building"
                        id="street"
                        class="w-full"
                    />
                    <label for="street">Номер здания, строение и т.д...</label>
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
                          id="frame"
                          class="w-full"
                      />
                      <label for="frame">Корпус</label>
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.floor"
                        id="floor"
                        class="w-full"
                    />
                    <label for="floor">Этаж</label>
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.room"
                        id="number_office"
                        class="w-full"
                    />
                    <label for="number_office">Номер офиса</label>
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
                          :class="{'p-invalid': errors.postcode_fact.$errors.length}"
                          id="postcode"
                          class="w-full"
                      />
                      <label for="postcode">Индекс</label>
                  </span>
                  <span v-if="errors.postcode_fact.$errors.length" class="text-xs color-error">
                    {{ errors.postcode_fact.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.region_fact"
                          :class="{'p-invalid': errors.region_fact.$errors.length}"
                          id="region"
                          class="w-full"
                      />
                      <label for="region">Регион</label>
                  </span>
                  <span v-if="errors.region_fact.$errors.length" class="text-xs color-error">
                    {{ errors.region_fact.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.city_fact"
                          :class="{'p-invalid': errors.city_fact.$errors.length}"
                          id="city"
                          class="w-full"
                      />
                      <label for="city">Город</label>
                  </span>
                  <span v-if="errors.city_fact.$errors.length" class="text-xs color-error">
                    {{ errors.city_fact.$errors[0].$message }}
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
                        :class="{'p-invalid': errors.street_fact.$errors.length}"
                        id="street"
                        class="w-full"
                    />
                    <label for="street">Улица *</label>
                  </span>
                  <span v-if="errors.street_fact.$errors.length" class="text-xs color-error">
                    {{ errors.street_fact.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.house_fact"
                        :class="{'p-invalid': errors.house_fact.$errors.length}"
                        id="house"
                        class="w-full"
                    />
                    <label for="house">Дом *</label>
                  </span>
                  <span v-if="errors.house_fact.$errors.length" class="text-xs color-error">
                    {{ errors.house_fact.$errors[0].$message }}
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
                      :classes="{'p-invalid': errors.phone.$errors.length}"
                      :phone-code="selectCountry?.phone_code ? selectCountry.phone_code : '+7'"
                      @toggleChangePhoneCode="changeVisible"
                  />
                  <span v-if="errors.phone.$errors.length" class="text-xs color-error">
                    {{ errors.phone.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.email"
                        :class="{'p-invalid': errors.email.$errors.length}"
                        id="email"
                        class="w-full"
                    />
                    <label for="email">Электронная почта (для уведомлений бенефициару) *</label>
                  </span>
                  <span v-if="errors.email.$errors.length" class="text-xs color-error">
                   {{ errors.email.$errors[0].$message }}
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