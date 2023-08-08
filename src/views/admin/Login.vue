<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

import AdminLoginForm from "@/components/forms/AdminLoginForm.vue";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal.vue";

export default defineComponent({
  layout: {
    name: 'AdminLayout',
  },
  components: {
    AdminLoginForm,
    SelectPhoneModal,
  },
  setup() {
    const store = useStore();

    const visible = ref(false);

    const countries = computed(() => store.getters.getCountriesList);

    const showSelectPhoneModal = () => {
      visible.value = true;
    }

    console.log(store);
    onMounted(async () => {
      await store.dispatch('fetchCountries');
    })

    return {
      visible,
      countries,
      showSelectPhoneModal
    };
  }
});
</script>

<template>
  <SelectPhoneModal
      :countries="countries ?? []"
      :visible="visible"
  />

  <div class="container">
    <div class="grid">
      <div class="col-lg-12 md:col-7 background-login h-screen">
      </div>
      <div class="col-lg-12 md:col-5">
        <div class="flex justify-content-center h-screen">
          <div class="flex align-items-center">
            <div class="form">
              <img class="gap-3 w-4rem mb-3" src="../../assets/images/admin/Logo.png" alt="">

              <p class="mb-5 text-left text-xl font-bold">Добро пожаловать</p>
              <AdminLoginForm
                  @toggleSelectPhone="showSelectPhoneModal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.background-login {
  background: url('../../assets/images/admin/Image.png') no-repeat center;
  background-size: cover;
}
</style>
