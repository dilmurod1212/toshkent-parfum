<template>
  <transition name="fade" mode="in-out">
    <div
      class="fixed top-0 left-0 w-full h-full justify-center z-[998] bg-black bg-opacity-50"
      v-if="show"
    ></div>
  </transition>
  <transition mode="in-out" name="fade">
    <div
      v-if="show"
      class="bg-white rounded-xl max-w-[378px] z-[1000] w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      :class="[maxMin[size]]"
    >
      <div class="flex items-center justify-between text-xl font-bold">
        <slot name="header">
          <div class="p-4 flex items-center w-full justify-between">
            <h2>{{ title }}</h2>
            <i
              class="icon-close-circle text-2xl text-gray hover:text-red transition-all duration-300 ease-in-out cursor-pointer"
              @click="closeModal"
            ></i>
          </div>
        </slot>
      </div>
      <div class="text-center">
        <slot></slot>
      </div>
      <div class="flex justify-between gap-4">
        <slot name="footer">
          <UIButton
            text="Cancel"
            variant="light"
            class="w-full"
            @click="emits('on-cancel')"
          />
          <UIButton text="Submit" class="w-full" @click="emits('on-submit')" />
        </slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  bodyClass?: string
  title?: string
  size: 'max' | 'min'
  param?: 'padding'
}
const props = defineProps<Props>()
const emits = defineEmits(['on-close', 'on-submit', 'on-cancel'])

const closeModal = () => {
  emits('on-close')
}

const maxMin = {
  max: '!max-w-[782px]',
  min: '!max-w-[378px]',
}
const padding = {
  padding: '!p-3',
}
watch(
  () => props.show,
  (val) => {
    val
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto')
  },
)
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
