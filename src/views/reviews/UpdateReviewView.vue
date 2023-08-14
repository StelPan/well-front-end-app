<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import Button from "primevue/button";
import Rating from "primevue/rating";
import Editor from "primevue/editor";
import Breadcrumb from "@/components/Breadcrumb";
import MainCard from "@/components/cards/MainCard";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";

const STATUS_PENDING = 'pending';
const STATUS_CONFIRMED = 'confirmed';
const STATUS_DECLINED = 'declined';

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Breadcrumb, Button, MainCard, Rating, Editor, ButtonSuccess},
  setup() {
    const store = useStore();
    const route = useRoute();

    const statuses = {
      [STATUS_PENDING]: 'Требует утверждения',
      [STATUS_CONFIRMED]: 'Утвержден',
      [STATUS_DECLINED]: 'Отклонен'
    }

    const {id} = route.params;
    const review = computed(() => store.getters.getCurrentReview);
    const text = ref('')

    const loadReview = async () => {
      await store.dispatch('fetchReview', id);
    };

    const confirm = async () => {
      await store.dispatch('fetchConfirmReview', {id, body: { text: text.value }});
      await loadReview();
    };

    const decline = async () => {
      await store.dispatch('fetchDeclineReview', {id, body: { text: text.value }});
      await loadReview();
    }

    const breadcrumbs = ref([{
      label: 'Отзывы',
      router: { name: 'reviews' }
    }, {
      label: 'Ремонт'
    }]);

    onMounted(async () => {
      await loadReview();
      text.value = review.value.text;
    });

    return {
      text,
      review,
      statuses,
      breadcrumbs,
      STATUS_PENDING,
      STATUS_DECLINED,
      STATUS_CONFIRMED,
      confirm,
      decline
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />

      <template v-if="review?.status === STATUS_PENDING">
        <div class="flex">
          <Button label="Отклонить" @click="decline" class="btn-error-outlined font-light" />
          <Button label="Утвердить" @click="confirm" class="btn-primary font-light ml-3" />
        </div>
      </template>

      <template v-if="review?.status === STATUS_CONFIRMED">
        <ButtonSuccess label="Отзыв утвержден" />
      </template>

      <template v-if="review?.status === STATUS_DECLINED">
        <Button label="Отзыв отклонен" class="btn-error font-light" />
      </template>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-8">
        <div class="grid bg-white rounded py-1 px-1">
          <div class="col-12 md:col-3">
            <div class="flex flex-column">
              <span class="color-black-40">Статус</span>
              <span class="color-primary">{{ statuses[review?.status] }}</span>
            </div>
          </div>
          <div class="col-12 md:col-3">
            <div class="flex flex-column">
              <span class="color-black-40">Пользователь</span>
              <span class="color-black-80 underline">
                {{ review?.user?.last_name ?? 'Не задано' }}
                {{ review?.user?.first_name ?? 'Не задано' }}
                {{ review?.user?.patronymic ?? 'Не задано' }}
              </span>
            </div>
          </div>
          <div class="col-12 md:col-3">
            <div class="flex flex-column">
              <span class="color-black-40">Дата</span>
              <span class="color-black-80">01.05.2023</span>
            </div>
          </div>
          <div class="col-12 md:col-3">
            <div class="flex flex-column">
              <span class="color-black-40">Оказанная услуга</span>
              <!-- TODO: Добавить динамику для I18n -->
              <span class="color-black-80">{{ review?.service?.name_ru }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4">
        <MainCard title="Поставленная оценка">
          <Rating :modelValue="review?.rating ?? 5" readonly :cancel="false"></Rating>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Текст отзыва">
          <Editor v-model="text" class="w-full" />
        </MainCard>
      </div>
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Изображения">
          <div class="grid">
            <div class="col-12 md:col-2" v-for="(photo, i) in 6" :key="i">
              <img
                  src="https://aiparquitectos.com/wp-content/uploads/2022/06/placeholder-600x400-1.png"
                  class="w-full rounded"
                  alt=""
              >
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style>
.rounded {
  border-radius: 10px;
}

.p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
  color: var(--color-primary) !important;
}
</style>