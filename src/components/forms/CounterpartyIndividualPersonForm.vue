<script>
import {defineComponent} from "vue";

import MainCard from "@/components/cards/MainCard";
import Tab from "@/components/tabs/Tab"
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown"
import Calendar from "primevue/calendar"

export default defineComponent({
  components: {MainCard, Tab, InputText, Dropdown, Calendar}
});

</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Основные регистрационные сведения">
          <div class="grid mb-4">
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                    <InputText id="last_name" class="w-full"/>
                    <label for="last_name">Фамилия *</label>
                </span>
                <span class="p-float-label w-full">
                    <InputText id="first_name" class="w-full"/>
                    <label for="first_name">Имя</label>
                </span>
                <span class="p-float-label w-full">
                    <InputText id="patronymic" class="w-full"/>
                    <label for="patronymic">Отчество</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                <Calendar placeholder="Дата рождения *" showIcon class="w-full"/>

                <Dropdown :options="[]" optionLabel="name" placeholder="Гражданство *" class="w-full"/>

                <span class="p-float-label w-full">
                    <InputText id="snils" class="w-full"/>
                    <label for="snils">СНИЛС *</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid m-0 gap-4">
                  <span class="p-float-label w-full">
                      <InputText id="oktmo" class="w-full"/>
                      <label for="oktmo">ОКТМО</label>
                  </span>

                <Dropdown :options="[]" optionLabel="name" placeholder="Место рождения (страна) *" class="w-full"/>

                <Dropdown :options="[]" optionLabel="name" placeholder="Место рождения (город) *" class="w-full"/>
              </div>
            </div>
          </div>

          <div class="grid">
            <div class="col-12 md:col-4">
              <div class="grid m-0 flex-column gap-4">
                <Dropdown
                    :options="[]"
                    optionLabel="name"
                    placeholder="Документ удостоверяющий личность *"
                    class="w-full"
                />

                <div class="grid">
                  <div class="col-12 md:col-6">
                    <span class="p-float-label w-full">
                        <InputText id="passport_series" class="w-full"/>
                        <label for="passport_series">Серия</label>
                    </span>
                  </div>
                  <div class="col-12 md:col-6">
                    <span class="p-float-label w-full">
                      <InputText id="passport_number" class="w-full"/>
                      <label for="passport_number">Номер</label>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid m-0 flex-column gap-4">
                <Calendar placeholder="Дата выдачи *" showIcon class="w-full"/>

                <span class="p-float-label w-full">
                  <InputText id="passport_code" class="w-full"/>
                  <label for="passport_code">Код подразделения</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <span class="p-float-label w-full">
                  <Textarea class="w-full" rows="5" cols="30" />
                  <label>Наименование организации выдавшей документ</label>
              </span>
            </div>
          </div>
        </MainCard>
      </div>
    </div>

    <div class="grid m-0 mb-2">
      <div class="col-12">
        <MainCard title="Юридический адрес">
          <div class="grid">
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                  <span class="p-float-label w-full">
                      <InputText id="index" class="w-full"/>
                      <label for="index">Индекс</label>
                  </span>

                  <Dropdown :options="[]" optionLabel="name" placeholder="Регион *" class="w-full"/>

                  <Dropdown :options="[]" optionLabel="name" placeholder="Город *" class="w-full"/>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                  <InputText id="street" class="w-full"/>
                  <label for="street">Улица *</label>
              </span>
                <span class="p-float-label w-full">
                  <InputText id="house" class="w-full"/>
                  <label for="house">Дом *</label>
              </span>
              <span class="p-float-label w-full">
                  <InputText id="street" class="w-full"/>
                  <label for="street">Номер здания, строение и т.д...</label>
              </span>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                    <InputText id="frame" class="w-full"/>
                    <label for="frame">Корпус</label>
                </span>
                <span class="p-float-label w-full">
                  <InputText id="floor" class="w-full"/>
                  <label for="floor">Этаж</label>
                </span>
                <span class="p-float-label w-full">
                  <InputText id="number_office" class="w-full"/>
                  <label for="number_office">Номер офиса</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>

    <div class="grid mb-2">
      <div class="col-12">
        <MainCard title="Фактический адрес">
          <div class="grid">
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                  <span class="p-float-label w-full">
                      <InputText id="index" class="w-full"/>
                      <label for="index">Индекс</label>
                  </span>

                <Dropdown :options="[]" optionLabel="name" placeholder="Регион *" class="w-full"/>

                <Dropdown :options="[]" optionLabel="name" placeholder="Город *" class="w-full"/>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                  <InputText id="street" class="w-full"/>
                  <label for="street">Улица *</label>
              </span>
                <span class="p-float-label w-full">
                  <InputText id="house" class="w-full"/>
                  <label for="house">Дом *</label>
              </span>
                <span class="p-float-label w-full">
                  <InputText id="street" class="w-full"/>
                  <label for="street">Номер здания, строение и т.д...</label>
              </span>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                    <InputText id="frame" class="w-full"/>
                    <label for="frame">Корпус</label>
                </span>
                <span class="p-float-label w-full">
                  <InputText id="floor" class="w-full"/>
                  <label for="floor">Этаж</label>
                </span>
                <span class="p-float-label w-full">
                  <InputText id="number_office" class="w-full"/>
                  <label for="number_office">Номер офиса</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>

    <div class="grid mb-2">
      <div class="col-12">
        <div class="grid">
          <div class="col-12 md:col-8">
            <MainCard title="Банковские реквизиты">
              <div class="grid">
                <div class="col-12 md:col-6">
                  <div class="grid gap-4 m-0 flex-column">
                  <span class="p-float-label w-full">
                      <InputText id="checking_account" class="w-full"/>
                      <label for="checking_account">Расчетный счет *</label>
                  </span>
                    <span class="p-float-label w-full">
                        <InputText id="bik" class="w-full"/>
                        <label for="bik">БИК *</label>
                  </span>
                  </div>
                </div>
                <div class="col-12 md:col-6">
                  <div class="grid gap-4 m-0 flex-column">
                  <span class="p-float-label w-full">
                      <InputText id="correspondent_account" class="w-full"/>
                      <label for="correspondent_account">Корр. счет *</label>
                  </span>
                    <span class="p-float-label w-full">
                        <InputText id="bik" class="w-full"/>
                        <label for="bik">БИК *</label>
                  </span>
                  </div>
                </div>
              </div>
            </MainCard>
          </div>
          <div class="col-12 md:col-4">
            <MainCard title="Контактные данные">
              <div class="grid">
                <div class="col-12">
                  <div class="grid gap-4 m-0 flex-column">
                    <span class="p-float-label w-full">
                        <InputText id="email" class="w-full"/>
                        <label for="email">Электронная почта (для уведомлений бенефициару) *</label>
                    </span>
                  </div>
                </div>
              </div>
            </MainCard>
          </div>
        </div>
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