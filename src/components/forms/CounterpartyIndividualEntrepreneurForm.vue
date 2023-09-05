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
    formData.value.type = 'fl';

    const isMatch = computed(() => {
      return (formData.value.postcode === formData.value.postcode_fact) &&
          (formData.value.building === formData.value.building_fact) &&
          (formData.value.city === formData.value.city_fact) &&
          (formData.value.corps === formData.value.corps_fact) &&
          (formData.value.floor === formData.value.floor_fact) &&
          (formData.value.region === formData.value.region_fact) &&
          (formData.value.room === formData.value.room_fact) &&
          (formData.value.street === formData.value.street_fact) &&
          (formData.value.house_fact === formData.value.house);
    });

    const mergeAddresses = () => {
      formData.value.postcode_fact = formData.value.postcode
      formData.value.building_fact = formData.value.building
      formData.value.city_fact = formData.value.city
      formData.value.corps_fact = formData.value.corps
      formData.value.floor_fact = formData.value.floor
      formData.value.region_fact = formData.value.region
      formData.value.room_fact = formData.value.room
      formData.value.house_fact = formData.value.house
      formData.value.street_fact = formData.value.street
    }

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
            <div class="col-12 mb-3">
              <div class="grid">
                <div class="col-12 md:col-4">
                  <div class="grid gap-4 m-0 flex-column">
                    <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.last_name"
                        :class="{'p-invalid': errors.last_name.$errors.length}"
                        id="full_name"
                        class="w-full"
                    />
                    <label for="full_name">Фамилия *</label>
                  </span>
                      <span v-if="errors.last_name.$errors.length" class="text-xs color-error">
                    {{ errors.last_name.$errors[0].$message }}
                  </span>
                    </div>
                    <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.first_name"
                        :class="{'p-invalid': errors.first_name.$errors.length}"
                        id="first_name"
                        class="w-full"
                    />
                    <label for="first_name">Имя  *</label>
                  </span>
                      <span v-if="errors.first_name.$errors.length" class="text-xs color-error">
                    {{ errors.first_name.$errors[0].$message }}
                  </span>
                    </div>
                    <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="formData.patronymic"
                        id="first_name"
                        class="w-full"
                    />
                        <label for="first_name">Отчество  *</label>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-12 md:col-4">
                  <div class="grid m-0 gap-4">
                    <div class="w-full">
                      <Calendar
                          v-model="formData.birth_date"
                          :class="{'p-invalid': errors.birth_date.$errors.length}"
                          date-format="d/m/yy"
                          placeholder="Дата рожденияd *"
                          showIcon
                          class="w-full"
                      />
                      <span v-if="errors.birth_date.$errors.length" class="text-xs color-error">
                    {{ errors.birth_date.$errors[0].$message }}
                  </span>
                    </div>
                    <div class="w-full">
                       <span class="p-float-label w-full">
                          <InputText
                              v-model="formData.citizenship"
                              :class="{'p-invalid': errors.citizenship.$errors.length}"
                              id="ogrn"
                              class="w-full"
                          />
                          <label for="ogrn">Гражданство *</label>
                      </span>
                      <span v-if="errors.citizenship.$errors.length" class="text-xs color-error">
                        {{ errors.citizenship.$errors[0].$message }}
                      </span>
                   </div>
                    <div class="w-full">
                     <span class="p-float-label w-full">
                        <InputText
                            v-model="formData.snils"
                            :class="{'p-invalid': errors.snils.$errors.length}"
                            id="ogrn"
                            class="w-full"
                        />
                        <label for="ogrn">СНИЛС *</label>
                      </span>
                      <span v-if="errors.snils.$errors.length" class="text-xs color-error">
                        {{ errors.snils.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="w-full">
                      <span class="p-float-label w-full">
                          <InputText
                              v-model="formData.inn"
                              :class="{'p-invalid': errors.inn.$errors.length}"
                              id="oktmo"
                              class="w-full"
                          />
                          <label for="oktmo">ИНН *</label>
                      </span>
                          <span v-if="errors.inn.$errors.length" class="text-xs color-error">
                        {{ errors.inn.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-12 md:col-4">
                  <div class="grid m-0 gap-4">
                    <div class="w-full">
                      <span class="p-float-label w-full">
                        <InputText
                            v-model="formData.oktmo"
                            id="ogrn"
                            class="w-full"
                        />
                          <label for="ogrn">ОКТМО *</label>
                      </span>
                    </div>
                    <div class="w-full">
                      <span class="p-float-label w-full">
                          <InputText
                              v-model="formData.birth_country"
                              :class="{'p-invalid': errors.birth_country.$errors.length}"
                              id="inn"
                              class="w-full"
                          />
                          <label for="inn">Место рождения (страна) *</label>
                      </span>
                      <span v-if="errors.birth_country.$errors.length" class="text-xs color-error">
                       {{ errors.birth_country.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="w-full">
                      <span class="p-float-label w-full">
                          <InputText
                              v-model="formData.birth_city"
                              :class="{'p-invalid': errors.birth_city.$errors.length}"
                              id="inn"
                              class="w-full"
                          />
                          <label for="inn">Место рождения (город) *</label>
                      </span>
                      <span v-if="errors.birth_city.$errors.length" class="text-xs color-error">
                        {{ errors.birth_city.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="w-full flex flex-column gap-4">
                <span class="p-float-label w-full">
                    <InputText
                        id="inn"
                        class="w-full"
                    />
                    <label for="inn">Документ удостоверяющий личность</label>
                </span>
                <div class="grid">
                  <div class="col-12 md:col-6">
                    <span class="p-float-label w-full">
                        <InputText
                            v-model="formData.passport_series"
                            :class="{'p-invalid': errors.passport_series.$errors.length}"
                            id="inn"
                            class="w-full"
                        />
                        <label for="inn">Серия *</label>
                    </span>
                    <span v-if="errors.passport_series.$errors.length" class="text-xs color-error">
                      {{ errors.passport_series.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-12 md:col-6">
                    <span class="p-float-label w-full">
                        <InputText
                            v-model="formData.passport_number"
                            :class="{'p-invalid': errors.passport_number.$errors.length}"
                            id="inn"
                            class="w-full"
                        />
                        <label for="inn">Номер *</label>
                    </span>
                    <span v-if="errors.passport_number.$errors.length" class="text-xs color-error">
                      {{ errors.passport_number.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <!--                <span v-if="errors.birth_city.$errors.length" class="text-xs color-error">-->
                <!--                    {{ errors.birth_city.$errors[0].$message }}-->
                <!--                  </span>-->
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0">
                <div class="w-full">
                  <Calendar
                      v-model="formData.passport_date"
                      :class="{'p-invalid': errors.passport_date.$errors.length}"
                      placeholder="Дата выдачи паспорта *"
                      showIcon
                      class="w-full"
                  />
                  <span v-if="errors.passport_date.$errors.length" class="text-xs color-error">
                    {{ errors.passport_date.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.passport_issuer_code"
                          :class="{'p-invalid': errors.passport_issuer_code.$errors.length}"
                          id="inn"
                          class="w-full"
                      />
                      <label for="inn">Код подразделенияя *</label>
                  </span>
                  <span v-if="errors.passport_issuer_code.$errors.length" class="text-xs color-error">
                    {{ errors.passport_issuer_code.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0">
                <div class="w-full">
                  <span class="p-float-label w-full">
                      <InputText
                          v-model="formData.passport_issuer"
                          :class="{'p-invalid': errors.passport_issuer.$errors.length}"
                          id="inn"
                          class="w-full"
                      />
                      <label for="inn">Название организации выдвшей документ *</label>
                  </span>
                  <span v-if="errors.passport_issuer.$errors.length" class="text-xs color-error">
                    {{ errors.passport_issuer.$errors[0].$message }}
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
  </section>
</template>