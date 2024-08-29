import { onMounted, ref, watch } from 'vue'

export default function (initialValue, key) {
  const userdata = ref(initialValue)

  onMounted(() => {
    const storageVal = window.localStorage.getItem(key)

    if (storageVal) {
      userdata.value = JSON.parse(storageVal)
    }

    watch(
      userdata,
      (newValue) => {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      },
      { deep: true }
    )
  })

  return userdata
}
