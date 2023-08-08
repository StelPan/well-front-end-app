<script>
import {defineComponent, ref, watch} from "vue";
import Dialog from "primevue/dialog";
import SelectLanguageForm from "@/components/forms/SelectLanguageForm.vue";

export default defineComponent({
  name: "SelectPhoneModal",
  components: { Dialog, SelectLanguageForm },
  props: {
    visible: {
      type: Boolean,
      required: true,
    }
  },
  setup(props) {
    const visible = ref(false);

    watch(() => props.visible, (state) => {
      visible.value = state;
    });

    return {
      visible,
    };
  }
});
</script>

<template>
  <Dialog :visible="visible" modal header="Выберите страну" >
    <div class="flex justify-content-center">
      <SelectLanguageForm />
    </div>
  </Dialog>
</template>
