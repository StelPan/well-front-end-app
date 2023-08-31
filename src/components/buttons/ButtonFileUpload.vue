<script>
import {defineComponent, ref} from "vue";

import FileUpload from "primevue/fileupload";
import Button from "primevue/button";

export default defineComponent({
  components: {FileUpload, Button},
  props: {
    label: {
      type: String,
      required: true,
    },
    mode: {
      type: 'String',
      required: false,
    }
  },
  setup(props, {emit}) {
    const upload = ref();
    const files = ref([]);

    const toSelect = (files) => {
      files.value = files;
      emit('chooseFiles' , files.value);
    }

    return {upload, toSelect};
  }
});
</script>

<template>
  <div class="hidden">
    <FileUpload
        name="demo[]"
        :multiple="true"
        accept="image/*"
        @select="toSelect"
        ref="upload"
    />
  </div>
  <Button :label="label" @click="upload.choose()" class="btn-primary font-light" />
</template>