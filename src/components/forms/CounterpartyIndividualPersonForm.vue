<script>
import {defineComponent} from "vue";

import MainCard from "@/components/cards/MainCard";
import Tab from "@/components/tabs/Tab"
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown"

export default defineComponent({
  components: {MainCard, Tab, InputText, Dropdown}
});

</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Основные регистрационные сведения">
          <div class="grid">
            <div class="col-lg-12 md:col-4">
              <div class="grid flex-column gap-4">
                <span class="p-float-label">
                    <InputText id="last_name" class="w-full"  />
                    <label for="last_name">Фамилия *</label>
                </span>
                <span class="p-float-label">
                    <InputText id="first_name" class="w-full"  />
                    <label for="first_name">Имя</label>
                </span>
                <span class="p-float-label">
                    <InputText id="patronymic" class="w-full"  />
                    <label for="patronymic">Отчество</label>
                </span>
              </div>
            </div>
            <div class="col-lg-12 md:col-4">
              <div class="grid">
                <Dropdown :options="[]" optionLabel="name" placeholder="Гражданство *" class="w-full" />
                <span class="p-float-label">
                    <InputText id="snils" class="w-full"  />
                    <label for="snils">Снилс</label>
                </span>
              </div>
            </div>
            <div class="col-lg-12 md:col-4"></div>
          </div>
        </MainCard>
      </div>
    </div>
    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Юридический адрес"></MainCard>
      </div>
    </div>
    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Фактический адрес"></MainCard>
      </div>
    </div>
    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Банковские реквизиты"></MainCard>
      </div>
    </div>
    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Файлы"></MainCard>
      </div>
    </div>
    <div class="grid mb-2">
      <div class="col-12 md:col-3 sm:col-6">
        <MainCard title="Персональная скидка"></MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>