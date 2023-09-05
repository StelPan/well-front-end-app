<script>
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useFlat} from "@/hooks/flat";
import {useVendor} from "@/hooks/vendor";
import {useCountries} from "@/hooks/countries";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import VendorJuridicalPersonForm from "@/components/forms/VendorJuridicalPersonForm";
import VendorIndividualPersonForm from "@/components/forms/VendorIndividualPersonForm.vue";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal";
import Breadcrumb from "@/components/Breadcrumb";
import ButtonFileUpload from "@/components/buttons/ButtonFileUpload.vue";
import MainCard from "@/components/cards/MainCard.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess.vue";
import InputNumberPhone from "@/components/inputs/InputNumberPhone.vue";


export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    InputNumberPhone,
    ButtonSuccess,
    MainCard,
    InputText,
    VendorJuridicalPersonForm,
    VendorIndividualPersonForm,
    SelectPhoneModal,
    ButtonFileUpload,
    Breadcrumb,
    Button
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadVendor} = useVendor();
      const {loadCountries} = useCountries();
      await loadVendor(to.params.id);
      await loadCountries();
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const {vendor, form, v$, vip$} = useVendor();
    const {countries, selectCountry} = useCountries();

    const formVendorTypes = {
      'ul': 'VendorJuridicalPersonForm',
      'ip': 'VendorIndividualPersonForm'
    };

    const validators = ref({
      'ul' : v$,
      'ip': vip$,
    });

    const validator = computed(() => validators.value[vendor.value.type]);
    console.log(validator.value)

    const breadcrumbs = ref([]);
    const visible = ref(false);
    const isUpdated = ref(false);
    form.value = useFlat(vendor.value);

    const changeVisible = () => {
      visible.value = !visible.value;
    };

    const fileUpload = async ({ files }) => {
      try {
        const form = new form();
        form.set('payment_details', files[0]);

        await store.dispatch('fetchUploadVendorPayment', {
          id: vendor.value.id,
          body: form
        });

        await store.dispatch('fetchVendor', route.params.id);
      } catch (e) {
        console.error(e);
      }
    };

    const fileDestroy = async (id) => {
      try {
        await store.dispatch('fetchDestroyVendorPayment', id);
        await store.dispatch('fetchVendor', route.params.id);
      } catch (e) {
        console.error(e);
      }
    };

    const updateVendor = async () => {
      try {
        const result = await validator.value.$validate();
        if (!result) {
          return;
        }

        const flat = useFlat(form.value);
        const flatData = new formData();

        for (let key in flat) {
          if (key === 'payment_details')
            continue;

          flatData.set(key, flat[key]);
        }

        await store.dispatch('fetchUpdateVendor', {
          id: route.params.id,
          form: flatData,
        });

        isUpdated.value = true;
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(() => {
      const label = vendor.value.type === 'ul' ?
          vendor.value.data.full_name :
          vendor.value.data.org_name;

      breadcrumbs.value = [
        {label: 'Обслуживающие компании', router: {name: 'vendors-list'}},
        {label: label}
      ];
    });

    return {
      isUpdated,
      vendor,
      breadcrumbs,
      visible,
      changeVisible,
      countries,
      selectCountry,
      updateVendor,
      fileUpload,
      fileDestroy,
      formVendorTypes,
      form,
      v$,
      vip$,
      validator
    };
  }
});
</script>

<template>
  <SelectPhoneModal :countries="countries" :visible="visible" @toggleCloseModal="changeVisible"/>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <ButtonSuccess v-if="isUpdated" label="Измения сохранены" />
      <Button v-if="!isUpdated" @click="updateVendor" label="Сохранить реквизиты" class="btn-primary font-light"/>
    </div>
  </section>

  <template v-if="vendor?.type === 'ul'">
    <VendorJuridicalPersonForm
        :errors="v$"
        :form="form"
        @changeVisible="changeVisible"
    />
  </template>

  <template v-if="vendor?.type === 'ip'">
    <VendorIndividualPersonForm
        :errors="vip$"
        :form="form"
        @changeVisible="changeVisible"
    />
  </template>

  <section class="py-2 mb-3">
    <div class="grid mb-2">
      <div class="col-12 md:col-8">
        <MainCard title="Банковские реквизиты">
          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="grid gap-4 m-0 flex-column">
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="form.account"
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
                        v-model="form.bic"
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
                        v-model="form.bank"
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
                        v-model="form.corr_account"
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
                      v-model="form.phone"
                      :country="selectCountry?.name"
                      :classes="{'p-invalid': validator.phone.$errors.length}"
                      :phone-code="selectCountry?.phone_code ? selectCountry.phone_code : '+7'"
                      @toggleChangePhoneCode="changeVisible"
                  />
                  <span v-if="validator.phone.$errors.length" class="text-xs color-error">
                    {{ validator.phone.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="form.email"
                        :class="{'p-invalid': validator.email.$errors.length}"
                        id="email"
                        class="w-full"
                    />
                    <label for="email">Электронная почта (для уведомлений бенефициару) *</label>
                  </span>
                  <span v-if="validator.email.$errors.length" class="text-xs color-error">
                   {{ validator.email.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Персональная скидка">
      <div class="grid">
        <div class="col-12 md:col-4">
          <span class="p-float-label w-full">
            <InputText
                v-model="form.discount"
                :class="{'p-invalid': validator.discount.$errors.length}"
                id="discount"
                class="w-full"
            />
            <label for="discount">Скидка  *</label>
          </span>
          <span v-if="validator.discount.$errors.length" class="text-xs color-error">
            {{ validator.discount.$errors[0].$message }}
          </span>
        </div>
      </div>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Банковские реквизиты в формате PDF">
      <div class="grid">
        <div class="col-12">
          <div class="grid flex-column" v-if="vendor.payment_details">
            <div class="col-12 md:col-3 sm:col-6">
              <div class="file-vendor-card px-2 py-3 border-round-xl relative flex align-items-center">
                <div class="flex">
                  <i class="pi pi-file-edit color-primary" style="font-size: 1rem"></i>
                  <span class="ml-5 text-xs">{{ vendor.payment_details.split('/')[vendor.payment_details.split('/').length - 1]}}</span>
                </div>
                <i
                    @click="fileDestroy(vendor.id)"
                    class="pi pi-times color-black-20 text-white cansel-button cursor-pointer ml-auto"
                    style="font-size: 1rem"
                ></i>
              </div>
            </div>
            <div class="col-12">
              <span class="color-primary underline cursor-pointer">Изменить</span>
            </div>
          </div>

          <ButtonFileUpload
              v-else
              @chooseFiles="fileUpload"
              :clearFilesAfterSelect="true"
              :multiple="false"
              accept="application/pdf"
              label="Добавить реквизиты PDF"
          />
        </div>
      </div>
    </MainCard>
  </section>
</template>

<style scoped>
.file-vendor-card {
  border: 1px solid var(--color-black-20);
}
</style>