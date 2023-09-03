<script>
import {computed, defineComponent, onMounted, reactive, ref, watch, toRaw, unref} from "vue";
import {useStore} from "vuex";

import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import ImageCard from "@/components/cards/ImageCard";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import ButtonFileUpload from "@/components/buttons/ButtonFileUpload";
import DatePicker from "@/components/DatePicker";
import Checkbox from "primevue/checkbox";

import {useServices} from "@/hooks/services";
import {useBanks} from "@/hooks/banks";
import {useServiceCategory} from "@/hooks/service-category";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    Breadcrumb, MainCard, Dropdown, InputText, Editor, Button, FileUpload, ImageCard,
    ButtonSuccess, ButtonFileUpload, DatePicker, Checkbox,
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadService} = useServices();
      const {loadServiceCategories} = useServiceCategory();
      const {loadBanks} = useBanks();

      await loadService(to.params.id);
      await loadServiceCategories();
      await loadBanks();
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const {
      form, subServiceForm, intervalForm, isUpdate, service,
      changeDays,
      addSubService,
      updateService,
      destroyService,
      destroySubService,
      destroyFileLocal,
      selectFiles,
      files,
      v$, sv$,
    } = useServices();
    const {categories} = useServiceCategory();
    const {banks, acquiring, loadAcquiring} = useBanks();

    const store = useStore();

    form.value = unref(service);
    form.value.has_persons = Boolean(form.value.has_persons);
    form.value.has_intervals = Boolean(form.value.has_intervals);
    form.value.has_persons = Boolean(form.value.has_persons);
    form.value.days = form.value?.days ?? [];

    if (service.value.category) {
      form.value.service_category_id = service.value.category.id;
    }

    if (service.value.intervals) {
      const {end, start, duration} = JSON.parse(service.value.intervals);
      intervalForm.value = {end: end ?? '', start: start ?? '', duration: duration ?? ''};
    }

    const serviceTypes = [
      {label: 'Штучная', value: 'single'},
      {label: 'Пакет услуг', value: 'package'},
      {label: 'Разовый платеж', value: 'one_time'}
    ];

    const costTypes = [
      {value: 'common', label: 'Единая'},
      {value: 'inherited', label: 'Указывается в категории'},
      {value: 'calculated', label: 'Оценивается в процессе'},
      {value: 'sum', label: 'Основывается на вложенных услугах'}
    ];

    // TODO: Пофиксить мерджинг дат
    const datePickers = ref([
      {day: 0, label: 'ПН', pick: false},
      {day: 1, label: 'ВТ', pick: false},
      {day: 2, label: 'СР', pick: false},
      {day: 3, label: 'ЧТ', pick: false},
      {day: 4, label: 'ПТ', pick: false},
      {day: 5, label: 'СБ', pick: false},
      {day: 6, label: 'ВС', pick: false},
    ]);

    const breadcrumbs = ref([
      {label: 'Услуги', router: {name: 'services-list', params: {type: 'single'}}},
      {label: service.value.name_ru}
    ]);

    const selectBank = ref();

    watch(selectBank, async () => await loadAcquiring());

    return {
      isUpdate, categories, banks, breadcrumbs, form, service,
      intervalForm, subServiceForm, serviceTypes, costTypes, acquiring, selectBank,
      addSubService, destroySubService, destroyService, updateService, destroyFileLocal, selectFiles, changeDays,
      files, datePickers,
      v$, sv$
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <ButtonSuccess v-if="isUpdate" label="Услуга обновлена" />
      <Button v-else @click="updateService" label="Обновить услугу" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid h-max">
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Наименование услуги">
          <div class="flex flex-column gap-3">
            <div class="w-full mb-3">
              <span class="p-float-label w-full">
                <InputText :class="{'p-invalid': v$.name_ru.$errors.length}" v-model="form.name_ru" id="last_name"
                           class="w-full"/>
                <label for="last_name">Введите наименование</label>
              </span>
              <span v-if="v$.name_ru.$errors.length" class="text-xs color-error">
                {{ v$.name_ru.$errors[0].$message }}
              </span>
            </div>

            <div class="w-full">
              <Dropdown
                  v-model="form.type"
                  :options="serviceTypes"
                  :class="{'p-invalid': v$.type.$errors.length}"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Тип услуги"
                  class="w-full"
              />
              <span v-if="v$.type.$errors.length" class="text-xs color-error">
                {{ v$.type.$errors[0].$message }}
              </span>
            </div>
            <div class="w-full">
              <Dropdown
                  v-model="form.service_category_id"
                  :value="form.service_category_id"
                  :class="{'p-invalid': v$.service_category_id.$errors.length}"
                  :options="categories?.data?.data ?? []"
                  optionLabel="name_ru"
                  optionValue="id"
                  placeholder="Категория услуги"
                  class="w-full"
              />
              <span v-if="v$.service_category_id.$errors.length" class="text-xs color-error">
                {{ v$.service_category_id.$errors[0].$message }}
            </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Стоимость услуги">
          <div class="flex flex-column gap-3">
            <div class="w-full mb-3">
              <span class="p-float-label w-full">
                <InputText
                    v-model="form.cost"
                    :class="{'p-invalid': v$.cost.$errors.length}"
                    id="last_name"
                    class="w-full"
                />
                <label for="last_name">Укажите стоимость, Р</label>
              </span>
              <span v-if="v$.cost.$errors.length" class="text-xs color-error">
                {{ v$.cost.$errors[0].$message }}
              </span>
            </div>

            <div class="w-full">
              <Dropdown
                  v-model="form.cost_type"
                  :class="{'p-invalid': v$.cost_type.$errors.length}"
                  :options="costTypes"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Тип стоимости"
                  class="w-full"
              />
              <span v-if="v$.cost_type.$errors.length" class="text-xs color-error">
                {{ v$.cost_type.$errors[0].$message }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Реквизиты и эквайринг">
          <div class="flex flex-column gap-3">
            <Dropdown
                v-model="selectBank"
                :options="banks"
                optionLabel="name"
                optionValue="id"
                placeholder="Банк"
                class="w-full"
            />

            <Dropdown
                v-model="form.acquiring"
                :options="acquiring"
                optionLabel="identifier"
                optionValue="id"
                placeholder="Идентификатор эквайринга"
                class="w-full"
            />
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Описание услуги">
      <Editor v-model="form.description_ru" class="w-full"></Editor>
      <span v-if="v$.description_ru.$errors.length" class="text-xs color-error">
        {{ v$.description_ru.$errors[0].$message }}
      </span>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Количество персон">
      <div class="flex w-100">
        <span class="p-float-label mb-3 w-full">
          <InputText v-model="form.persons" id="persons" class="w-full" :disabled="form.has_persons"/>
          <label for="persons">Количество персон</label>
        </span>
      </div>
      <Checkbox
          v-model="form.has_persons"
          class="mt-2"
          name="persons"
          binary
      />
      <label class="ml-2" for="persons">Оказание услуг не требуется указания количества персон</label>
      <span></span>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Изображения">
      <div class="grid">
<!--        <div class="col-12 md:col-2" v-for="(file, i) in service" :key="i">-->
<!--          <ImageCard :src="file.objectURL" :handle="() => destroyFileLocal(file)"/>-->
<!--        </div>-->
        <div class="col-12 md:col-2" v-for="(file, i) in files.photos" :key="i">
          <ImageCard :src="file.objectURL" :handle="() => destroyFileLocal(file)"/>
        </div>
        <div class="col-12">
          <ButtonFileUpload
              @chooseFiles="selectFiles"
              label="Добавить изображения"
              :clear-files-after-select="true"
              :multiple="true"
          />
        </div>
      </div>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <div class="grid ">
      <div class="col-12 md:col-8">
        <MainCard title="Вложенные услуги">
          <template v-for="(subservice, i) in form.subservices" :key="i">
            <div class="grid mb-2">
              <div class="col-6">
                <span class="p-float-label mb-3 w-full">
                  <InputText v-model="form.subservices[i].name" id="subservice_name" class="w-full"/>
                  <label for="subservice_name">Введите наименование</label>
                </span>
              </div>

              <div class="col-6 flex">
                <span class="p-float-label mb-3 w-full">
                  <InputText v-model="form.subservices[i].cost" id="subservice_cost" class="w-full"/>
                  <label for="subservice_cost">Укажите стоимость, Р</label>
                </span>

                <Button
                    @click="destroySubService(subservice)"
                    class="ml-2"
                    icon="pi pi-times"
                    severity="danger"
                    text
                    rounded aria-label="Cancel"
                />
              </div>
            </div>
          </template>

          <div class="grid mb-2">
            <div class="col-6">
              <span class="p-float-label w-full">
                <InputText :class="{'p-invalid': sv$.name.$errors.length}" v-model="subServiceForm.name"
                           id="subservice_name" class="w-full"/>
                <label for="subservice_name">Введите наименование</label>
              </span>
              <span v-if="sv$.name.$errors.length" class="text-xs color-error">
                {{ sv$.name.$errors[0].$message }}
              </span>
            </div>

            <div class="col-6">
              <span class="p-float-label w-full">
                <InputText :class="{'p-invalid': sv$.name.$errors.length}" v-model="subServiceForm.cost"
                           id="subservice_cost" class="w-full"/>
                <label for="subservice_cost">Укажите стоимость, Р</label>
              </span>
              <span v-if="sv$.cost.$errors.length" class="text-xs color-error">
                {{ sv$.cost.$errors[0].$message }}
              </span>
            </div>
          </div>

          <Button @click="addSubService" label="Добавить" class="btn-primary"/>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <h2 class="mb-4">Интервалы оказания услуг</h2>

    <div class="grid h-max">
      <div class="col-12 md:col-6 h-full">
        <MainCard :styles="{'h-full': true}" title="Дни оказания услуги">
          <DatePicker @togglePick="changeDays" :items="datePickers"/>
          <Checkbox
              v-model="form.has_date"
              class="mt-2"
              name="interval_day"
              binary
          />
          <label class="ml-2" for="interval_day">Есть ограничения по дням</label>
        </MainCard>
      </div>
      <div class="col-12 md:col-6">
        <MainCard title="Период оказания услуги">
          <div class="flex w-100">
            <InputText :disabled="form.has_intervals" v-model="intervalForm.start" placeholder="От" class="w-10rem"/>
            <InputText :disabled="form.has_intervals" v-model="intervalForm.end" placeholder="До" class="ml-2 w-10rem"/>
            <InputText :disabled="form.has_intervals" v-model="intervalForm.duration" placeholder="Продолжительность"
                       class="ml-2 w-12rem"/>
          </div>
          <span
              class="text-xs color-black-20 mb-1">Доступные интервалы: 08:00, 08:30, 09:00, 09:30, ... 18:30</span><br>
          <Checkbox
              v-model="form.has_intervals"
              class="mt-2"
              name="intervals"
              binary
          />
          <label class="ml-2" for="intervals">Оказание услуг не требует интервалов</label>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style>
.p-fileupload-content {
  display: none !important;
}

.p-fileupload-buttonbar {
  background: transparent !important;
  border: none !important;
}
</style>