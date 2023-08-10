
<template>
  <div class="card flex justify-content-center">
    <Button type="button" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const menu = ref();
const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      }
    ]
  },
  {
    label: 'Navigate',
    items: [
      {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        url: 'https://vuejs.org/'
      },
      {
        label: 'Router',
        icon: 'pi pi-upload',
        to: '/fileupload'
      }
    ]
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
