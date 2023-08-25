<script>
import {defineComponent, reactive, ref, watch} from "vue";

import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import SelectLanguageForm from "@/components/forms/SelectLanguageForm.vue";

export default defineComponent({
  name: "SelectPhoneModal",
  components: {
    Dialog,
    Button,
    InputText,
    MultiSelect,
    SelectLanguageForm
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    roles: {
      type: Array,
      required: true
    },
  },
  setup(props, { emit }) {
    const formReactive = reactive({
      roles: [],
      fio: '',
      phone: ''
    });

    const toggleSearch = () => {

    };

    return {formReactive}
  }
});
</script>

<template>
  <Dialog
      :visible="visible"
      :close-on-escape="true"
      :style="{'width': '400px'}"
      @hide="console.log(1)"
      modal
      header="Фильтр"
  >
    <template #default>
      <span class="block mb-3 font-bold text-xs">
        Роли
      </span>

      <MultiSelect
          v-model="formReactive.roles"
          display="chip"
          :options="roles"
          optionLabel="name_ru"
          option-value="id"
          placeholder="Роли"
          class="w-full mb-3" />

      <hr size="1" class="color-black-20 mb-3">

      <span class="block mb-3 font-bold text-xs">
        ФИО
      </span>

      <span class="p-float-label mb-3 w-full">
          <InputText id="fio" class="w-full" v-model="formReactive.fio"/>
          <label for="fio">ФИО</label>
      </span>

      <hr size="1" class="color-black-20 mb-3">

      <span class="block mb-3 font-bold text-xs">
        Контактный номер
      </span>

      <span class="p-float-label mb-3 w-full">
          <InputText id="fio" class="w-full" v-model="formReactive.phone"/>
          <label for="fio">Контактный номер</label>
      </span>
    </template>

    <template #footer>
      <div class="flex justify-content-end">
        <Button label="Сбросить все" class="btn-primary font-light"/>
        <Button label="Применить" class="btn-primary font-light ml-2"/>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.p-dialog-header-icons {
  display: none;
}

.p-dialog-content {
  padding: 0 !important;
}

.rounded {
  border-radius: 20px !important;
}
</style>
