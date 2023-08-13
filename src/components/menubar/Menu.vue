<script>
import {computed, defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Menu from "primevue/menu";
import TieredMenu from "primevue/tieredmenu"

export default defineComponent({
  components: {Menubar, InputText, Button, Avatar, Menu, TieredMenu},
  setup() {
    const store = useStore();
    const router = useRouter();

    const changeToggleState = () => {
      store.dispatch('changeToggle');
    }

    const menu = ref();

    const redirect = async (route) => {
      await router.push(route);
    }
    const toggle = (event) => {
      menu.value.toggle(event);
    };

    const visibleConfirmationModal = computed(() => store.getters.getConfirmationStateModal);

    const changeConfirmationStateModal = () => {
      store.dispatch('changeStateModal', {
        type: 'confirmationStateModal',
        bool: !visibleConfirmationModal.value
      })
    }

    const items = ref([
      { label: 'Настройки', route: { name: 'profile' } },
      { separator: true },
      { label: 'Выйти', class: ['color-error'], action: changeConfirmationStateModal }
    ]);

    return {
      menu,
      items,
      toggle,
      redirect,
      changeToggleState,
      visibleConfirmationModal,
      changeConfirmationStateModal
    };
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

        <Avatar
            image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" class="mr-2 ml-2"
            shape="circle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            @click="toggle"
        />

        <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
          <template #item="{ item }">
            <div class="p-menuitem-content" data-pc-section="content">
              <router-link
                  class="p-menuitem-link"
                  :to="item?.route ? item.route : {}"
                  :class="item?.class ? item.class : []"
                  @click="item.action"
                  tabindex="-1"
                  aria-hidden="true"
                  data-pc-section="action"
                  data-pd-ripple="true"
              >
                <span data-pc-section="label">{{ item.label }}</span>
              </router-link>
            </div>
          </template>
        </TieredMenu>
      </template>
    </Menubar>
  </div>
</template>

<style>
.p-menubar {
  border-radius: 0 !important;
}

.p-tieredmenu {
  border-radius: 10px;
}
</style>
