<template>
  <div class="mb-[180px]">
    <header class="z-30 fixed top-0 left-0 w-full shadow-xl">
      <div class="bg-[#F7F8FA]">
        <div class="flex justify-between items-center h-12 container hidden">
          <div class="flex items-center gap-x-6">
            <a
              href="tel:+998712007007"
              target="_blank"
              class="flex items-center gap-1 group"
            >
              <i
                class="icon-phone-calling text-xl text-[#CDCDD0] group-hover:text-red transition-all"
              ></i>
              <span class="text-xs group-hover:text-red transition-all"
                >+998 (71) 200 70 07</span
              >
            </a>
            <a
              href="https://yandex.ru/maps/?ll=25.45,41.578&z=18"
              target="_blank"
              class="flex items-center gap-1 group transition-all"
            >
              <i
                class="icon-map-square text-xl text-[#CDCDD0] group-hover:text-red transition-all"
              ></i>
              <span class="text-xs group-hover:text-red transition-all"
                >responsive header</span
              >
            </a>
          </div>
          <div class="flex items-center gap-x-7">
            <UISocials v-bind="{ socialItems }" />
            <UILanguageSwitcher />
          </div>
        </div>
      </div>
      <div class="border-b bg-white">
        <div class="flex items-center justify-between my-auto h-20 container">
          <div class="flex gap-4">
          <div @click="openMenu" class="flex justify-center items-center cursor-pointer">
            <i
              class="text-3xl "
              :class="[state ? 'icon-close-circle' : 'icon-hamburger-menu']"
            ></i>
          </div>
          <nuxt-link @click="state = false" to="/"
            ><nuxt-img src="/images/header-logo.svg" alt="" class=""
          /></nuxt-link>
          </div>

          <div class="flex gap-x-4 ">
            <a
              href="#"
              class="flex flex-col justify-center text-gray-extra items-center text-xs hover:text-red transition-all cursor-pointer"
              @click="authStore.registerStatus = true"
            >
              <i class="icon-box text-xl mb-0"></i>
              <span class="translate-y-[-5px] text-xs"
              >{{ $t('orders') }}</span>
            </a>

            <nuxt-link
              to="/basket"
              class="flex flex-col justify-center relative items-center text-xs text-gray-extra hover:text-red transition-all"
            >
              <i class="icon-basket-regular text-xl mb-0"></i>
              <span class="translate-y-[-5px] text-xs">
                <div v-if="cartStore.productsTotal > 0">
                  <div class="">
                    {{ $t('basket') }}
                  </div>
                  <p
                    class="absolute -top-4 w-5 right-0 bg-red text-white rounded-[50%] text-center"
                  >
                    {{ cartStore.productsTotal }}
                  </p>
                </div>
                <div v-else>
                  {{ $t('basket') }}
                </div>
              </span>
            </nuxt-link>

            <nuxt-link
              to="/favourities"
              class="flex flex-col justify-center items-center text-gray-extra hover:text-red transition-all"
            >
              <i class="icon-heart text-xl mb-0"></i>
              <span class="translate-y-[-5px] text-xs">
                <div>
                  {{ $t('favorites') }}
                </div>
              </span>
            </nuxt-link>
          </div>

        </div>
      </div>
      <div class="container bg-white py-2">
        <UISearch/>
      </div>
      <div class="bg-white max-lg:hidden ">
        <div
          class="container flex-y-center justify-between py-4 !overflow-x-scroll lg:!overflow-hidden"
        >
          <div v-for="el in headerMenuData" class="flex items-center">
            <div class="inline">
              <div class="flex-y-center">
                <div
                  class="transition-300 duration-500 animated-link group flex-y-center h-3.5 inline-block font-semibold text-sm leading-[14px] text-dark hover:text-red flex-shrink-0 cursor-pointer"
                >
                  <div class="mask relative p-0 h-3.5 overflow-hidden">
                    <div @click="" class="transition-300 group-hover:-translate-y-4">
                      <nuxt-link :to="`/products?sections=${el.id}`"
                        class="animated-link-title1 block transition-300 duration-500 origin-[right_center] group-hover:rotate-[20deg] group-hover:text-red"
                        >{{ el.title }}</nuxt-link
                      ><nuxt-link :to="`/products?sections=${el.id}`"
                        class="animated-link-title2 block transition-300 duration-500 origin-[left_center] rotate-[20deg] group-hover:rotate-[0deg] group-hover:text-red"
                        >{{ el.title }}</nuxt-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div
      class="w-full h-screen bg-white fixed pt-[175px] max-lg:pt-[128px] z-20 left-0 top-0 transform transition-all"
      :class="[
        state
          ? 'translate-y-0 -translate-x-0  opacity-100 visible'
          : '-translate-y-20  opacity-0  invisible ',
      ]"
    >
      <div class="container h-full">
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 py-8 gap-y-10 h-full overflow-y-auto overflow-x-hidden"
        >
          <div v-for="el in menuCategories">
            <nuxt-link @click="openMenu" :to="`/products?sections=${el.id}`" class="text-xl max-sm:text-base font-bold mb-4">
              {{ el.title }}
            </nuxt-link>
            <div class="flex flex-col gap-y-1 md:gap-y-2 mt-3">
              <nuxt-link
                @click="openMenu"
                v-for="list in el.categories"
                :to="`/products?sections=${list.id}`"
                class="cursor-pointer hover:text-red max-sm:text-sm transform hover:translate-x-1 transition-all"
                >{{ list.title }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script setup lang="ts">
import {useHeaderMenu} from '~/stores/headerMenu'
const menuStore = useHeaderMenu()
menuStore.fetchHeaderMenu()
menuStore.fetchHeaderCategories()
const headerMenuData = computed(()=> menuStore.headerMenuData)
const menuCategories = computed(()=> menuStore.menuCategories)

const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};
const shouldRenderLink = ref(false)
function removeElement() {
    shouldRenderLink.value = !shouldRenderLink.value
}
definePageMeta({
  layout: "profile"
})
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

import { useAuthStore } from '~/stores/auth'

import {useProductStore} from '~/stores/product'
const ProductStore = useProductStore()
ProductStore.fetchProductCategory()


const authStore = useAuthStore()

const state = ref(false)
const search = ref('')
watch(
  () => state.value,
  (val) => {
    state.value
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto')
  }
)
function openMenu() {
  state.value = !state.value
}
const socialItems = [
  {
    icon: 'icon-facebook-square',
    link: 'https://www.instagram.com/toshkent_parfum_/',
  },
  {
    icon: 'icon-instagram-square',
    link: 'https://www.instagram.com/toshkent_parfum_/',
  },
  { icon: 'icon-telegram-square', link: 'https://t.me/toshkent_parfume' },
]

</script>
<style>
.flex-y-center {
  align-items: center;
  display: flex;
}
.transition-300 {
  transition-duration: 0.3s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.duration-500 {
  transition-duration: 0.5s;
}


.btn{
  border-radius: 8px;
  background: linear-gradient(85deg, #383838 0%, #6F6F6F 131.39%) !important;
  transition:.3s all;
}
.btn:hover{
  background: linear-gradient(85deg, #cccccc 0%, #dddddd 131.39%) !important;
  color: black !important;
  transition:.3s all;

}
</style>
