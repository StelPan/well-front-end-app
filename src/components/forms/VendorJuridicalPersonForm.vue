<script>
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";

import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import MainCard from "@/components/cards/MainCard";
import InputNumberPhone from "@/components/inputs/InputNumberPhone";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal";

export default defineComponent({
  components: {
    Button,
    Dropdown,
    Calendar,
    InputText,
    MainCard,
    InputNumberPhone,
    SelectPhoneModal,
    Checkbox
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false
    },
    v$: {
      type: Object,
      required: false,
    }
  },
  setup(props, {emit}) {
    const store = useStore();

    const selectCountry = computed(() => store.getters.getSelectCountry);
    const legalForms = ref([{label: 'ООО'}, {label: 'ИП'}]);

    const formData = ref(props.form);

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
    };

    const changeVisible = (data) => {
      emit('changeVisible', data);
    }

    return {formData, changeVisible, selectCountry, legalForms, isMatch, mergeAddresses};
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
                <div>
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.full_name"
                        id="full_name"
                        class="w-full"
                        :class="{'p-invalid': v$.data.full_name.$errors.length}"
                    />
                    <label for="last_name">Полное наименование  *</label>
                  </span>
                  <span v-if="v$.data.full_name.$errors.length" class="text-xs color-error">
                    {{ v$.data.full_name.$errors[0].$message }}
                  </span>
                </div>
                <div>
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.short_name"
                        :class="{'p-invalid': v$.data.short_name.$errors.length}"
                        id="short_name"
                        class="w-full"
                    />
                    <label for="short_name">Краткое наименование *</label>
                  </span>
                  <span v-if="v$.data.short_name.$errors.length" class="text-xs color-error">
                    {{ v$.data.short_name.$errors[0].message }}
                </span>
                </div>

                <Dropdown
                    v-model="formData.data.legal_form"
                    :class="{'p-invalid': v$.data.legal_form.$errors.length}"
                    :options="legalForms"
                    optionLabel="label"
                    optionValue="label"
                    placeholder="Организационно-правовая форма *"
                    class="w-full"/>
                <span v-if="v$.data.legal_form.$errors.length" class="text-xs color-error">
                  {{ v$.data.legal_form.$errors[0].$message }}
                </span>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.inn"
                          :class="{'p-invalid': v$.inn.$errors.length}"
                          id="inn"
                          class="w-full"
                      />
                      <label for="inn">ИНН *</label>
                  </span>
                  <span v-if="v$.inn.$errors.length" class="text-xs color-error">
                    {{ v$.inn.$errors[0].$message }}
                  </span>
                </div>

                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.ogrn"
                        :class="{'p-invalid': v$.data.ogrn.$errors.length}"
                        id="ogrn"
                        class="w-full"
                    />
                    <label for="ogrn">ОГРН *</label>
                  </span>
                  <span v-if="v$.data.ogrn.$errors.length" class="text-xs color-error">
                    {{ v$.data.ogrn.$errors[0].$message }}
                  </span>
                </div>

                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.ogrn_place"
                        :class="{'p-invalid': v$.data.ogrn.$errors.length}"
                        id="ogrn"
                        class="w-full"
                    />
                    <label for="ogrn">МЕСТО ВЫДАЧИ ОГРН *</label>
                  </span>
                  <span v-if="v$.data.ogrn_place.$errors.length" class="text-xs color-error">
                    {{ v$.data.ogrn.$errors[0].$message }}
                  </span>
                </div>

                <div class="w-full">
                  <Calendar
                      v-model="formData.data.ogrn_date"
                      :class="{'p-invalid': v$.data.ogrn_date.$errors.length}"
                      placeholder="Дата присвоения ОГРН (после 2002 года) *"
                      showIcon
                      class="w-full"
                  />
                  <span v-if="v$.data.ogrn_date.$errors.length" class="text-xs color-error">
                    {{ v$.data.ogrn_date.$errors[0].$message }}
                </span>
                </div>
              </div>
            </div>

            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <div class="w-full">
                  <Calendar
                      v-model="formData.data.reg_date"
                      placeholder="Дата регистрации организации (до 2002 года) *"
                      showIcon
                      class="w-full"
                  />
                </div>

                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.kpp"
                        :class="{'p-invalid': v$.data.kpp.$errors.length}"
                        id="kpp"
                        class="w-full"
                    />
                    <label for="kpp">КПП</label>
                  </span>
                  <span v-if="v$.data.kpp.$errors.length" class="text-xs color-error">
                    {{ v$.data.kpp.$errors[0].$message }}
                  </span>
                </div>

                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.data.oktmo"
                        :class="{'p-invalid': v$.data.kpp.$errors.length}"
                        id="oktmo"
                        class="w-full"
                    />
                    <label for="oktmo">ОКТМО *</label>
                  </span>
                  <span v-if="v$.data.kpp.$errors.length" class="text-xs color-error">
                    {{ v$.data.kpp.$errors[0].$message }}
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
                        :class="{'p-invalid': v$.postcode.$errors.length}"
                        id="postcode"
                        class="w-full"
                    />
                    <label for="postcode">Индекс</label>
                  </span>
                  <span v-if="v$.postcode.$errors.length" class="text-xs color-error">
                    {{ v$.postcode.$errors[0].$message }}
                  </span>
                </div>

                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.region"
                        :class="{'p-invalid': v$.region.$errors.length}"
                        id="region"
                        class="w-full"
                    />
                    <label for="region">Регион</label>
                  </span>
                  <span v-if="v$.region.$errors.length" class="text-xs color-error">
                    {{ v$.region.$errors[0].$message }}
                  </span>
                </div>

                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.city"
                        :class="{'p-invalid': v$.region.$errors.length}"
                        id="city"
                        class="w-full"
                    />
                    <label for="city">Город</label>
                  </span>
                  <span v-if="v$.region.$errors.length" class="text-xs color-error">
                    {{ v$.region.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <div>
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.street"
                        :class="{'p-invalid': v$.street.$errors.length}"
                        id="street"
                        class="w-full"
                    />
                    <label for="street">Улица *</label>
                  </span>
                  <span v-if="v$.street.$errors.length" class="text-xs color-error">
                    {{ v$.street.$errors[0].$message }}
                  </span>
                </div>
                <div>
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.house"
                        :class="{'p-invalid': v$.house.$errors.length}"
                        id="house"
                        class="w-full"
                    />
                    <label for="house">Дом *</label>
                  </span>
                  <span v-if="v$.house.$errors.length" class="text-xs color-error">
                    {{ v$.house.$errors[0].$message }}
                  </span>
                </div>
                <div>
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.building"
                        id="street"
                        class="w-full"
                    />
                    <label for="street">Номер здания, строение и т.д...</label>
                  </span>
<!--                  <span v-if="v$.building.$errors.length" class="text-xs color-error">-->
<!--                    {{ v$.building.$errors[0].$message }}-->
<!--                  </span>-->
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <div>
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
                <div>
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
                <div>
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
                <div>
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

                <div>
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

                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                </div>
                <div>
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
                <div>
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