<template>
  <div>
    <div
      class="flex items-center bg-white gap-x-2 w-full p-2 transition ease-out cursor-pointer group \"
      :class="labelCLass"
    >
      <div
        @click="filterParent(item.id)"
        class="border-2 cursor-pointer flex-center border-gray-100 rounded w-5 h-5 flex-shrink-0 relative overflow-hidden transition-all"
        :class="{
          'bg-red border-none rotate-0 transition-all':
            checked || isOpen || store.productId.includes(item.id),
        }"
      >
        <i
          class="text-xl text-white flex-center opacity-0 transition-all"
          :class="[
            {
              'opacity-100 transition-all':
                checked || isOpen || store.productId.includes(item.id),
            },
            showIcon ? 'icon-menu-dots' : 'icon-unread',
          ]"
        ></i>
        <input
          ref="check"
          type="checkbox"
          :value="item.id"
          @change.prevent.stop="handleInput"
          :checked="checked"
          class="w-5 h-5 opacity-0 absolute top-0 left-0 checked:text-white cursor-pointer"
        />
      </div>
      <div
        @click="toggleVisible(item.id, item.categories.length)"
        class="flex items-center justify-between w-full gap-2"
      >
        <span class="font-medium text-sm group-hover:text-red transition-all"
          >{{ item.title }} {{ item.id }}</span
        >
        <i
          v-if="!!item.categories.length"
          class="icon-chevron-down text-xl text-red transition-all"
          :class="{
            'rotate-180 transition-all': isVisible,
          }"
        ></i>
      </div>
    </div>
    <div v-auto-animate>
      <template v-if="item.categories.length && isVisible">
        <FormCheckbox
          v-for="el in item.categories"
          class="pl-4"
          :key="el.id"
          v-bind="{ item: el }"
          :is-open="checked"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFilterStore } from '~/stores/productFilter'
const store = useFilterStore()
const check = ref(false)
const input = ref(false)
const isVisible = ref(false)

const props = defineProps<{
  item: {
    id: number
    title: string
    parent_id: null
    categories: {
      id: number
      title: string
      parent_id: number
      categories: []
      icon_src: {
        default: string
        medium: string
        small: string
      }
    }[]
    icon_src: {
      default: string
      medium: string
      small: string
    }
  }
  checked?: boolean
  labelCLass?: string
  showIcon?: boolean
  parent?: boolean
  isOpen?: boolean
  labelKey?: string
  valueKey?: string
  modelValue: number[]
}>()
const checked = ref(false)
const toggleVisible = (id: number, show: boolean) => {
  if (!show) {
    store.handleId(id)
    console.log(store.productId)
  }
  isVisible.value = !isVisible.value
}
const filterParent = (id: number) => {
  checked.value = !checked.value
  store.handleId(id)
  // if (props.item.categories.length) {
  //   if (id === props.item?.categories[0]?.parent_id) {
  //     props.item.categories.forEach((el) => {
  //       store.handleId(el.id)
  //     })
  //     console.log(id, store.productId)
  //     checked.value = true
  //   }
  // }
  // // props.item.forEach()
  // console.log(props.item)
}
</script>
