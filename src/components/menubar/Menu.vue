<script>
import {defineComponent, ref} from "vue";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Menu from "primevue/menu";

export default defineComponent({
  components: {Menubar, InputText, Button, Avatar, Menu},
  setup() {
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

    const menu = ref()

    const toggle = (event) => {
      menu.value.toggle(event);
    };

    return {items, toggle}
  }
})

</script>

<template>
  <div class="card relative z-2">
    <Menubar class="bg-neutral border-top-none border-left-none border-right-none px-5">
      <template #start>
        <Button icon="pi pi-bars" severity="secondary" text rounded aria-label="Cancel"/>
      </template>
      <template #end>
        <Button icon="pi pi-bell" severity="secondary" text rounded aria-label="Cancel"/>

        <router-link :to="{ name: 'profile' }">
          <Avatar
              image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" class="mr-2 ml-2"
              shape="circle"
              aria-haspopup="true"
              aria-controls="overlay_menu"
          />
        </router-link>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true"/>
      </template>
    </Menubar>
  </div>
</template>
