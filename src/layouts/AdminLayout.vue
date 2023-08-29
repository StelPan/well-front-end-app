<script>
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import ConfirmationModal from "@/components/modals/ConfirmationModal";
import AdminSidebar from "@/components/sidebars/AdminSidebar.vue";
import Menu from "@/components/menubar/Menu.vue";
import Button from "primevue/button";

import TokenService from "@/services/token";

export default defineComponent({
  name: "AdminLayout",
  components: {AdminSidebar, Menu, ConfirmationModal, Button}  ,
  setup() {
    const store = useStore();
    const router = useRouter();

    const toggle = computed(() => store.getters.getToggle);

    const visibleConfirmationModal = computed(() => store.getters.getConfirmationStateModal);

    const changeConfirmationStateModal = () => {
      store.dispatch('changeStateModal', {
        type: 'confirmationStateModal',
        bool: !visibleConfirmationModal.value
      })
    }

    const logout = async () => {
      changeConfirmationStateModal();
      TokenService.removeAccessToken();
      await store.dispatch('fetchUpdateAuth', false);
      await router.push({ name: 'login' });
    }

    return {toggle, visibleConfirmationModal, logout, changeConfirmationStateModal};
  }
})
</script>

<template>
    <div class="flex bg-neutral">
    <ConfirmationModal v-model:visible="visibleConfirmationModal">
      <template #header>
        Выйти из профиля
      </template>

      <template #default>
        <span>Вы уверенны, что хотите выйти из профиля? Для входа вам потребуется номер телефона</span>
      </template>

      <template #footer>
        <div class="flex justify-content-between">
          <Button label="Отменить" @click="changeConfirmationStateModal" class="btn-black-20-outlined font-light w-12" />
          <Button label="Выйти" @click="logout" class="btn-primary font-light ml-3 w-12" />
        </div>
      </template>
    </ConfirmationModal>

    <AdminSidebar :state="toggle" />
    <div class="main-content w-full">
      <Menu></Menu>
      <div class="mx-5 mt-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style>
</style>
