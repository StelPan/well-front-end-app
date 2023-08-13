<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import TabMenu from "primevue/tabmenu";

export default defineComponent({
  layout: {name: "AdminLayout"},
  components: {TabMenu},
  setup() {
    const store = useStore();
    const router = useRouter();

    const reviews = computed(() => store.getters.getListReviews);

    onMounted(async () => {
      await store.dispatch('fetchReviews');
    });

    const models = ref([{
      label: 'Требующие утверждения',
    }, {
      label: 'Утвержденные'
    }]);

    const activeIndex = ref(0);

    return { models, activeIndex, reviews };
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

      </div>
    </div>
  </section>
</template>

<style scoped>

</style>