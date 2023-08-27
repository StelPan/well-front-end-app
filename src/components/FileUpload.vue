<script>
import {defineComponent} from "vue";

import FileUpload from "primevue/fileupload";
import Button from "primevue/button"

export default defineComponent({
  components: {FileUpload, Button},
  props: {
    label: {
      type: String,
      required: false,
    },
    multiple: {
      type: Boolean,
      required: false,
    },
    accept: {
      type: String,
      required: false
    }
  },
  setup(props, {emit}) {
    const onSelectFiles = ({originalEvent, files}) => {
      console.log(files);
      const objects = props.multiple ? files : files[files.length - 1];
      emit('selected', {originalEvent, files: objects});
    };

    return {onSelectFiles};
  }
});
</script>

<template>
  <FileUpload
      :accept="accept ? accept : 'image/*'"
      @select="onSelectFiles"
      :multiple="multiple"
      class="w-full"
  >
    <template #header="{ chooseCallback }">
      <Button @click="chooseCallback" :label="label ? label : 'Изменить изображение'" class="btn-primary font-light"/>
    </template>

    <template #content="{files}">&nbsp;</template>
  </FileUpload>
</template>

<style>
.p-fileupload {
  width: 100% !important;
}

.p-fileupload .p-fileupload-buttonbar {
  width: 100% !important;
  padding: 0 !important;
}
</style>