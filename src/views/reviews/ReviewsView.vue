<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import TabMenu from "primevue/tabmenu";
import DataView from "primevue/dataview";
import Rating from "primevue/rating";
import Button from "primevue/button";
import Paginator from "primevue/paginator";

const STATUS_PENDING = 'pending';
const STATUS_CONFIRMED = 'confirmed';
const STATUS_DECLINED = 'declined';

export default defineComponent({
  layout: {name: "AdminLayout"},
  components: {TabMenu, DataView, Rating, Button, Paginator},
  setup() {
    const store = useStore();
    const router = useRouter();

    const reviews = computed(() => store.getters.getListReviews);

    const models = ref([{
      label: 'Требующие утверждения',
      params: { status: STATUS_PENDING },
    }, {
      label: 'Утвержденные',
      params: { status: STATUS_CONFIRMED },
    },  {
      label: 'Отклоненные',
      params: { status: STATUS_DECLINED },
    }]);

    const activeIndex = ref(0);


    const first = ref(0);

    const findReviews = async () => {
      await store.dispatch('fetchReviews', {
        ...models.value[activeIndex.value].params,
        page: ((first.value / (reviews.value?.data?.pagination?.per_page ?? 1)) + 1)
      });

      window.scrollTo(0,0);
    }

    watch((activeIndex), async (index) => {
      await findReviews();
    });

    watch((first), async (index) => {
      await findReviews();
    });

    onMounted(async () => {
      await findReviews();
    });

    return {
      STATUS_CONFIRMED,
      STATUS_DECLINED,
      STATUS_PENDING,
      activeIndex,
      reviews,
      models,
      first
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex mb-2">
      <h1>Отзывы</h1>
    </div>

    <TabMenu :model="models" v-model:activeIndex="activeIndex" />
  </section>

  <section class="py-2 mb-3">
    <div class="grid gap-2">
      <div class="col-12">
        <DataView :value="reviews?.data?.data ?? []">
          <template #list="slotProps">
            <div class="col-12">
              <router-link class="no-underline" :to="{ name: 'review-view', params: {id: slotProps.data.id} }">
                <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                  <img
                      class="w-9 sm:w-16rem xl:w-14rem shadow-2 block xl:block mx-auto border-round"
                      src="https://aiparquitectos.com/wp-content/uploads/2022/06/placeholder-600x400-1.png"
                      :alt="slotProps.data.service_name"
                  />
                  <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                      <div class="text-2xl font-bold text-900">{{ slotProps.data.service_name }}</div>
                      <div class="flex align-items-center xl:w-5 gap-3">
                      <span class="flex align-items-center color-black-40 gap-2">
                        <span class="font-semibold">{{ slotProps.data.text }}</span>
                      </span>
                      </div>
                      <Rating :modelValue="slotProps.data.rating" readonly :cancel="false"></Rating>
                    </div>
                    <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                      <Button
                          v-if="slotProps.data.status === STATUS_PENDING"
                          label="Требует подтверждения"
                          rounded
                          class="btn-primary font-light mb-3"
                      />

                      <Button
                          v-if="slotProps.data.status === STATUS_CONFIRMED"
                          label="Подтвержден"
                          rounded
                          class="btn-success font-light mb-3"
                      />

                      <Button
                          v-if="slotProps.data.status === STATUS_DECLINED"
                          label="Отклонен"
                          rounded
                          class="btn-error font-light mb-3"
                      />

                      <span class="color-black-40 text-sm">Пользователь</span>

                      <router-link
                          :to="{ name: 'user-edit', params: {id: slotProps.data.user.id } }"
                          class="color-black-80 text-lg"
                      >
                        {{ slotProps.data.user.last_name ?? 'Не указан' }}
                        {{ slotProps.data.user.fist_name ?? 'Не указан' }}
                        {{ slotProps.data.user.patronymic ?? 'Не указан' }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </template>
        </DataView>

        <Paginator
            v-model:first="first"
            :rows="reviews?.data?.pagination?.per_page ?? 0"
            :totalRecords="reviews?.data?.pagination?.total ?? 0"
            class="justify-content-start"
        ></Paginator>
      </div>
    </div>
  </section>
</template>

<style>
.p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
  color: var(--color-primary) !important;
}

.p-paginator {
  justify-content: start !important;
}

.p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background-color: var(--color-primary) !important;
  border-color: var(--color-primary) !important;
  color: white !important;
  border-radius: 50%;
}
</style>
