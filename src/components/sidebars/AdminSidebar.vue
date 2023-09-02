<script>
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  props: {
    state: {
      type: Boolean,
      required: true,
    }
  },
  setup() {
    const {t} = useI18n();

    const menus = [{
      label: t('menu.users'),
      svg: 'images/icons/Users.svg',
      route: {name: "users"}
    }, {
      label: t('menu.states'),
      svg: 'images/icons/States.svg',
      route: {name: "state-constructor"}
    }, {
      label: t('menu.structure'),
      svg: 'images/icons/Structure.svg',
      route: {name: "buildings"}
    }, {
      label: t('menu.objects'),
      svg: 'images/icons/Objects.svg',
      route: {name: "objects"}
    }, {
      label: t('menu.tariffs'),
      svg: 'images/icons/Tariffs.svg',
      route: {name: "tariffs"}
    }, {
      label: t('menu.services'),
      svg: 'images/icons/Services.svg',
      route: {name: "services"},
    }, {
      label: t('menu.counterparties'),
      svg: 'images/icons/Counterparties.svg',
      route: {name: "counterparties"}
    }, {
      label: t('menu.reviews'),
      svg: 'images/icons/Reviews.svg',
      route: {name: "reviews"}
    }, {
      label: t('menu.partners'),
      svg: 'images/icons/Partners.svg',
      route: {name: "partners-list"}
    }, {
      label: t('menu.notices'),
      svg: 'images/icons/Notices.svg',
      route: {name: "notices"}
    }, {
      label: t('menu.requests'),
      svg: 'images/icons/Requests.svg',
      route: {name: "vendors-list"}
    }, {
      label: t('menu.support'),
      svg: 'images/icons/Supports.svg',
      route: {name: "support"}
    }];

    function getImgUrl(pet) {
      return require('../../assets/' + pet)
    }

    return {menus, getImgUrl};
  }
});
</script>

<template>
  <div
      :class="{'sidebar-close': !state, 'sidebar-show': state}"
      class="flex flex-column pb-4 bg-white"
  >
    <div class="flex justify-content-start py-5 px-5">
      <img :class="{'hidden': !state }" src="../../assets/images/admin/Logotype.svg" width="150" alt="">
      <img :class="{'hidden': state }" src="../../assets/images/admin/Logotype-mini.svg" width="150" alt="">
    </div>
    <div class="flex flex-column mb-2 px-4">
      <router-link
          v-for="(menu, i) in menus"
          :key="i"
          :to="{ ...menu.route }"
          active-class="link" exact
          :class="{ 'd-block': state, 'd-none': !state, 'justify-content-center': !state }"
          class="flex justify-content-start mb-1 color-black-80 no-underline link-no-active"
      >
        <div
            class="flex justify-content-start align-items-center w-full px-3 py-3"
            :class="{'justify-content-center': !state}"
        >
          <img :src="menu?.svg ? getImgUrl(menu.svg) : getImgUrl('images/icons/Users.svg')" alt="">
          <span :class="{'hidden': !state}" class="ml-3">{{ menu.label }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-close {
  max-width: 50px;
}

.sidebar-show {
  min-width: 300px;
}

.sidebar-close {
  min-width: 126px;
}

.link {
  border-radius: 10px;
  background-color: var(--color-belge);
}

.link-no-active {}

.link-no-active:hover {
  border-radius: 10px;
  background-color: var(--color-belge);
  transition: background-color 0.5s;
}
</style>
