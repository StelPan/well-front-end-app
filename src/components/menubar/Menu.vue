<script>
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Menu from "primevue/menu";

export default defineComponent({
  components: {Menubar, InputText, Button, Avatar, Menu},
  setup() {
    const store = useStore();
    const router = useRouter();

    const changeToggleState = () => {
      store.dispatch('changeToggle');
    }

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

    const menu = ref();

    const redirect = async (route) => {
      await router.push(route);
    }

    const toggle = (event) => {
      menu.value.toggle(event);
    };

    return {items, toggle, redirect, changeToggleState};
  }
})

</script>

<template>
  <div class="card relative z-2">
    <Menubar class="bg-neutral border-top-none border-left-none border-right-none px-5">
      <template #start>
        <Button icon="pi pi-bars" severity="secondary" text rounded aria-label="Cancel" @click="changeToggleState"/>
      </template>
      <template #end>
        <Button
            @click="redirect({name: 'notifications'})"
            severity="secondary"
            aria-label="Cancel"
            icon="pi pi-bell"
            rounded
            text
        />

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

<style>
.p-menubar {
  border-radius: 0 !important;
}
</style>
