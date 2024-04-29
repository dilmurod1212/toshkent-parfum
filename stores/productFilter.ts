import { defineStore } from 'pinia'

export const useFilterStore = defineStore('FilterStore', () => {
  const store = useProductStore()
  const productId = ref([])
  function handleId(id: number) {
    if (productId.value.includes(id)) {
      productId.value.splice(
        productId.value.findIndex((el) => el === id),
        1,
      )
    } else {
      productId.value.push(id)
    }
  }
  watch(
    () => productId.value,
    () => {
      store.fetchFilteredData(productId.value?.join(','))
    },
    { deep: true },
  )
  return { productId, handleId }
})
